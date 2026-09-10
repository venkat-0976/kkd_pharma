export interface ReverseGeocodedAddress {
  area: string;
  mandal: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
}

interface NominatimAddress {
  suburb?: string;
  neighbourhood?: string;
  quarter?: string;
  residential?: string;
  village?: string;
  hamlet?: string;
  isolated_dwelling?: string;
  city_district?: string;
  city?: string;
  town?: string;
  municipality?: string;
  county?: string;
  district?: string;
  state_district?: string;
  state?: string;
  postcode?: string;
}

interface NominatimResponse {
  address?: NominatimAddress;
}

interface BigDataAdmin {
  name?: string;
  adminLevel?: number;
}

interface BigDataResponse {
  locality?: string;
  city?: string;
  principalSubdivision?: string;
  postcode?: string;
  localityInfo?: { administrative?: BigDataAdmin[] };
}

interface PostalOffice {
  Name?: string;
  Block?: string;
  District?: string;
  State?: string;
  Pincode?: string;
  BranchType?: string;
  DeliveryStatus?: string;
}

interface PostalPinResponse {
  Status?: string;
  PostOffice?: PostalOffice[] | null;
}

export interface PinHint {
  pincode: string;
  hints: string[];
}

const INVALID_PLACE =
  /\b(ocean|sea|gulf|strait|lagoon|inlet|sound|channel|pacific|atlantic|arctic|antarctic|indian ocean|arabian sea|bay of bengal|bay of)\b/iu;

function clean(value?: string) {
  const name = value?.replace(/\s+/gu, " ").trim() ?? "";
  return name || undefined;
}

function isValidPlaceName(value?: string): value is string {
  const name = clean(value);
  if (!name || name.length < 2) return false;
  if (INVALID_PLACE.test(name)) return false;
  if (/^(ocean|sea|bay|gulf|water|continent|world|earth|india)$/iu.test(name)) return false;
  return true;
}

function uniqueHints(values: Array<string | undefined>) {
  const seen = new Set<string>();
  const hints: string[] = [];
  for (const value of values) {
    const name = clean(value);
    if (!name || !isValidPlaceName(name)) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    hints.push(name);
  }
  return hints;
}

function digitsOnly(value?: string) {
  const digits = value?.replace(/\D/gu, "") ?? "";
  return /^\d{6}$/u.test(digits) ? digits : "";
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Lookup failed (${response.status})`);
  }
  return (await response.json()) as T;
}

async function nominatimReverse(latitude: number, longitude: number, zoom: string) {
  return fetchJson<NominatimResponse>(
    `https://nominatim.openstreetmap.org/reverse?${new URLSearchParams({
      lat: String(latitude),
      lon: String(longitude),
      format: "jsonv2",
      addressdetails: "1",
      zoom,
      "accept-language": "en",
    }).toString()}`,
  );
}

function pinHintFromNominatim(data: NominatimResponse): PinHint {
  const a = data.address;
  if (!a) return { pincode: "", hints: [] };
  return {
    pincode: digitsOnly(a.postcode),
    hints: uniqueHints([
      a.village,
      a.suburb,
      a.neighbourhood,
      a.hamlet,
      a.quarter,
      a.residential,
      a.isolated_dwelling,
      a.city_district,
      a.town,
      a.municipality,
      a.city,
      a.county,
      a.state_district,
      a.district,
    ]),
  };
}

function pinHintFromBigData(data: BigDataResponse): PinHint {
  const admins = data.localityInfo?.administrative ?? [];
  return {
    pincode: digitsOnly(data.postcode),
    hints: uniqueHints([
      data.locality,
      ...admins.map((item) => item.name),
      data.city,
      data.principalSubdivision,
    ]),
  };
}

function mergePinHints(...parts: PinHint[]): PinHint {
  return {
    pincode: parts.find((part) => part.pincode)?.pincode ?? "",
    hints: uniqueHints(parts.flatMap((part) => part.hints)),
  };
}

export async function resolvePinFromCoordinates(latitude: number, longitude: number): Promise<PinHint> {
  let nominatimHint: PinHint = { pincode: "", hints: [] };
  try {
    nominatimHint = pinHintFromNominatim(await nominatimReverse(latitude, longitude, "18"));
  } catch {
    nominatimHint = { pincode: "", hints: [] };
  }

  if (nominatimHint.pincode) return nominatimHint;

  try {
    const backup = pinHintFromBigData(
      await fetchJson<BigDataResponse>(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?${new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
          localityLanguage: "en",
        }).toString()}`,
      ),
    );
    return mergePinHints(nominatimHint, backup);
  } catch {
    return nominatimHint;
  }
}

function officeScore(office: PostalOffice, hints: string[]) {
  const name = clean(office.Name)?.toLowerCase() ?? "";
  const block = clean(office.Block)?.toLowerCase() ?? "";
  const district = clean(office.District)?.toLowerCase() ?? "";
  let score = 0;

  for (const hint of hints) {
    const h = hint.toLowerCase();
    if (name === h) score += 100;
    else if (name.includes(h) || h.includes(name)) score += 40;
    if (block === h) score += 30;
    else if (block && (block.includes(h) || h.includes(block))) score += 12;
    if (district === h) score += 8;
  }

  if (office.DeliveryStatus === "Delivery") score += 3;
  if (office.BranchType === "Sub Post Office") score += 2;
  if (office.BranchType === "Head Post Office") score += 1;
  return score;
}

function pickOffice(offices: PostalOffice[], hints: string[]) {
  const ranked = [...offices].sort((left, right) => officeScore(right, hints) - officeScore(left, hints));
  return ranked[0];
}

function fromPostalOffice(office: PostalOffice, pincode: string): ReverseGeocodedAddress | null {
  const area = isValidPlaceName(office.Name) ? clean(office.Name)! : "";
  const mandal = isValidPlaceName(office.Block) ? clean(office.Block)! : "";
  const district = isValidPlaceName(office.District) ? clean(office.District)! : "";
  const state = isValidPlaceName(office.State) ? clean(office.State)! : "";
  if (!area && !mandal && !district && !state) return null;

  return {
    area,
    mandal,
    city: "",
    district,
    state,
    pincode: digitsOnly(office.Pincode) || pincode,
  };
}

async function fetchPostOffices(pincode: string): Promise<PostalOffice[]> {
  const payload = await fetchJson<PostalPinResponse[]>(`https://api.postalpincode.in/pincode/${pincode}`);
  const result = payload[0];
  if (!result || result.Status !== "Success" || !result.PostOffice?.length) {
    throw new Error("No post offices found for this PIN code");
  }
  return result.PostOffice;
}

/** Fills area, mandal, district and state from India Post PIN data. City is never set from mandal. */
export async function lookupAddressByPincode(pincode: string, hints: string[] = []) {
  const pin = digitsOnly(pincode);
  if (!pin) return null;
  const offices = await fetchPostOffices(pin);
  const office = pickOffice(offices, hints);
  return office ? fromPostalOffice(office, pin) : null;
}

/** GPS/coordinates are used only to find the PIN and pick the matching post office. */
export async function reverseGeocode(latitude: number, longitude: number): Promise<ReverseGeocodedAddress | null> {
  const pinHint = await resolvePinFromCoordinates(latitude, longitude);
  if (!pinHint.pincode) return null;
  return lookupAddressByPincode(pinHint.pincode, pinHint.hints);
}

export function parseLatitude(value: string) {
  const n = Number(value.trim());
  return Number.isFinite(n) && n >= -90 && n <= 90 ? n : null;
}

export function parseLongitude(value: string) {
  const n = Number(value.trim());
  return Number.isFinite(n) && n >= -180 && n <= 180 ? n : null;
}

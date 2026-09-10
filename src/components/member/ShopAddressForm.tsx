import { useCallback, useEffect, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LocateFixed, MapPin, MapPinned } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionCard } from "@/features/member/SectionCard";
import { useInvalidateMember } from "@/hooks/useMemberRecord";
import { memberService } from "@/services/member/member.service";
import { addressSchema, type AddressValues } from "@/validation/memberForms";
import type { ShopAddress } from "@/types/member";
import {
  lookupAddressByPincode,
  parseLatitude,
  parseLongitude,
  resolvePinFromCoordinates,
  type ReverseGeocodedAddress,
} from "@/lib/reverseGeocode";

const premiseFields: { key: keyof AddressValues; label: string }[] = [
  { key: "doorNumber", label: "Door / building number" },
  { key: "street", label: "Street" },
];

const localityFields: { key: keyof AddressValues; label: string }[] = [
  { key: "area", label: "Area / locality" },
  { key: "mandal", label: "Mandal" },
  { key: "city", label: "City" },
  { key: "district", label: "District" },
  { key: "state", label: "State" },
  { key: "pincode", label: "PIN code" },
];

function AddressField({
  field,
  form,
  inputMode,
}: {
  field: { key: keyof AddressValues; label: string };
  form: UseFormReturn<AddressValues>;
  inputMode?: "numeric" | "decimal";
}) {
  return (
    <div>
      <Label
        htmlFor={String(field.key)}
        className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground"
      >
        {field.label}
      </Label>
      <Input
        id={String(field.key)}
        className="mt-2 h-11 rounded-lg"
        inputMode={inputMode}
        {...form.register(field.key)}
      />
      {form.formState.errors[field.key] ? (
        <p className="mt-1 text-xs text-destructive">{form.formState.errors[field.key]?.message}</p>
      ) : null}
    </div>
  );
}

function toFormValues(address: ShopAddress): AddressValues {
  return {
    doorNumber: address.doorNumber ?? "",
    street: address.street ?? "",
    area: address.area ?? "",
    mandal: address.mandal ?? "",
    city: address.city ?? "",
    district: address.district ?? "",
    state: address.state ?? "",
    pincode: address.pincode ?? "",
    latitude: address.latitude != null ? String(address.latitude) : "",
    longitude: address.longitude != null ? String(address.longitude) : "",
  };
}

function geoErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "code" in error) {
    const code = Number((error as GeolocationPositionError).code);
    if (code === 1) {
      return "Location access is blocked. Allow location for this site, then try again.";
    }
    if (code === 2) {
      return "Your position could not be determined. Check that Location is enabled on this device.";
    }
    if (code === 3) {
      return "Location request timed out. Try again, or enter coordinates manually.";
    }
  }
  if (error instanceof Error && error.message) return error.message;
  return "Could not get your location. Allow location access, or enter the coordinates manually.";
}

function readPosition(options: PositionOptions) {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

async function captureCoordinates() {
  if (!("geolocation" in navigator)) {
    throw new Error("Location is not supported in this browser.");
  }

  if (typeof window !== "undefined" && !window.isSecureContext) {
    throw new Error("Location only works on a secure connection (https or localhost).");
  }

  if (navigator.permissions?.query) {
    try {
      const status = await navigator.permissions.query({ name: "geolocation" });
      if (status.state === "denied") {
        throw new Error(
          "Location access is blocked. Allow location for this site in your browser settings.",
        );
      }
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("Location access is blocked")) {
        throw error;
      }
    }
  }

  try {
    return await readPosition({ enableHighAccuracy: true, timeout: 8_000, maximumAge: 0 });
  } catch {
    return readPosition({ enableHighAccuracy: false, timeout: 12_000, maximumAge: 60_000 });
  }
}

const fieldOptions = { shouldDirty: true, shouldTouch: true, shouldValidate: true } as const;

function coordKey(latitude: number, longitude: number) {
  return `${latitude.toFixed(6)},${longitude.toFixed(6)}`;
}

export function ShopAddressForm({ address }: { address: ShopAddress }) {
  const invalidate = useInvalidateMember();
  const [locating, setLocating] = useState(false);
  const lastLookedUp = useRef<string | null>(null);
  const skipNextCoordLookup = useRef(true);
  const skipNextPinLookup = useRef(true);
  const localityHints = useRef<string[]>([]);

  const form = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: toFormValues(address),
  });

  useEffect(() => {
    skipNextCoordLookup.current = true;
    skipNextPinLookup.current = true;
    form.reset(toFormValues(address));
  }, [address, form]);

  const applyCoordinates = (latitude: number, longitude: number) => {
    form.setValue("latitude", latitude.toFixed(6), fieldOptions);
    form.setValue("longitude", longitude.toFixed(6), fieldOptions);
  };

  const applyPlace = (place: ReverseGeocodedAddress) => {
    form.setValue("area", place.area, fieldOptions);
    form.setValue("mandal", place.mandal, fieldOptions);
    form.setValue("district", place.district, fieldOptions);
    form.setValue("state", place.state, fieldOptions);
    form.setValue("pincode", place.pincode, fieldOptions);
  };

  const fillFromPostalPlace = (
    place: ReverseGeocodedAddress | null,
    lookupKey: string,
    failure: string,
  ) => {
    if (!place || !(place.area || place.mandal || place.district || place.state || place.pincode)) {
      toast.message("Coordinates set", { description: failure });
      return false;
    }

    lastLookedUp.current = lookupKey;
    applyPlace(place);
    toast.success("Address updated from PIN code", {
      description:
        "Area, mandal, district and state were filled from India Post. Door number, street and city were left empty for you to enter.",
    });
    return true;
  };

  const fillAddressFromCoordinates = useCallback(
    async (latitude: number, longitude: number) => {
      const pinHint = await resolvePinFromCoordinates(latitude, longitude);
      localityHints.current = pinHint.hints;
      const key = `${pinHint.pincode}:${coordKey(latitude, longitude)}`;
      if (lastLookedUp.current === key) return;

      if (!pinHint.pincode) {
        toast.error("Could not determine PIN code", {
          description: "Try Use my location again, or enter the 6-digit PIN code.",
        });
        return;
      }

      try {
        const place = await lookupAddressByPincode(pinHint.pincode, pinHint.hints);
        fillFromPostalPlace(
          place,
          key,
          "PIN was found but postal records could not fill the address. Door number and street were cleared.",
        );
      } catch (error) {
        toast.error("PIN lookup failed", { description: geoErrorMessage(error) });
      }
    },
    [form],
  );

  const fillAddressFromPincode = useCallback(
    async (pincode: string) => {
      const latitude = parseLatitude(form.getValues("latitude") ?? "");
      const longitude = parseLongitude(form.getValues("longitude") ?? "");
      const key = `${pincode}:${latitude != null && longitude != null ? coordKey(latitude, longitude) : "none"}`;
      if (lastLookedUp.current === key) return;

      try {
        let hints = localityHints.current;
        if (latitude != null && longitude != null) {
          const pinHint = await resolvePinFromCoordinates(latitude, longitude);
          localityHints.current = pinHint.hints;
          hints = pinHint.hints;
        }
        const place = await lookupAddressByPincode(pincode, hints);
        fillFromPostalPlace(place, key, "No postal records were found for this PIN code.");
      } catch (error) {
        toast.error("PIN lookup failed", { description: geoErrorMessage(error) });
      }
    },
    [form],
  );

  const detectLocation = async () => {
    setLocating(true);
    try {
      const position = await captureCoordinates();
      applyCoordinates(position.coords.latitude, position.coords.longitude);
      await fillAddressFromCoordinates(position.coords.latitude, position.coords.longitude);
    } catch (error) {
      toast.error("Could not get your location", {
        description: geoErrorMessage(error),
      });
    } finally {
      setLocating(false);
    }
  };

  const lat = form.watch("latitude");
  const lng = form.watch("longitude");
  const pincode = form.watch("pincode");

  useEffect(() => {
    const latitude = parseLatitude(lat ?? "");
    const longitude = parseLongitude(lng ?? "");
    if (latitude == null || longitude == null) return;
    if (skipNextCoordLookup.current) {
      skipNextCoordLookup.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      void (async () => {
        setLocating(true);
        try {
          await fillAddressFromCoordinates(latitude, longitude);
        } finally {
          setLocating(false);
        }
      })();
    }, 700);

    return () => window.clearTimeout(timer);
  }, [lat, lng, fillAddressFromCoordinates]);

  useEffect(() => {
    if (!/^\d{6}$/u.test(pincode ?? "")) return;
    if (skipNextPinLookup.current) {
      skipNextPinLookup.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      void (async () => {
        setLocating(true);
        try {
          await fillAddressFromPincode(pincode ?? "");
        } finally {
          setLocating(false);
        }
      })();
    }, 700);

    return () => window.clearTimeout(timer);
  }, [pincode, fillAddressFromPincode]);

  return (
    <form
      onSubmit={form.handleSubmit(async (values) => {
        await memberService.saveAddress({
          doorNumber: values.doorNumber ?? "",
          street: values.street ?? "",
          area: values.area,
          mandal: values.mandal ?? "",
          city: values.city ?? "",
          district: values.district,
          state: values.state,
          pincode: values.pincode,
          ...(values.latitude ? { latitude: Number(values.latitude) } : {}),
          ...(values.longitude ? { longitude: Number(values.longitude) } : {}),
        });
        await invalidate();
        toast.success("Address updated");
      })}
      noValidate
    >
      <SectionCard
        icon={MapPinned}
        title="Shop address"
        description="The public directory shows only your area and city — the full address stays private."
        action={
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
            Save address
          </Button>
        }
      >
        <div className="space-y-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Shop premises
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Enter these by hand after auto-fill.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {premiseFields.map((field) => (
                <AddressField key={String(field.key)} field={field} form={form} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Postal locality
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Filled from India Post when you use location or enter a PIN.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {localityFields.map((field) => (
                <AddressField
                  key={String(field.key)}
                  field={field}
                  form={form}
                  {...(field.key === "pincode" ? { inputMode: "numeric" as const } : {})}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 bg-surface/50 p-4 sm:p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <h3 className="font-display text-base font-bold tracking-tight">Map location</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  Use my location or a PIN code to fill area, mandal, district and state from India
                  Post. Door number, street and city stay empty for you to enter, then click Save
                  address.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void detectLocation()}
                disabled={locating}
              >
                {locating ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <LocateFixed className="size-4" aria-hidden="true" />
                )}
                Use my location
              </Button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label
                  htmlFor="latitude"
                  className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                >
                  Latitude
                </Label>
                <Input
                  id="latitude"
                  className="mt-2 h-11 rounded-lg"
                  inputMode="decimal"
                  {...form.register("latitude")}
                />
              </div>
              <div>
                <Label
                  htmlFor="longitude"
                  className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                >
                  Longitude
                </Label>
                <Input
                  id="longitude"
                  className="mt-2 h-11 rounded-lg"
                  inputMode="decimal"
                  {...form.register("longitude")}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <MapPin className="size-4" aria-hidden="true" />
              </span>
              <p className="min-w-0 flex-1 text-sm text-muted-foreground">
                {lat && lng ? `Pinned at ${lat}, ${lng}` : "No coordinates saved yet."}
              </p>
              {lat && lng ? (
                <a
                  className="text-sm font-semibold text-primary hover:underline"
                  href={`https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Open in Maps
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </SectionCard>
    </form>
  );
}

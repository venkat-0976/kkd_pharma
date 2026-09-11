import { useEffect, useRef, useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DOCUMENT_CATEGORIES,
  licenceFieldConfig,
  licenceKindByCategory,
  pharmacistUploadFields,
} from "@/utils/licenceFields";
import type { DocumentCategory, LicenceRecord, MemberDocument, Pharmacist } from "@/types/member";
import type { LicenceValues, PharmacistValues } from "@/utils/validation/memberForms";

const MAX_MB = 5;
const ALLOWED = ["application/pdf", "image/jpeg", "image/png"];

const emptyLicence: LicenceValues = {
  number: "",
  licenceType: "",
  registrationInfo: "",
  issueDate: "",
  expiryDate: "",
};

const emptyPharmacist: PharmacistValues = {
  fullName: "",
  mobile: "",
  licenceNumber: "",
  licenceExpiry: "",
  address: "",
};

export interface DocumentUploadPayload {
  name: string;
  category: DocumentCategory;
  fileType: MemberDocument["fileType"];
  sizeKb: number;
  expiryDate?: string;
  replaceId?: string;
  licenceValues?: LicenceValues;
  pharmacistValues?: PharmacistValues;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCategory?: DocumentCategory;
  lockCategory?: boolean;
  replaceId?: string;
  licences?: Record<string, LicenceRecord>;
  pharmacist?: Pharmacist | null;
  onUpload: (input: DocumentUploadPayload) => Promise<void>;
}

function fromLicence(licence?: LicenceRecord): LicenceValues {
  return {
    number: licence?.number ?? "",
    licenceType: licence?.licenceType ?? "",
    registrationInfo: licence?.registrationInfo ?? "",
    issueDate: licence?.issueDate ?? "",
    expiryDate: licence?.expiryDate ?? "",
  };
}

export function DocumentUploadDialog({
  open,
  onOpenChange,
  defaultCategory = "Other",
  lockCategory = false,
  replaceId,
  licences,
  pharmacist,
  onUpload,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<DocumentCategory>(defaultCategory);
  const [manualName, setManualName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [licenceValues, setLicenceValues] = useState<LicenceValues>(emptyLicence);
  const [pharmacistValues, setPharmacistValues] = useState<PharmacistValues>(emptyPharmacist);
  const [busy, setBusy] = useState(false);

  const kind = licenceKindByCategory[category];
  const licenceFields = kind ? licenceFieldConfig[kind].fields : [];

  useEffect(() => {
    if (!open) return;
    setFile(null);
    setCategory(defaultCategory);
    setManualName("");
    const nextKind = licenceKindByCategory[defaultCategory];
    setLicenceValues(fromLicence(nextKind ? licences?.[nextKind] : undefined));
    setPharmacistValues(
      pharmacist
        ? {
            fullName: pharmacist.fullName,
            mobile: pharmacist.mobile,
            licenceNumber: pharmacist.licenceNumber,
            licenceExpiry: pharmacist.licenceExpiry ?? "",
            address: pharmacist.address,
          }
        : emptyPharmacist,
    );
    setExpiryDate(licences && nextKind ? (licences[nextKind]?.expiryDate ?? "") : "");
  }, [open, defaultCategory, licences, pharmacist]);

  const changeCategory = (next: DocumentCategory) => {
    setCategory(next);
    const nextKind = licenceKindByCategory[next];
    setLicenceValues(fromLicence(nextKind ? licences?.[nextKind] : undefined));
    if (nextKind && licences?.[nextKind]?.expiryDate) {
      setExpiryDate(licences[nextKind].expiryDate ?? "");
    }
  };

  const pick = (selected: File | null) => {
    if (!selected) return;
    if (!ALLOWED.includes(selected.type)) {
      toast.error("Unsupported file", { description: "Upload a PDF, JPG or PNG file." });
      return;
    }
    if (selected.size > MAX_MB * 1024 * 1024) {
      toast.error("File too large", { description: `Maximum size is ${MAX_MB} MB.` });
      return;
    }
    setFile(selected);
  };

  const submit = async () => {
    if (!file) {
      toast.error("Choose a file first");
      return;
    }
    setBusy(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase();
      const fileType = (
        ext === "pdf" || ext === "png" || ext === "jpg" || ext === "jpeg" ? ext : "pdf"
      ) as MemberDocument["fileType"];
      const otherExpiry =
        category === "Other" ? expiryDate : licenceValues.expiryDate || expiryDate;
      await onUpload({
        name: category === "Other" && manualName.trim() ? manualName.trim() : file.name,
        category,
        fileType,
        sizeKb: Math.max(1, Math.round(file.size / 1024)),
        ...(otherExpiry ? { expiryDate: otherExpiry } : {}),
        ...(replaceId ? { replaceId } : {}),
        ...(kind ? { licenceValues } : {}),
        ...(category === "Pharmacist Licence" ? { pharmacistValues } : {}),
      });
      onOpenChange(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{replaceId ? "Replace document" : "Upload document"}</DialogTitle>
          <DialogDescription>
            PDF, JPG or PNG up to {MAX_MB} MB. Files are stored privately and are never listed on
            the public website.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="doc-category">Document category</Label>
            <Select
              value={category}
              onValueChange={(v) => changeCategory(v as DocumentCategory)}
              disabled={lockCategory}
            >
              <SelectTrigger id="doc-category" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DOCUMENT_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              pick(e.dataTransfer.files?.[0] ?? null);
            }}
            className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-surface/60 p-6 text-center transition-colors hover:border-primary/50"
          >
            <UploadCloud className="size-6 text-primary" aria-hidden="true" />
            <span className="text-sm font-semibold">
              {file ? file.name : "Drag and drop, or click to browse"}
            </span>
            <span className="text-xs text-muted-foreground">
              {file ? `${Math.round(file.size / 1024)} KB` : "PDF, JPG, PNG"}
            </span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="sr-only"
            onChange={(e) => pick(e.target.files?.[0] ?? null)}
          />

          {category === "Other" ? (
            <div>
              <Label htmlFor="doc-name">Document name (manual entry)</Label>
              <Input
                id="doc-name"
                className="mt-1.5"
                placeholder="Enter a document name"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
              />
            </div>
          ) : null}

          {category === "Other" ? (
            <div>
              <Label htmlFor="doc-expiry">Expiry date (optional)</Label>
              <Input
                id="doc-expiry"
                type="date"
                className="mt-1.5"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          ) : null}

          {kind ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {licenceFields.map((field) => (
                <div
                  key={String(field.key)}
                  className={
                    field.key === "number" || field.key === "registrationInfo"
                      ? "sm:col-span-2"
                      : undefined
                  }
                >
                  <Label htmlFor={`upload-${String(field.key)}`}>{field.label}</Label>
                  <Input
                    id={`upload-${String(field.key)}`}
                    type={field.type ?? "text"}
                    className="mt-1.5"
                    value={licenceValues[field.key] ?? ""}
                    onChange={(e) =>
                      setLicenceValues((current) => ({ ...current, [field.key]: e.target.value }))
                    }
                  />
                </div>
              ))}
            </div>
          ) : null}

          {category === "Pharmacist Licence" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {pharmacistUploadFields.map((field) => (
                <div
                  key={field.key}
                  className={
                    field.multiline || field.key === "fullName" || field.key === "address"
                      ? "sm:col-span-2"
                      : undefined
                  }
                >
                  <Label htmlFor={`upload-ph-${field.key}`}>{field.label}</Label>
                  {field.multiline ? (
                    <Textarea
                      id={`upload-ph-${field.key}`}
                      rows={3}
                      className="mt-1.5"
                      value={pharmacistValues[field.key]}
                      onChange={(e) =>
                        setPharmacistValues((current) => ({
                          ...current,
                          [field.key]: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <Input
                      id={`upload-ph-${field.key}`}
                      type={field.type ?? "text"}
                      className="mt-1.5"
                      value={pharmacistValues[field.key]}
                      onChange={(e) =>
                        setPharmacistValues((current) => ({
                          ...current,
                          [field.key]: e.target.value,
                        }))
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => void submit()} disabled={busy}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : null}
            {replaceId ? "Replace" : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

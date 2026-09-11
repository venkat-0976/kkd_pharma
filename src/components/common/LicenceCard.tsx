import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, FileText, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { daysUntil, expiryStatus, formatDate, statusLabel } from "@/lib/expiry";
import { licenceSchema, type LicenceValues } from "@/utils/validation/memberForms";
import { cn } from "@/lib/utils";
import type { ExpiryStatus, LicenceRecord, MemberDocument } from "@/types/member";

interface LicenceCardProps {
  title: string;
  description: string;
  licence: LicenceRecord;
  reminderDays: number[];
  fields: { key: keyof LicenceValues; label: string; type?: "text" | "date" }[];
  onSave: (values: LicenceValues) => Promise<void>;
  onReplace?: () => void;
  onViewDocument?: (doc: MemberDocument) => void;
  onDeleteDocument?: (doc: MemberDocument) => void;
  attachedDocuments?: MemberDocument[];
  hasDocument?: boolean;
}

const compactLabels: Partial<Record<keyof LicenceValues, string>> = {
  licenceType: "Type",
  issueDate: "Issued",
  expiryDate: "Expires",
};

const badgeStyles: Record<ExpiryStatus, string> = {
  valid: "border-success/35 bg-success/10 text-success",
  expiring: "border-amber-400/50 bg-amber-50 text-amber-800",
  expired: "border-destructive/35 bg-destructive/10 text-destructive",
  missing: "border-border bg-muted text-muted-foreground",
};

const footerDot: Record<ExpiryStatus, string> = {
  valid: "bg-success",
  expiring: "bg-amber-500",
  expired: "bg-destructive",
  missing: "bg-muted-foreground/50",
};

function badgeText(status: ExpiryStatus, expiryDate?: string) {
  const days = daysUntil(expiryDate);
  if (status === "missing") return "NO DATE";
  if (status === "expired") return "EXPIRED";
  if (status === "expiring" && days !== null) return `RENEW IN ${days}D`;
  if (days !== null && days <= 99) return `${days}D LEFT`;
  return "VALID";
}

function DocumentRow({
  file,
  onView,
  onDelete,
}: {
  file: MemberDocument;
  onView?: ((doc: MemberDocument) => void) | undefined;
  onDelete?: ((doc: MemberDocument) => void) | undefined;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-border/80 bg-surface/70 px-2.5 py-2">
      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
        <FileText className="size-3.5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight text-foreground">{file.name}</p>
        <p className="text-[11px] font-medium text-secondary-foreground/80">{file.sizeKb} KB</p>
      </div>
      <div className="flex shrink-0 gap-0.5">
        {onView ? (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-8 rounded-full"
            aria-label={`View ${file.name}`}
            onClick={() => onView(file)}
          >
            <Eye className="size-3.5" />
          </Button>
        ) : null}
        {onDelete ? (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-8 rounded-full"
            aria-label={`Delete ${file.name}`}
            onClick={() => onDelete(file)}
          >
            <Trash2 className="size-3.5 text-destructive" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function LicenceCard({
  title,
  description,
  licence,
  reminderDays,
  fields,
  onSave,
  onReplace,
  onViewDocument,
  onDeleteDocument,
  attachedDocuments = [],
}: LicenceCardProps) {
  const [editing, setEditing] = useState(false);
  const [showOlder, setShowOlder] = useState(false);
  const { register, handleSubmit, reset, formState } = useForm<LicenceValues>({
    resolver: zodResolver(licenceSchema),
    defaultValues: {
      number: licence.number ?? "",
      licenceType: licence.licenceType ?? "",
      registrationInfo: licence.registrationInfo ?? "",
      issueDate: licence.issueDate ?? "",
      expiryDate: licence.expiryDate ?? "",
    },
  });

  useEffect(() => {
    reset({
      number: licence.number ?? "",
      licenceType: licence.licenceType ?? "",
      registrationInfo: licence.registrationInfo ?? "",
      issueDate: licence.issueDate ?? "",
      expiryDate: licence.expiryDate ?? "",
    });
  }, [licence, reset]);

  const status = expiryStatus(licence.expiryDate, reminderDays);
  const current =
    attachedDocuments.find((doc) => doc.id === licence.documentId) ?? attachedDocuments[0];
  const older = attachedDocuments.filter((doc) => doc.id !== current?.id);

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="h-1.5 bg-gradient-to-r from-primary via-primary/70 to-accent" />
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <header className="grid grid-cols-[minmax(0,1fr)_4.25rem] items-start gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-lg font-bold leading-tight tracking-tight text-foreground">
              {title}
            </h2>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-secondary-foreground/80">
              {description}
            </p>
          </div>
          <span
            className={cn(
              "grid size-16 shrink-0 place-items-center rounded-full border px-1.5 text-center text-[10px] font-bold uppercase leading-tight tracking-wide",
              badgeStyles[status],
            )}
          >
            {badgeText(status, licence.expiryDate)}
          </span>
        </header>

        {editing ? (
          <form
            className="mt-4 grid flex-1 gap-3 sm:grid-cols-2"
            noValidate
            onSubmit={handleSubmit(async (values) => {
              await onSave(values);
              setEditing(false);
            })}
          >
            {fields.map((field) => (
              <div key={String(field.key)}>
                <Label htmlFor={`${title}-${String(field.key)}`} className="text-xs">
                  {field.label}
                </Label>
                <Input
                  id={`${title}-${String(field.key)}`}
                  type={field.type ?? "text"}
                  className="mt-1 h-8 text-sm"
                  {...register(field.key)}
                />
              </div>
            ))}
            <div className="flex gap-2 sm:col-span-2">
              <Button type="submit" size="sm" disabled={formState.isSubmitting}>
                {formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
                Save
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            <dl className="mt-3 divide-y divide-border/80 border-y border-border/80">
              {fields.map((field) => {
                const raw = licence[field.key as keyof LicenceRecord] as string | undefined;
                return (
                  <div
                    key={String(field.key)}
                    className="grid grid-cols-[7.25rem_minmax(0,1fr)] items-center gap-3 py-1.5"
                  >
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-secondary-foreground">
                      {compactLabels[field.key] ?? field.label}
                    </dt>
                    <dd className="truncate text-right text-sm font-semibold text-foreground">
                      {field.type === "date" ? (
                        formatDate(raw)
                      ) : raw ? (
                        raw
                      ) : (
                        <span className="font-medium text-secondary-foreground/70">
                          Not provided
                        </span>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>

            <div className="mt-3 space-y-1.5">
              {current ? (
                <DocumentRow file={current} onView={onViewDocument} onDelete={onDeleteDocument} />
              ) : (
                <div className="rounded-lg border border-dashed border-border px-3 py-2.5 text-xs text-muted-foreground">
                  No document on file
                </div>
              )}
              {older.length > 0 ? (
                <>
                  <button
                    type="button"
                    className="text-[11px] font-semibold text-primary hover:underline"
                    onClick={() => setShowOlder((open) => !open)}
                  >
                    {showOlder
                      ? "Hide earlier files"
                      : `${older.length} earlier file${older.length === 1 ? "" : "s"}`}
                  </button>
                  {showOlder
                    ? older.map((file) => (
                        <DocumentRow
                          key={file.id}
                          file={file}
                          onView={onViewDocument}
                          onDelete={onDeleteDocument}
                        />
                      ))
                    : null}
                </>
              ) : null}
            </div>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
              <p className="inline-flex items-center gap-2 text-xs font-semibold text-secondary-foreground">
                <span
                  className={cn("size-1.5 rounded-full", footerDot[status])}
                  aria-hidden="true"
                />
                {statusLabel[status]}
              </p>
              <div className="flex flex-wrap gap-2">
                {onReplace ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 border-foreground/20 px-3.5"
                    onClick={onReplace}
                  >
                    Replace
                  </Button>
                ) : null}
                <Button size="sm" className="h-8 px-3.5" onClick={() => setEditing(true)}>
                  Update
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

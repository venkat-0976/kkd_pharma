import { Download, FileText, Lock } from "lucide-react";
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
import { StatusBadge } from "@/components/common/StatusBadge";
import { expiryStatus, formatDate } from "@/lib/expiry";
import type { MemberDocument } from "@/types/member";

interface Props {
  document: MemberDocument | null;
  reminderDays: number[];
  onOpenChange: (open: boolean) => void;
}

/**
 * Private document viewer.
 *
 * Documents live in private storage — the preview build has no file bytes, so
 * this shows the record's metadata and an authorised-preview placeholder. Once
 * the secure backend lands, the placeholder is replaced by a short-lived
 * signed URL rendered in an <iframe> (PDF) or <img> (JPG/PNG).
 */
export function DocumentViewDialog({ document, reminderDays, onOpenChange }: Props) {
  return (
    <Dialog open={!!document} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader className="min-w-0 pr-6">
          <DialogTitle className="line-clamp-2 break-all">
            {document?.name ?? "Document"}
          </DialogTitle>
          <DialogDescription>
            {document
              ? `${document.category} · ${document.fileType.toUpperCase()} · ${document.sizeKb} KB`
              : null}
          </DialogDescription>
        </DialogHeader>

        {document ? (
          <div className="space-y-4">
            <div className="grid min-h-56 place-items-center rounded-xl border border-dashed border-border bg-surface/60 p-8 text-center">
              <div className="space-y-2">
                <FileText className="mx-auto size-8 text-primary" aria-hidden="true" />
                <p className="text-sm font-semibold">Secure preview</p>
                <p className="mx-auto max-w-sm text-xs text-muted-foreground">
                  This file is held in private storage. The preview opens through a short-lived
                  authorised link once the secure backend is connected.
                </p>
              </div>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted-foreground">Uploaded</dt>
                <dd className="text-sm font-medium">{formatDate(document.uploadedAt)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Expiry</dt>
                <dd className="text-sm font-medium">{formatDate(document.expiryDate)}</dd>
              </div>
            </dl>

            {document.expiryDate ? (
              <StatusBadge status={expiryStatus(document.expiryDate, reminderDays)} />
            ) : null}

            <p className="flex items-start gap-2 text-xs text-muted-foreground">
              <Lock className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
              Only you and authorised union administrators can open this document.
            </p>
          </div>
        ) : null}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={() =>
              toast.info("Secure download", {
                description:
                  "Signed private download links are issued once the backend is connected.",
              })
            }
          >
            <Download className="size-4" aria-hidden="true" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

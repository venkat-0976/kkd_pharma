import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2, Upload } from "lucide-react";
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
  DocumentUploadDialog,
  type DocumentUploadPayload,
} from "@/components/common/DocumentUploadDialog";
import { PersonPhotoUpload } from "@/components/common/PersonPhotoUpload";
import { pharmacistSchema, type PharmacistValues } from "@/validation/memberForms";
import type { MemberDocument, Pharmacist } from "@/types/member";

interface PharmacistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pharmacist?: Pharmacist | null;
  onSubmit: (values: PharmacistValues) => Promise<void>;
  documents?: MemberDocument[];
  onUploadDocument?: (values: PharmacistValues, input: DocumentUploadPayload) => Promise<void>;
  onViewDocument?: (document: MemberDocument) => void;
}
const empty: PharmacistValues = {
  fullName: "",
  mobile: "",
  licenceNumber: "",
  licenceExpiry: "",
  address: "",
  photo: "",
};
export function PharmacistDialog({
  open,
  onOpenChange,
  pharmacist,
  onSubmit,
  documents = [],
  onUploadDocument,
  onViewDocument,
}: PharmacistDialogProps) {
  const { register, handleSubmit, reset, getValues, watch, formState } = useForm<PharmacistValues>({
    resolver: zodResolver(pharmacistSchema),
    defaultValues: empty,
  });
  const [uploadOpen, setUploadOpen] = useState(false);
  useEffect(() => {
    if (open)
      reset(
        pharmacist
          ? {
              id: pharmacist.id,
              fullName: pharmacist.fullName,
              mobile: pharmacist.mobile,
              licenceNumber: pharmacist.licenceNumber,
              licenceExpiry: pharmacist.licenceExpiry ?? "",
              address: pharmacist.address,
              photo: pharmacist.photo ?? "",
            }
          : empty,
      );
  }, [open, pharmacist, reset]);
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{pharmacist ? "Edit pharmacist" : "Add pharmacist"}</DialogTitle>
            <DialogDescription>
              Registered pharmacist records are private and used for compliance reminders only.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <PersonPhotoUpload
              name={watch("fullName")}
              value={watch("photo")}
              onChange={(photo) => reset({ ...getValues(), photo })}
            />
            <div>
              <Label htmlFor="ph-name">Pharmacist name</Label>
              <Input id="ph-name" className="mt-1.5" {...register("fullName")} />
              {formState.errors.fullName ? (
                <p className="mt-1 text-xs text-destructive">{formState.errors.fullName.message}</p>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="ph-mobile">Mobile number</Label>
                <Input
                  id="ph-mobile"
                  inputMode="numeric"
                  className="mt-1.5"
                  {...register("mobile")}
                />
                {formState.errors.mobile ? (
                  <p className="mt-1 text-xs text-destructive">{formState.errors.mobile.message}</p>
                ) : null}
              </div>
              <div>
                <Label htmlFor="ph-licence">Pharmacist licence number</Label>
                <Input id="ph-licence" className="mt-1.5" {...register("licenceNumber")} />
                {formState.errors.licenceNumber ? (
                  <p className="mt-1 text-xs text-destructive">
                    {formState.errors.licenceNumber.message}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <Label htmlFor="ph-expiry">Licence expiry date</Label>
              <Input id="ph-expiry" type="date" className="mt-1.5" {...register("licenceExpiry")} />
              {formState.errors.licenceExpiry ? (
                <p className="mt-1 text-xs text-destructive">
                  {formState.errors.licenceExpiry.message}
                </p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="ph-address">Address</Label>
              <Textarea id="ph-address" rows={3} className="mt-1.5" {...register("address")} />
              {formState.errors.address ? (
                <p className="mt-1 text-xs text-destructive">{formState.errors.address.message}</p>
              ) : null}
            </div>
            {onUploadDocument ? (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface/60 p-3">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold">Pharmacist documents</p>
                    <p className="text-xs text-muted-foreground">
                      Upload a licence or company file
                    </p>
                  </div>
                </div>
                {pharmacist?.documentId ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const document = documents.find((item) => item.id === pharmacist.documentId);
                      if (document) onViewDocument?.(document);
                    }}
                  >
                    <FileText className="size-4" aria-hidden="true" />
                    View document
                  </Button>
                ) : null}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setUploadOpen(true)}
                >
                  <Upload className="size-4" aria-hidden="true" />
                  Upload document
                </Button>
              </div>
            ) : null}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={formState.isSubmitting}>
                {formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
                {pharmacist ? "Save changes" : "Add pharmacist"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {onUploadDocument ? (
        <DocumentUploadDialog
          open={uploadOpen}
          onOpenChange={setUploadOpen}
          defaultCategory="Pharmacist Licence"
          pharmacist={pharmacist ?? { ...getValues(), id: getValues().id ?? "", memberId: "" }}
          onUpload={(input) => onUploadDocument(getValues(), input)}
        />
      ) : null}
    </>
  );
}

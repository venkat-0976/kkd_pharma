import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MemberPageHeader } from "@/layouts/AuthenticatedPortalLayout";
import { LicenceCard } from "@/components/common/LicenceCard";
import { DocumentUploadDialog } from "@/components/common/DocumentUploadDialog";
import { DocumentViewDialog } from "@/components/common/DocumentViewDialog";
import { useInvalidateMember, useMemberRecord } from "@/hooks/useMemberRecord";
import { memberService } from "@/services/member/member.service";
import { documentsForLicence, licenceCategoryByKind, licenceFieldConfig } from "@/config/licenceFields";
import type { DocumentCategory, LicenceKind, MemberDocument } from "@/types/member";

export const Route = createFileRoute("/member/licences")({
  head: () => ({
    meta: [
      { title: "Licences & Compliance — Kakinada Union Member Portal" },
      { name: "description", content: "Track drug, GST, food, labour and healthcare licences." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LicencesPage,
});

const kinds: LicenceKind[] = ["drug", "gst", "food", "labour", "healthcare"];

export function LicencesPage() {
  const { data: record, isLoading } = useMemberRecord();
  const invalidate = useInvalidateMember();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [replaceId, setReplaceId] = useState<string | undefined>(undefined);
  const [defaultCategory, setDefaultCategory] = useState<DocumentCategory>("Drug Licence");
  const [lockCategory, setLockCategory] = useState(false);
  const [viewing, setViewing] = useState<MemberDocument | null>(null);
  const [pendingDelete, setPendingDelete] = useState<MemberDocument | null>(null);

  if (isLoading || !record) return <Skeleton className="h-96 w-full" />;

  const openUpload = (kind?: LicenceKind) => {
    if (kind) {
      setDefaultCategory(licenceCategoryByKind[kind]);
      setLockCategory(true);
      setReplaceId(record.licences[kind]?.documentId);
    } else {
      setDefaultCategory("Other");
      setLockCategory(false);
      setReplaceId(undefined);
    }
    setUploadOpen(true);
  };

  return (
    <div className="space-y-8">
      <MemberPageHeader
        title="Licences & Compliance"
        description="Keep licence numbers and renewal dates current — reminders are generated from these dates."
        action={
          <Button onClick={() => openUpload()}>
            <Upload className="size-4" aria-hidden="true" />
            Upload
          </Button>
        }
      />

      <div className="grid items-stretch gap-4 md:grid-cols-2">
        {kinds.map((kind) => {
          const item = licenceFieldConfig[kind];
          const linked = documentsForLicence(record, kind);
          return (
            <LicenceCard
              key={kind}
              title={item.title}
              description={item.description}
              licence={record.licences[kind]}
              reminderDays={record.preferences.reminderDays}
              fields={item.fields}
              hasDocument={linked.length > 0}
              attachedDocuments={linked}
              onViewDocument={(doc) => setViewing(doc)}
              onDeleteDocument={(doc) => setPendingDelete(doc)}
              onReplace={() => openUpload(kind)}
              onSave={async (values) => {
                await memberService.saveLicence(kind, {
                  number: values.number,
                  ...(values.licenceType !== undefined ? { licenceType: values.licenceType } : {}),
                  ...(values.registrationInfo !== undefined
                    ? { registrationInfo: values.registrationInfo }
                    : {}),
                  ...(values.issueDate !== undefined ? { issueDate: values.issueDate } : {}),
                  ...(values.expiryDate !== undefined ? { expiryDate: values.expiryDate } : {}),
                });
                await invalidate();
                toast.success(`${item.title} updated`);
              }}
            />
          );
        })}
      </div>

      <DocumentUploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        defaultCategory={defaultCategory}
        lockCategory={lockCategory}
        licences={record.licences}
        pharmacist={record.pharmacists[0] ?? null}
        {...(replaceId ? { replaceId } : {})}
        onUpload={async (input) => {
          await memberService.uploadDocument({
            ...input,
            ...(input.category === "Pharmacist Licence" && input.pharmacistValues
              ? {
                  pharmacistValues: {
                    ...input.pharmacistValues,
                    ...(record.pharmacists[0]?.id ? { id: record.pharmacists[0].id } : {}),
                  },
                }
              : {}),
          });
          await invalidate();
          const savedAsOther = input.category === "Other";
          toast.success(
            input.replaceId
              ? "Document replaced"
              : savedAsOther
                ? "Document saved to Documents"
                : "Document saved to Licences & Compliance and Documents",
          );
        }}
      />

      <DocumentViewDialog
        document={viewing}
        reminderDays={record.preferences.reminderDays}
        onOpenChange={(open) => !open && setViewing(null)}
      />

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this document?</AlertDialogTitle>
            {pendingDelete ? (
              <p className="break-all text-sm font-semibold text-foreground">{pendingDelete.name}</p>
            ) : null}
            <AlertDialogDescription>
              This removes the file from Licences & Compliance and Documents. Licence numbers and
              dates stay as they are.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!pendingDelete) return;
                await memberService.deleteDocument(pendingDelete.id);
                await invalidate();
                setPendingDelete(null);
                toast.success("Document deleted");
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

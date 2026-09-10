import { useState } from "react";
import { Eye, Plus, Trash2, UserPen } from "lucide-react";
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
import { PharmacistDialog } from "@/components/common/PharmacistDialog";
import { DocumentViewDialog } from "@/components/common/DocumentViewDialog";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { useInvalidateMember, useMemberRecord } from "@/hooks/useMemberRecord";
import { memberService } from "@/services/member/member.service";
import { expiryPhrase, expiryStatus, formatDate } from "@/lib/expiry";
import { PersonAvatar } from "@/components/common/PersonAvatar";
import type { MemberDocument, Pharmacist } from "@/types/member";

export function CompetentPersonPage() {
  const { data: record, isLoading } = useMemberRecord();
  const invalidate = useInvalidateMember();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Pharmacist | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Pharmacist | null>(null);
  const [viewing, setViewing] = useState<MemberDocument | null>(null);

  if (isLoading || !record) return <Skeleton className="h-72 w-full" />;

  const reminderDays = record.preferences.reminderDays;

  return (
    <div className="space-y-6">
      <MemberPageHeader
        title="Competent Persons"
        description="Qualified competent persons registered for wholesale distribution and licence compliance."
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="size-4" aria-hidden="true" />
            Add competent person
          </Button>
        }
      />

      {record.pharmacists.length === 0 ? (
        <EmptyState
          title="No competent persons recorded"
          description="Add your registered competent person so licence expiry reminders can be sent to you."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {record.pharmacists.map((p) => {
            const status = expiryStatus(p.licenceExpiry, reminderDays);
            return (
              <article
                key={p.id}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
              >
                <div className="flex items-start justify-between gap-3 p-5">
                  <div className="flex min-w-0 items-start gap-3">
                    <PersonAvatar name={p.fullName} photo={p.photo} />
                    <div className="min-w-0">
                      <h2 className="truncate font-display text-base font-bold">{p.fullName}</h2>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Licence {p.licenceNumber}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={status} />
                </div>
                <dl className="grid gap-2 border-t border-border/80 px-5 py-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/80 bg-surface/50 px-3 py-2.5">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      Mobile
                    </dt>
                    <dd className="mt-1 text-sm font-semibold">{p.mobile}</dd>
                  </div>
                  <div className="rounded-xl border border-border/80 bg-surface/50 px-3 py-2.5">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      Licence expiry
                    </dt>
                    <dd className="mt-1 text-sm font-semibold">{formatDate(p.licenceExpiry)}</dd>
                  </div>
                  <div className="rounded-xl border border-border/80 bg-surface/50 px-3 py-2.5 sm:col-span-2">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm">{p.address}</dd>
                  </div>
                </dl>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/80 px-5 py-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    {expiryPhrase(p.licenceExpiry)}
                  </p>
                  <div className="flex gap-2">
                    {p.documentId ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const document = record.documents.find(
                            (item) => item.id === p.documentId,
                          );
                          if (document) setViewing(document);
                        }}
                        disabled={!record.documents.some((item) => item.id === p.documentId)}
                      >
                        <Eye className="size-4" aria-hidden="true" />
                        View document
                      </Button>
                    ) : null}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditing(p);
                        setDialogOpen(true);
                      }}
                    >
                      <UserPen className="size-4" aria-hidden="true" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setPendingDelete(p)}>
                      <Trash2 className="size-4 text-destructive" aria-hidden="true" />
                      Remove
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <PharmacistDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        pharmacist={editing}
        documents={record.documents}
        onViewDocument={setViewing}
        onUploadDocument={async (values, input) => {
          const saved = await memberService.savePharmacist({
            id: values.id ?? editing?.id ?? "",
            fullName: values.fullName,
            mobile: values.mobile,
            licenceNumber: values.licenceNumber,
            licenceExpiry: values.licenceExpiry,
            address: values.address,
            photo: values.photo ?? "",
            ...(editing?.documentId ? { documentId: editing.documentId } : {}),
          });
          const savedPharmacist = saved.find(
            (item) =>
              item.fullName === values.fullName && item.licenceNumber === values.licenceNumber,
          );
          await memberService.uploadDocument({
            ...input,
            ...(input.category === "Pharmacist Licence" && input.pharmacistValues
              ? {
                  pharmacistValues: {
                    ...input.pharmacistValues,
                    ...(savedPharmacist?.id ? { id: savedPharmacist.id } : {}),
                  },
                }
              : {}),
          });
          await invalidate();
          setDialogOpen(false);
          toast.success("Competent person document uploaded");
        }}
        onSubmit={async (values) => {
          await memberService.savePharmacist({
            id: values.id ?? "",
            fullName: values.fullName,
            mobile: values.mobile,
            licenceNumber: values.licenceNumber,
            licenceExpiry: values.licenceExpiry,
            address: values.address,
            photo: values.photo ?? "",
            ...(editing?.documentId ? { documentId: editing.documentId } : {}),
          });
          await invalidate();
          setDialogOpen(false);
          toast.success(values.id ? "Competent person updated" : "Competent person added");
        }}
      />

      <DocumentViewDialog
        document={viewing}
        reminderDays={record.preferences.reminderDays}
        onOpenChange={(open) => !open && setViewing(null)}
      />

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {pendingDelete?.fullName}?</AlertDialogTitle>
            <AlertDialogDescription>
              Their licence reminders will stop. You can add the competent person again at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!pendingDelete) return;
                await memberService.deletePharmacist(pendingDelete.id);
                await invalidate();
                setPendingDelete(null);
                toast.success("Competent person removed");
              }}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CompetentPersonPage;

import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Plus, Trash2, UserPen } from "lucide-react";
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
import { MemberPageHeader } from "@/features/member/MemberShell";
import { OwnerDialog } from "@/components/common/OwnerDialog";
import { EmptyState } from "@/components/common/EmptyState";
import { useInvalidateMember, useMemberRecord } from "@/hooks/useMemberRecord";
import { memberService } from "@/services/member/member.service";
import { PersonAvatar } from "@/components/common/PersonAvatar";
import { MemberViewToggle, type MemberTableColumn } from "@/components/common/MemberViewToggle";
import type { Owner } from "@/types/member";

export const Route = createFileRoute("/member/owners")({
  head: () => ({
    meta: [
      { title: "Owners & Partners — Kakinada Union Member Portal" },
      { name: "description", content: "Manage owners and partners of your pharmacy business." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OwnersPage,
});

function OwnersPage() {
  const { data: record, isLoading } = useMemberRecord();
  const invalidate = useInvalidateMember();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Owner | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Owner | null>(null);

  if (isLoading || !record) return <Skeleton className="h-72 w-full" />;

  const columns: MemberTableColumn<Owner>[] = [
    { key: "name", label: "Name", render: (owner) => <span className="font-semibold">{owner.fullName}</span> },
    { key: "role", label: "Ownership type", render: (owner) => owner.role },
    { key: "mobile", label: "Mobile number", render: (owner) => owner.mobile },
    { key: "email", label: "Email", render: (owner) => owner.email || "Not provided" },
    { key: "visibility", label: "Visibility", render: (owner) => owner.isPublic ? "Public name" : "Private" },
  ];

  return (
    <div className="space-y-6">
      <MemberPageHeader
        title="Owners & Partners"
        description="Proprietors, partners and directors linked to this membership."
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="size-4" aria-hidden="true" />
            Add owner
          </Button>
        }
      />

      {record.owners.length === 0 ? (
        <EmptyState
          title="No owners added yet"
          description="Add at least one proprietor or partner so the union office can verify your membership."
        />
      ) : (
        <MemberViewToggle rows={record.owners} columns={columns} cards={<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {record.owners.map((owner) => (
            <article key={owner.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <div className="flex items-start gap-3 p-5">
                <PersonAvatar name={owner.fullName} photo={owner.photo} />
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-display text-base font-bold">{owner.fullName}</h2>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-full border border-border bg-surface/80 px-2.5 py-0.5 text-[11px] font-semibold">
                      {owner.role}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                        owner.isPublic
                          ? "border-success/30 bg-success/10 text-success"
                          : "border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      {owner.isPublic ? "Public name" : "Private"}
                    </span>
                  </div>
                </div>
              </div>
              <dl className="grid gap-2 border-t border-border/80 px-5 py-4">
                <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-surface/50 px-3 py-2.5 text-sm">
                  <Phone className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="truncate font-semibold">{owner.mobile}</span>
                </div>
                {owner.email ? (
                  <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-surface/50 px-3 py-2.5 text-sm">
                    <Mail className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="truncate font-semibold">{owner.email}</span>
                  </div>
                ) : null}
              </dl>
              <div className="flex gap-2 border-t border-border/80 px-5 py-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditing(owner);
                    setDialogOpen(true);
                  }}
                >
                  <UserPen className="size-4" aria-hidden="true" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setPendingDelete(owner)}>
                  <Trash2 className="size-4 text-destructive" aria-hidden="true" />
                  Remove
                </Button>
              </div>
            </article>
          ))}
        </div>} />
      )}

      <OwnerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        owner={editing}
        onSubmit={async (values) => {
          await memberService.saveOwner({
            id: values.id ?? "",
            fullName: values.fullName,
            mobile: values.mobile,
            ...(values.email ? { email: values.email } : {}),
            role: values.role,
            isPublic: values.isPublic,
            photo: values.photo ?? "",
          });
          await invalidate();
          setDialogOpen(false);
          toast.success(values.id ? "Owner updated" : "Owner added");
        }}
      />

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {pendingDelete?.fullName}?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the owner from your membership record. You can add them again later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!pendingDelete) return;
                await memberService.deleteOwner(pendingDelete.id);
                await invalidate();
                setPendingDelete(null);
                toast.success("Owner removed");
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

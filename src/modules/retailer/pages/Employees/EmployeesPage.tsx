import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2, UserPen } from "lucide-react";
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
import { EmployeeDialog } from "../../../../components/common/EmployeeDialog";
import { EmptyState } from "@/components/common/EmptyState";
import { useInvalidateMember, useMemberRecord } from "@/hooks/useMemberRecord";
import { memberService } from "@/services/member/member.service";
import { PersonAvatar } from "@/components/common/PersonAvatar";
import type { Employee } from "@/types/member";

export const Route = createFileRoute("/member/employees")({
  head: () => ({
    meta: [
      { title: "Employees — Kakinada Union Member Portal" },
      { name: "description", content: "Keep a private list of staff working at your pharmacy." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeesPage,
});

export function EmployeesPage() {
  const { data: record, isLoading } = useMemberRecord();
  const invalidate = useInvalidateMember();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Employee | null>(null);

  if (isLoading || !record) return <Skeleton className="h-72 w-full" />;

  return (
    <div className="space-y-6">
      <MemberPageHeader
        title="Employees"
        description="Staff working at your shop. This information stays private and is not a licence record."
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="size-4" aria-hidden="true" />
            Add employee
          </Button>
        }
      />

      {record.employees.length === 0 ? (
        <EmptyState
          title="No employees recorded"
          description="Add counter staff and other employees so you have their contact details in one place."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {record.employees.map((employee) => (
            <article
              key={employee.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <PersonAvatar
                  name={employee.fullName}
                  photo={employee.photo}
                  className="size-12 rounded-2xl"
                />
                <h2 className="min-w-0 flex-1 truncate font-display text-sm font-bold">
                  {employee.fullName}
                </h2>
                <span className="shrink-0 rounded-full border border-border bg-surface/80 px-2.5 py-0.5 text-[11px] font-semibold">
                  Employee
                </span>
              </div>
              <dl className="grid gap-1.5 border-t border-border/80 px-4 py-2.5">
                <div className="rounded-lg border border-border/80 bg-surface/50 px-3 py-1.5">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Mobile
                  </dt>
                  <dd className="text-sm font-semibold">{employee.mobile}</dd>
                </div>
                <div className="rounded-lg border border-border/80 bg-surface/50 px-3 py-1.5">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Address
                  </dt>
                  <dd className="text-sm">{employee.address}</dd>
                </div>
              </dl>
              <div className="flex gap-2 border-t border-border/80 px-4 py-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditing(employee);
                    setDialogOpen(true);
                  }}
                >
                  <UserPen className="size-4" aria-hidden="true" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setPendingDelete(employee)}>
                  <Trash2 className="size-4 text-destructive" aria-hidden="true" />
                  Remove
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      <EmployeeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        employee={editing}
        onSubmit={async (values) => {
          await memberService.saveEmployee({
            id: values.id ?? "",
            fullName: values.fullName,
            mobile: values.mobile,
            address: values.address,
            photo: values.photo ?? "",
          });
          await invalidate();
          setDialogOpen(false);
          toast.success(values.id ? "Employee updated" : "Employee added");
        }}
      />

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {pendingDelete?.fullName}?</AlertDialogTitle>
            <AlertDialogDescription>
              You can add this employee again at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!pendingDelete) return;
                await memberService.deleteEmployee(pendingDelete.id);
                await invalidate();
                setPendingDelete(null);
                toast.success("Employee removed");
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

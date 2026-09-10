import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness, Loader2, Pencil, Store } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionCard, FieldList } from "@/components/common/SectionCard";
import { ShopAddressForm } from "@/components/common/ShopAddressForm";
import { useMemberRecord, useInvalidateMember } from "@/hooks/useMemberRecord";
import { memberService } from "@/services/member/member.service";
import { businessProfileSchema, type BusinessProfileValues } from "@/validation/memberForms";
import { cn } from "@/lib/utils";

const statusTone: Record<string, string> = {
  Active: "border-success/30 bg-success/10 text-success",
  Pending: "border-warning/40 bg-warning/15 text-warning-foreground",
  Inactive: "border-border bg-muted text-muted-foreground",
};

export function ProfilePage() {
  const { data: record, isLoading } = useMemberRecord();
  const invalidate = useInvalidateMember();
  const [editing, setEditing] = useState(false);

  const form = useForm<BusinessProfileValues>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      shopName: "",
      firmNumber: "",
      email: "",
      businessMobile: "",
      establishedYear: "",
      publicOwnerName: "",
    },
  });

  useEffect(() => {
    if (!record) return;
    form.reset({
      shopName: record.profile.shopName,
      firmNumber: record.profile.firmNumber,
      email: record.profile.email,
      businessMobile: record.profile.businessMobile,
      establishedYear: record.profile.establishedYear,
      publicOwnerName: record.profile.publicOwnerName,
    });
  }, [record, form]);

  if (isLoading || !record) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-56 w-full rounded-2xl" />
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    );
  }

  const { profile, address } = record;
  const initials = profile.shopName
    .split(/\s+/u)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  const onSubmit = async (values: BusinessProfileValues) => {
    await memberService.updateProfile(values);
    await invalidate();
    setEditing(false);
    toast.success("Profile updated");
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <div className="h-1.5 bg-linear-to-r from-primary via-primary/70 to-accent" />
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-lg font-bold tracking-wide text-primary-foreground shadow-soft">
              {initials || <Store className="size-6" aria-hidden="true" />}
            </span>
            <div className="min-w-0">
              <h1 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                {profile.shopName}
              </h1>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-border bg-surface/80 px-2.5 py-1 text-xs font-semibold text-foreground">
                  {profile.memberType}
                </span>
                <span className="rounded-full border border-border bg-surface/80 px-2.5 py-1 text-xs font-semibold text-foreground">
                  {profile.memberId}
                </span>
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs font-semibold",
                    statusTone[profile.status] ?? statusTone["Inactive"],
                  )}
                >
                  {profile.status}
                </span>
              </div>
            </div>
          </div>
          <Button variant={editing ? "outline" : "default"} onClick={() => setEditing((v) => !v)}>
            <Pencil className="size-4" aria-hidden="true" />
            {editing ? "Cancel" : "Edit"}
          </Button>
        </div>
      </section>

      <SectionCard
        icon={BriefcaseBusiness}
        title="Business details"
        description="Only the shop name, business type, approved owner name and general area appear publicly."
      >
        {editing ? (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 sm:grid-cols-2"
            noValidate
          >
            {(
              [
                ["shopName", "Shop / firm name"],
                ["firmNumber", "Firm / registration number"],
                ["email", "Business email"],
                ["businessMobile", "Business mobile"],
                ["establishedYear", "Established year"],
                ["publicOwnerName", "Public owner name"],
              ] as const
            ).map(([name, label]) => (
              <div key={name}>
                <Label
                  htmlFor={name}
                  className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                >
                  {label}
                </Label>
                <Input id={name} className="mt-2 h-11 rounded-lg" {...form.register(name)} />
                {form.formState.errors[name] ? (
                  <p className="mt-1 text-xs text-destructive">
                    {form.formState.errors[name]?.message}
                  </p>
                ) : null}
              </div>
            ))}
            <div className="sm:col-span-2">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
                Save changes
              </Button>
            </div>
          </form>
        ) : (
          <FieldList
            items={[
              { label: "Shop / firm name", value: profile.shopName },
              { label: "Business type", value: profile.memberType },
              { label: "Member ID", value: profile.memberId },
              { label: "Firm number", value: profile.firmNumber },
              { label: "Business email", value: profile.email },
              { label: "Business mobile", value: profile.businessMobile },
              { label: "Established", value: profile.establishedYear },
              { label: "Public owner name", value: profile.publicOwnerName },
              { label: "Membership status", value: profile.status },
            ]}
          />
        )}
      </SectionCard>

      <ShopAddressForm address={address} />
    </div>
  );
}

export default ProfilePage;

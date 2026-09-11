import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, Phone, Mail, MapPin, Award, Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { MemberPageHeader } from "@/components/layout/AuthenticatedPortalLayout";
import { SectionCard, FieldList } from "@/components/common/SectionCard";
import { useMemberRecord, useInvalidateMember } from "@/hooks/useMemberRecord";
import { memberService } from "@/services/member/member.service";
import { formatDate } from "@/lib/expiry";

interface PharmacistProfileValues {
  fullName: string;
  licenceNumber: string;
  licenceExpiry: string;
  mobile: string;
  address: string;
}

export function ProfilePage() {
  const { data: record, isLoading } = useMemberRecord();
  const invalidate = useInvalidateMember();
  const [editing, setEditing] = useState(false);

  const pharmacist = record?.pharmacists[0];

  const form = useForm<PharmacistProfileValues>({
    defaultValues: {
      fullName: "",
      licenceNumber: "",
      licenceExpiry: "",
      mobile: "",
      address: "",
    },
  });

  useEffect(() => {
    if (pharmacist) {
      form.reset({
        fullName: pharmacist.fullName || "",
        licenceNumber: pharmacist.licenceNumber || "",
        licenceExpiry: pharmacist.licenceExpiry || "",
        mobile: pharmacist.mobile || "",
        address: pharmacist.address || "",
      });
    }
  }, [pharmacist, form]);

  if (isLoading || !record) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-56 w-full rounded-2xl" />
      </div>
    );
  }

  const onSubmit = async (values: PharmacistProfileValues) => {
    await memberService.savePharmacist({
      id: pharmacist?.id || "ph-primary",
      fullName: values.fullName,
      licenceNumber: values.licenceNumber,
      licenceExpiry: values.licenceExpiry,
      mobile: values.mobile,
      address: values.address,
      photo: pharmacist?.photo || "",
    });
    await invalidate();
    setEditing(false);
    toast.success("Pharmacist profile updated");
  };

  return (
    <div className="space-y-6">
      <MemberPageHeader
        title="Pharmacist Profile"
        description="Your personal professional registration, contact information and licence details."
        action={
          <Button variant={editing ? "outline" : "default"} onClick={() => setEditing((v) => !v)}>
            <Pencil className="size-4" aria-hidden="true" />
            {editing ? "Cancel" : "Edit Profile"}
          </Button>
        }
      />

      <SectionCard
        icon={User}
        title="Personal & Professional Information"
        description="Verify your council registration credentials and valid contact details."
      >
        {editing ? (
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                className="mt-1.5"
                {...form.register("fullName", { required: true })}
              />
            </div>

            <div>
              <Label htmlFor="licenceNumber">Registration / Licence Number</Label>
              <Input
                id="licenceNumber"
                className="mt-1.5"
                {...form.register("licenceNumber", { required: true })}
              />
            </div>

            <div>
              <Label htmlFor="licenceExpiry">Licence Expiry Date</Label>
              <Input
                id="licenceExpiry"
                type="date"
                className="mt-1.5"
                {...form.register("licenceExpiry", { required: true })}
              />
            </div>

            <div>
              <Label htmlFor="mobile">Contact Mobile Number</Label>
              <Input
                id="mobile"
                className="mt-1.5"
                {...form.register("mobile", { required: true })}
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="address">Residential / Postal Address</Label>
              <Input id="address" className="mt-1.5" {...form.register("address")} />
            </div>

            <div className="sm:col-span-2">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
                Save Profile
              </Button>
            </div>
          </form>
        ) : (
          <FieldList
            items={[
              { label: "Full Name", value: pharmacist?.fullName || record.profile.shopName },
              { label: "Licence Number", value: pharmacist?.licenceNumber || "Not provided" },
              {
                label: "Licence Expiry",
                value: pharmacist?.licenceExpiry ? formatDate(pharmacist.licenceExpiry) : "Not set",
              },
              {
                label: "Mobile",
                value: pharmacist?.mobile || record.profile.businessMobile || "Not provided",
              },
              { label: "Address", value: pharmacist?.address || "Not provided" },
              { label: "Council Status", value: "Registered & Verified" },
            ]}
          />
        )}
      </SectionCard>
    </div>
  );
}

export default ProfilePage;

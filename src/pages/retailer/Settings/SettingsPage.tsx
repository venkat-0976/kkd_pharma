import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { MemberPageHeader } from "@/components/layout/AuthenticatedPortalLayout";
import { SectionCard } from "@/components/common/SectionCard";
import { useMemberRecord } from "@/hooks/useMemberRecord";
import { memberService } from "@/services/member/member.service";
import { authService } from "@/services/auth/auth.service";
import {
  changePasswordSchema,
  passwordStrength,
  type ChangePasswordValues,
} from "@/utils/validation/memberForms";

export function SettingsPage() {
  const { data: record, isLoading } = useMemberRecord();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  if (isLoading || !record) return <Skeleton className="h-96 w-full" />;

  const strength = passwordStrength(form.watch("newPassword") ?? "");

  const signOut = async () => {
    await authService.logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="space-y-6">
      <MemberPageHeader
        title="Settings"
        description="Manage your password and session for this device."
      />

      <SectionCard
        icon={KeyRound}
        title="Change password"
        description="Use a long, unique password you don't reuse elsewhere."
      >
        <form
          className="grid gap-4 sm:grid-cols-2"
          noValidate
          onSubmit={form.handleSubmit(async (values) => {
            await memberService.changePassword({
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            });
            form.reset();
            toast.success("Password updated", {
              description: "Sign in with your new password next time.",
            });
          })}
        >
          <div className="sm:col-span-2">
            <Label htmlFor="currentPassword">Current password</Label>
            <Input
              id="currentPassword"
              type="password"
              autoComplete="current-password"
              className="mt-1.5"
              {...form.register("currentPassword")}
            />
            {form.formState.errors.currentPassword ? (
              <p className="mt-1 text-xs text-destructive">
                {form.formState.errors.currentPassword.message}
              </p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="newPassword">New password</Label>
            <div className="relative mt-1.5">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className="pr-11"
                {...form.register("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {form.formState.errors.newPassword ? (
              <p className="mt-1 text-xs text-destructive">
                {form.formState.errors.newPassword.message}
              </p>
            ) : null}
            <div className="mt-2 flex items-center gap-3">
              <Progress value={strength.percent} className="h-1.5" />
              <span className="shrink-0 text-xs font-medium text-muted-foreground">
                {strength.label}
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm new password</Label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="mt-1.5"
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword ? (
              <p className="mt-1 text-xs text-destructive">
                {form.formState.errors.confirmPassword.message}
              </p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
              Update password
            </Button>
          </div>
        </form>
      </SectionCard>

      <SectionCard icon={LogOut} title="Session" description="Sign out of this device.">
        <Button variant="outline" onClick={signOut}>
          <LogOut className="size-4" aria-hidden="true" />
          Logout
        </Button>
      </SectionCard>
    </div>
  );
}

export default SettingsPage;

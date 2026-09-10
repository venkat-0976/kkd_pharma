import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { MemberPageHeader } from "@/layouts/AuthenticatedPortalLayout";
import { SectionCard } from "@/components/common/SectionCard";
import { useMemberRecord } from "@/hooks/useMemberRecord";
import { memberService } from "@/services/member/member.service";
import { authService } from "@/services/auth/auth.service";
import {
  changePasswordSchema,
  passwordStrength,
  type ChangePasswordValues,
} from "@/validation/memberForms";
// import { cn } from "@/lib/utils";

export const Route = createFileRoute("/member/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Kakinada Union Member Portal" },
      { name: "description", content: "Password, reminder and notification settings." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SettingsPage,
});

// const reminderOptions = [60, 30, 15, 7, 1];

export function SettingsPage() {
  const { data: record, isLoading } = useMemberRecord();
  // const invalidate = useInvalidateMember();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // const [reminderDays, setReminderDays] = useState<number[]>([]);
  // const [emailAlerts, setEmailAlerts] = useState(true);
  // const [smsAlerts, setSmsAlerts] = useState(true);
  // const [savingPrefs, setSavingPrefs] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   if (!record) return;
  //   setReminderDays(record.preferences.reminderDays);
  //   setEmailAlerts(record.preferences.emailAlerts);
  //   setSmsAlerts(record.preferences.smsAlerts);
  // }, [record]);

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  if (isLoading || !record) return <Skeleton className="h-96 w-full" />;

  const strength = passwordStrength(form.watch("newPassword") ?? "");

  // const savePreferences = async () => {
  //   setSavingPrefs(true);
  //   try {
  //     await memberService.savePreferences({
  //       reminderDays: reminderDays.length ? reminderDays : [15],
  //       emailAlerts,
  //       smsAlerts,
  //     });
  //     await invalidate();
  //     toast.success("Notification preferences saved");
  //   } finally {
  //     setSavingPrefs(false);
  //   }
  // };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await authService.logout();
    await navigate({ to: "/login", replace: true });
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

      {/* Renewal reminders — hidden for now
      <SectionCard
        title="Renewal reminders"
        description="Choose how many days before an expiry you want to be reminded."
      >
        <div className="flex flex-wrap gap-2">
          {reminderOptions.map((day) => {
            const active = reminderDays.includes(day);
            return (
              <button
                key={day}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  setReminderDays((prev) =>
                    prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort((a, b) => b - a),
                  )
                }
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40",
                )}
              >
                {day} days
              </button>
            );
          })}
        </div>

        <div className="mt-5 space-y-3">
          {[
            {
              label: "Email alerts",
              hint: `Sent to ${record.profile.email}`,
              value: emailAlerts,
              set: setEmailAlerts,
            },
            {
              label: "SMS alerts",
              hint: `Sent to ${record.profile.businessMobile}`,
              value: smsAlerts,
              set: setSmsAlerts,
            },
          ].map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border bg-surface/60 p-3.5"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold">{row.label}</p>
                <p className="truncate text-xs text-muted-foreground">{row.hint}</p>
              </div>
              <Switch checked={row.value} onCheckedChange={row.set} aria-label={row.label} />
            </div>
          ))}
        </div>

        <Button className="mt-5" onClick={savePreferences} disabled={savingPrefs}>
          {savingPrefs ? <Loader2 className="size-4 animate-spin" /> : null}
          Save preferences
        </Button>
      </SectionCard>
      */}

      <SectionCard icon={LogOut} title="Session" description="Sign out of this device.">
        <Button variant="outline" onClick={signOut}>
          <LogOut className="size-4" aria-hidden="true" />
          Logout
        </Button>
      </SectionCard>
    </div>
  );
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/auth/auth.service";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/validation/publicForms";

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { identifier: "" },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    await authService.requestPasswordReset(values.identifier);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6 text-center">
        <CheckCircle2 className="mx-auto size-8 text-success" aria-hidden="true" />
        <h2 className="mt-3 text-base font-semibold">Reset request received</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          If the details match a registered member, the union office will send reset instructions to the
          registered mobile number. For security, we never confirm whether an account exists.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <Label htmlFor="reset-identifier">Registered mobile number or Member ID</Label>
        <Input
          id="reset-identifier"
          className="mt-1.5"
          placeholder="9876543210 or KU-00123"
          aria-invalid={!!errors.identifier}
          {...register("identifier")}
        />
        {errors.identifier ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.identifier.message}</p>
        ) : null}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        Send reset instructions
      </Button>
    </form>
  );
}

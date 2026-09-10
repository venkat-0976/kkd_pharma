import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  FlaskConical,
  HeartPulse,
  Hospital,
  Loader2,
  ShieldCheck,
  Store,
  Warehouse,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { authService, type LoginType } from "@/services/auth/auth.service";
import { DemoCredentials } from "@/features/auth/forms/DemoCredentials";
import { loginSchema, type LoginValues } from "@/validation/publicForms";

const loginTypes: { value: LoginType; label: string; icon: typeof Store; hint: string }[] = [
  { value: "Admin", label: "Union admin", icon: ShieldCheck, hint: "Manage the association" },
  { value: "Retailer", label: "Retailer", icon: Store, hint: "Retail pharmacy account" },
  { value: "Wholesaler", label: "Wholesaler", icon: Warehouse, hint: "Distribution account" },
  { value: "Hospital", label: "Hospital", icon: Hospital, hint: "Hospital account" },
  { value: "Doctor", label: "Doctor", icon: HeartPulse, hint: "Doctor profile" },
  { value: "Lab", label: "Laboratory", icon: FlaskConical, hint: "Diagnostic lab" },
  { value: "Blood bank", label: "Blood bank", icon: HeartPulse, hint: "Blood bank account" },
];

export function LoginForm() {
  const [loginType, setLoginType] = useState<LoginType>("Retailer");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      const session = await authService.login({ ...values, loginType });
      toast.success(`Welcome back, ${session.shopName}`);
      const isAdmin = session.role === "ADMIN" || session.role === "SUPER_ADMIN";
      await navigate({ to: isAdmin ? "/admin" : "/member" });
    } catch (error) {
      toast.error("Sign in failed", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    }
  };

  const useDemo = (identifier: string, password: string) => {
    setValue("identifier", identifier, { shouldValidate: true });
    setValue("password", password, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <fieldset>
        <legend className="text-sm font-medium">Sign in as</legend>
        <p className="mt-1 text-xs text-muted-foreground">
          Your union is assigned automatically from your authenticated account.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {loginTypes.map((type) => {
            const Icon = type.icon;
            const active = loginType === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setLoginType(type.value)}
                aria-pressed={active}
                className={cn(
                  "rounded-xl border p-3 text-left transition-all",
                  active
                    ? "border-primary bg-secondary shadow-soft"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <span className="mt-2 block text-sm font-semibold">{type.label}</span>
                <span className="block text-xs text-muted-foreground">{type.hint}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <Label htmlFor="identifier">Mobile Number / Member ID</Label>
        <Input
          id="identifier"
          autoComplete="username"
          inputMode="text"
          placeholder="9876543210 or KU-00123"
          className="mt-1.5"
          aria-invalid={!!errors.identifier}
          {...register("identifier")}
        />
        {errors.identifier ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.identifier.message}</p>
        ) : null}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="relative mt-1.5">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            className="pr-11"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.password ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.password.message}</p>
        ) : null}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        Login
      </Button>

      <DemoCredentials onUse={useDemo} />
    </form>
  );
}

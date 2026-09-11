import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  membershipApplicationSchema,
  type MembershipApplicationValues,
} from "@/utils/validation/publicForms";

export function MembershipApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MembershipApplicationValues>({
    resolver: zodResolver(membershipApplicationSchema),
    defaultValues: {
      shopName: "",
      businessType: "Retailer",
      ownerName: "",
      mobile: "",
      email: "",
      area: "",
      city: "Kakinada",
      message: "",
    },
  });

  const businessType = watch("businessType");

  if (submitted) {
    return (
      <div className="card-elevated p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-success" aria-hidden="true" />
        <h3 className="mt-4 text-lg font-semibold">Membership enquiry received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          The union office will verify your firm details and contact you. Licence documents are
          collected later inside the secure member portal — never through this public form.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(async () => setSubmitted(true))}
      className="card-elevated space-y-5 p-6"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="join-shop">Shop / firm name</Label>
          <Input
            id="join-shop"
            className="mt-1.5"
            aria-invalid={!!errors.shopName}
            {...register("shopName")}
          />
          {errors.shopName ? (
            <p className="mt-1.5 text-xs text-destructive">{errors.shopName.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="join-type">Member type</Label>
          <Select
            value={businessType}
            onValueChange={(v) =>
              setValue("businessType", v as MembershipApplicationValues["businessType"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger id="join-type" className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Retailer">Retailer</SelectItem>
              <SelectItem value="Wholesaler">Wholesaler</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="join-owner">Owner / proprietor name</Label>
          <Input
            id="join-owner"
            className="mt-1.5"
            aria-invalid={!!errors.ownerName}
            {...register("ownerName")}
          />
          {errors.ownerName ? (
            <p className="mt-1.5 text-xs text-destructive">{errors.ownerName.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="join-mobile">Mobile number</Label>
          <Input
            id="join-mobile"
            inputMode="numeric"
            className="mt-1.5"
            aria-invalid={!!errors.mobile}
            {...register("mobile")}
          />
          {errors.mobile ? (
            <p className="mt-1.5 text-xs text-destructive">{errors.mobile.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <Label htmlFor="join-email">Email</Label>
          <Input
            id="join-email"
            type="email"
            className="mt-1.5"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email ? (
            <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="join-area">Area</Label>
          <Input
            id="join-area"
            className="mt-1.5"
            aria-invalid={!!errors.area}
            {...register("area")}
          />
          {errors.area ? (
            <p className="mt-1.5 text-xs text-destructive">{errors.area.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="join-city">City</Label>
          <Input
            id="join-city"
            className="mt-1.5"
            aria-invalid={!!errors.city}
            {...register("city")}
          />
          {errors.city ? (
            <p className="mt-1.5 text-xs text-destructive">{errors.city.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <Label htmlFor="join-message">Anything else? (optional)</Label>
        <Textarea id="join-message" rows={4} className="mt-1.5" {...register("message")} />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        Submit membership enquiry
      </Button>
    </form>
  );
}

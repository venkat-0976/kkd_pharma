import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ownerSchema, type OwnerValues } from "@/validation/memberForms";
import type { Owner } from "@/types/member";

interface OwnerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  owner?: Owner | null;
  onSubmit: (values: OwnerValues) => Promise<void>;
}

const roles = ["Proprietor", "Partner", "Director", "Managing Partner"] as const;

export function OwnerDialog({ open, onOpenChange, owner, onSubmit }: OwnerDialogProps) {
  const form = useForm<OwnerValues>({
    resolver: zodResolver(ownerSchema),
    defaultValues: { fullName: "", mobile: "", email: "", role: "Partner", isPublic: false },
  });

  useEffect(() => {
    if (!open) return;
    form.reset(
      owner
        ? {
            id: owner.id,
            fullName: owner.fullName,
            mobile: owner.mobile,
            email: owner.email ?? "",
            role: owner.role,
            isPublic: owner.isPublic,
          }
        : { fullName: "", mobile: "", email: "", role: "Partner", isPublic: false },
    );
  }, [open, owner, form]);

  const { register, handleSubmit, formState, setValue, watch } = form;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{owner ? "Edit owner / partner" : "Add owner / partner"}</DialogTitle>
          <DialogDescription>
            Owner contact details stay private unless you explicitly mark them public.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(async (values) => {
            await onSubmit(values);
          })}
          noValidate
        >
          <div>
            <Label htmlFor="owner-name">Full name</Label>
            <Input id="owner-name" className="mt-1.5" {...register("fullName")} />
            {formState.errors.fullName ? (
              <p className="mt-1 text-xs text-destructive">{formState.errors.fullName.message}</p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="owner-mobile">Mobile number</Label>
              <Input
                id="owner-mobile"
                inputMode="numeric"
                className="mt-1.5"
                {...register("mobile")}
              />
              {formState.errors.mobile ? (
                <p className="mt-1 text-xs text-destructive">{formState.errors.mobile.message}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="owner-role">Ownership type</Label>
              <Select
                value={watch("role")}
                onValueChange={(v) => setValue("role", v as OwnerValues["role"])}
              >
                <SelectTrigger id="owner-role" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="owner-email">Email (optional)</Label>
            <Input id="owner-email" type="email" className="mt-1.5" {...register("email")} />
            {formState.errors.email ? (
              <p className="mt-1 text-xs text-destructive">{formState.errors.email.message}</p>
            ) : null}
          </div>

          <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-surface/60 p-3.5">
            <div className="min-w-0">
              <p className="text-sm font-semibold">Show name on public directory</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Only the name is published. Mobile numbers and emails are never public.
              </p>
            </div>
            <Switch
              checked={watch("isPublic")}
              onCheckedChange={(v) => setValue("isPublic", v)}
              aria-label="Publish owner name"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
              {owner ? "Save changes" : "Add owner"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

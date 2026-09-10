import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PersonPhotoUpload } from "@/components/common/PersonPhotoUpload";
import { employeeSchema, type EmployeeValues } from "@/validation/memberForms";
import type { Employee } from "@/types/member";

interface EmployeeDialogProps { open: boolean; onOpenChange: (open: boolean) => void; employee?: Employee | null; onSubmit: (values: EmployeeValues) => Promise<void>; }
const empty: EmployeeValues = { fullName: "", mobile: "", address: "", photo: "" };
export function EmployeeDialog({ open, onOpenChange, employee, onSubmit }: EmployeeDialogProps) {
  const { register, handleSubmit, reset, setValue, watch, formState } = useForm<EmployeeValues>({ resolver: zodResolver(employeeSchema), defaultValues: empty });
  useEffect(() => { if (open) reset(employee ? { id: employee.id, fullName: employee.fullName, mobile: employee.mobile, address: employee.address, photo: employee.photo ?? "" } : empty); }, [open, employee, reset]);
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg"><DialogHeader><DialogTitle>{employee ? "Edit employee" : "Add employee"}</DialogTitle><DialogDescription>Staff records stay private and are used for your shop records only.</DialogDescription></DialogHeader><form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
    <PersonPhotoUpload name={watch("fullName")} value={watch("photo")} onChange={(photo) => setValue("photo", photo, { shouldDirty: true })} />
    <div><Label htmlFor="emp-name">Employee name</Label><Input id="emp-name" className="mt-1.5" {...register("fullName")} />{formState.errors.fullName ? <p className="mt-1 text-xs text-destructive">{formState.errors.fullName.message}</p> : null}</div>
    <div><Label htmlFor="emp-mobile">Mobile number</Label><Input id="emp-mobile" inputMode="numeric" className="mt-1.5" {...register("mobile")} />{formState.errors.mobile ? <p className="mt-1 text-xs text-destructive">{formState.errors.mobile.message}</p> : null}</div>
    <div><Label htmlFor="emp-address">Address</Label><Textarea id="emp-address" rows={3} className="mt-1.5" {...register("address")} />{formState.errors.address ? <p className="mt-1 text-xs text-destructive">{formState.errors.address.message}</p> : null}</div>
    <DialogFooter><Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button type="submit" disabled={formState.isSubmitting}>{formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}{employee ? "Save changes" : "Add employee"}</Button></DialogFooter>
  </form></DialogContent></Dialog>;
}

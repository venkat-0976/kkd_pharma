import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormValues } from "@/validation/publicForms";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", mobile: "", subject: "", message: "" },
  });

  const onSubmit = async () => {
    // Phase 2/3: submit through a server function with server-side validation.
    toast.success("Message ready to send", {
      description: "Enquiry delivery is connected when the backend is enabled.",
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">Full name</Label>
          <Input
            id="contact-name"
            className="mt-1.5"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name ? (
            <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="contact-mobile">Mobile number</Label>
          <Input
            id="contact-mobile"
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

      <div>
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
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
        <Label htmlFor="contact-subject">Subject</Label>
        <Input
          id="contact-subject"
          className="mt-1.5"
          aria-invalid={!!errors.subject}
          {...register("subject")}
        />
        {errors.subject ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.subject.message}</p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          rows={5}
          className="mt-1.5"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.message.message}</p>
        ) : null}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        Send message
      </Button>
    </form>
  );
}

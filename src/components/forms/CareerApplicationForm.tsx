import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, FileUp, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { listJobs } from "@/services/career/jobs.service";
import {
  careerApplicationSchema,
  validateUpload,
  type CareerApplicationValues,
} from "@/validation/publicForms";

interface CareerApplicationFormProps {
  defaultPosition?: string;
}

export function CareerApplicationForm({ defaultPosition = "" }: CareerApplicationFormProps) {
  const positions = listJobs();
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CareerApplicationValues>({
    resolver: zodResolver(careerApplicationSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      position: defaultPosition,
      experience: "",
      qualification: "",
      coverMessage: "",
    },
  });

  const position = watch("position");

  const onFile = (file: File | null) => {
    if (!file) {
      setResume(null);
      setResumeError(null);
      return;
    }
    const error = validateUpload(file);
    setResumeError(error);
    setResume(error ? null : file);
  };

  const onSubmit = async () => {
    if (!resume) {
      setResumeError("Please attach your resume (PDF, JPG or PNG, max 5 MB)");
      return;
    }
    // Phase 2/3: uploaded to PRIVATE storage through an authorised server call.
    // Resumes are never written into the public/ folder.
    setSubmitted(true);
    reset();
    setResume(null);
  };

  if (submitted) {
    return (
      <div className="card-elevated p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-success" aria-hidden="true" />
        <h3 className="mt-4 text-lg font-semibold">Application received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Thank you for applying to Kakinada Union. Our team reviews applications weekly and will contact
          shortlisted candidates on the mobile number provided. Your resume is stored privately.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setSubmitted(false)}>
          Submit another application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-elevated space-y-5 p-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="apply-name">Full name</Label>
          <Input
            id="apply-name"
            className="mt-1.5"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p className="mt-1.5 text-xs text-destructive">{errors.fullName.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="apply-mobile">Mobile number</Label>
          <Input
            id="apply-mobile"
            inputMode="numeric"
            className="mt-1.5"
            aria-invalid={!!errors.mobile}
            {...register("mobile")}
          />
          {errors.mobile ? <p className="mt-1.5 text-xs text-destructive">{errors.mobile.message}</p> : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="apply-email">Email</Label>
          <Input
            id="apply-email"
            type="email"
            className="mt-1.5"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email ? <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p> : null}
        </div>
        <div>
          <Label htmlFor="apply-position">Position applied for</Label>
          <Select value={position} onValueChange={(v) => setValue("position", v, { shouldValidate: true })}>
            <SelectTrigger id="apply-position" className="mt-1.5 w-full">
              <SelectValue placeholder="Select a position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((job) => (
                <SelectItem key={job.slug} value={job.title}>
                  {job.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.position ? (
            <p className="mt-1.5 text-xs text-destructive">{errors.position.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="apply-experience">Experience</Label>
          <Input
            id="apply-experience"
            placeholder="e.g. 3 years"
            className="mt-1.5"
            aria-invalid={!!errors.experience}
            {...register("experience")}
          />
          {errors.experience ? (
            <p className="mt-1.5 text-xs text-destructive">{errors.experience.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="apply-qualification">Qualification</Label>
          <Input
            id="apply-qualification"
            placeholder="e.g. D.Pharm"
            className="mt-1.5"
            aria-invalid={!!errors.qualification}
            {...register("qualification")}
          />
          {errors.qualification ? (
            <p className="mt-1.5 text-xs text-destructive">{errors.qualification.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <Label htmlFor="apply-resume">Resume (PDF, JPG or PNG · max 5 MB)</Label>
        <input
          ref={fileInput}
          id="apply-resume"
          type="file"
          accept="application/pdf,image/jpeg,image/png"
          className="sr-only"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
        <div className="mt-1.5">
          {resume ? (
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm">
              <span className="truncate">
                {resume.name}{" "}
                <span className="text-muted-foreground">({Math.round(resume.size / 1024)} KB)</span>
              </span>
              <Button type="button" variant="ghost" size="icon" onClick={() => onFile(null)}>
                <X className="size-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start"
              onClick={() => fileInput.current?.click()}
            >
              <FileUp className="size-4" aria-hidden="true" />
              Upload resume
            </Button>
          )}
        </div>
        {resumeError ? <p className="mt-1.5 text-xs text-destructive">{resumeError}</p> : null}
        <p className="mt-1.5 text-xs text-muted-foreground">
          Resumes are stored privately and are never publicly accessible.
        </p>
      </div>

      <div>
        <Label htmlFor="apply-message">Cover message (optional)</Label>
        <Textarea id="apply-message" rows={4} className="mt-1.5" {...register("coverMessage")} />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        Submit application
      </Button>
    </form>
  );
}

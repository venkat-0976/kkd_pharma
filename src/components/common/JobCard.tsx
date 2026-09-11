import { Briefcase, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { JobPosting } from "@/types/directory";

export function JobCard({ job, onApply }: { job: JobPosting; onApply: (job: JobPosting) => void }) {
  return (
    <article className="card-elevated card-elevated-hover flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">{job.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{job.department}</p>
        </div>
        <Badge variant="secondary">{job.employmentType}</Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3.5 text-primary" aria-hidden="true" /> {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase className="size-3.5 text-primary" aria-hidden="true" /> {job.experience}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5 text-primary" aria-hidden="true" /> Posted {job.postedOn}
        </span>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{job.description}</p>

      <ul className="mt-4 flex-1 space-y-1.5 text-sm text-muted-foreground">
        {job.requirements.map((r) => (
          <li key={r} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            {r}
          </li>
        ))}
      </ul>

      <Button className="mt-6 w-full" onClick={() => onApply(job)}>
        Apply Now
      </Button>
    </article>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { initialsFromName } from "@/lib/initials";

export function PersonAvatar({
  name,
  photo,
  className = "size-14 rounded-2xl",
}: {
  name: string;
  photo?: string | undefined;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="shrink-0 rounded-[inherit] text-left outline-none ring-offset-background transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={`View ${name} profile photo`}
        >
          <Avatar className={className}>
            <AvatarImage src={photo} alt={`${name} profile`} />
            <AvatarFallback className="rounded-[inherit] bg-primary text-sm font-bold text-primary-foreground">
              {initialsFromName(name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm p-5 sm:p-6">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>Profile photo</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center rounded-2xl border border-border bg-surface/50 p-5">
          <Avatar className="size-56 rounded-3xl border-4 border-background shadow-soft sm:size-64">
            <AvatarImage src={photo} alt={`${name} profile`} />
            <AvatarFallback className="rounded-3xl bg-primary text-5xl font-bold text-primary-foreground">
              {initialsFromName(name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </DialogContent>
    </Dialog>
  );
}

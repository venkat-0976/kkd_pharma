import { useRef } from "react";
import { Camera, ImagePlus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { initialsFromName } from "@/lib/initials";

interface PersonPhotoUploadProps {
  name: string;
  value?: string;
  onChange: (value: string) => void;
}

export function PersonPhotoUpload({ name, value, onChange }: PersonPhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Choose an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Photo must be smaller than 10 MB");
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => toast.error("Could not read this photo. Try another image.");
    reader.onabort = () => toast.error("Photo upload was cancelled");
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        toast.error("Could not process this photo. Try another image.");
        return;
      }

      const image = new Image();
      image.onerror = () => toast.error("This image format is not supported. Try JPG or PNG.");
      image.onload = () => {
        const maxDimension = 720;
        const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext("2d");
        if (!context) {
          toast.error("Could not process this photo. Try another image.");
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL("image/jpeg", 0.82);
        if (!compressed || compressed === "data:,") {
          toast.error("Could not save this photo. Try another image.");
          return;
        }
        onChange(compressed);
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-dashed border-primary/30 bg-primary/[0.04] p-3">
      <Avatar className="size-14 rounded-2xl border-2 border-background shadow-sm">
        <AvatarImage src={value} alt={`${name || "Person"} profile`} />
        <AvatarFallback className="rounded-2xl bg-primary text-sm font-bold text-primary-foreground">
          {initialsFromName(name || "Person")}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">Profile photo</p>
        <p className="text-xs text-muted-foreground">JPG, PNG or WEBP up to 10 MB</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          handleFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => inputRef.current?.click()}
        aria-label="Add profile photo"
      >
        {value ? (
          <Camera className="size-4" aria-hidden="true" />
        ) : (
          <ImagePlus className="size-4" aria-hidden="true" />
        )}
      </Button>
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onChange("")}
          aria-label="Remove profile photo"
        >
          <Trash2 className="size-4 text-destructive" aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  );
}

import { useState } from "react";
import { Building2, Calendar, History, Plus, Trash2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MemberPageHeader } from "@/layouts/AuthenticatedPortalLayout";
import { SectionCard } from "@/components/common/SectionCard";
import { EmptyState } from "@/components/common/EmptyState";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EmploymentRecord {
  id: string;
  firmName: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
}

const initialHistory: EmploymentRecord[] = [
  {
    id: "emp-1",
    firmName: "Sri Sai Medicals",
    role: "Registered Pharmacist",
    startDate: "2021-04-01",
    endDate: "Present",
    location: "Main Road, Kakinada",
  },
  {
    id: "emp-2",
    firmName: "Apollo Pharmacy",
    role: "Assistant Pharmacist",
    startDate: "2019-06-15",
    endDate: "2021-03-31",
    location: "Bhanugudi Junction, Kakinada",
  },
];

export function EmploymentHistoryPage() {
  const [history, setHistory] = useState<EmploymentRecord[]>(initialHistory);
  const [open, setOpen] = useState(false);
  const [firmName, setFirmName] = useState("");
  const [role, setRole] = useState("Registered Pharmacist");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("Present");
  const [location, setLocation] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firmName) {
      toast.error("Firm name is required");
      return;
    }
    const newRecord: EmploymentRecord = {
      id: `emp-${Date.now()}`,
      firmName,
      role,
      startDate: startDate || "2023-01-01",
      endDate: endDate || "Present",
      location: location || "Kakinada",
    };
    setHistory([newRecord, ...history]);
    setOpen(false);
    setFirmName("");
    setLocation("");
    toast.success("Employment record added");
  };

  const handleDelete = (id: string) => {
    setHistory(history.filter((h) => h.id !== id));
    toast.success("Employment record removed");
  };

  return (
    <div className="space-y-6">
      <MemberPageHeader
        title="Employment History"
        description="Chronological record of pharmaceutical establishments, pharmacies and clinics you have served."
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="size-4" aria-hidden="true" />
            Add Experience
          </Button>
        }
      />

      {history.length === 0 ? (
        <EmptyState
          title="No employment history recorded"
          description="Add previous and current pharmacy employment records to build your professional profile."
        />
      ) : (
        <div className="space-y-4">
          {history.map((record) => (
            <article
              key={record.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Building2 className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    {record.firmName}
                  </h3>
                  <p className="text-sm font-medium text-primary">{record.role}</p>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {record.startDate} — {record.endDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {record.location}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(record.id)}
                className="self-end sm:self-center"
              >
                <Trash2 className="size-4 text-destructive" />
                Remove
              </Button>
            </article>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Employment History</DialogTitle>
            <DialogDescription>
              Enter details for the pharmacy or healthcare firm you worked with.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <Label htmlFor="firmName">Pharmacy / Hospital / Firm Name</Label>
              <Input
                id="firmName"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                placeholder="e.g. Apollo Pharmacy, Kakinada"
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="role">Role / Designation</Label>
              <Input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Registered Pharmacist"
                required
                className="mt-1.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date (or 'Present')</Label>
                <Input
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="Present or YYYY-MM-DD"
                  className="mt-1.5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location / Area</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Main Road, Kakinada"
                className="mt-1.5"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Record</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EmploymentHistoryPage;

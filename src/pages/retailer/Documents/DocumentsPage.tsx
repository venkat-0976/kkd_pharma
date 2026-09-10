import { useMemo, useState } from "react";
import { Download, Eye, FileText, Lock, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MemberPageHeader } from "@/layouts/AuthenticatedPortalLayout";
import { DocumentViewDialog } from "@/components/common/DocumentViewDialog";
import { EmptyState } from "@/components/common/EmptyState";
import { useInvalidateMember, useMemberRecord } from "@/hooks/useMemberRecord";
import { memberService } from "@/services/member/member.service";
import { DOCUMENT_CATEGORIES, documentsForVault } from "@/config/licenceFields";
import { formatDate } from "@/lib/expiry";
import type { MemberDocument } from "@/types/member";

export function DocumentsPage() {
  const { data: record, isLoading } = useMemberRecord();
  const invalidate = useInvalidateMember();
  const [viewing, setViewing] = useState<MemberDocument | null>(null);
  const [pendingDelete, setPendingDelete] = useState<MemberDocument | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const documents = useMemo(() => {
    if (!record) return [];
    return documentsForVault(record).filter((doc) => {
      const matchesQuery = doc.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesCategory = category === "all" || doc.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [record, query, category]);

  if (isLoading || !record) return <Skeleton className="h-96 w-full" />;

  return (
    <div className="space-y-6">
      <MemberPageHeader
        title="Documents"
        description="A private view of files uploaded from Licences & Compliance. Stored privately — never listed on the public website."
      />

      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <div className="h-1.5 bg-linear-to-r from-primary via-primary/70 to-accent" />
        <div className="space-y-4 p-4 sm:p-5">
          <p className="flex items-start gap-2 rounded-xl border border-border bg-surface/70 p-3.5 text-xs text-muted-foreground">
            <Lock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            Documents are held in private storage. Licence files are managed from Licences &amp;
            Compliance. Only files in the Other category can be deleted here.
          </p>
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_14rem]">
            <Input
              placeholder="Search documents"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search documents"
            />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger aria-label="Filter by category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {DOCUMENT_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {documents.length === 0 ? (
          <div className="px-4 pb-5 sm:px-5">
            <EmptyState
              title="No documents found"
              description="Files you upload or replace under Licences & Compliance will appear here."
            />
          </div>
        ) : (
          <div className="border-t border-border">
            <Table className="table-fixed">
              <colgroup>
                <col className="w-[32%]" />
                <col className="w-[16%]" />
                <col className="w-[8%]" />
                <col className="w-[8%]" />
                <col className="w-[12%]" />
                <col className="w-[12%]" />
                <col className="w-[12%]" />
              </colgroup>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="px-4">File</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead className="px-4 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => {
                  const canDelete = doc.category === "Other";
                  return (
                    <TableRow key={doc.id} className="h-14">
                      <TableCell className="min-w-0 px-4">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <FileText className="size-3.5" aria-hidden="true" />
                          </span>
                          <span
                            className="block min-w-0 truncate text-sm font-semibold"
                            title={doc.name}
                          >
                            {doc.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="truncate text-muted-foreground" title={doc.category}>
                        {doc.category}
                      </TableCell>
                      <TableCell className="uppercase text-muted-foreground">
                        {doc.fileType}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{doc.sizeKb} KB</TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(doc.uploadedAt)}
                      </TableCell>
                      <TableCell className="truncate text-muted-foreground">
                        {doc.expiryDate ? formatDate(doc.expiryDate) : "—"}
                      </TableCell>
                      <TableCell className="px-3">
                        <div className="flex justify-end gap-0.5">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            aria-label={`View ${doc.name}`}
                            onClick={() => setViewing(doc)}
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            aria-label={`Download ${doc.name}`}
                            onClick={() =>
                              toast.info("Secure download", {
                                description:
                                  "Signed private download links are issued once the secure backend is connected.",
                              })
                            }
                          >
                            <Download className="size-4" />
                          </Button>
                          {canDelete ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              aria-label={`Delete ${doc.name}`}
                              onClick={() => setPendingDelete(doc)}
                            >
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          ) : null}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      <DocumentViewDialog
        document={viewing}
        reminderDays={record.preferences.reminderDays}
        onOpenChange={(open) => !open && setViewing(null)}
      />

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this document?</AlertDialogTitle>
            {pendingDelete ? (
              <p className="break-all text-sm font-semibold text-foreground">
                {pendingDelete.name}
              </p>
            ) : null}
            <AlertDialogDescription>
              This removes the file from Documents. Licence files must be deleted from Licences
              &amp; Compliance.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!pendingDelete || pendingDelete.category !== "Other") return;
                await memberService.deleteDocument(pendingDelete.id);
                await invalidate();
                setPendingDelete(null);
                toast.success("Document deleted");
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DocumentsPage;

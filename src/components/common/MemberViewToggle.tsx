import { useState, type ReactNode } from "react";
import { Check, Columns3, Grid2X2, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface MemberTableColumn<T> {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
}

interface MemberViewToggleProps<T> {
  rows: T[];
  columns: MemberTableColumn<T>[];
  cards: ReactNode;
}

export function MemberViewToggle<T>({ rows, columns, cards }: MemberViewToggleProps<T>) {
  const [tableView, setTableView] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState(() => new Set(columns.map((column) => column.key)));
  const visibleColumns = columns.filter((column) => visibleKeys.has(column.key));

  const toggleColumn = (key: string) => {
    setVisibleKeys((current) => {
      const next = new Set(current);
      if (next.has(key) && next.size > 1) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <div className="inline-flex items-center rounded-full border border-border bg-card p-1 shadow-sm" aria-label="Choose view">
          <button type="button" onClick={() => setTableView(false)} aria-pressed={!tableView} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${!tableView ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <Grid2X2 className="size-3.5" aria-hidden="true" /> Cards
          </button>
          <button type="button" onClick={() => setTableView(true)} aria-pressed={tableView} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${tableView ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <List className="size-3.5" aria-hidden="true" /> Table
          </button>
        </div>
        {tableView ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" size="sm"><Columns3 className="size-4" aria-hidden="true" /> Columns</Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Visible columns</p>
              <div className="space-y-2">
                {columns.map((column) => (
                  <label key={column.key} className="flex cursor-pointer items-center gap-2 text-sm">
                    <Checkbox checked={visibleKeys.has(column.key)} onCheckedChange={() => toggleColumn(column.key)} />
                    {column.label}
                  </label>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">Keep at least one column visible.</p>
            </PopoverContent>
          </Popover>
        ) : null}
      </div>
      {tableView ? (
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-soft">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead className="bg-primary/[0.06]"><tr className="border-b border-primary/15">{visibleColumns.map((column) => <th key={column.key} scope="col" className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-foreground">{column.label}</th>)}</tr></thead>
            <tbody>{rows.map((row, index) => <tr key={index} className="border-b border-border/70 last:border-0 hover:bg-surface/40">{visibleColumns.map((column) => <td key={column.key} className="px-4 py-3 align-top">{column.render(row)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      ) : cards}
    </div>
  );
}

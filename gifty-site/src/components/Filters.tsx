'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { useI18n } from "@/providers/I18nProvider";

type FilterOptions = {
  types: string[];
  colors: string[];
  materials: string[];
  sizes: string[];
  occasions: string[];
  collections: string[];
};

export type SelectedFilters = {
  picks: Array<"new" | "popular" | "sale">;
  types: string[];
  colors: string[];
  materials: string[];
  sizes: string[];
  occasions: string[];
  collections: string[];
};

type Multi = {
  label: string;
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
};

function MultiSelect({ label, options, value, onChange }: Multi) {
  if (options.length === 0) return null;

  function toggle(opt: string) {
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt));
    else onChange([...value, opt]);
  }

  return (
    <details className="group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm">
      <summary className="cursor-pointer list-none select-none text-sm font-medium text-zinc-900">
        {label}
        <span className="ml-2 text-xs text-zinc-500">{value.length ? `(${value.length})` : ""}</span>
      </summary>
      <div className="mt-3 grid gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={value.includes(opt)}
              onChange={() => toggle(opt)}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900"
            />
            <span className="leading-tight">{opt}</span>
          </label>
        ))}
      </div>
    </details>
  );
}

function PicksSelect({
  value,
  onChange,
}: {
  value: SelectedFilters["picks"];
  onChange: (next: SelectedFilters["picks"]) => void;
}) {
  const { t } = useI18n();

  const opts: Array<{ id: "new" | "popular" | "sale"; label: string }> = [
    { id: "new", label: t("filters.picks.new") },
    { id: "popular", label: t("filters.picks.popular") },
    { id: "sale", label: t("filters.picks.sale") },
  ];

  function toggle(id: "new" | "popular" | "sale") {
    if (value.includes(id)) onChange(value.filter((x) => x !== id));
    else onChange([...value, id]);
  }

  return (
    <details className="group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm">
      <summary className="cursor-pointer list-none select-none text-sm font-medium text-zinc-900">
        {t("filters.picks")}
        <span className="ml-2 text-xs text-zinc-500">{value.length ? `(${value.length})` : ""}</span>
      </summary>
      <div className="mt-3 grid gap-2">
        {opts.map((opt) => (
          <label key={opt.id} className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={value.includes(opt.id)}
              onChange={() => toggle(opt.id)}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900"
            />
            <span className="leading-tight">{opt.label}</span>
          </label>
        ))}
      </div>
    </details>
  );
}

export function Filters({
  options,
  selected,
  onSelectedChange,
  inStockOnly,
  onInStockOnlyChange,
  onReset,
  className,
}: {
  options: FilterOptions;
  selected: SelectedFilters;
  onSelectedChange: (next: SelectedFilters) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (v: boolean) => void;
  onReset: () => void;
  className?: string;
}) {
  const { t } = useI18n();

  return (
    <div className={cn("grid gap-3", className)}>
      <div className="flex items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white p-4">
        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockOnlyChange(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 text-zinc-900"
          />
          {t("common.inStockOnly")}
        </label>
        <Button variant="ghost" size="sm" onClick={onReset}>
          {t("common.reset")}
        </Button>
      </div>

      <PicksSelect
        value={selected.picks}
        onChange={(picks) => onSelectedChange({ ...selected, picks })}
      />

      <MultiSelect
        label={t("filters.type")}
        options={options.types}
        value={selected.types}
        onChange={(types) => onSelectedChange({ ...selected, types })}
      />
      <MultiSelect
        label={t("filters.color")}
        options={options.colors}
        value={selected.colors}
        onChange={(colors) => onSelectedChange({ ...selected, colors })}
      />
      <MultiSelect
        label={t("filters.material")}
        options={options.materials}
        value={selected.materials}
        onChange={(materials) => onSelectedChange({ ...selected, materials })}
      />
      <MultiSelect
        label={t("filters.size")}
        options={options.sizes}
        value={selected.sizes}
        onChange={(sizes) => onSelectedChange({ ...selected, sizes })}
      />
      <MultiSelect
        label={t("filters.occasion")}
        options={options.occasions}
        value={selected.occasions}
        onChange={(occasions) => onSelectedChange({ ...selected, occasions })}
      />
      <MultiSelect
        label={t("filters.collection")}
        options={options.collections}
        value={selected.collections}
        onChange={(collections) => onSelectedChange({ ...selected, collections })}
      />
    </div>
  );
}

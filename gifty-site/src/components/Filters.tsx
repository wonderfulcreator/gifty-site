'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";

type FilterOptions = {
  types: string[];
  colors: string[];
  materials: string[];
  sizes: string[];
  occasions: string[];
  collections: string[];
};

export type SelectedFilters = {
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
    <details className="paper-card-soft overflow-hidden p-4 open:shadow-[0_12px_24px_rgba(164,65,17,0.08)]">
      <summary className="cursor-pointer list-none select-none text-sm font-bold text-[#6b341c]">
        {label}
        <span className="ml-2 text-xs font-medium text-[#9b765f]">
          {value.length ? `(${value.length})` : ""}
        </span>
      </summary>
      <div className="mt-4 grid gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 text-sm text-[#7c472a]">
            <input
              type="checkbox"
              checked={value.includes(opt)}
              onChange={() => toggle(opt)}
              className="h-4 w-4 rounded border-[#d6ab7d] text-[#d95c1d] focus:ring-[#ffd9b3]"
            />
            <span className="leading-tight">{opt}</span>
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
  return (
    <div className={cn("grid gap-3", className)}>
      <div className="paper-card-soft flex items-center justify-between gap-2 p-4">
        <label className="flex items-center gap-2 text-sm font-medium text-[#7c472a]">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockOnlyChange(e.target.checked)}
            className="h-4 w-4 rounded border-[#d6ab7d] text-[#d95c1d] focus:ring-[#ffd9b3]"
          />
          Только в наличии
        </label>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Сбросить
        </Button>
      </div>

      <MultiSelect
        label="Тип"
        options={options.types}
        value={selected.types}
        onChange={(types) => onSelectedChange({ ...selected, types })}
      />
      <MultiSelect
        label="Цвет"
        options={options.colors}
        value={selected.colors}
        onChange={(colors) => onSelectedChange({ ...selected, colors })}
      />
      <MultiSelect
        label="Материал"
        options={options.materials}
        value={selected.materials}
        onChange={(materials) => onSelectedChange({ ...selected, materials })}
      />
      <MultiSelect
        label="Размер"
        options={options.sizes}
        value={selected.sizes}
        onChange={(sizes) => onSelectedChange({ ...selected, sizes })}
      />
      <MultiSelect
        label="Повод"
        options={options.occasions}
        value={selected.occasions}
        onChange={(occasions) => onSelectedChange({ ...selected, occasions })}
      />
      <MultiSelect
        label="Коллекция"
        options={options.collections}
        value={selected.collections}
        onChange={(collections) => onSelectedChange({ ...selected, collections })}
      />
    </div>
  );
}

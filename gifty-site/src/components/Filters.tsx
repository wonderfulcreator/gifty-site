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
    <details className="group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm">
      <summary className="cursor-pointer list-none select-none text-sm font-medium text-zinc-900">
        {label}
        <span className="ml-2 text-xs text-zinc-500">
          {value.length ? `(${value.length})` : ""}
        </span>
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
      <div className="flex items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white p-4">
        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockOnlyChange(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 text-zinc-900"
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

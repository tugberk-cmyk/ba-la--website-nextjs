"use client";

import type { BlogCategory } from "@/types/blog";

interface CategoryFilterProps {
  categories: BlogCategory[];
  selected: string | null;
  onSelect: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSelect(null)}
        className={`shrink-0 px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
          selected === null
            ? "bg-foreground text-background border-foreground"
            : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
        }`}
      >
        Tumu
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`shrink-0 px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
            selected === category.id
              ? "text-background border-transparent"
              : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
          }`}
          style={
            selected === category.id
              ? { backgroundColor: category.color, borderColor: category.color }
              : { borderLeftColor: category.color, borderLeftWidth: "3px" }
          }
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

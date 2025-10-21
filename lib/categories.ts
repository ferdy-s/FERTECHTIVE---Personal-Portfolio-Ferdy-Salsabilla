// lib/categories.ts
import React, { type ComponentType, type SVGProps } from "react";
import { Code2, Figma, Images, Megaphone, LayoutGrid } from "lucide-react";

export type CategoryValue = "programming" | "uiux" | "graphic" | "marketing";
export type CategoryOrAll = CategoryValue | "all";

// Tipe komponen ikon (React SVG)
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const CATEGORY_DEFS: Record<
  CategoryValue,
  {
    value: CategoryValue;
    label: string;
    icon: IconComponent;
    tags: string[];
  }
> = {
  programming: {
    value: "programming",
    label: "Pemrograman",
    icon: Code2,
    tags: [
      "programming",
      "code",
      "dev",
      "backend",
      "frontend",
      "fullstack",
      "api",
      "react",
      "next.js",
      "prisma",
      "typescript",
      "node",
      "database",
    ],
  },
  uiux: {
    value: "uiux",
    label: "UI/UX Design",
    icon: Figma,
    tags: ["uiux", "ux", "ui", "figma", "wireframe", "prototype", "usability"],
  },
  graphic: {
    value: "graphic",
    label: "Graphic Design",
    icon: Images,
    tags: ["graphic", "branding", "logo", "poster", "illustration", "visual"],
  },
  marketing: {
    value: "marketing",
    label: "Digital Marketing",
    icon: Megaphone,
    tags: ["marketing", "seo", "sem", "ads", "campaign", "content", "social"],
  },
};

export const CATEGORY_LIST: {
  value: CategoryOrAll;
  label: string;
  icon: IconComponent;
}[] = [
  { value: "all", label: "Semua", icon: LayoutGrid },
  ...Object.values(CATEGORY_DEFS),
];

/** helpers */
export function labelForCategory(c?: CategoryValue | null) {
  return (c && CATEGORY_DEFS[c]?.label) || "Lainnya";
}

export function iconForCategory(c?: CategoryValue | null) {
  const Icon = c ? CATEGORY_DEFS[c]?.icon : undefined;
  return Icon ? React.createElement(Icon, { className: "h-3.5 w-3.5" }) : null;
}

export function normalizeTags(input?: string | string[] | null): string[] {
  const raw = Array.isArray(input) ? input.join(",") : (input ?? "");
  const list = raw
    .split(/[,\n]/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  // unique
  return Array.from(new Set(list));
}

export function deriveCategory(input: {
  category?: string | null;
  tags?: string[] | null;
  title?: string | null;
  description?: string | null;
}): CategoryValue | undefined {
  // explicit category
  const c = (input.category ?? "").toLowerCase();
  if (c && (Object.keys(CATEGORY_DEFS) as CategoryValue[]).includes(c as any)) {
    return c as CategoryValue;
  }
  // by tags
  const tags = (input.tags ?? []).map((t) => t.toLowerCase());
  for (const key of Object.keys(CATEGORY_DEFS) as CategoryValue[]) {
    if (tags.some((t) => CATEGORY_DEFS[key].tags.includes(t))) return key;
  }
  // by text blob
  const blob = `${input.title ?? ""} ${input.description ?? ""}`.toLowerCase();
  for (const key of Object.keys(CATEGORY_DEFS) as CategoryValue[]) {
    if (CATEGORY_DEFS[key].tags.some((t) => blob.includes(t))) return key;
  }
  return undefined;
}

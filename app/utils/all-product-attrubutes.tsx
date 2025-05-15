import type { Attributes } from "@/types";

export const getAllAttributes = (): Attributes[] => {
  return [
    { code: "price", type: "number", value: 0, label: "Price" },
    { code: "color", type: "text", value: "", label: "Color" },
    { code: "specs_url", type: "url", value: "", label: "Specifications URL" },
    { code: "tags", type: "tags", value: [], label: "Tags" },
    { code: "in_stock", type: "boolean", value: false, label: "In Stock" },
  ];
};

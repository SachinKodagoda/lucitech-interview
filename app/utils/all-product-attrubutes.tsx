import type { Attributes } from "@/types";

export const getAllAttributes = (): Attributes[] => {
  return [
    { code: "price", type: "number", value: 0 },
    { code: "color", type: "text", value: "" },
    { code: "specs_url", type: "url", value: "" },
    { code: "in_stock", type: "boolean", value: false },
    { code: "tags", type: "tags", value: [] },
  ];
};

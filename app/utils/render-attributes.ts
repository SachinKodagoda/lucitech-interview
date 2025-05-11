import type { AttributeValue, Product } from "@/types";

export const renderAttributeValue = (product: Product, code: string) => {
  const attribute = product.attributes.find((attr) => attr.code === code);
  if (!attribute) return "-";

  switch (attribute.type) {
    case "boolean":
      return attribute.value ? "Yes" : "No";
    case "tags":
      return Array.isArray(attribute.value)
        ? attribute.value.join(", ")
        : attribute.value;
    default:
      return String(attribute.value);
  }
};

export const renderAttribute = (
  product: Product,
  code: string
): AttributeValue | null => {
  const attribute = product.attributes.find((attr) => attr.code === code);
  return attribute || null;
};

export const renderValue = (attribute: AttributeValue | null) => {
  if (!attribute) return "-";
  switch (attribute.type) {
    case "boolean":
      return attribute.value ? "Yes" : "No";
    case "tags":
      return Array.isArray(attribute.value)
        ? attribute.value.join(", ")
        : attribute.value;
    default:
      return String(attribute.value);
  }
};

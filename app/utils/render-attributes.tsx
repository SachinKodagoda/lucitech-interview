import type { AttributeValue, Product } from "@/types";
import { Tag } from "antd";

export const renderAttributeValue = (product: Product, code: string) => {
  const attribute = product.attributes.find((attr) => attr.code === code);
  const renderedValue = renderValue(attribute || null);
  return renderedValue;
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
      return Array.isArray(attribute.value) ? (
        <>
          {attribute.value.map((tag, index) => (
            <Tag key={`tag-${index + 1}`} color="blue">
              {tag}
            </Tag>
          ))}
        </>
      ) : (
        attribute.value
      );
    case "url":
      return (
        <a href={attribute.value} target="_blank" rel="noopener noreferrer">
          {attribute.value}
        </a>
      );
    default:
      return String(attribute.value);
  }
};

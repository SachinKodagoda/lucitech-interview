import type { Attributes, Product } from "@/types";
import { Tag } from "antd";

export const renderAttributeValue = (product: Product, code: string) => {
  const attribute = product.attributes.find((attr) => attr.code === code);
  const renderedValue = renderValue(attribute || null);
  return renderedValue;
};

export const renderAttribute = (
  product: Product,
  code: string
): Attributes | null => {
  const attribute = product.attributes.find((attr) => attr.code === code);
  return attribute || null;
};

export const renderValue = (attribute: Attributes | null) => {
  if (!attribute) return <span className="text-gray-400"> - </span>;
  switch (attribute.code) {
    case "in_stock":
      return attribute.value ? "Yes" : "No";
    case "price":
      return attribute.value;
    case "color":
      if (!attribute.value || attribute.value === "") {
        return <span className="text-gray-400">No Color provided</span>;
      }
      return attribute.value;
    case "tags":
      if (!Array.isArray(attribute.value) || attribute.value.length === 0) {
        return <span className="text-gray-400">No Tag provided</span>;
      }
      return (
        <>
          {attribute.value.map((tag, index) => (
            <Tag key={`tag-${index + 1}`} color="blue">
              {tag}
            </Tag>
          ))}
        </>
      );
    case "specs_url":
      if (!attribute.value || attribute.value === "") {
        return <span className="text-gray-400">No Url provided</span>;
      }
      return (
        <a
          href={`${attribute.value}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Click Here
        </a>
      );
    default:
      return String(attribute.value);
  }
};

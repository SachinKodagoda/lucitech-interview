import { useMemo } from "react";
import type { Product } from "@/types";

export default function getFilteredTags(products: Product[]) {
  const filteredTags = useMemo(() => {
    const tags = products.flatMap((product) => product.attributes);
    const flattenedTags = tags
      .filter(
        (tag) =>
          tag.code === "tags" &&
          Array.isArray(tag.value) &&
          tag.value.length > 0
      )
      .flatMap((tag) => tag.value) as string[];
    return Array.from(new Set([...flattenedTags])).map((tag) => ({
      value: tag,
      label: tag,
    }));
  }, [products]);
  return filteredTags;
}

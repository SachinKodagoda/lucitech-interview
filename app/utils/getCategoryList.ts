import { useMemo } from "react";
import type { Category } from "@/types";

export default function getCategoryList(categories: Category[]) {
  const categoryList = useMemo(() => {
    return categories.map((category) => {
      return {
        value: category.id,
        label: category.name,
      };
    });
  }, [categories]);
  return categoryList;
}

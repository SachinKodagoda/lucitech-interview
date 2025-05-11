import type { Category } from "@/types";

type props = {
  categoryId?: number;
  categoryGroup?: number;
  categories: Category[];
};
export const getCategoryName = ({
  categoryId,
  categoryGroup,
  categories,
}: props) => {
  const categoryName =
    categoryId || categoryGroup
      ? categories.find(
          (cat) =>
            `${cat.id}` === `${categoryId}` ||
            `${cat.id}` === `${categoryGroup}`
        )?.name || "Unknown Category"
      : "All Products";

  return categoryName;
};

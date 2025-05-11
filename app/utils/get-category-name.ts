import type { Category, categoryGroup, categoryId } from "@/types";

type props = {
  categoryId: categoryId;
  categoryGroup: categoryGroup;
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

export const getCategory = ({ categoryId, categories }: Partial<props>) => {
  return (
    categories?.find((cat) => cat.id === categoryId)?.name || "Unknown Category"
  );
};

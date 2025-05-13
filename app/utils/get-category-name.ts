import type { Category, categoryGroup, categoryId } from "@/types";

type Props = {
  categoryId: categoryId;
  categoryGroup: categoryGroup;
  categories: Category[];
};

export const getCategoryName = ({
  categoryId,
  categoryGroup,
  categories,
}: Props) => {
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

export const getCategory = ({ categoryId, categories }: Partial<Props>) => {
  return (
    categories?.find((cat) => `${cat.id}` === `${categoryId}`)?.name ||
    "Unknown Category"
  );
};

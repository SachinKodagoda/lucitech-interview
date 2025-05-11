import { useParams } from "@/hooks/use-params-data";
import type { categoryList } from "@/types";
import { useAppSelector } from "@/hooks";

export const getSelectedCategory = (menuItems: categoryList[]): string[] => {
  const { categoryId, categoryGroup } = useParams();
  const { categories } = useAppSelector((state) => state.categories);

  if (categoryId) {
    // Find the menu item that corresponds to this category ID
    const selectedItem = categories.find(
      (cat) => `${cat.id}` === `${categoryId}`
    );
    if (selectedItem) {
      // Find the index in the menuItems array
      for (const menuItem of menuItems) {
        const childIndex = menuItem.children?.findIndex(
          (child) => `${child.id}` === `${categoryId}`
        );
        if (
          childIndex !== undefined &&
          childIndex >= 0 &&
          menuItem.children &&
          menuItem.children[childIndex]
        ) {
          return [`${menuItem.children[childIndex].key}`];
        }
      }
    }
  }

  if (categoryGroup) {
    // Find the menu item for the category group
    const groupItem = menuItems.find(
      (item) => `${item.id}` === `${categoryGroup}`
    );
    if (groupItem) {
      return [groupItem.key];
    }
  }

  // Default to "all-products" if no category is selected
  return categoryId || categoryGroup ? [] : ["all-products"];
};

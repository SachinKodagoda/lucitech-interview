import type {
  Category,
  categoryGroup,
  categoryId,
  categoryList,
} from "@/types";

interface props {
  categoryId: categoryId;
  categoryGroup: categoryGroup;
  categories: Category[];
  menuItems: categoryList[];
}
export const getSelectedCategory = ({
  categoryId,
  categoryGroup,
  categories,
  menuItems,
}: props): string[] => {
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

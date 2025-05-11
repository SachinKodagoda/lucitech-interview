import { useMemo } from "react";
import type { ButtonEvent, Category, categoryList } from "@/types";
import type { NavigateFunction } from "react-router";

interface props {
  categories: Category[];
  navigate: NavigateFunction;
  navigateToHome: (e: ButtonEvent, id: string) => void;
  pagination: {
    page: number;
    page_size: number;
  };
}

export const getCategoryItems = ({
  categories,
  navigate,
  navigateToHome,
  pagination,
}: props) => {
  const menuItems = useMemo(() => {
    return categories.reduce((acc, curr, index) => {
      const existingGroup = acc.find(
        (group) => group.id === `${curr.parent_id}`
      );
      if (existingGroup) {
        existingGroup.children?.push({
          id: `${curr.id}`,
          label: curr.name,
          key: `${index}-${curr.id}`,

          onClick: () =>
            navigate(
              `/dashboard?category_id=${curr.id}&page_size=${pagination.page_size}&page=${pagination.page}`
            ),
        });
      } else {
        acc.push({
          key: `${index}-${curr.id}`,
          id: `${curr.id}`,
          label: (
            <button
              onClick={(e) => navigateToHome(e, `${curr.id}`)}
              type="button"
            >
              {curr.name}
            </button>
          ),
          // icon: <AppstoreOutlined />,
          children: [],
        });
      }
      return acc;
    }, [] as categoryList[]);
  }, [
    categories,
    pagination.page,
    pagination.page_size,
    navigate,
    navigateToHome,
  ]);

  return menuItems;
};

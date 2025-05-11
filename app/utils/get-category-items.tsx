import { useMemo } from "react";
import type { ButtonEvent, categoryList } from "@/types";
import { useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { useAppSelector } from "@/hooks";

export const getCategoryItems = () => {
  const navigate = useNavigate();
  const { pagination } = useAppSelector((state) => state.products);
  const { categories } = useAppSelector((state) => state.categories);

  const menuItems = useMemo(() => {
    return categories.reduce((acc, curr, index) => {
      const existingGroup = acc.find(
        (group) => group.id === `${curr.parent_id}`
      );
      if (existingGroup) {
        existingGroup.children?.push({
          id: `${curr.id}`,
          label: (
            <div className="flex items-center gap-2">
              <FaArrowRight />
              {curr.name}
            </div>
          ),
          key: `${index}-${curr.id}`,

          onClick: () =>
            navigate(
              `/dashboard?category_id=${curr.id}&page_size=${pagination.page_size}&page=1`
            ),
        });
      } else {
        acc.push({
          key: `${index}-${curr.id}`,
          id: `${curr.id}`,
          label: (
            <div className="flex items-center gap-2">
              <FaArrowRight />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/dashboard?category_group=${curr.id}&page_size=${pagination.page_size}&page=1`
                  );
                }}
                type="button"
                className="cursor-pointer"
              >
                {curr.name}
              </button>
            </div>
          ),
          children: [],
        });
      }
      return acc;
    }, [] as categoryList[]);
  }, [categories, pagination.page_size, navigate]);

  return menuItems;
};

import type { categoryList, pagination, User } from "@/types/index";

import { Button, Menu, Typography } from "antd";
import { BiSolidCategory } from "react-icons/bi";
import { FaBagShopping } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { VscDashboard } from "react-icons/vsc";
import type { NavigateFunction } from "react-router";
import Loading from "@/components/ui/loading";
import UserSection from "./user-section";
import { useAppSelector } from "@/hooks/index";

interface props {
  selectedKeys: string[];
  navigate: NavigateFunction;
  menuItems: categoryList[];
}

export default function SideMenu({ selectedKeys, navigate, menuItems }: props) {
  const { pagination } = useAppSelector((state) => state.products);
  const { loading: categoriesLoading } = useAppSelector(
    (state) => state.categories
  );
  const onAllProductClick = () => {
    navigate(
      `/dashboard?page_size=${pagination.page_size}&page=${pagination.page}`
    );
  };

  return (
    <div className="flex h-full flex-col justify-between gap-2">
      <div>
        <div className="text-lg uppercase flex gap-1 min-h-[60px] items-center justify-center border-b border-gray-500/50 pr-6 font-bold border-dashed">
          <VscDashboard className="w-6 h-6" />
          Home24 BXP
        </div>
        {categoriesLoading ? (
          <Loading />
        ) : (
          <Menu
            mode="inline"
            style={{ borderRight: 0 }}
            defaultOpenKeys={["categories"]}
            selectedKeys={selectedKeys}
            items={[
              {
                key: "all-products",
                icon: <FaBagShopping />,
                label: "All Products",
                onClick: onAllProductClick,
              },
              {
                key: "categories",
                icon: <BiSolidCategory />,
                label: "Categories",
                children: menuItems,
              },
            ]}
          />
        )}
      </div>
      <UserSection />
    </div>
  );
}

import type { categoryList } from "@/types/index";

import { Menu } from "antd";
import { BiSolidCategory } from "react-icons/bi";
import { FaBagShopping } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { VscDashboard } from "react-icons/vsc";
import type { NavigateFunction } from "react-router";
import Loading from "@/components/ui/loading";
import UserSection from "./user-section";
import { useAppSelector } from "@/hooks/index";
import { cn } from "@/utils/cn";
import LastUpdatedProduct from "@/widgets/last-updated-product";

interface Props {
  selectedKeys: string[];
  navigate: NavigateFunction;
  menuItems: categoryList[];
  onClose?: () => void;
}

export default function SideMenu({
  selectedKeys,
  navigate,
  menuItems,
  onClose,
}: Props) {
  const { pagination } = useAppSelector((state) => state.products);
  const { categoryLoading } = useAppSelector((state) => state.categories);

  const onAllProductClick = () => {
    if (onClose) {
      onClose();
    }
    navigate(
      `/dashboard?page_size=${pagination.page_size}&page=1&sort_by=id&asc=false`
    );
  };

  return (
    <div className="flex h-full flex-col justify-between gap-2">
      <div>
        <div
          className={cn(
            "text-lg pl-6 pr-6 uppercase flex min-h-[60px] items-center  border-b border-gray-500/50 font-bold border-dashed",
            onClose ? "justify-between" : "justify-center"
          )}
        >
          <div className="flex items-center gap-1">
            <VscDashboard className="w-6 h-6" />
            Home24 BXP
          </div>
          {onClose && (
            <button
              onClick={onClose}
              type="button"
              className="bg-gray-500 text-white rounded-full p-1 cursor-pointer"
            >
              <IoCloseSharp />
            </button>
          )}
        </div>
        {categoryLoading ? (
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
      <div>
        <LastUpdatedProduct onClose={onClose} />
        <UserSection />
      </div>
    </div>
  );
}

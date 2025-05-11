import type { categoryList, pagination, User } from "@/types/index";

import { Button, Menu, Spin, Typography } from "antd";
import { BiSolidCategory } from "react-icons/bi";
import { FaBagShopping } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { VscDashboard } from "react-icons/vsc";
import type { NavigateFunction } from "react-router";

interface props {
  categoriesLoading: boolean;
  selectedKeys: string[];
  pagination: pagination;
  navigate: NavigateFunction;
  menuItems: categoryList[];
  user: User | null;
  handleLogout: () => void;
}

export default function SideMenu({
  categoriesLoading,
  selectedKeys,
  pagination,
  navigate,
  menuItems,
  user,
  handleLogout,
}: props) {
  return (
    <div className="flex h-full flex-col justify-between gap-2">
      <div>
        <div className="text-lg uppercase flex gap-1 min-h-[60px] items-center justify-center border-b border-gray-500/50 pr-6 font-bold border-dashed">
          <VscDashboard className="w-6 h-6" />
          Home24 BXP
        </div>

        {categoriesLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            <Spin />
          </div>
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
                onClick: () =>
                  navigate(
                    `/dashboard?page_size=${pagination.page_size}&page=${pagination.page}`
                  ),
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

      <div className="flex flex-col items-center p-6 gap-2">
        {user && <Typography.Text>{user.email}</Typography.Text>}
        <Button
          icon={<IoLogOutOutline />}
          onClick={handleLogout}
          variant="outlined"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

import type { categoryList, pagination, User } from "@/types/index";
import {
  LogoutOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Button, Menu, Spin, Typography } from "antd";
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
        <div className="flex min-h-[60px] items-center justify-center border-b border-gray-500/50 pr-6 font-bold">
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
                icon: <ShoppingOutlined />,
                label: "All Products",
                onClick: () =>
                  navigate(
                    `/dashboard?page_size=${pagination.page_size}&page=${pagination.page}`
                  ),
              },
              {
                key: "categories",
                icon: <AppstoreOutlined />,
                label: "Categories",
                children: menuItems,
              },
            ]}
          />
        )}
      </div>
      <div className="flex flex-col items-center p-6">
        {user && (
          <Typography.Text style={{ marginRight: "16px" }}>
            {user.email}
          </Typography.Text>
        )}
        <Button
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          type="primary"
          danger
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

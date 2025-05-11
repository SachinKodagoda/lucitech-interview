import React, { useEffect, type ReactElement } from "react";
import { Layout, Menu, Button, Typography, Spin } from "antd";
import {
  LogoutOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useSearchParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/stores/slices/auth-slice";
import { fetchCategories } from "@/stores/slices/category-slice";
import LastModifiedProduct from "@/components/widgets/last-modified-product";

// import type { Route } from "./+types/home";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "New React Router App" },
//     { name: "description", content: "Welcome to React Router!" },
//   ];
// }

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

interface categoryList {
  id: string;
  label: ReactElement | string;
  key: string;
  children?: categoryList[];
  onClick?: () => void;
}

const AppLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id")
    ? parseInt(searchParams.get("category_id")!)
    : undefined;

  const categoryGroup = searchParams.get("category_group")
    ? parseInt(searchParams.get("category_group")!)
    : undefined;
  const { categories, loading: categoriesLoading } = useAppSelector(
    (state) => state.categories,
  );
  const { lastModifiedProduct, pagination } = useAppSelector(
    (state) => state.products,
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const getSelectedKeys = () => {
    if (categoryId) {
      // Find the menu item that corresponds to this category ID
      const selectedItem = categories.find(
        (cat) => `${cat.id}` === `${categoryId}`,
      );
      if (selectedItem) {
        // Find the index in the menuItems array
        for (const menuItem of menuItems) {
          const childIndex = menuItem.children?.findIndex(
            (child) => `${child.id}` === `${categoryId}`,
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
        (item) => `${item.id}` === `${categoryGroup}`,
      );
      if (groupItem) {
        return [groupItem.key];
      }
    }

    // Default to "all-products" if no category is selected
    return categoryId || categoryGroup ? [] : ["all-products"];
  };

  const menuItems = categories.reduce((acc, curr, index) => {
    const existingGroup = acc.find((group) => group.id === `${curr.parent_id}`);
    if (existingGroup) {
      existingGroup.children?.push({
        id: `${curr.id}`,
        label: curr.name,
        key: `${index}-${curr.id}`,

        onClick: () =>
          navigate(
            `/dashboard?category_id=${curr.id}&page_size=${pagination.page_size}&page=${pagination.page}`,
          ),
      });
    } else {
      acc.push({
        key: `${index}-${curr.id}`,
        id: `${curr.id}`,
        label: (
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                `/dashboard?category_group=${curr.id}&page_size=${pagination.page_size}&page=${pagination.page}`,
              );
            }}
          >
            {curr.name}
          </div>
        ),
        // icon: <AppstoreOutlined />,
        children: [],
      });
    }
    return acc;
  }, [] as categoryList[]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider
          width={250}
          style={{
            background: "#fff",
            boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          }}
        >
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
                  selectedKeys={getSelectedKeys()}
                  items={[
                    {
                      key: "all-products",
                      icon: <ShoppingOutlined />,
                      label: "All Products",
                      onClick: () =>
                        navigate(
                          `/dashboard?page_size=${pagination.page_size}&page=${pagination.page}`,
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
        </Sider>

        <Layout style={{ padding: "24px" }}>
          {lastModifiedProduct && (
            <div style={{ marginBottom: "24px" }}>
              <LastModifiedProduct product={lastModifiedProduct} />
            </div>
          )}

          <Content
            style={{
              background: "#fff",
              padding: "24px",
              margin: 0,
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

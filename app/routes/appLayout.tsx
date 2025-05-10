import React, { useEffect, type ReactElement } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Spin,
  Badge,
  type MenuProps,
} from "antd";
import {
  LogoutOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "~/stores/slices/authSlice";
import { fetchCategories } from "~/stores/slices/categorySlice";
import LastModifiedProduct from "./lastModifiedProduct";
import type { Category } from "~/types";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const AppLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { categories, loading: categoriesLoading } = useAppSelector(
    (state) => state.categories
  );
  const { lastModifiedProduct } = useAppSelector((state) => state.products);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Create a hierarchical menu from categories
  const createCategoryMenuItems = (categories: any[]): MenuProps["items"] => {
    return categories.map((category) => {
      if (category.children && category.children.length > 0) {
        return {
          key: `category-${category.id}`,
          icon: <AppstoreOutlined />,
          label: category.name,
          children: createCategoryMenuItems(category.children),
        };
      }
      return {
        key: `category-${category.id}`,
        icon: <AppstoreOutlined />,
        label: category.name,
        onClick: () => navigate(`/dashboard?categoryId=${category.id}`),
      };
    });
  };

  // const items = categories.reduce((acc, curr, index) => {
  //   const existingGroup = acc.find((group) => group.id === `${curr.parent_id}`);
  //   if (existingGroup) {
  //     existingGroup.children?.push({
  //       id: `${curr.id}`,
  //       label: curr.name,
  //       key: `${index}-${curr.id}`,
  //     });
  //   } else {
  //     acc.push({
  //       id: `${curr.id}`,
  //       label: curr.name,
  //       key: `${index}-${curr.id}`,
  //       children: [],
  //     });
  //   }
  //   return acc;
  // }, [] as TreeNode[]);

  // Organize categories into a hierarchical structure
  const getCategoryTree = () => {
    const rootCategories = categories.filter((cat) => !cat.parent_id);

    const buildTree = (parentId: number): Category[] => {
      return categories
        .filter((cat) => cat.parent_id === parentId)
        .map((cat) => ({
          ...cat,
          children: buildTree(cat.id),
        }));
    };

    return rootCategories.map((cat) => ({
      ...cat,
      children: buildTree(cat.id),
    }));
  };

  const categoryTree = categories.length > 0 ? getCategoryTree() : [];
  const menuItems = createCategoryMenuItems(categoryTree);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fff",
          padding: "0 24px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <ShoppingOutlined style={{ fontSize: "24px", marginRight: "12px" }} />
          <Title level={4} style={{ margin: 0 }}>
            Product Management System
          </Title>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
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
      </Header>

      <Layout>
        <Sider
          width={250}
          style={{ background: "#fff", boxShadow: "2px 0 8px rgba(0,0,0,0.1)" }}
        >
          <div style={{ padding: "24px 16px" }}>
            <Button
              type="primary"
              icon={<ShoppingOutlined />}
              onClick={() => navigate("/dashboard")}
              style={{ marginBottom: "16px", width: "100%" }}
            >
              All Products
            </Button>
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
              items={[
                {
                  key: "categories",
                  icon: <AppstoreOutlined />,
                  label: "Categories",
                  children: menuItems,
                },
              ]}
            />
          )}
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

import { Layout } from "antd";

import { Outlet } from "react-router";

import LastModifiedProduct from "@/components/widgets/last-modified-product";
import { useDashboardActions } from "@/hooks/use-dashbord-actions";
import { getCategoryItems } from "@/utils/get-category-items";
import { getSelectedCategory } from "@/utils/get-selected-category";
import SideMenu from "@/ui/side-menu";

const { Content, Sider } = Layout;

const AppLayout = () => {
  const {
    handleLogout,
    navigateToHome,
    navigate,
    categoryId,
    categoryGroup,
    categories,
    categoriesLoading,
    lastModifiedProduct,
    pagination,
    user,
  } = useDashboardActions();

  const menuItems = getCategoryItems({
    categories,
    navigate,
    navigateToHome,
    pagination,
  });

  const selectedKeys = getSelectedCategory({
    categoryId,
    categoryGroup,
    categories,
    menuItems,
  });

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
          <SideMenu
            categoriesLoading={categoriesLoading}
            selectedKeys={selectedKeys}
            pagination={pagination}
            navigate={navigate}
            menuItems={menuItems}
            user={user}
            handleLogout={handleLogout}
          />
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

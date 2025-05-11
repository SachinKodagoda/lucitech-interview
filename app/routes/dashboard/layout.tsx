import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router";
import LastModifiedProduct from "@/components/widgets/last-modified-product";
import { getCategoryItems } from "@/utils/get-category-items";
import { getSelectedCategory } from "@/utils/get-selected-category";
import SideMenu from "@/ui/side-menu";
const { Sider } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const menuItems = getCategoryItems();
  const selectedKeys = getSelectedCategory(menuItems);

  return (
    <div className="flex h-dvh overflow-hidden">
      <Sider
        width={275}
        style={{
          background: "#fff",
          borderRight: "2px solid rgba(0,0,0,0.1)",
        }}
      >
        <SideMenu
          selectedKeys={selectedKeys}
          navigate={navigate}
          menuItems={menuItems}
        />
      </Sider>
      <div className="flex flex-col gap-4 h-dvh overflow-y-auto w-full ">
        <LastModifiedProduct />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

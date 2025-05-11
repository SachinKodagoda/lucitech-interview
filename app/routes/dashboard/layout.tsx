import { Outlet } from "react-router";
import LastModifiedProduct from "@/components/widgets/last-modified-product";
import { getCategoryItems } from "@/utils/get-category-items";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/index";
import { fetchCategories } from "@/stores/slices/category-slice";
import NavigationMenu from "@/ui/navigation-menu";

const AppLayout = () => {
  const menuItems = getCategoryItems();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex h-dvh overflow-hidden">
      <NavigationMenu menuItems={menuItems} />
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

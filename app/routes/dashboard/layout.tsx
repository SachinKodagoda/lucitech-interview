import { Outlet } from "react-router";
import { getCategoryItems } from "@/utils/get-category-items";
import NavigationMenu from "@/ui/navigation-menu";
import type { DivEvent, DivKeyEvent } from "@/types/index";
import { useEffect, useState } from "react";
import { fetchCategories } from "@/stores/slices/category-slice";
import { useAppDispatch } from "@/hooks/index";

const AppLayout = () => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const onToggle = (e: DivEvent | DivKeyEvent) => {
    e.stopPropagation;
    setShow((prev) => !prev);
  };

  const onClose = () => {
    setShow(false);
  };
  const menuItems = getCategoryItems({ onClose });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex h-dvh overflow-hidden">
      <NavigationMenu
        menuItems={menuItems}
        show={show}
        onToggle={onToggle}
        onClose={onClose}
      />
      <div className="flex flex-col gap-4 h-dvh overflow-y-auto w-full ">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

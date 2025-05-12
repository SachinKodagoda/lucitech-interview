import { getSelectedCategory } from "@/utils/get-selected-category";
import SideMenu from "./side-menu";
import type { categoryList, DivEvent, DivKeyEvent } from "@/types";
import { useNavigate } from "react-router";
import { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { Drawer } from "antd";

export default function NavigationMenu({
  menuItems,
}: { menuItems: categoryList[] }) {
  const navigate = useNavigate();
  const selectedKeys = getSelectedCategory(menuItems);
  const [show, setShow] = useState(false);

  const onToggle = (e: DivEvent | DivKeyEvent) => {
    e.stopPropagation;
    setShow((prev) => !prev);
  };

  const onClose = () => {
    setShow(false);
  };

  return (
    <>
      <div className="h-dvh w-[300px] border-r-2 border-[rgba(0,0,0,0.1)] bg-white hidden md:block">
        <SideMenu
          selectedKeys={selectedKeys}
          navigate={navigate}
          menuItems={menuItems}
        />
      </div>
      <div
        onClick={(e) => onToggle(e)}
        onKeyDown={(e) => onToggle(e)}
        className="z-40 block md:hidden fixed right-2 bottom-2 bg-black text-white rounded-full max-w-max p-2 cursor-pointer"
      >
        <MdOutlineMenu className="w-6 h-6" />
      </div>

      <Drawer closable={false} onClose={onClose} open={show} placement="left">
        <SideMenu
          selectedKeys={selectedKeys}
          navigate={navigate}
          menuItems={menuItems}
          onClose={onClose}
        />
      </Drawer>
    </>
  );
}

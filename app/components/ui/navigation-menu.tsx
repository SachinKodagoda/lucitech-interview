import { getSelectedCategory } from "@/utils/get-selected-category";
import SideMenu from "./side-menu";
import type { categoryList, DivEvent, DivKeyEvent } from "@/types";
import { useNavigate } from "react-router";
import { MdOutlineMenu } from "react-icons/md";
import { Drawer } from "antd";

interface Props {
  menuItems: categoryList[];
  onClose: () => void;
  onToggle: (e: DivEvent | DivKeyEvent) => void;
  show: boolean;
}

export default function NavigationMenu({
  menuItems,
  onToggle,
  onClose,
  show,
}: Props) {
  const navigate = useNavigate();
  const selectedKeys = getSelectedCategory(menuItems);

  return (
    <>
      <div className="overflow-y-auto max-h-svh w-[300px] border-r-2 border-[rgba(0,0,0,0.1)] bg-white hidden md:block">
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

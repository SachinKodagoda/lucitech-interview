import { FaLink } from "react-icons/fa6";
import { IoIosPricetags } from "react-icons/io";
import { IoColorFilter } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { RiNumbersFill } from "react-icons/ri";

export const getDescriptionIcon = (label: string) => {
  switch (label) {
    case "price":
      return (
        <div className="flex items-center gap-1 uppercase font-medium">
          <IoIosPricetags />
          Price
        </div>
      );
    case "color":
      return (
        <div className="flex items-center gap-1 uppercase font-medium">
          <IoColorFilter />
          Color
        </div>
      );
    case "specs_url":
      return (
        <div className="flex items-center gap-1 uppercase font-medium">
          <FaLink />
          Specs URL
        </div>
      );
    case "in_stock":
      return (
        <div className="flex items-center gap-1 uppercase font-medium">
          <RiNumbersFill />
          In Stock
        </div>
      );
    case "tags":
      return (
        <div className="flex items-center gap-1 uppercase font-medium">
          <MdCategory />
          Tags
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-1 uppercase font-medium">
          <IoIosPricetags />
          {label}
        </div>
      );
  }
};

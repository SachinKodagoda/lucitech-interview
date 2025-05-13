import type { Product } from "@/types";
import {
  renderAttributeValue,
  renderAttribute,
  renderValue,
} from "@/utils/render-attributes";
import { cn } from "@/utils/cn";
import { FaRegEye } from "react-icons/fa";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { pills } from "@/elements/pills";
import { useAppSelector } from "@/hooks";
import { RiNumbersFill } from "react-icons/ri";
import { IoIosPricetags } from "react-icons/io";
import { MdAddReaction, MdOutlineNumbers } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";

export const getProductListColumn = () => {
  const navigate = useNavigate();
  const { sortField, sortOrder } = useAppSelector((state) => state.products);
  const columns = [
    {
      title: (
        <div className="flex items-center gap-1">
          <MdOutlineNumbers />
          ID
        </div>
      ),
      dataIndex: "id",
      key: "id",
      sorter: true,
      sortOrder: sortField === "id" ? sortOrder : null,
      width: 80,
    },
    {
      title: (
        <div className="flex items-center gap-1">
          <FaCartShopping />
          Product Name
        </div>
      ),
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortOrder: sortField === "name" ? sortOrder : null,
    },
    {
      title: (
        <div className="flex items-center gap-1">
          <IoIosPricetags />
          Price
        </div>
      ),
      key: "price",
      render: (_: string, record: Product) =>
        renderAttributeValue(record, "price"),
    },
    {
      title: (
        <div className="flex items-center gap-1">
          <RiNumbersFill />
          In Stock
        </div>
      ),
      key: "in_stock",
      render: (_: string, record: Product) => {
        const filtered = renderAttribute(record, "in_stock");
        return (
          <div
            className={cn(
              filtered?.value ? pills() : pills({ intent: "red" }),
              "min-w-16"
            )}
          >
            {renderValue(filtered)}
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center gap-1">
          <RiNumbersFill />
          Color
        </div>
      ),
      key: "color",
      render: (_: string, record: Product) => {
        const filtered = renderAttribute(record, "color");
        return <div>{filtered ? filtered?.value : "-"}</div>;
      },
    },
    {
      title: (
        <div className="flex items-center gap-1">
          <RiNumbersFill />
          URL
        </div>
      ),
      key: "specs_url",
      render: (_: string, record: Product) => {
        const filtered = renderAttribute(record, "specs_url");
        return (
          <div>
            {filtered ? (
              <a href={filtered?.value} target="_blank" rel="noreferrer">
                link
              </a>
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center gap-1">
          <RiNumbersFill />
          Tags
        </div>
      ),
      key: "tags",
      render: (_: string, record: Product) => {
        const filtered = renderAttribute(record, "tags");
        return (
          <div className="flex flex-wrap max-w-[100px] gap-2">
            {renderValue(filtered)}
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center gap-1">
          <MdAddReaction />
          Actions
        </div>
      ),
      key: "actions",
      render: (_: string, record: Product) => (
        <Button
          type="primary"
          icon={<FaRegEye />}
          onClick={() => navigate(`/dashboard/products/${record.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return columns;
};

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
import { MdAddReaction, MdCategory, MdOutlineNumbers } from "react-icons/md";
import { FaCartShopping, FaLink } from "react-icons/fa6";
import { IoColorFilter } from "react-icons/io5";
import { useParams } from "@/hooks/use-params-data";
import type { sortOrder as sortOrderType } from "@/types";

export const getProductListColumn = () => {
  const navigate = useNavigate();
  const { sort_by, asc, categoryId, categoryGroup } = useParams();
  const { pagination } = useAppSelector((state) => state.products);
  const isAscending = asc === "true" || asc === "1";
  const sortOrder: sortOrderType = isAscending ? "ascend" : "descend";
  const sortField = sort_by || "id";
  const cateGroupId = categoryId ? `&category_id=${categoryId}` : "";
  const cateGroup = categoryGroup ? `&category_group=${categoryGroup}` : "";
  const groupId = cateGroupId || cateGroup;

  const columns = [
    {
      title: (
        <div
          className="flex items-center gap-1"
          onKeyDown={() => {}}
          onClick={() => {
            navigate(
              `?${groupId}&page_size=${pagination.page_size}&page=1&sort_by=id&asc=${!isAscending}`
            );
          }}
        >
          <MdOutlineNumbers />
          ID
        </div>
      ),
      dataIndex: "id",
      key: "id",
      sorter: true,
      sortOrder: sortField === "id" ? sortOrder : undefined,
      width: 80,
    },
    {
      title: (
        <div
          className="flex items-center gap-1"
          onKeyDown={() => {}}
          onClick={() => {
            navigate(
              `?${groupId}&page_size=${pagination.page_size}&page=1&sort_by=name&asc=${!isAscending}`
            );
          }}
        >
          <FaCartShopping />
          Product Name
        </div>
      ),
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortOrder: sortField === "name" ? sortOrder : undefined,
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
          <IoColorFilter />
          Color
        </div>
      ),
      key: "color",
      render: (_: string, record: Product) => {
        const filtered = renderAttribute(record, "color");
        return <div>{renderValue(filtered)}</div>;
      },
    },
    {
      title: (
        <div className="flex items-center gap-1">
          <FaLink />
          URL
        </div>
      ),
      key: "specs_url",
      render: (_: string, record: Product) => {
        const filtered = renderAttribute(record, "specs_url");
        return <div>{renderValue(filtered)}</div>;
      },
    },
    {
      title: (
        <div className="flex items-center gap-1">
          <MdCategory />
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

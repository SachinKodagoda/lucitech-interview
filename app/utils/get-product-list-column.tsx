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

export const getProductListColumn = () => {
  const navigate = useNavigate();
  const { sortField, sortOrder } = useAppSelector((state) => state.products);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
      sortOrder: sortField === "id" ? sortOrder : null,
      width: 80,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortOrder: sortField === "name" ? sortOrder : null,
    },
    {
      title: "Price",
      key: "price",
      render: (_: string, record: Product) =>
        renderAttributeValue(record, "price"),
    },
    {
      title: "In Stock",
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
      title: "Actions",
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

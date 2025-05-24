import type { Attributes, Product } from "@/types";
import { renderAttribute, renderValue } from "@/utils/render-attribute-text";
import { cn } from "@/utils/cn";
import { FaRegEye } from "react-icons/fa";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { pills } from "@/elements/pills";
import { useAppSelector } from "@/hooks";
import { MdAddReaction, MdOutlineNumbers } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { useParams } from "@/hooks/use-params-data";
import type { sortOrder as sortOrderType } from "@/types";
import { useMemo } from "react";

export const getProductListColumn = (attributeList: Attributes[]) => {
  const navigate = useNavigate();
  const { sort_by, asc, categoryId, categoryGroup } = useParams();
  const { pagination } = useAppSelector((state) => state.products);
  const isAscending = asc === "true" || asc === "1";
  const sortOrder: sortOrderType = isAscending ? "ascend" : "descend";
  const sortField = sort_by || "id";
  const cateGroupId = categoryId ? `&category_id=${categoryId}` : "";
  const cateGroup = categoryGroup ? `&category_group=${categoryGroup}` : "";
  const groupId = cateGroupId || cateGroup;

  const OtherColumns = useMemo(() => {
    return attributeList.map((listItem) => ({
      title: <div>{listItem.label}</div>,
      dataIndex: listItem.code,
      key: listItem.code,
      render: (_: string, record: Product) => {
        const filtered = renderAttribute(record, listItem.code);
        if (listItem.code === "in_stock") {
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
        }
        return (
          <div
            className={cn(
              "flex flex-wrap gap-2",
              listItem.type === "tags" && "max-w-[100px]"
            )}
          >
            {renderValue(filtered)}
          </div>
        );
      },
    }));
  }, [attributeList]);

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
    ...OtherColumns,
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

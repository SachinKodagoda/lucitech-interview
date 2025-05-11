import { useEffect } from "react";
import { Table, Card, Typography, Spin, Button } from "antd";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks";

import type { Product } from "@/types";

import {
  fetchProducts,
  setPage,
  setPageSize,
  setSortField,
  setSortOrder,
} from "@/stores/slices/product-slice";
import PerPageItems from "@/widgets/per-page-items";
import {
  renderAttribute,
  renderAttributeValue,
  renderValue,
} from "@/utils/render-attributes";
import { useParams } from "@/hooks/use-params-data";
import { getCategoryName } from "@/utils/get-category-name";
import { FaRegEye } from "react-icons/fa";
import { cn } from "@/utils/cn";
import { pills } from "@/elements/pills";

const { Title } = Typography;

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { categoryId, pageSize, categoryGroup, page } = useParams();

  const { products, loading, pagination, sortField, sortOrder } =
    useAppSelector((state) => state.products);

  const { categories } = useAppSelector((state) => state.categories);

  const categoryName = getCategoryName({
    categoryId,
    categoryGroup,
    categories,
  });

  useEffect(() => {
    // Fetch products when component mounts or when pagination/sort changes
    dispatch(
      fetchProducts({
        page: page || pagination.page,
        page_size: pageSize || pagination.page_size,
        category_id: categoryId,
        category_group: categoryGroup,
        sortField,
        sortOrder: sortOrder || undefined,
      })
    );
    if (pageSize) {
      dispatch(setPageSize(pageSize));
    }
    if (page) {
      dispatch(setPage(page));
    }
  }, [
    page,
    pageSize,
    categoryId,
    categoryGroup,
    sortField,
    sortOrder,
    dispatch,
    pagination.page,
    pagination.page_size,
  ]);

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

  return (
    <Card
      style={{
        border: "2px solid rgba(0,0,0,0.1)",
      }}
    >
      <div className="mb-6 flex justify-between">
        <Title
          level={3}
          style={{
            color: "#013b8e",
          }}
        >
          {categoryName}
        </Title>
        <PerPageItems />
      </div>
      {loading ? (
        <div className="flex justify-center p-10">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={products}
          columns={columns}
          rowKey="id"
          bordered
          pagination={{
            current: pagination.page,
            pageSize: pagination.page_size,
            total: pagination.total,
            onChange: (page) => dispatch(setPage(page)),
            showSizeChanger: false,
          }}
          onChange={(pagination, filters, sorter) => {
            const { field, order } = sorter as unknown as {
              field: string;
              order: "ascend" | "descend" | null;
            };
            if (field) {
              dispatch(setSortField(field));
              dispatch(setSortOrder(order));
            }
          }}
        />
      )}
    </Card>
  );
};

export default ProductList;

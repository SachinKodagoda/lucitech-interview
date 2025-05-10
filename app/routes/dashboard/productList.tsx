import React, { useEffect } from "react";
import { Table, Card, Typography, Select, Spin, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router";
import { useAppDispatch, useAppSelector } from "~/hooks";

import type { Product } from "~/types";
import {
  fetchProducts,
  setPage,
  setPageSize,
  setSortField,
  setSortOrder,
} from "~/stores/slices/productSlice";

const { Title } = Typography;
const { Option } = Select;

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id")
    ? parseInt(searchParams.get("category_id")!)
    : undefined;

  const categoryGroup = searchParams.get("category_group")
    ? parseInt(searchParams.get("category_group")!)
    : undefined;

  const { products, loading, pagination, sortField, sortOrder } =
    useAppSelector((state) => state.products);
  const { categories } = useAppSelector((state) => state.categories);

  // Get category name for display
  const categoryName =
    categoryId || categoryGroup
      ? categories.find(
          (cat) =>
            `${cat.id}` === `${categoryId}` ||
            `${cat.id}` === `${categoryGroup}`
        )?.name || "Unknown Category"
      : "All Products";

  useEffect(() => {
    // Fetch products when component mounts or when pagination/sort changes
    dispatch(
      fetchProducts({
        page: pagination.page,
        pageSize: pagination.pageSize,
        category_id: categoryId,
        category_group: categoryGroup,
        sortField,
        sortOrder: sortOrder || undefined,
      })
    );
  }, [
    dispatch,
    pagination.page,
    pagination.pageSize,
    categoryId,
    categoryGroup,
    sortField,
    sortOrder,
  ]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    if (sorter.field) {
      dispatch(setSortField(sorter.field));
      dispatch(setSortOrder(sorter.order));
    }
  };

  const renderAttributeValue = (product: Product, code: string) => {
    const attribute = product.attributes.find((attr) => attr.code === code);
    if (!attribute) return "-";

    switch (attribute.type) {
      case "boolean":
        return attribute.value ? "Yes" : "No";
      case "tags":
        return Array.isArray(attribute.value)
          ? attribute.value.join(", ")
          : attribute.value;
      default:
        return String(attribute.value);
    }
  };

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
      render: (text: string, record: Product) =>
        renderAttributeValue(record, "price"),
    },
    {
      title: "In Stock",
      key: "in_stock",
      render: (text: string, record: Product) =>
        renderAttributeValue(record, "in_stock"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Product) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/dashboard/products/${record.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <Title level={3}>{categoryName}</Title>

        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "8px" }}>Items per page: </span>
          <Select
            value={pagination.pageSize}
            onChange={(value) => dispatch(setPageSize(value))}
            style={{ width: 120 }}
          >
            <Option value={5}>5</Option>
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
          </Select>
        </div>
      </div>

      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "40px" }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={products}
          columns={columns}
          rowKey="id"
          pagination={{
            current: pagination.page,
            pageSize: pagination.pageSize,
            total: pagination.total,
            onChange: (page) => dispatch(setPage(page)),
            showSizeChanger: false,
          }}
          onChange={handleTableChange}
        />
      )}
    </Card>
  );
};

export default ProductList;

import { Table, Card, Typography, Spin } from "antd";
import { setSortField, setSortOrder } from "@/stores/slices/product-slice";
import PerPageItems from "@/widgets/per-page-items";
import { useProductListActions } from "@/hooks/use-product-list-actions";
import { getProductListColumn } from "@/utils/get-product-list-column";

const { Title } = Typography;

const ProductList = () => {
  const {
    dispatch,
    navigate,
    products,
    pagination,
    loading,
    categoryName,
    searchParams,
    sortField,
    sortOrder,
  } = useProductListActions();

  const columns = getProductListColumn({ sortField, sortOrder, navigate });

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
          scroll={{ x: "max-content" }}
          bordered
          pagination={{
            current: pagination.page,
            pageSize: pagination.page_size,
            total: pagination.total,
            onChange: (newPage) => {
              const params = new URLSearchParams(searchParams);
              params.set("page_size", `${pagination.page_size}`);
              params.set("page", `${newPage}`);
              navigate(`?${params.toString()}`);
            },
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

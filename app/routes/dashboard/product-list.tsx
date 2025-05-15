import { Table, Spin, Button } from "antd";
import { setSortField, setSortOrder } from "@/stores/slices/product-slice";
import PerPageItems from "@/widgets/per-page-items";
import { useProductListActions } from "@/hooks/use-product-list-actions";
import { getProductListColumn } from "@/utils/get-product-list-column";
import AddProduct from "@/ui/add-product";
import { useMemo, useState } from "react";

const ProductList = () => {
  const {
    dispatch,
    navigate,
    products,
    pagination,
    productLoading,
    categoryName,
    searchParams,
  } = useProductListActions();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = getProductListColumn();

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-4 md:p-6 border-2 border-[rgba(0,0,0,0.1)] rounded-md flex flex-col gap-6">
        <div className=" flex flex-wrap items-center justify-between gap-x-2 gap-y-4">
          <h3 className="text-[#013b8e] text-xl font-bold uppercase flex flex-wrap items-center gap-2">
            {categoryName}
            {categoryName === "All Products" && (
              <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Add Product
              </Button>
            )}
          </h3>
          <PerPageItems />
        </div>
        {productLoading ? (
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
            onChange={(_pagination, _filters, sorter) => {
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
      </div>
      <AddProduct isModalOpen={isModalOpen} onCloseModal={onCloseModal} />
    </>
  );
};

export default ProductList;

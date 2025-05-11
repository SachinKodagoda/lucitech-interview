import { useAppSelector } from "@/hooks/index";

import { Select } from "antd";
import { useNavigate, useSearchParams } from "react-router";
const { Option } = Select;

export default function PerPageItems() {
  const { pagination } = useAppSelector((state) => state.products);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "8px" }}>Items per page: </span>
      <Select
        value={pagination.page_size}
        onChange={(value) => {
          const params = new URLSearchParams(searchParams);
          params.set("page_size", value.toString());
          params.set("page", "1");
          navigate(`?${params.toString()}`);
        }}
        style={{ width: 120 }}
      >
        <Option value={5}>5</Option>
        <Option value={10}>10</Option>
        <Option value={20}>20</Option>
        <Option value={50}>50</Option>
      </Select>
    </div>
  );
}

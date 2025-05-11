import { Spin } from "antd";

export default function Loading() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <Spin size="large" />
    </div>
  );
}

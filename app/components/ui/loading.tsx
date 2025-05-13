import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="flex justify-center p-10 w-full h-full">
      <Spin size="large" />
    </div>
  );
}

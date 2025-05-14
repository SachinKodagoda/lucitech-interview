import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/hooks";

const { Title } = Typography;

export default function ProductNotFound() {
  const navigate = useNavigate();
  const { pagination } = useAppSelector((state) => state.products);
  const onBackButtonClick = () => {
    navigate(
      `/dashboard?page_size=${pagination.page_size}&page=${pagination.page}&sort_by=id&asc=false`
    );
  };
  return (
    <Card>
      <Title level={4}>Product not found</Title>
      <Button type="primary" onClick={onBackButtonClick}>
        Back to Product List
      </Button>
    </Card>
  );
}

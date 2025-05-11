import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/hooks";

const { Title, Text } = Typography;

export default function ProductNotFound() {
  const navigate = useNavigate();
  const { pagination } = useAppSelector((state) => state.products);
  return (
    <Card>
      <Title level={4}>Product not found</Title>
      <Button
        type="primary"
        onClick={() =>
          navigate(
            `/dashboard?page_size=${pagination.page_size}&page=${pagination.page}`
          )
        }
      >
        Back to Product List
      </Button>
    </Card>
  );
}

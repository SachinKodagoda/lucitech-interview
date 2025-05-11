import { Card, Typography, Button } from "antd";
import { useNavigate } from "react-router";
import { FaRegEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useAppSelector } from "@/hooks/index";
import { renderValue } from "@/utils/render-attributes";

const { Title, Text } = Typography;

const LastModifiedProduct = () => {
  const navigate = useNavigate();
  const { lastModifiedProduct: product } = useAppSelector(
    (state) => state.products
  );

  if (!product) {
    return null;
  }

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <MdEdit className="text-[#1890ff]" />
          <span>Last Modified Product</span>
        </div>
      }
      extra={
        <Button
          type="primary"
          icon={<FaRegEye />}
          onClick={() => navigate(`/dashboard/products/${product.id}`)}
        >
          View Details
        </Button>
      }
      style={{
        width: "100%",
        background: "#f0f7ff",
        border: "1px solid #d6e4ff",
      }}
    >
      <div className="flex justify-between">
        <div>
          <Title level={4} style={{ margin: 0, marginBottom: "8px" }}>
            {product.name}
          </Title>
          <Text type="secondary">ID: {product.id}</Text>
        </div>

        <div>
          {product.attributes.slice(0, 3).map((attr, index) => (
            <div className="mb-1" key={`product-attributes-${index + 1}`}>
              <Text strong>{attr.code}: </Text>
              <Text>{renderValue(attr)}</Text>
            </div>
          ))}
          {product.attributes.length > 3 && (
            <Text type="secondary">
              +{product.attributes.length - 3} more attributes
            </Text>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LastModifiedProduct;

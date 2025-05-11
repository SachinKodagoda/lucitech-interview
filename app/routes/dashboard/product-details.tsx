import {
  Typography,
  Card,
  Spin,
  Button,
  Descriptions,
  Divider,
  Form,
  message,
} from "antd";

import { updateProductAttributes } from "@/stores/slices/product-slice";
import type { Product } from "@/types";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoSaveOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { useProductDetailActions } from "@/hooks/use-product-detail-actions";
import { renderValue } from "@/utils/render-attributes";
import { getCategory } from "@/utils/get-category-name";
import { renderAttributeInput } from "@/utils/render-attribute-input";
import ProductNotFound from "@/ui/product-not-found";
import Loading from "@/ui/loading";

const { Title, Text } = Typography;

const ProductDetail: React.FC = () => {
  const {
    navigate,
    categories,
    pagination,
    loading,
    contextHolder,
    setIsEditing,
    currentProduct,
    isEditing,
    form,
    handleSave,
  } = useProductDetailActions();

  if (loading) {
    return <Loading />;
  }

  if (!currentProduct) {
    return <ProductNotFound />;
  }

  return (
    <>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              icon={<FaArrowLeftLong />}
              onClick={() =>
                navigate(
                  `/dashboard?page_size=${pagination.page_size}&page=${pagination.page}`
                )
              }
              style={{ marginRight: "16px" }}
            >
              Back
            </Button>
            <Title level={3} style={{ margin: 0 }}>
              {currentProduct.name}
            </Title>
          </div>

          <div>
            {isEditing ? (
              <Button
                type="primary"
                icon={<IoSaveOutline />}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                type="primary"
                icon={<CiEdit />}
                onClick={() => setIsEditing(true)}
              >
                Edit Attributes
              </Button>
            )}
          </div>
        </div>

        <Descriptions bordered column={1}>
          <Descriptions.Item label="Product ID">
            {currentProduct.id}
          </Descriptions.Item>
          <Descriptions.Item label="Category">
            {getCategory({
              categoryId: currentProduct.category_id,
              categories,
            })}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Product Attributes</Divider>

        {isEditing ? (
          <Form form={form} layout="vertical">
            {currentProduct.attributes.map((attribute, index) => (
              <div key={`form-${index + 1}`} style={{ marginBottom: "16px" }}>
                <Form.Item
                  label={<Text strong>{attribute.code}</Text>}
                  style={{ marginBottom: "0" }}
                >
                  {renderAttributeInput(attribute)}
                  <Text type="secondary">Type: {attribute.type}</Text>
                </Form.Item>
              </div>
            ))}
          </Form>
        ) : (
          <Descriptions bordered column={1}>
            {currentProduct.attributes.map((attribute, index) => (
              <Descriptions.Item
                key={`description-${index + 1}`}
                label={attribute.code}
              >
                {renderValue(attribute)}
                <div>
                  <Text type="secondary">Type: {attribute.type}</Text>
                </div>
              </Descriptions.Item>
            ))}
          </Descriptions>
        )}
      </Card>
      {contextHolder}
    </>
  );
};

export default ProductDetail;

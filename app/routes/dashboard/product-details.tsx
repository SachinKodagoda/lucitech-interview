import { Typography, Button, Descriptions, Divider, Form } from "antd";

import { FaArrowLeftLong } from "react-icons/fa6";
import { IoSaveOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { useProductDetailActions } from "@/hooks/use-product-detail-actions";
import { renderValue } from "@/utils/render-attributes";

import { renderAttributeInput } from "@/utils/render-attribute-input";
import ProductNotFound from "@/ui/product-not-found";
import Loading from "@/ui/loading";
import { getDescriptionIcon } from "@/utils/get-description-icon";
import Description from "@/ui/description";

const { Title, Text } = Typography;

const ProductDetail = () => {
  const {
    navigate,
    pagination,
    loading,
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
    <div className="p-6 border-2 border-[rgba(0,0,0,0.1)] rounded-md flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-2">
        <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-2">
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
      <Description currentProduct={currentProduct} />
      <Divider orientation="left">Product Attributes</Divider>
      {isEditing ? (
        <Form form={form} layout="vertical">
          {currentProduct.attributes.map((attribute, index) => (
            <div key={`form-${index + 1}`} style={{ marginBottom: "16px" }}>
              <Form.Item
                label={
                  <div className="flex items-center gap-2">
                    {getDescriptionIcon(attribute.code)}{" "}
                    <Text type="secondary">({attribute.type})</Text>
                  </div>
                }
                style={{ marginBottom: "0" }}
              >
                {renderAttributeInput(attribute)}
              </Form.Item>
            </div>
          ))}
        </Form>
      ) : (
        <Descriptions bordered column={1}>
          {currentProduct.attributes.map((attribute, index) => (
            <Descriptions.Item
              key={`description-${index + 1}`}
              label={getDescriptionIcon(attribute.code)}
            >
              {renderValue(attribute)}
              <div>
                <Text type="secondary">Type: {attribute.type}</Text>
              </div>
            </Descriptions.Item>
          ))}
        </Descriptions>
      )}
    </div>
  );
};

export default ProductDetail;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Card,
  Typography,
  Spin,
  Button,
  Descriptions,
  Divider,
  Tag,
  Input,
  InputNumber,
  Checkbox,
  Select,
  Form,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  SaveOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  fetchProductById,
  updateProductAttributes,
  clearCurrentProduct,
} from "@/stores/slices/product-slice";
import type { AttributeValue, Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";

const { Title, Text } = Typography;

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { currentProduct, loading, pagination } = useAppSelector(
    (state) => state.products,
  );
  const { categories } = useAppSelector((state) => state.categories);

  const [isEditing, setIsEditing] = useState(false);
  const [editableAttributes, setEditableAttributes] = useState<
    AttributeValue[]
  >([]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(parseInt(productId)));
    }
    // Cleanup when component unmounts
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, productId]);

  useEffect(() => {
    // Initialize form with current product attributes
    if (currentProduct && isEditing) {
      setEditableAttributes([...currentProduct.attributes]);

      const initialValues: Record<string, any> = {};
      currentProduct.attributes.forEach((attr) => {
        initialValues[attr.code] = attr.value;
      });

      form.setFieldsValue(initialValues);
    }
  }, [currentProduct, isEditing, form]);

  const getCategoryName = (category_id: number) => {
    return (
      categories.find((cat) => cat.id === category_id)?.name ||
      "Unknown Category"
    );
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      // Update attributes with form values
      const updatedAttributes = editableAttributes.map((attr) => ({
        ...attr,
        value: values[attr.code],
      }));

      if (currentProduct) {
        const updatedProduct: Product = {
          ...currentProduct,
          attributes: updatedAttributes,
        };

        await dispatch(updateProductAttributes(updatedProduct));
        message.success("Product updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const renderAttributeInput = (attribute: AttributeValue) => {
    switch (attribute.type) {
      case "number":
        return (
          <Form.Item
            name={attribute.code}
            rules={[
              { required: true, message: `Please enter ${attribute.code}` },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        );
      case "text":
        return (
          <Form.Item
            name={attribute.code}
            rules={[
              { required: true, message: `Please enter ${attribute.code}` },
            ]}
          >
            <Input />
          </Form.Item>
        );
      case "url":
        return (
          <Form.Item
            name={attribute.code}
            rules={[
              { required: true, message: `Please enter ${attribute.code}` },
              { type: "url", message: "Please enter a valid URL" },
            ]}
          >
            <Input />
          </Form.Item>
        );
      case "boolean":
        return (
          <Form.Item name={attribute.code} valuePropName="checked">
            <Checkbox />
          </Form.Item>
        );
      case "tags":
        return (
          <Form.Item name={attribute.code}>
            <Select mode="tags" style={{ width: "100%" }} />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  const renderAttributeValue = (attribute: AttributeValue) => {
    switch (attribute.type) {
      case "boolean":
        return attribute.value ? "Yes" : "No";
      case "tags":
        return Array.isArray(attribute.value) ? (
          <>
            {attribute.value.map((tag, index) => (
              <Tag key={index} color="blue">
                {tag}
              </Tag>
            ))}
          </>
        ) : (
          attribute.value
        );
      case "url":
        return (
          <a href={attribute.value} target="_blank" rel="noopener noreferrer">
            {attribute.value}
          </a>
        );
      default:
        return String(attribute.value);
    }
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "40px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <Card>
        <Title level={4}>Product not found</Title>
        <Button
          type="primary"
          onClick={() =>
            navigate(
              `/dashboard?page_size=${pagination.page_size}&page=${pagination.page}`,
            )
          }
        >
          Back to Product List
        </Button>
      </Card>
    );
  }

  return (
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
            icon={<ArrowLeftOutlined />}
            onClick={() =>
              navigate(
                `/dashboard?page_size=${pagination.page_size}&page=${pagination.page}`,
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
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Save Changes
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<EditOutlined />}
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
          {getCategoryName(currentProduct.category_id)}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Product Attributes</Divider>

      {isEditing ? (
        <Form form={form} layout="vertical">
          {currentProduct.attributes.map((attribute, index) => (
            <div key={index} style={{ marginBottom: "16px" }}>
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
            <Descriptions.Item key={index} label={attribute.code}>
              {renderAttributeValue(attribute)}
              <div>
                <Text type="secondary">Type: {attribute.type}</Text>
              </div>
            </Descriptions.Item>
          ))}
        </Descriptions>
      )}
    </Card>
  );
};

export default ProductDetail;

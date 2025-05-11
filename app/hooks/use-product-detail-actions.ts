import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { Form, message, notification } from "antd";
import type { AttributeValue, NotificationType, Product } from "@/types";
import {
  clearCurrentProduct,
  fetchProductById,
  updateProductAttributes,
} from "@/stores/slices/product-slice";

export const useProductDetailActions = () => {
  const { productId } = useParams<{ productId: string }>();
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };

  const { currentProduct, loading, pagination } = useAppSelector(
    (state) => state.products
  );
  const { categories } = useAppSelector((state) => state.categories);

  const [isEditing, setIsEditing] = useState(false);
  const [editableAttributes, setEditableAttributes] = useState<
    AttributeValue[]
  >([]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number.parseInt(productId)));
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

      const initialValues: Record<string, string> = {};
      for (const attr of currentProduct.attributes) {
        initialValues[attr.code] = attr.value;
      }

      form.setFieldsValue(initialValues);
    }
  }, [currentProduct, isEditing, form]);

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
    } catch {
      openNotificationWithIcon("error");
    }
  };

  return {
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
  };
};

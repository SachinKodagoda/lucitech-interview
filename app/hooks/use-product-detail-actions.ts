import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { App, Form } from "antd";
import type { attributeValues, Product } from "@/types";
import {
  clearCurrentProduct,
  fetchProductById,
  updateProductAttributes,
} from "@/stores/slices/product-slice";
import { getAllAttributes } from "@/utils/all-product-attrubutes";

export const useProductDetailActions = () => {
  const { categories } = useAppSelector((state) => state.categories);
  const { message } = App.useApp();
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { currentProduct, productLoading, pagination } = useAppSelector(
    (state) => state.products
  );

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
    // Cleanup when component unmounts
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, productId]);

  useEffect(() => {
    if (currentProduct && isEditing) {
      const initialValues: Record<string, attributeValues> = {};
      for (const attr of getAllAttributes()) {
        initialValues[attr.code] =
          currentProduct.attributes.find((a) => a.code === attr.code)?.value ||
          attr.value;
      }
      initialValues.category_id = currentProduct.category_id || "";
      initialValues.name = currentProduct.name || "";
      form.setFieldsValue(initialValues);
    }
  }, [currentProduct, isEditing, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedAttributes = getAllAttributes().map((attr) => ({
        ...attr,
        value: values[attr.code],
      }));
      const filter = categories.find(
        (category) => category.id === values.category_id
      );
      const categoryGroupId = filter?.parent_id || values.category_id;
      if (currentProduct) {
        const updatedProduct: Product = {
          ...currentProduct,
          name: values.name,
          category_id: values.category_id,
          category_group: `${categoryGroupId}`,
          attributes: updatedAttributes || [],
        };
        await dispatch(updateProductAttributes(updatedProduct));
        message.success("Product updated successfully");
        setIsEditing(false);
      }
    } catch {
      message.error("Something Went Wrong");
    }
  };

  return {
    navigate,
    pagination,
    productLoading,
    setIsEditing,
    currentProduct,
    isEditing,
    form,
    handleSave,
  };
};

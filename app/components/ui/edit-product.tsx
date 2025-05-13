import { useAppSelector } from "@/hooks/index";
import type { Product, ProductForm } from "@/types/index";
import { getAllAttributes } from "@/utils/all-product-attrubutes";
import { renderAttributeInput } from "@/utils/render-attribute-input";
import { Form, Input, Select, type FormInstance } from "antd";
import { useEffect, useMemo } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { MdCategory, MdOutlineNumbers } from "react-icons/md";
import { Fragment } from "react/jsx-runtime";

interface Props {
  form: FormInstance<ProductForm>;
  currentProduct: Product;
}

export default function EditProduct({ form, currentProduct }: Props) {
  const { categories } = useAppSelector((state) => state.categories);
  const getAttributeValue = (key: string) => {
    const attribute = currentProduct.attributes.find(
      (attr) => attr.code === key
    );
    if (attribute) {
      return attribute;
    }
    return null;
  };

  const categoryList = useMemo(() => {
    return categories.map((category) => {
      return {
        value: category.id,
        label: category.name,
      };
    });
  }, [categories]);

  useEffect(() => {
    form.setFieldsValue({
      category_id: currentProduct.category_id || "",
    });
  }, [currentProduct, form]);

  return (
    <div className="flex items-center justify-center w-full py-4">
      <div className="w-full md:w-1/3">
        <Form form={form} layout="vertical">
          <Form.Item
            label={
              <div className="flex items-center gap-2">
                <MdCategory />
                Category
              </div>
            }
            name="category_id"
            rules={[{ required: true, message: "Please select a category" }]}
            style={{ marginBottom: "24px" }}
          >
            <Select options={categoryList} />
          </Form.Item>
          <Form.Item
            name="name"
            label={
              <div className="flex items-center gap-2">
                <FaCartShopping />
                Product Name
              </div>
            }
            rules={[
              { required: true, message: "Please enter a name" },
              { type: "string", message: "Please enter a valid string" },
            ]}
            style={{ marginBottom: "24px" }}
          >
            <Input />
          </Form.Item>
          {getAllAttributes().map((attribute, index) => {
            return (
              <Fragment key={`form-${index + 1}`}>
                {renderAttributeInput(
                  getAttributeValue(attribute.code) || {
                    code: attribute.code,
                    value: "",
                    type: attribute.type,
                  },
                  "24px"
                )}
              </Fragment>
            );
          })}
        </Form>
      </div>
    </div>
  );
}

import type { Product, ProductForm } from "@/types/index";
import { getAllAttributes } from "@/utils/all-product-attrubutes";
import { getDescriptionIcon } from "@/utils/get-description-icon";
import { renderAttributeInput } from "@/utils/render-attribute-input";
import { Form, type FormInstance } from "antd";

interface Props {
  form: FormInstance<ProductForm>;
  currentProduct: Product;
}

export default function EditProduct({ form, currentProduct }: Props) {
  const getAttributeValue = (key: string) => {
    const attribute = currentProduct.attributes.find(
      (attr) => attr.code === key
    );
    if (attribute) {
      return attribute;
    }
    return null;
  };
  return (
    <Form form={form} layout="vertical">
      {getAllAttributes().map((attribute, index) => {
        return (
          <div key={`form-${index + 1}`}>
            <Form.Item
              label={
                <div className="flex items-center gap-2">
                  {getDescriptionIcon(attribute.code)}
                  <span className="text-gray-500">({attribute.type})</span>
                </div>
              }
              style={{ marginBottom: "0" }}
            >
              {renderAttributeInput({
                attribute: getAttributeValue(attribute.code) || {
                  code: attribute.code,
                  value: "",
                  type: attribute.type,
                },
              })}
            </Form.Item>
          </div>
        );
      })}
    </Form>
  );
}

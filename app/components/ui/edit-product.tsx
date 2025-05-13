import type { Product, ProductForm } from "@/types/index";
import { getAllAttributes } from "@/utils/all-product-attrubutes";
import { renderAttributeInput } from "@/utils/render-attribute-input";
import { Form, type FormInstance } from "antd";
import { Fragment } from "react/jsx-runtime";

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
    <div className="flex items-center justify-center w-full py-4 lg:py-20">
      <div className="w-full md:w-1/2">
        <Form form={form} layout="vertical">
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

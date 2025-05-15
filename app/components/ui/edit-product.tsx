import { useAppSelector } from "@/hooks/index";
import type {
  attributeTypes,
  Product,
  ProductForm,
  SetAttribute,
} from "@/types/index";
import getFilteredTags from "@/utils/getFilteredTags";
import RenderAttributeElements from "@/utils/render-attribute-elements";
import { Button, Form, Input, Select, type FormInstance } from "antd";
import { useMemo, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { Fragment } from "react/jsx-runtime";
import type { Attributes } from "@/types";

interface Props {
  form: FormInstance<ProductForm>;
  currentProduct: Product;
  baseAttributes: Attributes[];
  setBaseAttributes: SetAttribute;
}

export default function EditProduct({
  form,
  baseAttributes,
  setBaseAttributes,
}: Props) {
  const { categories } = useAppSelector((state) => state.categories);
  const { products } = useAppSelector((state) => state.products);
  const marginBottom = "24px";

  const [selectedType, setSelectedType] = useState<attributeTypes>("text");
  const [newLabel, setNewLabel] = useState("New Label");

  const categoryList = useMemo(() => {
    return categories.map((category) => {
      return {
        value: category.id,
        label: category.name,
      };
    });
  }, [categories]);

  const filteredTags = getFilteredTags(products);

  const handleSelectType = (value: string) => {
    setSelectedType(value as attributeTypes);
  };

  const handleRemoveAttribute = (code: string) => {
    setBaseAttributes((prev) => prev.filter((attr) => attr.code !== code));
  };

  const onAddNewAttribute = () => {
    {
      const newBaseAttributes = [
        ...baseAttributes,
        {
          code: `attribute_${baseAttributes.length + 1}`,
          value: "",
          type: selectedType,
          label: newLabel,
        },
      ];
      setBaseAttributes(newBaseAttributes);
      if (selectedType === "boolean") {
        form.setFieldsValue({
          [`attribute_${baseAttributes.length + 1}`]: false,
        });
      } else if (selectedType === "number") {
        form.setFieldsValue({
          [`attribute_${baseAttributes.length + 1}`]: 0,
        });
      } else if (selectedType === "tags") {
        form.setFieldsValue({
          [`attribute_${baseAttributes.length + 1}`]: [],
        });
      } else {
        form.setFieldsValue({
          [`attribute_${baseAttributes.length + 1}`]: "",
        });
      }
      setNewLabel("New Label");
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-4 flex-col gap-[50px]">
      <div className="flex flex-wrap items-end gap-2 justify-center">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-400">New Attribute:</span>
          <Button
            type="primary"
            onClick={() => onAddNewAttribute()}
            className="w-[200px]"
          >
            Add
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-400">Label:</span>
          <Input
            value={newLabel}
            onChange={(event) => {
              setNewLabel(event.target.value);
            }}
            style={{ width: 200 }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-400">Select Type:</span>
          <Select
            defaultValue="text"
            style={{ width: 200 }}
            onChange={handleSelectType}
            options={[
              { value: "text", label: "Text" },
              { value: "number", label: "Number" },
              { value: "url", label: "Url" },
              { value: "tags", label: "Tags" },
              { value: "boolean", label: "Boolean" },
            ]}
          />
        </div>
      </div>
      <div className="w-full xlg:w-1/2 border-2 border-dashed border-gray-200 pt-14 pb-10 px-15 rounded-md mb-8">
        <Form
          form={form}
          layout="vertical"
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-16"
        >
          <Form.Item
            label={
              <div className="flex items-center gap-2">
                <MdCategory />
                Category
              </div>
            }
            name="category_id"
            rules={[{ required: true, message: "Please select a category" }]}
            style={{ marginBottom: marginBottom }}
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
            style={{ marginBottom: marginBottom }}
          >
            <Input />
          </Form.Item>
          {baseAttributes.map((attribute, index) => {
            return (
              <Fragment key={`form-${index + 1}`}>
                {RenderAttributeElements(
                  handleRemoveAttribute,
                  attribute,
                  marginBottom,
                  filteredTags
                )}
              </Fragment>
            );
          })}
        </Form>
      </div>
    </div>
  );
}

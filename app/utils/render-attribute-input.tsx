import { Checkbox, Form, Input, InputNumber, Select } from "antd";
import type { Attributes } from "@/types";

interface Props {
  attribute: Attributes | null;
}

export const renderAttributeInput = ({ attribute }: Props) => {
  if (!attribute) {
    return null;
  }
  switch (attribute.type) {
    case "number":
      return (
        <Form.Item
          name={attribute.code}
          rules={[
            { required: true, message: `Please enter ${attribute.code}` },
            { type: "number", message: "Please enter a valid number" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      );
    case "text":
      return (
        <Form.Item
          name={attribute.code}
          rules={[{ type: "string", message: "Please enter valid string" }]}
        >
          <Input />
        </Form.Item>
      );
    case "url":
      return (
        <Form.Item
          name={attribute.code}
          rules={[{ type: "url", message: "Please enter a valid URL" }]}
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

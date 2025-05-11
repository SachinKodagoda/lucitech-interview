import type { AttributeValue } from "@/types";
import { Checkbox, Form, Input, InputNumber, Select } from "antd";

export const renderAttributeInput = (attribute: AttributeValue) => {
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

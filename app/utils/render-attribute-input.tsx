import { Checkbox, Form, Input, InputNumber, Select } from "antd";
import type { Attributes } from "@/types";
import { BiSolidRename } from "react-icons/bi";
import { FaLink } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { IoColorFilter } from "react-icons/io5";
import { IoIosPricetags } from "react-icons/io";
import { RiNumbersFill } from "react-icons/ri";

export const renderAttributeInput = (
  attribute: Attributes | null,
  marginBottom = "15px"
) => {
  if (!attribute) {
    return null;
  }
  switch (attribute.code) {
    case "in_stock":
      return (
        <Form.Item
          name={attribute.code}
          valuePropName="checked"
          label={
            <div className="flex items-center gap-2">
              <RiNumbersFill />
              In Stock <span className="text-gray-400">(Boolean)</span>
            </div>
          }
          style={{ marginBottom: "15px" }}
        >
          <Checkbox style={{ marginBottom: 0 }} />
        </Form.Item>
      );
    case "price":
      return (
        <Form.Item
          name={attribute.code}
          label={
            <div className="flex items-center gap-2">
              <IoIosPricetags />
              Price <span className="text-gray-400">(Number)</span>
            </div>
          }
          rules={[
            { required: true, message: `Please enter ${attribute.code}` },
            { type: "number", message: "Please enter a valid Number" },
          ]}
          style={{ marginBottom: marginBottom }}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      );
    case "color":
      return (
        <Form.Item
          name={attribute.code}
          rules={[{ type: "string", message: "Please enter valid string" }]}
          label={
            <div className="flex items-center gap-2">
              <IoColorFilter />
              Color <span className="text-gray-400">(String)</span>
            </div>
          }
          style={{ marginBottom: marginBottom }}
        >
          <Input />
        </Form.Item>
      );
    case "tags":
      return (
        <Form.Item
          name={attribute.code}
          label={
            <div className="flex items-center gap-2">
              <MdCategory />
              Tags
            </div>
          }
          style={{ marginBottom: marginBottom }}
        >
          <Select mode="tags" style={{ width: "100%" }} />
        </Form.Item>
      );
    case "specs_url":
      return (
        <Form.Item
          name={attribute.code}
          rules={[{ type: "url", message: "Please enter a valid URL" }]}
          label={
            <div className="flex items-center gap-2">
              <FaLink />
              Links <span className="text-gray-400">(Url)</span>
            </div>
          }
          style={{ marginBottom: marginBottom }}
        >
          <Input />
        </Form.Item>
      );
    default:
      return null;
  }
};

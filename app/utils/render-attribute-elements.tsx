import { Form, Input, InputNumber, Select } from "antd";
import type { Attributes } from "@/types";
import { FaLink } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { IoColorFilter } from "react-icons/io5";
import { IoIosPricetags, IoMdCloseCircleOutline } from "react-icons/io";
import { RiNumbersFill } from "react-icons/ri";

export default function RenderAttributeElements(
  handleRemoveAttribute: (code: string) => void,
  attribute: Attributes | null,
  marginBottom = "15px",
  tags: {
    label: string;
    value: string;
  }[] = []
) {
  if (!attribute) {
    return null;
  }
  switch (attribute.type) {
    case "boolean":
      return (
        <Form.Item
          className="longer-label"
          name={attribute.code}
          label={
            <div className="flex flex-end w-[100%] flex-none items-center justify-between">
              <div className="flex items-center gap-2 ">
                <RiNumbersFill />
                {attribute.label}{" "}
                <span className="text-gray-400">(Boolean)</span>
              </div>
              {attribute.code !== "in_stock" && (
                <button
                  className="cursor-pointer text-red-700 hover:text-red-900 opacity-90"
                  type="button"
                  onClick={() => handleRemoveAttribute(attribute.code)}
                >
                  <IoMdCloseCircleOutline className="w-4 h-4" />
                </button>
              )}
            </div>
          }
          style={{ marginBottom: "15px", flex: "auto" }}
        >
          <Select
            options={[
              { value: true, label: "True" },
              { value: false, label: "False" },
            ]}
          />
        </Form.Item>
      );
    case "number":
      return (
        <Form.Item
          className="longer-label"
          name={attribute.code}
          label={
            <div className="flex flex-end w-[100%] flex-none items-center justify-between">
              <div className="flex items-center gap-2 ">
                <IoIosPricetags />
                {attribute.label}{" "}
                <span className="text-gray-400">(Number)</span>
              </div>
              {attribute.code !== "price" && (
                <button
                  className="cursor-pointer text-red-700 hover:text-red-900 opacity-90"
                  type="button"
                  onClick={() => handleRemoveAttribute(attribute.code)}
                >
                  <IoMdCloseCircleOutline className="w-4 h-4" />
                </button>
              )}
            </div>
          }
          rules={[{ type: "number", message: "Please enter a valid Number" }]}
          style={{ marginBottom: marginBottom, flex: "auto" }}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      );
    case "text":
      return (
        <Form.Item
          name={attribute.code}
          rules={[{ type: "string", message: "Please enter valid string" }]}
          className="longer-label"
          label={
            <div className="flex flex-end w-[100%] flex-none items-center justify-between">
              <div className="flex items-center gap-2 ">
                <IoColorFilter />
                {attribute.label}{" "}
                <span className="text-gray-400">(String)</span>
              </div>
              {attribute.code !== "color" && (
                <button
                  className="cursor-pointer text-red-700 hover:text-red-900 opacity-90"
                  type="button"
                  onClick={() => handleRemoveAttribute(attribute.code)}
                >
                  <IoMdCloseCircleOutline className="w-4 h-4" />
                </button>
              )}
            </div>
          }
          style={{ marginBottom: marginBottom, flex: "auto" }}
        >
          <Input />
        </Form.Item>
      );
    case "tags":
      return (
        <Form.Item
          name={attribute.code}
          className="longer-label"
          label={
            <div className="flex flex-end w-[100%] flex-none items-center justify-between">
              <div className="flex items-center gap-2 ">
                <MdCategory />
                {attribute.label}
              </div>
              {attribute.code !== "tags" && (
                <button
                  className="cursor-pointer text-red-700 hover:text-red-900 opacity-90"
                  type="button"
                  onClick={() => handleRemoveAttribute(attribute.code)}
                >
                  <IoMdCloseCircleOutline className="w-4 h-4" />
                </button>
              )}
            </div>
          }
          style={{ marginBottom: marginBottom, flex: "auto" }}
        >
          <Select mode="tags" style={{ width: "100%" }} options={tags} />
        </Form.Item>
      );
    case "url":
      return (
        <Form.Item
          name={attribute.code}
          className="longer-label"
          rules={[{ type: "url", message: "Please enter a valid URL" }]}
          label={
            <div className="flex flex-end w-[100%] flex-none items-center justify-between">
              <div className="flex items-center gap-2 ">
                <FaLink />
                {attribute.label} <span className="text-gray-400">(Url)</span>
              </div>
              {attribute.code !== "specs_url" && (
                <button
                  className="cursor-pointer text-red-700 hover:text-red-900 opacity-90"
                  type="button"
                  onClick={() => handleRemoveAttribute(attribute.code)}
                >
                  <IoMdCloseCircleOutline className="w-4 h-4" />
                </button>
              )}
            </div>
          }
          style={{ marginBottom: marginBottom, flex: "auto" }}
        >
          <Input />
        </Form.Item>
      );
    default:
      return null;
  }
}

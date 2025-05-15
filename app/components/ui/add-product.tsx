import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { createNewProduct, fetchProducts } from "@/stores/slices/product-slice";
import { getAllAttributes } from "@/utils/all-product-attrubutes";
import getCategoryList from "@/utils/getCategoryList";
import getFilteredTags from "@/utils/getFilteredTags";
import { renderAttributeInput } from "@/utils/render-attribute-input";
import { App, Button, Form, Input, Modal, Select } from "antd";
import { Fragment } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { useNavigate } from "react-router";

interface Props {
  onCloseModal: () => void;
  isModalOpen: boolean;
}
export default function AddProduct({ isModalOpen, onCloseModal }: Props) {
  const marginBottom = "24px";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { categories } = useAppSelector((state) => state.categories);
  const { pagination, products } = useAppSelector((state) => state.products);
  const filteredTags = getFilteredTags(products);
  const categoryList = getCategoryList(categories);

  const onFinish = async () => {
    try {
      await form.validateFields().then((values) => {
        const filter = categories.find(
          (category) => category.id === values.category_id
        );
        const categoryGroupId = filter?.parent_id || values.category_id;
        dispatch(
          createNewProduct({
            name: values.name,
            category_id: values.category_id,
            category_group: `${categoryGroupId}`,
            attributes: getAllAttributes().map((item) => {
              return {
                code: item.code,
                value: values[item.code],
                type: item.type,
                label: item.label,
              };
            }),
          })
        );

        message.success("Product updated successfully");
        onCloseModal();
        form.resetFields();
        dispatch(
          fetchProducts({
            page: 1,
            page_size: pagination.page_size || 10,
          })
        );
        navigate(
          `/dashboard?page_size=${pagination.page_size}&page=1&sort_by=id&asc=false`
        );
      });
    } catch {
      message.error("Something went wrong, please try again");
    }
  };

  return (
    <Modal
      title="Add Product"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      footer={null}
      onCancel={() => {
        onCloseModal();
        form.resetFields();
      }}
      centered
    >
      <div className="mt-4">
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
          {getAllAttributes().map((attribute, index) => {
            return (
              <Fragment key={`form-${index + 1}`}>
                {renderAttributeInput(
                  {
                    code: attribute.code,
                    value: "",
                    type: attribute.type,
                  },
                  marginBottom,
                  filteredTags
                )}
              </Fragment>
            );
          })}
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

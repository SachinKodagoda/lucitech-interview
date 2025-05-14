import { Typography, Button, Descriptions } from "antd";

import { FaArrowLeftLong } from "react-icons/fa6";
import { IoSaveOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { useProductDetailActions } from "@/hooks/use-product-detail-actions";
import { renderValue } from "@/utils/render-attributes";

import ProductNotFound from "@/ui/product-not-found";
import Loading from "@/ui/loading";
import { getDescriptionIcon } from "@/utils/get-description-icon";
import { MdOutlineNumbers } from "react-icons/md";
import { BiSolidCategory, BiSolidRename } from "react-icons/bi";
import { getCategory } from "@/utils/get-category-name";
import { useAppSelector } from "@/hooks/index";
import EditProduct from "@/ui/edit-product";

const { Text } = Typography;

const ProductDetail = () => {
  const {
    navigate,
    pagination,
    productLoading,
    setIsEditing,
    currentProduct,
    isEditing,
    form,
    handleSave,
  } = useProductDetailActions();
  const { categories } = useAppSelector((state) => state.categories);

  if (productLoading) {
    return <Loading />;
  }

  if (!currentProduct) {
    return <ProductNotFound />;
  }

  return (
    <div className="p-4 md:p-6 border-2 border-[rgba(0,0,0,0.1)] rounded-md flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-2">
        <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-2">
          <Button
            icon={<FaArrowLeftLong />}
            onClick={() =>
              navigate(
                `/dashboard?page_size=${pagination.page_size}&page=${pagination.page}&sort_by=id&asc=false`
              )
            }
            style={{ marginRight: "16px" }}
          >
            Back
          </Button>
          <div className="text-2xl font-semibold"> {currentProduct.name}</div>
        </div>
        <div>
          {isEditing ? (
            <Button
              type="primary"
              icon={<IoSaveOutline />}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<CiEdit />}
              onClick={() => setIsEditing(true)}
            >
              Edit Attributes
            </Button>
          )}
        </div>
      </div>
      {isEditing ? (
        <EditProduct form={form} currentProduct={currentProduct} />
      ) : (
        <Descriptions bordered column={1}>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-1 uppercase font-medium">
                <MdOutlineNumbers />
                Product ID
              </div>
            }
          >
            {currentProduct.id}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-1 uppercase font-medium">
                <BiSolidRename />
                Product Name
              </div>
            }
          >
            {currentProduct.name}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-1 uppercase font-medium">
                <BiSolidCategory />
                Category
              </div>
            }
          >
            {getCategory({
              categoryId: currentProduct.category_id,
              categories,
            })}
          </Descriptions.Item>
          {currentProduct.attributes.map((attribute, index) => (
            <Descriptions.Item
              key={`description-${index + 1}`}
              label={getDescriptionIcon(attribute.code)}
            >
              {renderValue(attribute)}
              <div>
                <Text type="secondary">Type: {attribute.type}</Text>
              </div>
            </Descriptions.Item>
          ))}
        </Descriptions>
      )}
    </div>
  );
};

export default ProductDetail;

import { Descriptions } from "antd";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlineNumbers } from "react-icons/md";
import { getCategory } from "@/utils/get-category-name";
import { useAppSelector } from "@/hooks/index";
import type { Product } from "@/types/index";

interface props {
  currentProduct: Product;
}

const InnerContent = (currentProduct: Product) => {
  const { categories } = useAppSelector((state) => state.categories);
  return (
    <>
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
    </>
  );
};

export default function Description({ currentProduct }: props) {
  return (
    <>
      <div className="hidden md:block">
        <Descriptions bordered column={2}>
          {InnerContent(currentProduct)}
        </Descriptions>
      </div>
      <div className="block md:hidden">
        <Descriptions bordered column={1}>
          {InnerContent(currentProduct)}
        </Descriptions>
      </div>
    </>
  );
}

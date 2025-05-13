import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { clearLastUpdated } from "@/stores/slices/product-slice";
import { renderValue } from "@/utils/render-attributes";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router";
export default function LastUpdatedProduct() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { lastModifiedProduct: product } = useAppSelector(
    (state) => state.products
  );

  if (!product) {
    return null;
  }

  const onProductClick = () => {
    navigate(`/dashboard/products/${product.id}`);
    dispatch(clearLastUpdated());
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center text-sm">
      <div
        className="border-dashed border p-2 bg-cyan-500/10 cursor-pointer rounded-md"
        onClick={onProductClick}
        onKeyDown={onProductClick}
      >
        <div className="flex items-center gap-2 font-bold text-blue-900">
          <span>Last Modified Product</span>
          <MdEdit className="text-blue-900" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Product: </span>
            <span>{product.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">ID: </span>
            <div className="truncate max-w-[150px]">{product.id}ssss</div>
          </div>
          <div>
            {product.attributes.length > 3 &&
              product.attributes.slice(0, 2).map((attr, index) => (
                <div className="mb-1" key={`product-attributes-${index + 1}`}>
                  <span className="font-semibold">{attr.code}: </span>
                  <span>{renderValue(attr)}</span>
                </div>
              ))}
            {product.attributes.length > 3 && (
              <span className="text-gray-500">
                +{product.attributes.length - 2} more attributes
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

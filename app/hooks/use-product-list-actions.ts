import { useNavigate, useSearchParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useParams } from "./use-params-data";
import { useEffect } from "react";
import { getCategoryName } from "@/utils/get-category-name";
import {
  fetchProducts,
  setPage,
  setPageSize,
} from "@/stores/slices/product-slice";

export const useProductListActions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { categoryId, pageSize, categoryGroup, page, sort_by, asc } =
    useParams();
  const { categories } = useAppSelector((state) => state.categories);
  const { products, productLoading, pagination } = useAppSelector(
    (state) => state.products
  );

  const categoryName = getCategoryName({
    categoryId,
    categoryGroup,
    categories,
  });

  // Fetch products when component mounts or when pagination/sort changes
  useEffect(() => {
    const isAscending = asc === "true" || asc === "1";
    const sortNewOrder = isAscending ? "asc" : "desc";
    const sortNewField = sort_by || "id";
    dispatch(
      fetchProducts({
        page: page || pagination.page,
        page_size: pageSize || pagination.page_size,
        category_id: categoryId,
        category_group: categoryGroup,
        sortField: (sortNewField === "id" ? "_id" : sortNewField) || undefined,
        sortOrder: sortNewOrder || undefined,
      })
    );
    if (pageSize) {
      dispatch(setPageSize(pageSize));
    }
    if (page) {
      dispatch(setPage(page));
    }
  }, [
    page,
    pageSize,
    categoryId,
    categoryGroup,
    dispatch,
    pagination.page,
    pagination.page_size,
    sort_by,
    asc,
  ]);

  return {
    dispatch,
    navigate,
    products,
    pagination,
    productLoading,
    categoryName,
    searchParams,
  };
};

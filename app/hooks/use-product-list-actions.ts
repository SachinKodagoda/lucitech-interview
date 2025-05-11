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

  const { categoryId, pageSize, categoryGroup, page } = useParams();

  const { products, loading, pagination, sortField, sortOrder } =
    useAppSelector((state) => state.products);

  const { categories } = useAppSelector((state) => state.categories);

  const categoryName = getCategoryName({
    categoryId,
    categoryGroup,
    categories,
  });
  useEffect(() => {
    // Fetch products when component mounts or when pagination/sort changes
    dispatch(
      fetchProducts({
        page: page || pagination.page,
        page_size: pageSize || pagination.page_size,
        category_id: categoryId,
        category_group: categoryGroup,
        sortField,
        sortOrder: sortOrder || undefined,
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
    sortField,
    sortOrder,
    dispatch,
    pagination.page,
    pagination.page_size,
  ]);

  return {
    dispatch,
    navigate,
    products,
    categoryId,
    categoryGroup,
    categories,
    pagination,
    loading,
    categoryName,
    searchParams,
    sortField,
    sortOrder,
  };
};

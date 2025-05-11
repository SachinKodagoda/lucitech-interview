import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useParams } from "./use-params-data";
import { useEffect } from "react";
import { fetchCategories } from "@/stores/slices/category-slice";
import { logout } from "@/stores/slices/auth-slice";
import type { ButtonEvent } from "../types";

export const useDashboardActions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categoryId, categoryGroup } = useParams();

  const { categories, loading: categoriesLoading } = useAppSelector(
    (state) => state.categories
  );
  const { lastModifiedProduct, pagination } = useAppSelector(
    (state) => state.products
  );
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navigateToHome = (e: ButtonEvent, id: string) => {
    e.stopPropagation();
    navigate(
      `/dashboard?category_group=${id}&page_size=${pagination.page_size}&page=${pagination.page}`
    );
  };

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  return {
    dispatch,
    navigate,
    handleLogout,
    navigateToHome,
    categoryId,
    categoryGroup,
    categories,
    categoriesLoading,
    lastModifiedProduct,
    pagination,
    user,
  };
};

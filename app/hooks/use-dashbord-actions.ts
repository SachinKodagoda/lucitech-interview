import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect } from "react";
import { fetchCategories } from "@/stores/slices/category-slice";
import { logout } from "@/stores/slices/auth-slice";

export const useDashboardActions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading: categoriesLoading } = useAppSelector(
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

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  return {
    handleLogout,
    navigate,
    categoriesLoading,
    lastModifiedProduct,
    pagination,
    user,
  };
};

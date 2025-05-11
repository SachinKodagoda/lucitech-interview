"use client";
import { useSearchParams } from "react-router";

export const useParams = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id")
    ? parseInt(searchParams.get("category_id")!)
    : undefined;

  const pageSize = searchParams.get("page_size")
    ? parseInt(searchParams.get("page_size")!)
    : undefined;

  const categoryGroup = searchParams.get("category_group")
    ? parseInt(searchParams.get("category_group")!)
    : undefined;

  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : undefined;

  return {
    categoryId,
    pageSize,
    categoryGroup,
    page,
  };
};

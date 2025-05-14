import { useSearchParams } from "react-router";

const getStringConverted = (value: string | null): null | number => {
  if (value === null) {
    return null;
  }
  return +value;
};

export const useParams = () => {
  const [searchParams] = useSearchParams();
  const categoryId = getStringConverted(searchParams.get("category_id"));
  const pageSize = getStringConverted(searchParams.get("page_size"));
  const categoryGroup = getStringConverted(searchParams.get("category_group"));
  const page = getStringConverted(searchParams.get("page"));
  const sort_by = searchParams.get("sort_by");
  const asc = searchParams.get("asc");

  return {
    categoryId,
    pageSize,
    categoryGroup,
    page,
    sort_by,
    asc,
  };
};

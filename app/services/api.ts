import axios from "axios";
import type {
  User,
  Category,
  Product,
  LoginCredentials,
  PaginationParams,
} from "@/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Auth API
export const login = async (
  credentials: LoginCredentials
): Promise<User | null> => {
  try {
    const response = await api.get("/api/users", {
      params: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    if (response.data) {
      const user = response.data;
      return user;
    }
    return null;
  } catch (error) {
    // console.error("Login error:", error);
    return null;
  }
};

// Categories API
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/api/categories");
  return response.data;
};

// Products API
export const getProducts = async (
  params: PaginationParams
): Promise<{
  products: Product[];
  total: number;
}> => {
  const { page, page_size, category_id, sortField, sortOrder, category_group } =
    params;

  const start = (page - 1) * page_size;

  const queryParams: Record<string, string | number> = {};

  if (category_id) {
    queryParams.category_id = category_id;
  }

  if (category_group) {
    queryParams.category_group = category_group;
  }

  if (sortField) {
    queryParams._sort = sortField;
    queryParams._order = sortOrder || "asc";
  }

  const response = await api.get("/api/products", {
    params: {
      ...queryParams,
      _start: start,
      _limit: page_size,
    },
  });

  return {
    products: response.data.products,
    total: response.data.total,
  };
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const response = await api.put(`/api/products/${product.id}`, product);
  return response.data;
};

export default api;

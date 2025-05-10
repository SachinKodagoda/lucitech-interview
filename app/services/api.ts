import axios from "axios";
import type {
  User,
  Category,
  Product,
  LoginCredentials,
  PaginationParams,
} from "~/types";

const API_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth API
export const login = async (
  credentials: LoginCredentials
): Promise<User | null> => {
  try {
    const response = await api.get("/users", {
      params: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    if (response.data && response.data.length > 0) {
      const user = response.data[0];
      // In a real application, we would not return the password
      // But for this mock API, we'll return it
      return user;
    }
    return null;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

// Categories API
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/categories");
  return response.data;
};

// Products API
export const getProducts = async (
  params: PaginationParams
): Promise<{
  products: Product[];
  total: number;
}> => {
  const { page, pageSize, categoryId, sortField, sortOrder } = params;

  // Calculate start and end for pagination
  const start = (page - 1) * pageSize;
  const end = page * pageSize;

  // Build query parameters
  let queryParams: Record<string, any> = {};
  // eslint-disable-next-line no-console
  console.log("categoryId: =-->", categoryId);

  if (categoryId) {
    queryParams.category_id = categoryId;
  }

  if (sortField) {
    queryParams._sort = sortField;
    queryParams._order = sortOrder || "asc";
  }

  // First, get total count
  const countResponse = await api.get("/products", {
    params: { ...queryParams, _limit: 0 },
  });

  // Then get paginated data
  const response = await api.get("/products", {
    params: {
      ...queryParams,
      _start: start,
      _limit: pageSize,
    },
  });

  return {
    products: response.data,
    total: countResponse.headers["x-total-count"] || response.data.length,
  };
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getProductByCategoryId = async (id: number): Promise<Product> => {
  const response = await api.get(`/products?category_id=2`);
  return response.data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const response = await api.put(`/products/${product.id}`, product);
  return response.data;
};

export default api;

// Domain models as specified in the requirements
export interface Category {
  id: number;
  parent_id?: number;
  name: string;
}

export interface AttributeValue {
  code: string;
  value: any;
  type: "number" | "text" | "url" | "tags" | "boolean";
}

export interface Product {
  id: number;
  name: string;
  category_id: number;
  attributes: AttributeValue[];
}

// Extended interfaces for the application
export interface User {
  id: number;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  lastModifiedProduct: Product | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
  sortField: string;
  sortOrder: "ascend" | "descend" | null;
}

export interface RootState {
  auth: AuthState;
  categories: CategoryState;
  products: ProductState;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  category_id?: number;
  category_group?: number;
  sortField?: string;
  sortOrder?: string;
}

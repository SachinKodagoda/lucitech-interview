import type { ReactElement } from "react";

export type categoryId = number | null;

export type categoryGroup = number | null;

export interface Category {
  id: number;
  parent_id?: number;
  name: string;
}

export interface ProductForm {
  [key: string]: attributeValues;
}

export type attributeValues = string | string[] | number | boolean;
export type attributeCodes =
  | "price"
  | "color"
  | "specs_url"
  | "in_stock"
  | "tags";
export type attributeTypes = "number" | "text" | "url" | "tags" | "boolean";

export interface Attributes {
  code: attributeCodes;
  value: attributeValues;
  type: attributeTypes;
}

export interface Product {
  id: string;
  name: string;
  category_id: number;
  category_group: string;
  attributes: Attributes[];
}

// Extended interfaces for the application
export interface User {
  id: number | string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface CategoryState {
  categories: Category[];
  categoryLoading: boolean;
  error: string | null;
}

export type sortOrder = "ascend" | "descend" | null;

export interface pagination {
  page: number;
  page_size: number;
  total: number;
}

export interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  lastModifiedProduct: Product | null;
  productLoading: boolean;
  productCreationLoading: boolean;
  error: string | null;
  pagination: pagination;
  sortField: string;
  sortOrder: sortOrder;
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
  page_size: number;
  category_id?: categoryId;
  category_group?: categoryGroup;
  sortField?: string;
  sortOrder?: string;
}

export type DivEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
export type DivKeyEvent = React.KeyboardEvent<HTMLDivElement>;
export type ButtonEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

export interface categoryList {
  id: string;
  label: ReactElement | string;
  key: string;
  children?: categoryList[];
  onClick?: () => void;
}

export type NotificationType = "success" | "info" | "warning" | "error";

export type LoginFieldType = {
  email: string;
  password: string;
  remember?: string;
};

export type ProductFieldType = {
  price: string;
  color: string;
  in_stock: string;
  tags: string;
};

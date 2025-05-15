import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ProductState, Product, PaginationParams } from "@/types";
import {
  getProducts,
  getProductById,
  updateProduct,
  createProduct,
} from "@/services/api";

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  lastModifiedProduct: null,
  productLoading: false,
  productCreationLoading: false,
  error: null,
  pagination: {
    page: 1,
    page_size: 10,
    total: 0,
  },
  sortField: "id",
  sortOrder: "ascend",
};

// Create the fetchProducts async thunk
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (params: PaginationParams, { rejectWithValue }) => {
    try {
      return await getProducts(params);
    } catch {
      return rejectWithValue(
        "Failed to fetch products. Please try again later."
      );
    }
  }
);

// Create the fetchProductById async thunk
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getProductById(id);
    } catch {
      return rejectWithValue(
        `Failed to fetch product with ID ${id}. Please try again later.`
      );
    }
  }
);

// Create the updateProductAttributes async thunk
export const updateProductAttributes = createAsyncThunk(
  "products/updateAttributes",
  async (product: Product, { rejectWithValue }) => {
    try {
      return await updateProduct(product);
    } catch {
      return rejectWithValue(
        "Failed to update product. Please try again later."
      );
    }
  }
);

export const createNewProduct = createAsyncThunk(
  "products/create",
  async (product: Partial<Product>, { rejectWithValue }) => {
    try {
      return await createProduct(product);
    } catch {
      return rejectWithValue(
        "Failed to update product. Please try again later."
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.page_size = action.payload;
      state.pagination.page = 1; // Reset to first page when changing page size
    },
    setSortField: (state, action: PayloadAction<string>) => {
      state.sortField = action.payload;
    },
    setSortOrder: (
      state,
      action: PayloadAction<"ascend" | "descend" | null>
    ) => {
      state.sortOrder = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearLastUpdated: (state) => {
      state.lastModifiedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productLoading = false;
        state.products = action.payload.products;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload as string;
      })

      // Handle fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.productLoading = false;
          state.currentProduct = action.payload;
        }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload as string;
      })

      // Handle createNewProduct
      .addCase(createNewProduct.pending, (state) => {
        state.productCreationLoading = true;
        state.error = null;
      })
      .addCase(
        createNewProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.productCreationLoading = false;
          state.lastModifiedProduct = action.payload;
        }
      )
      .addCase(createNewProduct.rejected, (state, action) => {
        state.productCreationLoading = false;
        state.error = action.payload as string;
      })

      // Handle updateProductAttributes
      .addCase(updateProductAttributes.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })
      .addCase(
        updateProductAttributes.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.productLoading = false;
          state.currentProduct = action.payload;
          state.lastModifiedProduct = action.payload;
          // Update product in the list if it exists
          const index = state.products.findIndex(
            (p) => p.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        }
      )
      .addCase(updateProductAttributes.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setPage,
  setPageSize,
  setSortField,
  setSortOrder,
  clearCurrentProduct,
  clearLastUpdated,
} = productsSlice.actions;

export default productsSlice.reducer;

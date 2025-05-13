import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CategoryState, Category } from "@/types";
import { getCategories } from "@/services/api";

const initialState: CategoryState = {
  categories: [],
  categoryLoading: false,
  error: null,
};

// Create the fetchCategories async thunk
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getCategories();
    } catch {
      return rejectWithValue(
        "Failed to fetch categories. Please try again later."
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoryLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categoryLoading = false;
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoryLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer;

// Utility function to create a category tree
export const createCategoryTree = (
  categories: Category[],
  parentId: number | null = null
): Category[] => {
  return categories
    .filter((category) =>
      parentId === null ? !category.parent_id : category.parent_id === parentId
    )
    .map((category) => ({
      ...category,
      children: createCategoryTree(categories, category.id),
    })) as Category[];
};

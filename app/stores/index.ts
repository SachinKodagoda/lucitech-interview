import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/stores/slices/auth-slice";
import categoriesReducer from "@/stores/slices/category-slice";
import productsReducer from "@/stores/slices/product-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    products: productsReducer,
  },
  // Adding middleware for serializable check, which is a good practice
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these specific action types to avoid warnings
        ignoredActions: ["products/updateAttributes/fulfilled"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

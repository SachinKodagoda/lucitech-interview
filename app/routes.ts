import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  index("./routes/auth/login.tsx"),
  route("register", "./routes/auth/register.tsx"),

  layout("./routes/dashboard/layout.tsx", [
    route("dashboard", "./routes/dashboard/product-list.tsx"),
    route(
      "dashboard/products/:productId",
      "./routes/dashboard/product-details.tsx"
    ),
  ]),
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;

// layout("./routes/privateRoute.tsx", [
//   layout("./routes/dashboard/layout.tsx", [
//     route("dashboard", "./routes/dashboard/productList.tsx"),
//     route(
//       "dashboard/products/:productId",
//       "./routes/dashboard/productDetails.tsx"
//     ),
//   ]),
// ]),

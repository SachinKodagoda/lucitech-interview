import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("about", "./routes/about.tsx"),

  layout("./routes/auth/layout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("register", "./routes/auth/register.tsx"),
  ]),

  // layout("./routes/privateRoute.tsx", [
  //   layout("./routes/dashboard/layout.tsx", [
  //     route("dashboard", "./routes/dashboard/productList.tsx"),
  //     route(
  //       "dashboard/products/:productId",
  //       "./routes/dashboard/productDetails.tsx"
  //     ),
  //   ]),
  // ]),
  layout("./routes/dashboard/layout.tsx", [
    route("dashboard", "./routes/dashboard/productList.tsx"),
    route(
      "dashboard/products/:productId",
      "./routes/dashboard/productDetails.tsx"
    ),
  ]),

  // ...prefix("dashboard", [
  //   index("./routes/dashboard.tsx"),
  //   route("products", "./routes/productList.tsx"),
  //   route("products/:productId", "./routes/productDetails.tsx"),
  // ]),
  route("*", "./routes/notFound.tsx"),
] satisfies RouteConfig;

// <Router>
// <Routes>
//   <Route path="/dashboard" element={<PrivateRoute />}>
//     <Route element={<AppLayout />}>
//       <Route index element={<Dashboard />} />
//       <Route path="products" element={<ProductList />} />
//       <Route path="products/:productId" element={<ProductDetail />} />
//     </Route>
//   </Route>
//   <Route path="*" element={<Navigate to="/dashboard" replace />} />
// </Routes>
// </Router>

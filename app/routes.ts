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

  //   ...prefix("concerts", [
  //     index("./concerts/home.tsx"),
  //     route(":city", "./concerts/city.tsx"),
  //     route("trending", "./concerts/trending.tsx"),
  //   ]),
] satisfies RouteConfig;

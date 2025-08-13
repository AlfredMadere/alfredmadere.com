import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home_page.tsx"), route("dots","routes/dot_page.tsx") ] satisfies RouteConfig;

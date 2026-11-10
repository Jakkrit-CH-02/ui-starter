import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../components/layout";
import env from "../lib/config/env";
import { AnalyticsPage } from "../pages/AnalyticsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { OverviewPage } from "../pages/OverviewPage";

// Each sidebar entry in src/lib/constants/MenuGroup.ts needs a route here.
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/dashboard/overview" replace /> },
        { path: "dashboard/overview", element: <OverviewPage /> },
        { path: "dashboard/analytics", element: <AnalyticsPage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: `/${env.BASE_NAME}` }
);

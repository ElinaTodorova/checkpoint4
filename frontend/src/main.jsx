import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import LogInPage from "./pages/LogInPage";
import AddGift from "./pages/AddGift";
import GiftsPage from "./pages/GiftsPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import EditPage from "./pages/EditPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "/gifts/add",
    element: <AddGift />,
  },
  {
    path: "/gifts",
    element: <GiftsPage />,
  },
  {
    path: "/activities",
    element: <ActivitiesPage />,
  },
  {
    path: "/gifts/:id/edit",
    element: <EditPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

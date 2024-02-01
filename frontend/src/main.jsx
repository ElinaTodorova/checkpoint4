import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import LogInPage from "./pages/LogInPage";
import AddGift from "./pages/AddGift";
import GiftsPage from "./pages/GiftsPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import EditPage from "./pages/EditPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./contexts/userContext";

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
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);

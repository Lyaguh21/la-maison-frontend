import { Menu } from "@/pages/menu";
import { Error404 } from "@/pages/errors/Error404";
import { Login, Register } from "@/pages/auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing } from "@/pages/landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

import { Login, Register } from "@/pages/auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Booking } from "@/pages/booking";
import { Profile } from "@/pages/profile";
import LandingLayout from "../layouts/Landing.layout";
import EmployeeLayout from "../layouts/Employee.layout";
import {
  Dashboards,
  EditFloorScheme,
  Orders,
  QueueOrders,
  ReadyDish,
  Reservations,
  Users,
} from "@/pages/employee";
import { RoleGuard } from "../guards/RoleGuard";
import { Error404 } from "@/pages/errors/Error404";
import { Menu } from "@/pages/menu";
import { Landing } from "@/pages/landing";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/employee",
    element: <EmployeeLayout />,
    children: [
      {
        path: "/employee/dashboards",
        element: (
          <RoleGuard roles={["ADMIN"]}>
            <Dashboards />
          </RoleGuard>
        ),
      },
      {
        path: "/employee/edit-floor-scheme",
        element: (
          <RoleGuard roles={["ADMIN"]}>
            <EditFloorScheme />
          </RoleGuard>
        ),
      },
      {
        path: "/employee/users",
        element: (
          <RoleGuard roles={["ADMIN"]}>
            <Users />
          </RoleGuard>
        ),
      },
      {
        path: "/employee/orders",
        element: (
          <RoleGuard roles={["WAITER"]}>
            <Orders />
          </RoleGuard>
        ),
      },
      {
        path: "/employee/reservations",
        element: (
          <RoleGuard roles={["WAITER"]}>
            <Reservations />
          </RoleGuard>
        ),
      },
      {
        path: "/employee/ready-dishes",
        element: (
          <RoleGuard roles={["WAITER"]}>
            <ReadyDish />
          </RoleGuard>
        ),
      },
      {
        path: "/employee/queue-orders",
        element: (
          <RoleGuard roles={["COOK"]}>
            <QueueOrders />
          </RoleGuard>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

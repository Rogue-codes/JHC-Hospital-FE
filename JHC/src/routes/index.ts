import { lazy } from "react";

const routes = [
  {
    path: "/dashboard",
    exact: true,
    component: lazy(() => import("../layout/Dashboardlayout")),
    children: [
      {
        path: "/dashboard",
        component: lazy(() => import("../views/dashboard/DashBoard")),
      },
      {
        path: "patients",
        component: lazy(() => import("../views/patients/Patients")),
      },
      {
        path: "appointment",
        component: lazy(() => import("../views/appointments/Appointments")),
      },
      {
        path: "doctors",
        component: lazy(() => import("../views/doctors/Doctors")),
      },
      {
        path: "messages",
        component: lazy(() => import("../views/messages/Messages")),
      },
      {
        path: "inventory",
        component: lazy(() => import("../views/inventory/Inventory")),
      },
      {
        path: "education-content",
        component: lazy(() => import("../views/education/Education")),
      },
      {
        path: "settings",
        component: lazy(() => import("../views/settings/Settings")),
      },
    ],
  },
];

export default routes;

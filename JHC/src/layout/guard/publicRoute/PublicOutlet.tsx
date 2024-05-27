import { Outlet } from "react-router-dom";
import PublicRoute from "../publicRoute/PublicRoute";

const PublicOutlet = () => {
  return (
    <PublicRoute>
      <Outlet />
    </PublicRoute>
  );
};

export default PublicOutlet;

import { Outlet } from "react-router-dom";
import AuthGaurd from "./guard/AuthGuard";

const AppOutlet = () => {
  return (
    <AuthGaurd>
      <Outlet />
    </AuthGaurd>
  );
};

export default AppOutlet;

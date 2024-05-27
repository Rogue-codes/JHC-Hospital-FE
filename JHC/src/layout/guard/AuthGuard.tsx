/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface IAuthGaurdProps {
  children: ReactNode;
}

const AuthGaurd = ({ children }: IAuthGaurdProps) => {
  const isAuthenticated = useSelector((state:any)=>state?.auth?.isAuthenticated);
  console.log('isAuthenticated', isAuthenticated)
  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/auth/login" state={{ expired: true }} />;
};

export default AuthGaurd;

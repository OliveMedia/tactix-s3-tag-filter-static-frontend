import { FC } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { Layout } from "../layout";

interface IProtectedRoute {
  children: React.ReactNode;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (token === null) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;

import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isTokenExpired } from "@/utils/isTokenExpired";
import { Layout } from "../layout";
import { notifications } from "@mantine/notifications";

interface IProtectedRoute {
  children: React.ReactNode;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Check if the token is expired or does not exist
  if (token === null || isTokenExpired(token)) {
    // Remove the expired token from localStorage if it exists
    if (token !== null) {
      localStorage.removeItem("token");
    }
    notifications.show({
      title: "Session expired",
      message: "Please login again to access the application",
      color: "red",
    });
    // Redirect to the login page
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  // If the token is valid, render the children inside the Layout
  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;

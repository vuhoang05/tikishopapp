import { Navigate } from "react-router-dom";
import { useAuth } from "../useContext/AuthContext";
import { JSX } from "react";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  return user?.role === "admin" ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;

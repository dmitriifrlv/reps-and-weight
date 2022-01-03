import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useLocation, Navigate } from "react-router-dom";

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default AuthRoute;

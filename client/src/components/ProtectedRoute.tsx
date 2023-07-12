import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
}

const ProtectedRoute = ({ isLoggedIn }: ProtectedRouteProps) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  // can use children when using this commp as a wrapper.
  return <Outlet />;
};

export default ProtectedRoute;

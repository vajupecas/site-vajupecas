import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);

  const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || "/admin";

  if (!auth) return;

  if (auth.loading) {
    return;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to={`/${ADMIN_PATH}/login`} replace />;
  }

  return <>{children}</>;
}

import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [shouldNavigate, setShouldNavigate] = useState(!isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      setShouldNavigate(true);
    }
  }, [isAuthenticated]);

  return shouldNavigate ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;

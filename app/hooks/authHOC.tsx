import { useEffect } from "react";
import type { ReactElement, ComponentType } from "react";
import { ReactSession } from "react-client-session";
import { useAppDispatch } from "@/hooks/index";
import { setUser } from "@/stores/slices/auth-slice";
import { useNavigate, useLocation } from "react-router";

// Higher-Order Component to handle user session
export const withUserSession = <P extends object>(
  Component: ComponentType<P>
): ComponentType<P> => {
  const WithUserSession = (props: P): ReactElement => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      ReactSession.setStoreType("cookie");
      const userString = ReactSession.get("user");
      const user = userString ? JSON.parse(userString) : null;
      if (user) {
        dispatch(setUser(user));
      } else if (location.pathname.startsWith("/dashboard")) {
        navigate("/");
        return;
      }
    }, [navigate, dispatch, location.pathname]);

    return <Component {...props} />;
  };

  WithUserSession.displayName = `WithUserSession(${
    Component.displayName || Component.name || "Component"
  })`;

  return WithUserSession;
};

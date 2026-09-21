import { Navigate } from "react-router-dom";
import { RouteName } from "./routes";
import { useStore } from "../store/storeProvider";
import { observer } from "mobx-react-lite";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedUser = observer(({ children }: ProtectedRouteProps) => {
  const { userStore } = useStore();

  if (!userStore.user) {
    return <Navigate to={RouteName.LOGIN} replace />;
  }

  return <>{children}</>;
});

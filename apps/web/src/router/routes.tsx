import { Routes, Route, Navigate } from "react-router-dom";
import LoginFormPage from "../pages/LoginFormPage";
import AllEventsPage from "../pages/AllEventsPage";
import MyEventsPage from "../pages/MyEventsPage";
import AccountPage from "../pages/AccountPage";
import EventDetailPage from "../pages/EventDetail";
import AppLayout from "../components/AppLayout";
import type React from "react";
import { ProtectedUser } from "./protectedUser";
import { useStore } from "../store/storeProvider";
import { observer } from "mobx-react-lite";
import { useUser } from "../hooks/account/useUser";
import { Loader } from "../components/loader";
import { useEffect } from "react";

interface IRoutes {
  path?: string;
  component: React.ComponentType;
}

export enum RouteName {
  LOGIN = "/",
  ALLEVENTS = "/allEvents",
  ALLEVENTSTYPE = "/allEvents/:type",
  MYIVENTS = "/my",
  EVENTDETAIL = "/events/:id",
  ACCOUNT = "/account",
}

export const publicRout: IRoutes[] = [
  { path: RouteName.LOGIN, component: LoginFormPage },
];
export const privateRout: IRoutes[] = [
  { path: RouteName.ALLEVENTS, component: AllEventsPage },
  { path: RouteName.ALLEVENTSTYPE, component: AllEventsPage },
  { path: RouteName.MYIVENTS, component: MyEventsPage },
  { path: RouteName.EVENTDETAIL, component: EventDetailPage },
  { path: RouteName.ACCOUNT, component: AccountPage },
];

const AppRoutes = observer(() => {
  const { userStore } = useStore();
  const { isLoading, data } = useUser();
useEffect(() => {
  if (data) {
    userStore.setUser(data);
  }
}, [data, userStore]);
  const isAuth = userStore.user !== null;

  if (isLoading) return <Loader />;

  return (
    <Routes>
      {!isAuth && (
        <>
          {publicRout.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              Component={route.component}
            />
          ))}
          <Route path="*" element={<Navigate to={RouteName.LOGIN} replace />} />
        </>
      )}

      {isAuth && (
        <>
          <Route
            element={
              <ProtectedUser>
                <AppLayout />
              </ProtectedUser>
            }
          >
            {privateRout.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                Component={route.component}
              />
            ))}
          </Route>
          <Route
            path="*"
            element={<Navigate to={RouteName.ALLEVENTS} replace />}
          />
        </>
      )}
    </Routes>
  );
});
export default AppRoutes;

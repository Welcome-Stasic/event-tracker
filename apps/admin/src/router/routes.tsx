import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "../components/LoginPage";
import { Layout } from "../components/Layout";
import UsersPage from "../components/UsersPage";
import { useStore } from "../store/storeProvider";
import { useUser } from "../hooks/account/useUser";
import { Loader } from "../components/loader";
import AllEvents from "../components/events/AllEvents";
import { FormEventPage } from "../components/events/eventForm/FormEventPage";
import { FormPreviewPage } from "../components/events/previewEvent/FormPreviewPage";

// eslint-disable-next-line react-refresh/only-export-components
const NotFoundRedirect = () => {
  const { managerStore } = useStore();
  const { isLoading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = managerStore.isAuthenticated;

  useEffect(() => {
    if (isLoading) return;
    if (!isAuth) {
      navigate("/login", { replace: true });
      return;
    }
    if (location.state?.from) {
      navigate(location.state.from, { replace: true });
      return;
    }
    const referrer = document.referrer;
    if (referrer && new URL(referrer).origin === window.location.origin) {
      window.location.href = referrer;
      return;
    }
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/events", { replace: true });
  }, [isAuth, isLoading, navigate, location]);

  return <Loader />;
};

// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute = () => {
  const { managerStore } = useStore();
  const { isLoading } = useUser();
  const isAuth: boolean = managerStore.isAuthenticated;
  if (isLoading) return <Loader />;

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
export const routes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "/users", element: <UsersPage /> },
          { path: "/events", element: <AllEvents /> },
          { path: "/managers", element: <div style={{ padding: "40px" }}>Страница Менеджеры</div> },
          { path: "/settings", element: <div style={{ padding: "40px" }}>Страница Настройки</div> },
        ],
      },
      { path: "/events/create", element: <FormEventPage /> },
      { path: "/events/:id", element: <FormPreviewPage /> }, 
      { path: "/events/:id/edit", element: <FormEventPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundRedirect />,
  },
];
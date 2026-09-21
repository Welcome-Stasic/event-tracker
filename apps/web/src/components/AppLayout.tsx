import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";
import Header from "./Header";
import "../index.css";
import { RouteName } from "../router/routes";

export default function AppLayout() {
  const location = useLocation();
  const path = location.pathname;
  const state = location.state as { isEditing?: boolean } | null;

  const basePaths = [
    RouteName.ALLEVENTS,
    RouteName.MYIVENTS,
    RouteName.ACCOUNT,
  ];
  const showClose = !basePaths.toString().includes(path);

  const getTitle = () => {
    if (path === RouteName.ACCOUNT && state?.isEditing) {
      return "Редактирование";
    }
    switch (path) {
      case RouteName.ALLEVENTS:
        return "События";
      case RouteName.MYIVENTS:
        return "Мои события";
      case RouteName.ACCOUNT:
        return "Аккаунт";
      default:
        if (path.startsWith("/events/")) {
          return "Детали события";
        }
        return "Приложение";
    }
  };

  return (
    <div className="app-layout-wrapper">
      <Header title={getTitle()} showClose={showClose} />
      <main style={{ paddingTop: "56px", paddingBottom: "60px" }}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

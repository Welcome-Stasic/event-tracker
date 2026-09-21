import { useState } from "react";
import {
  EventsIcon,
  ManagersIcon,
  SettingsIcon,
  UsersIcon,
} from "../assets/icons";
import * as S from "../styles/styles.bottomMenu";
import { Link, Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/storeProvider";

const ChevronLeft = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) => (
  <S.ChevronButton onClick={onClick} disabled={disabled}>
    {"<"}
  </S.ChevronButton>
);
const ChevronRight = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) => (
  <S.ChevronButton onClick={onClick} disabled={disabled}>
    {">"}
  </S.ChevronButton>
);

export const Layout = observer(() => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const { eventsStore } = useStore();

  const menuItems = [
    { path: "/users", label: "Пользователи", icon: <UsersIcon /> },
    { path: "/events", label: "Ивенты", icon: <EventsIcon /> },
    { path: "/managers", label: "Менеджеры", icon: <ManagersIcon /> },
    { path: "/settings", label: "Настройки", icon: <SettingsIcon /> },
  ];

  const handlePrev = () => {
    eventsStore.prevPage();
  };

  const handleNext = () => {
    eventsStore.nextPage();
  };

  return (
    <>
      <Outlet />
      <S.Bottom>
        <S.BottomNav>
          {menuItems.map((item) => (
            <Link
              to={item.path}
              style={{ textDecoration: "none" }}
              key={item.path}
            >
              <S.NavItem
                active={activeTab === item.path}
                onClick={() => setActiveTab(item.path)}
              >
                {item.icon}
                {activeTab === item.path && <span>{item.label}</span>}
              </S.NavItem>
            </Link>
          ))}
        </S.BottomNav>
        <S.PaginationBtn>
        <ChevronLeft
          onClick={handlePrev}
          disabled={eventsStore.currentPage <= 1}
        />
        <ChevronRight
          onClick={handleNext}
          disabled={eventsStore.currentPage >= eventsStore.totalPages}
        />
        </S.PaginationBtn>
      </S.Bottom>
    </>
  );
});

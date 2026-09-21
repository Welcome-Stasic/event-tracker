import { useNavigate, useLocation } from "react-router-dom";
import * as S from "../styles/styles.BottomNav";
import { IconChannel, IconAddHome, IconPerson } from "../icon/icons";
import { RouteName } from "../router/routes";
import { useStore } from "../store/storeProvider";
import { observer } from "mobx-react-lite";

const BottomNav = observer(() => {
  const { themeStore } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <S.BottomNav theme={themeStore.theme}>
      <S.NavItem
        onClick={() => navigate(RouteName.ALLEVENTS)}
        active={isActive(RouteName.ALLEVENTS)}
      >
        <span role="img" aria-label="events">
          <IconAddHome
            color={isActive(RouteName.ALLEVENTS) ? "blue" : "gray"}
          />
        </span>
        <div>Все ивенты</div>
      </S.NavItem>

      <S.NavItem
        onClick={() => navigate(RouteName.MYIVENTS)}
        active={isActive(RouteName.MYIVENTS)}
      >
        <span role="img" aria-label="my-events">
          <IconChannel color={isActive(RouteName.MYIVENTS) ? "blue" : "gray"} />
        </span>
        <div>Мои ивенты</div>
      </S.NavItem>

      <S.NavItem
        onClick={() => navigate(RouteName.ACCOUNT)}
        active={isActive(RouteName.ACCOUNT)}
      >
        <span role="img" aria-label="account">
          <IconPerson color={isActive(RouteName.ACCOUNT) ? "blue" : "gray"} />
        </span>
        <div>Аккаунт</div>
      </S.NavItem>
    </S.BottomNav>
  );
});

export default BottomNav;

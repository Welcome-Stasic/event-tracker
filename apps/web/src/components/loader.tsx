import { observer } from "mobx-react-lite";
import * as S from "../styles/styles.loader";
import { useStore } from "../store/storeProvider";
import { CircularProgress } from "@mui/material";

export const Loader = observer(() => {
  const { themeStore } = useStore();
  return (
    <S.ContainerLoader theme={themeStore.theme}>
      <CircularProgress aria-label="Loading…" />
    </S.ContainerLoader>
  );
});

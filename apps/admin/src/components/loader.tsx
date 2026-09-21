import { observer } from "mobx-react-lite";
import * as S from "../styles/styles.loader";

export const Loader = observer(() => {
  return (
    <S.ContainerLoader>
      <S.SVGLoader viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" />
      </S.SVGLoader>
    </S.ContainerLoader>
  );
});

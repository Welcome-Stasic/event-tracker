import * as S from "../../../styles/styles.eventForm";
import BackArrow from "../../../assets/BackArrow.svg";
import { useNavigate } from "react-router-dom";
interface HeaderProps {
  title: string;
}
export const HeaderEvent = ({ title }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <S.HeaderContainer>
      <S.HeaderWrapper>
        <S.BackBtn onClick={() => navigate(-1)}>
          <img src={BackArrow} alt="назад" width={24} height={24} />
        </S.BackBtn>
        {title}
      </S.HeaderWrapper>
    </S.HeaderContainer>
  );
};

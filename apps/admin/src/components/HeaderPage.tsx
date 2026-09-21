import { FilterIcon } from "../assets/icons";
import * as S from "../styles/styles.header";
import SearchIconSrc from "../assets/search.svg";
import PlusIconSrc from "../assets/plus.svg";

interface HeaderProps {
  title: string;
  textButton: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onClickFilter: () => void;
  onClickAddModal: () => void;
}

export const HeaderPage = ({
  title,
  textButton,
  searchValue,
  onSearchChange,
  onClickFilter,
  onClickAddModal,
}: HeaderProps) => {
  return (
    <>
      <S.HeaderWrapper>
        <div style={{ width: "1120px" }}>
          <S.Header>{title}</S.Header>
          <S.Controls>
            <S.SearchWrapper>
              <S.SearchIconWrapper>
                <img src={SearchIconSrc} alt="search" width={20} height={20} />
              </S.SearchIconWrapper>
              <S.SearchInput
                placeholder="Поиск"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </S.SearchWrapper>

            <S.FilterButton onClick={() => onClickFilter()}>
              <FilterIcon />
            </S.FilterButton>

            <S.AddButton onClick={() => onClickAddModal()}>
              <img src={PlusIconSrc} alt="add" width={20} height={20} />
              {textButton}
            </S.AddButton>
          </S.Controls>
        </div>
      </S.HeaderWrapper>
    </>
  );
};

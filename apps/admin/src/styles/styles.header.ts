import styled from "@emotion/styled";

export const Header = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #09090b;
  margin-bottom: 20px;
`;
export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

export const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 16px 0 48px;
  border: 1px solid #aad3ff;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  &::placeholder {
    color: #71717a;
  }
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
`;

export const FilterButton = styled.button`
  width: 40px;
  height: 40px;
  background: #007AFF;
  border: none;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const AddButton = styled.button`
  height: 40px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

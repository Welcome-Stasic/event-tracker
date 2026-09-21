import styled from "@emotion/styled";

export const HeaderContainer = styled.header<{ theme: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 56px;
  background: ${(p) => (p.theme === "light" ? "#fbfbfb" : "#212121")};
  color: ${(p) => (p.theme === "light" ? "#333333" : "#ffffff")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
  border-bottom: ${(p) => (p.theme === "light" ? "0.5px solid #d0d0d0" : "")};
  z-index: 999;
`;

export const CloseButton = styled.button<{ theme: string }>`
  width: 48px;
  height: 48px;
  background: none;
  border: none;
  color: ${(p) => (p.theme === "light" ? "#0000000" : "#fff")};
  font-size: 32px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const Title = styled.h1`
  margin: 0;
  flex: 1;
  font-size: 19px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MenuButton = styled.button<{ theme: string }>`
  width: 48px;
  height: 48px;
  color: ${(p) => (p.theme === "light" ? "#333333" : "#ffffff")};
  background: none;
  border: none;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;
export const Menu = styled.div<{ theme: string }>`
  border: 1px solid ${(p) => (p.theme === "light" ? "#d0d0d0" : "#ffffff5e")};
  position: absolute;
  top: 50px;
  right: 10px;
  min-width: 150px;
  background: ${(p) => (p.theme === "light" ? "#fbfbfb" : "#212121")};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
`;

export const BlockHidden = styled.div`
  width: 48px;
`;

export const MenuItem = styled.div<{ theme: string }>`
  padding: 12px 16px;
  font-size: 16px;
  color: ${(p) => (p.theme === "light" ? "#333333" : "#ffffff")};
  cursor: pointer;
  transition: background 0.2s;
  text-align: left;

  &:hover {
    background: ${(p) => (p.theme === "light" ? "#f0f0f0" : "#2c2c2e")};
  }
`;

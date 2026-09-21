import styled from "@emotion/styled";

export const Bottom = styled.div`
  margin-top: 40px;
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 12px;
`;

export const BottomNav = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 12px;
  background: #007AFF1A;
  border-radius: 9999px;
  max-width: 520px;
`;

export const NavItem = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  border: none;
  border-radius: 99px;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.25s ease;
  padding: ${(props) => (props.active ? "10px 12px 12px 10px" : "10px 10px 10px 10p")};
  background: ${(props) => (props.active ? "#007AFF" : "#007AFF")};
  color: ${(props) => (props.active ? "#ffffff" : "#ffffff")};
  min-width: ${(props) => (props.active ? "160px" : "40px")};
`;
export const ChevronButton = styled.button`
  width: 40px;
  height: 40px;
  background: #007aff;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  font-weight: 600;
`;
export const PaginationBtn = styled.div`
    display: flex;
    gap: 11px;
    padding: 12px;
    background: #007AFF1A;
    border-radius: 9999px;
`;

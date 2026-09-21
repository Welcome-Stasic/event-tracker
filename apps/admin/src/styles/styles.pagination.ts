import styled from "@emotion/styled";

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 35px 0;
`;

export const Dot = styled.div<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "#007aff" : "#d1d5db")};
`;

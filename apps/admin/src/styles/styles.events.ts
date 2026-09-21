import styled from "@emotion/styled";

export const EventsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const EventsList = styled.div<{ empty?: boolean; bg?: string }>`
  max-width: 1120px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
export const EmptyPlaceholder = styled.div`
  color: #aaa;
  padding: 8px 0;
  width: 100%;
  text-align: center;
  font-size: 1rem;
`;

import styled from "@emotion/styled";

export const PreviewPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  padding: 10px 0px 0px 0px;
`;

export const PreviewContent = styled.div`
  max-width: 1120px;
  width: 100%;
  position: relative;
`;

export const DateTime = styled.div`
  padding: 10px 24px;
  border-radius: 16px;
  border: 1px solid #00000033;
  width: max-content;
  font-size: 18px;
  color: #4b5563;
  margin-bottom: 26px;
`;

export const Description = styled.div`
  font-size: 15px;
  color: #707579;
  margin-bottom: 50px;
  white-space: pre-wrap;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
`;

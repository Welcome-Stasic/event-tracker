import styled from "@emotion/styled";

export const ConfirmOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConfirmDialog = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 40px;
  width: 460px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

export const ConfirmTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #09090b;
`;

export const ConfirmButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const ConfirmDeleteBtn = styled.button`
  background: #e5393533;
  color: #e53935b2;
  border: none;
  border-radius: 12px;
  padding: 12px 40px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
`;
export const ConfirmCancelBtn = styled.button`
  background: linear-gradient(135deg, #7086f3, #1e7ee8);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 40px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
`;

import styled from "@emotion/styled";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  position: fixed;
  right: 15%;
  top: 184px;
  width: 480px;
  height: 326px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #aad3ff;
  z-index: 1001;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  padding: 20px 30px 0px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

export const ColumnTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #09090b;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const Content = styled.div`
  position: relative;
  flex: 1;
  padding: 22px 60px 0px;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  z-index: 2;
`;

export const Section = styled.div`
  flex: 1;
`;

export const SectionTitle = styled.p`
  font-weight: 600;
  color: #09090b;
  margin-bottom: 12px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  width: max-content;
  gap: 18px;
  cursor: pointer;
  font-size: 14px;
  color: #111827;
  padding: 4px 0;
`;

export const StyledCheckbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #007aff;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  position: relative;

  &:checked {
    background: white;
  }

  &:checked::after {
    content: "✓";
    position: absolute;
    color: #007aff;
    font-size: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -52%);
  }
`;

export const BottomBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 3;
  padding: 22px 30px 20px 60px;
`;

export const ApplyButton = styled.button`
  height: 40px;
  background: linear-gradient(135deg, #7086f3, #1e7ee8);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 65px;
  font-size: 14px;
  font-weight: 500;
  align-self: flex-end;
  cursor: pointer;
`;

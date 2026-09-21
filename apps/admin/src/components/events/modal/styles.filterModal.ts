import styled from "@emotion/styled";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  padding: 20px;
  position: fixed;
  right: 95px;
  top: 130px;
  width: 380px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #aad3ff;
  z-index: 1001;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
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
  display: flex;
  justify-content: space-between;
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
  margin-bottom: 7px;
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
`;
export const InputWrapper = styled.div`
  width: calc(50% - 10px);
  position: relative;
`;
export const Label = styled.div`
  position: absolute;
  left: 16px;
  top: -10px;
  background: white;
  padding: 0 6px;
  font-size: 14px;
  color: #a2acb0;
  font-weight: 600;
  z-index: 1;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

export const ResetButton = styled.button`
  flex: 1;
  height: 40px;
  background: transparent;
  border: 1.5px solid #aad3ff;
  border-radius: 10px;
  color: #1e7ee8;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #f0f7ff;
  }
`;

export const ApplyButton = styled.button`
  flex: 2;
  height: 40px;
  background: linear-gradient(135deg, #7086f3, #1e7ee8);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
`;

export const CalendarIconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

export const InputDate = styled.input`
  height: 48px;
  width: 100%;
  padding: 0 16px 0 16px;
  border: 1.8px solid #aad3ff;
  border-radius: 14px;
  font-size: 14px;
  color: #111827;
  background: white;
  outline: none;

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  &:focus {
    border-color: #1e7ee8;
  }
`;

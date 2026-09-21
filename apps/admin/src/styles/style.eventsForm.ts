import styled from "@emotion/styled";

export const FormContainer = styled.div`
  width: 100%;
  max-width: 1120px;
`;

export const FormEvent = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 80px;
`;

export const Field = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

export const FieldLabel = styled.label<{
  isFocused?: boolean;
  hasError?: boolean;
}>`
  position: absolute;
  left: 12px;
  top: 0;
  transform: translateY(-50%);
  background: #ffffff;
  padding: 0 6px;
  color: ${({ hasError, isFocused }) =>
    hasError ? "#ef4444" : isFocused ? "#1677ff" : "#6b7280"};
  font-size: 13px;
  font-weight: 500;
  pointer-events: none;
  z-index: 2;
`;

export const Input = styled.input<{
  isFocused?: boolean;
  disabled?: boolean;
  hasError?: boolean;
}>`
  width: 100%;
  padding: 16px;
  border: 1.5px solid
    ${(p) =>
      p.hasError
        ? "#ef4444"
        : p.disabled
          ? "#A2ACB0"
          : p.isFocused
            ? "#007AFF"
            : "#A2ACB0"};
  border-radius: 14px;
  background: #ffffff;
  color: #09090b;
  font-size: 15px;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "text")};

  &::placeholder {
    color: #c4c9cc;
  }

  &:focus {
    outline: none;
    border: 1.5px solid #007aff;
  }
`;

export const Textarea = styled.textarea<{
  isFocused?: boolean;
  disabled?: boolean;
  hasError?: boolean;
}>`
  width: 100%;
  min-height: 100px;
  padding: 16px;
  border: 1.5px solid
    ${(p) =>
      p.hasError
        ? "#ef4444"
        : p.disabled
          ? "#A2ACB0"
          : p.isFocused
            ? "#007AFF"
            : "#A2ACB0"};
  border-radius: 14px;
  background: #ffffff;
  font-size: 15px;
  color: #09090b;
  font-family: inherit;
  resize: vertical;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "text")};

  &::placeholder {
    color: #a2acb0;
  }

  &:focus {
    outline: none;
    border: 1.5px solid #007aff;
  }
`;

export const Select = styled.select<{
  disabled?: boolean;
  hasError?: boolean;
  isFocused?: boolean;
}>`
  width: 100%;
  padding: 16px;
  border: 1.5px solid
    ${(p) =>
      p.hasError
        ? "#ef4444"
        : p.disabled
          ? "#A2ACB0"
          : p.isFocused
            ? "#007AFF"
            : "#A2ACB0"};
  border-radius: 14px;
  background: #ffffff;
  color: #09090b;
  font-size: 15px;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;

  &:focus {
    outline: none;
    border: 1.5px solid #007aff;
  }
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 17px;
  font-weight: 600;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  opacity: ${(p) => (p.disabled ? 0.6 : 1)};
  margin-top: 20px;
`;

export const ImageContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

export const Image = styled.div<{ isEdit?: boolean }>`
  width: calc(50% - 10px);
  height: 206px;
  background-color: #ecf1ff;
  border-radius: 10px;
  position: relative;

  ${({ isEdit }) =>
    isEdit &&
    `
    cursor: pointer;
  `}
`;
export const PlusCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 33px;
  height: 33px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0px 0px 0 rgba(0, 0, 0, 0.04),
    0 0px 1px 0 rgba(0, 0, 0, 0.12);

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: #007aff;
    border-radius: 1px;
  }

  &::before {
    width: 16px;
    height: 2px;
  }

  &::after {
    width: 2px;
    height: 16px;
  }
`;
export const DeleteCircle = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 33px;
  height: 33px;
  background-color: #e53935;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  &::before {
    content: "";
    position: absolute;
    width: 16px;
    height: 2px;
    background: white;
    transform: rotate(45deg);
  }
  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 2px;
    background: white;
    transform: rotate(-45deg);
  }
`;

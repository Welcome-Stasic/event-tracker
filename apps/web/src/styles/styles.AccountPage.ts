import styled from "@emotion/styled";

interface ThemeProps {
  theme: string;
}

export const AccountContainer = styled.div``;

export const AccountCard = styled.div<ThemeProps>`
  padding: 16px;
  padding-bottom: 76px;
  background: ${(p) => (p.theme === "light" ? "#fbfbfb" : "#212121")};
  border-radius: 16px;
  color: ${(p) => (p.theme === "light" ? "#000000" : "#ffffff")};
`;

export const AccountHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AccountHeaderActions = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  display: flex;
  gap: 8px;
  z-index: 5;
`;

export const AccountAction = styled.button<{ theme: string }>`
  width: 48px;
  height: 48px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  display: grid;
  place-items: center;
  cursor: pointer;
  background: ${(p) => (p.theme === "light" ? "#4378FF1A" : "#2990FF26")};
  color: #1f6feb;

  &.save {
    background: #007aff;
    color: white;
  }
  &.cancel {
    background: #4378ff1a;
    color: #007aff;
  }
`;

export const AccountAvatarWrapper = styled.div`
  display: grid;
  place-items: center;
`;

export const AccountAvatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
`;

export const AccountChangePhoto = styled.button`
  margin: 8px 0 10px;
  font-size: 15px;
  color: #1f6feb;
  background: none;
  border: none;
  cursor: pointer;
`;

export const AccountName = styled.div`
  text-align: center;
`;

export const AccountFullname = styled.div`
  font-weight: 500;
  font-size: 17px;
  line-height: 153%;
`;

export const AccountMeta = styled.div`
  color: #6b7280;
  font-size: 16px;
  line-height: 150%;
`;

export const Field = styled.div`
  position: relative;
  margin-top: 12px;
`;

export const FieldLabel = styled.label<{
  isEditing?: boolean;
  isFocused?: boolean;
  theme: string;
}>`
  position: absolute;
  left: 12px;
  top: 0;
  transform: translateY(-50%);
  background: ${(p) => (p.theme === "light" ? "#fbfbfb" : "#212121")};
  padding: 0 6px;
  color: ${(props) => {
    if (props.isFocused) return "#1f6feb";
    return "#9ca3af";
  }};
  font-size: 15px;
  line-height: 1;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 2;
`;

export const Input = styled.input<{ isEditing?: boolean; theme: string }>`
  width: 100%;
  padding: 16px;
  border: 2px solid ${(p) => (p.theme === "light" ? "#e5e7eb" : "#ffffff22")};
  border-radius: 10px;
  background: ${(p) => (p.theme === "light" ? "#ffffff" : "transparent")};
  color: ${(p) => (p.theme === "light" ? "#000000" : "#ffffff")};
  font-size: 16px;
  line-height: 150%;
  box-sizing: border-box;

  &:focus {
    border-color: #1f6feb;
    outline: none;
  }

  &[disabled],
  &[readonly] {
    background: transparent !important;
    border-color: ${(p) => (p.theme === "light" ? "#e5e7eb" : "#ffffff11")};
    cursor: default;
  }
`;

export const TextareaWrapper = styled.div<{
  isEditing?: boolean;
  theme: string;
}>`
  padding: 16px;
  border: 2px solid ${(p) => (p.theme === "light" ? "#e5e7eb" : "#ffffff22")};
  border-radius: 10px;
  background: transparent;
  overflow-y: auto;
  margin-bottom: 20px;

  &:focus-within {
    border-color: #1f6feb;
  }
`;

export const Textarea = styled.textarea<{ theme: string }>`
  width: 100%;
  min-height: 135px;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  font-size: 16px;
  line-height: 150%;
  color: ${(p) => (p.theme === "light" ? "#000000" : "#ffffff")};

  &[disabled] {
    color: ${(p) => (p.theme === "light" ? "#000000" : "#ffffff")};
  }
`;

export const WebsiteField = styled.div`
  position: relative;
  margin-top: 30px;
`;

export const WebsiteInput = styled.input<{
  isEditing?: boolean;
  readOnly?: boolean;
  theme: string;
}>`
  width: 100%;
  padding: 16px;
  border: 2px solid transparent;
  border-radius: 10px;
  background: ${(p) =>
    p.theme === "light"
      ? "rgba(67, 120, 255, 0.05)"
      : "rgba(67, 120, 255, 0.15)"};
  color: #1f6feb;
  font-size: 16px;
  line-height: 150%;
  cursor: ${(props) => (props.readOnly ? "pointer" : "text")};
  transition: all 0.2s ease;
  box-sizing: border-box;

  ${(props) =>
    props.isEditing &&
    `
    border-color: ${props.theme === "light" ? "#e5e7eb" : "#ffffff22"};
    background: ${props.theme === "light" ? "white" : "transparent"};
    color: ${props.theme === "light" ? "#000000" : "white"};
    
    &:focus {
      border-color: #1f6feb;
      outline: none;
    }
  `}
`;

export const CopyButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const EditCheckboxList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
`;

export const EditCheckboxItem = styled.label<{
  checked: boolean;
  theme: string;
}>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background: ${(p) => {
    if (p.checked) return "#4378FF66";
    return p.theme === "light" ? "#f3f4f6" : "#ffffff11";
  }};
  color: ${(p) => {
    if (p.checked) return "#1f6feb";
    return p.theme === "light" ? "#4b5563" : "#ffffffcc";
  }};
  border: ${(p) => p.checked ? "2px solid #4378FF" : "none"};
  transition: all 0.2s ease;

  input {
    display: none;
  }
`;

export const AccountTagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
`;

export const TagsBox = styled.div<ThemeProps>`
  border: 2px solid ${(p) => (p.theme === "light" ? "#e5e7eb" : "#ffffff22")};
  border-radius: 10px;
  padding: 24px 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 48px;
  background: transparent;
`;

export const TechTag = styled.span<ThemeProps>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  background: ${(p) => (p.theme === "light" ? "#f3f4f6" : "#ffffff11")};
  color: ${(p) => (p.theme === "light" ? "#374151" : "white")};
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
`;

export const AccountTag = styled(TechTag)``;

export const RemoveTag = styled.button`
  background: none;
  border: none;
  color: #707579;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

export const TechInput = styled.input<ThemeProps>`
  width: 100%;
  border: 2px solid ${(p) => (p.theme === "light" ? "#e5e7eb" : "#ffffff22")};
  border-radius: 8px;
  font-size: 15px;
  background: ${(p) => (p.theme === "light" ? "white" : "transparent")};
  color: ${(p) => (p.theme === "light" ? "#000000" : "white")};
  padding: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: #1f6feb;
    outline: none;
  }
`;

export const AddButton = styled.button`
  padding: 12px 28px;
  background: #4378ff1a;
  color: #007aff;
  border: none;
  border-radius: 14px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DirectionEditContainer = styled.div<{
  isEditing?: boolean;
  theme: string;
}>`
  border: 2px solid ${(p) => (p.theme === "light" ? "#e5e7eb" : "#ffffff22")};
  border-radius: 10px;
  background: transparent;
  padding: 12px 14px;
  margin-top: 30px;
  transition: all 0.2s ease;

  ${(p) => p.isEditing && `&:focus-within { border-color: #1f6feb; }`}
`;

export const Select = styled.select<{ isEditing?: boolean; theme: string }>`
  width: 100%;
  padding: 16px;
  border: 2px solid ${(p) => (p.theme === "light" ? "#e5e7eb" : "#ffffff22")};
  border-radius: 10px;
  font-size: 16px;
  background: ${(p) => (p.theme === "light" ? "white" : "#212121")};
  color: ${(p) => (p.theme === "light" ? "#000000" : "white")};
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;

  &:focus {
    border-color: #1f6feb;
    outline: none;
  }
`;

import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 10px;

  input {
    padding: 12px 16px;
    font-size: 16px;
    outline: none;
  }
`;

export const InputWrapper = styled.div<{ error: boolean; theme: string }>`
  width: 100%;
  position: relative;
  margin-bottom: 20px;

  input {
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.01em;
    border: 2px solid
      ${(p) =>
        p.theme === "light"
          ? "rgba(0, 0, 0, 0.05)"
          : "rgba(255, 255, 255, 0.1)"};
    border-radius: 14px;
    padding: 12px 16px;
    margin-bottom: 8px;
    background: transparent;
    color: ${(p) => (p.theme === "light" ? "#111827" : "#ffffff")};
    box-sizing: border-box;
    transition: border-color 0.2s;
  }

  label {
    position: absolute;
    left: 16px;
    top: 19px;
    color: #a2acb0;
    background: ${(p) => (p.theme === "light" ? "#fbfbfb" : "#212121")};
    padding: 0 4px;
    font-size: 16px;
    pointer-events: none;
    transition: 0.2s;
    z-index: 1;
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    top: -10px;
    left: 8px;
    color: #007aff;
    font-weight: 600;
    font-size: 15px;
    line-height: 147%;
    letter-spacing: 0.01em;
  }

  input:focus {
    border-color: #007aff;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: ${(p) =>
      p.theme === "light" ? "#000" : "#fff"} !important;
    transition: background-color 9999s ease-in-out 0s;
  }

  ${({ error }) =>
    error &&
    css`
      input {
        border-color: #e53935 !important;
      }
      label {
        color: #e53935 !important;
      }
    `}
`;

export const InputHint = styled.div`
  color: #e53935;
  font-size: 12px;
  margin-bottom: 8px;
  text-align: center;
  word-break: break-word;
`;

export const SubmitButton = styled.button<{ disabled: boolean; theme: string }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 24px;
  display: flex;
  justify-content: center;
  background: ${({ disabled }) => (disabled ? "#b3d1ff" : "#007aff")};
  width: calc(100% - 32px);
  max-width: 400px;
  margin: 0 auto;
  padding: 15px 12px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 17px;
  color: #fff;
  border: 1px solid ${(p) => (p.theme === "light" ? "#e6e6e6" : "transparent")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s;
`;

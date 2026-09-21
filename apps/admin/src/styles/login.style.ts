import styled from "@emotion/styled";
import bgrd from "../assets/bgrd.png";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${bgrd});
  background-size: cover;
  background-position: center;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;
export const ImageContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;
export const Image = styled.div`
  width: calc(50% - (10px));
  height: 206px;
  background-color: #ecf1ff;
  border-radius: 10px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 460px;
  background: white;
  border-radius: 16px;
  padding: 78px 49px;
  box-shadow: 0 115px 108.7px 0 rgba(0, 0, 0, 0.1);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 3px;
    background: linear-gradient(90deg, #7086f3, #1e7ee8);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.2;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 44px;
  color: #1a1a1a;
  font-weight: 600;
`;

export const Form = styled.form``;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

export const Input = styled.input<{ error?: boolean; valEmpty?: boolean }>`
  width: 100%;
  padding: 16px 18px;
  border: 2px solid ${({ valEmpty }) => (valEmpty ? "#aad3ff" : "#e5e7eb")};
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  ${({ error }) => error && `border-color: #c53939;`}
  &:focus {
    border-color: #aad3ff;
    outline: none;
  }
  transition: 0.2s;
`;

export const Label = styled.label`
  position: absolute;
  left: 18px;
  top: -10px;
  background: white;
  padding: 0 6px;
  font-size: 14px;
  color: #a2acb0;
  font-weight: 600;
  z-index: 1;
`;

export const SubmitButton = styled.button<{ event?: boolean }>`
  width: 100%;
  padding: 16px;
  margin-top: ${({ event }) => (event ? "0px" : "80px")};
  background: linear-gradient(90deg, #7086f3, #1e7ee8);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  color: #c53939;
  text-align: center;
  margin: 16px 0;
  font-size: 14.5px;
`;
export const Textarea = styled.textarea<{ valEmpty?: boolean }>`
  padding: 16px 18px;
  width: 100%;
  min-height: 135px;
  border: 2px solid ${({ valEmpty }) => (valEmpty ? "#aad3ff" : "#e5e7eb")};
  border-radius: 10px;
  outline: none;
  resize: none;
  background: transparent;
  font-size: 16px;
  line-height: 150%;
  color: #000000;

  &[disabled] {
    color: #000000;
  }
`;
export const Select = styled.select<{ event?: boolean; valEmpty?: boolean }>`
  width: 100%;
  padding: 16px;
  border: 2px solid ${({ valEmpty }) => (valEmpty ? "#aad3ff" : "#e5e7eb")};
  border-radius: 10px;
  font-size: 16px;
  background: white;
  color: #000000;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;

  &:focus {
    border-color: ${({ event }) => (event ? "#aad3ff" : "#1f6feb")};
    outline: none;
  }
  transition: 0.2s;
`;

import styled from "@emotion/styled";

export const Container = styled.div<{ theme: string }>`
  position: relative;
  background: ${(p) => (p.theme === "light" ? "#fff" : "#212121")};
`;

export const Header = styled.div<{ gradient: string }>`
  height: 256px;
  position: relative;
  z-index: 1;
  background-image: ${({ gradient }) => gradient};
`;

export const Grid = styled.div`
  position: relative;
  z-index: 10;
  border-radius: 40px 40px 0 0;
`;

export const Card = styled.div`
  max-width: 600px;
  margin: -24px auto 0 auto;
  border-radius: 20px;
  overflow: hidden;
`;

export const Info = styled.div<{ theme: string }>`
  background: ${(p) => (p.theme === "light" ? "#fff" : "#212121")};
  padding: 16px 14px 16px 14px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 590;
  margin-bottom: 8px;
`;

export const ChipsRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

export const Chip = styled.span<{ muted?: boolean; theme: string }>`
  display: inline-flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  background-color: ${(p) => (p.theme === "light" ? "#EFEFF4" : "#FFFFFF14")};
  color: ${(p) => (p.theme === "light" ? "#666" : "#FFF")};
`;

export const Description = styled.div`
  font-size: 15px;
  line-height: 22px;
  color: #707579;
  margin-bottom: 16px;
`;

export const CtaButton = styled.button<{
  gradient: string;
  disabled?: boolean;
}>`
  display: block;
  width: 100%;
  padding: 0px 12px;
  height: 40px;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
  background-image: ${({ gradient }) => gradient};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  color: #007aff;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 0;
`;

export const NotFound = styled.div`
  margin-top: 16px;
`;

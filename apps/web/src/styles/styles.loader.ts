import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const rotate = keyframes`
  100% { transform: rotate(360deg); }
`;

const dash = keyframes`
  0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 90, 200; stroke-dashoffset: -35px; }
  100% { stroke-dashoffset: -125px; }
`;
export const ContainerLoader = styled.div<{ theme: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => (p.theme === "light" ? "#ffffff" : "#212121")};
  z-index: 999;
`;
export const SVGLoader = styled.svg`
  width: 3.25em;
  transform-origin: center;
  animation: ${rotate} 2s linear infinite;
  circle {
    fill: none;
    stroke: rgb(0, 122, 255);
    stroke-width: 10;
    stroke-dasharray: 2, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
  }
`;

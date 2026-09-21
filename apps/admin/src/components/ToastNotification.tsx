import React, { useEffect } from "react";
import styled from "@emotion/styled";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <ToastContainer type={type}>{message}</ToastContainer>;
};

const ToastContainer = styled.div<{ type: "success" | "error" }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: ${({ type }) => (type === "success" ? "#4CAF50" : "#F44336")};
  color: white;
  padding: 14px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  font-size: 15px;
  font-weight: 500;
  z-index: 10000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

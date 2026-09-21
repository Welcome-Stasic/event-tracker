import React from "react";

import styled from "@emotion/styled";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 35px 0;
`;

export const PageDot = styled.div<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "#007aff" : "#d1d5db")};
  cursor: pointer;
`;

type UsersPaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const UsersPagination: React.FC<UsersPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationWrapper>
      {Array.from({ length: totalPages }).map((_, index) => (
        <PageDot
          key={index}
          active={index === currentPage}
          onClick={() => onPageChange(index)}
        />
      ))}
    </PaginationWrapper>
  );
};

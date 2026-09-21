import * as S from "../styles/styles.pagination";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <S.Pagination>
      {pages.map((page) => (
        <S.Dot
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        />
      ))}
    </S.Pagination>
  );
};

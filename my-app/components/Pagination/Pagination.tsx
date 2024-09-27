import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [current, setCurrent] = useState(currentPage);
  const [startIndex, setStartIndex] = useState(0);

  const handlePageChange = (page: number) => {
    setCurrent(page);
    onPageChange(page);

    if (page > startIndex + 10) {
      setStartIndex(page - 10);
    } else if (page <= startIndex) {
      setStartIndex(Math.max(0, page - 1));
    }
  };

  const pagesArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const visiblePages = pagesArray.slice(startIndex, startIndex + 10);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {current > 1 && (
            <PaginationPrevious
              href='#'
              onClick={() => handlePageChange(current - 1)}
            />
          )}
        </PaginationItem>

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href='#'
              isActive={current === page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 10 && current < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          {current < totalPages && (
            <PaginationNext
              href='#'
              onClick={() => handlePageChange(current + 1)}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          className={`${
            currentPage === 1
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }`}
          onClick={() => onPageChange(currentPage - 1)}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink>{currentPage}</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationNext
          className={`${
            currentPage === totalPages
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }`}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);

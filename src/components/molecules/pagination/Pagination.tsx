"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

function getPaginationRange(
  currentPage: number,
  lastPage: number,
  delta: number = 2,
): (number | "...")[] {
  if (lastPage <= 7) {
    return Array.from({ length: lastPage }, (_, i) => i + 1);
  }

  const range: (number | "...")[] = [];
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(lastPage - 1, currentPage + delta);

  range.push(1);
  if (left > 2) range.push("...");

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < lastPage - 1) range.push("...");
  range.push(lastPage);

  return range;
}

export function PaginationControls({
  currentPage,
  lastPage,
  perPage,
  total,
  onPageChange,
}: PaginationControlsProps) {
  const pages = getPaginationRange(currentPage, lastPage);

  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);

  return (
    <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between md:gap-0">
      <p className="text-muted-foreground w-full text-center text-sm md:text-left">
        Menampilkan {from} - {to} dari {total} data
      </p>

      <Pagination className="font-normal md:justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {pages.map((page, idx) =>
            page === "..." ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <span className="px-3">…</span>
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                currentPage < lastPage && onPageChange(currentPage + 1)
              }
              className={
                currentPage === lastPage ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

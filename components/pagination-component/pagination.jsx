"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Pagination = ({
  onLimitChange,
  limit,
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  const range = (start, end) => {
    const output = [];
    for (let i = start; i <= end; i++) output.push(i);
    return output;
  };

  const paginationRange = () => {
    const totalPageNumbers = siblingCount * 2 + 5;
    if (totalPages <= totalPageNumbers) return range(1, totalPages);

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;
    const pages = [];

    if (!showLeftDots && showRightDots) {
      pages.push(...range(1, siblingCount * 2 + 3), "...", totalPages);
    } else if (showLeftDots && !showRightDots) {
      pages.push(1, "...", ...range(totalPages - (siblingCount * 2 + 2), totalPages));
    } else {
      pages.push(1, "...", ...range(leftSibling, rightSibling), "...", totalPages);
    }

    return pages;
  };

  const pages = paginationRange();

  return (
    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <Limit onLimitChange={onLimitChange} limit={limit} />

      <div className="overflow-x-auto">
        <nav className="flex flex-wrap items-center gap-1 rounded-md border border-border p-1 bg-background shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {pages.map((page, index) =>
            page === "..." ? (
              <span
                key={index}
                className="px-3 py-1 text-sm text-muted-foreground bg-muted rounded-md border border-border"
              >
                ...
              </span>
            ) : (
              <Button
                key={index}
                variant={currentPage === page ? "default" : "ghost"}
                onClick={() => onPageChange(page)}
                className={cn(
                  "px-3 py-1 h-auto min-w-[36px] text-sm",
                  currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {page}
              </Button>
            )
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

const Limit = ({ onLimitChange, limit }) => (
  <div className="flex items-center gap-2">
    <label htmlFor="limit-select" className="text-sm text-muted-foreground">
      Rows:
    </label>
    <select
      id="limit-select"
      value={limit}
      onChange={(e) => onLimitChange(parseInt(e.target.value))}
      className="px-2 py-1 text-sm rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {[2, 5, 10, 15, 20].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  </div>
);

export default Pagination;

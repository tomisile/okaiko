"use client"

import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="border-[oklch(0.88_0.02_80)] text-[oklch(0.35_0.18_20)]"
      >
        Previous
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 ${
            page === currentPage
              ? "bg-[oklch(0.35_0.18_20)] text-white"
              : "border-[oklch(0.88_0.02_80)] text-[oklch(0.35_0.18_20)] bg-transparent"
          }`}
          variant={page === currentPage ? "default" : "outline"}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="border-[oklch(0.88_0.02_80)] text-[oklch(0.35_0.18_20)]"
      >
        Next
      </Button>
    </div>
  )
}

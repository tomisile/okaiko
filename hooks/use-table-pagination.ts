"use client"

import { useState } from "react"

interface UseTablePaginationProps<T> {
  items: T[]
  itemsPerPage?: number
}

export function useTablePagination<T>({ items, itemsPerPage = 10 }: UseTablePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = items.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    const pageNum = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(pageNum)
  }

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
  }
}

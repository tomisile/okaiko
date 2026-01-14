"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"

interface UseFetchState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
}

export function useFetch<T>(endpoint: string, dependencies: unknown[] = []) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }))
        const data = await apiClient.get<T>(endpoint)
        if (isMounted) {
          setState({ data, isLoading: false, error: null })
        }
      } catch (err) {
        if (isMounted) {
          setState({
            data: null,
            isLoading: false,
            error: err instanceof Error ? err : new Error("Unknown error"),
          })
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, dependencies)

  return state
}

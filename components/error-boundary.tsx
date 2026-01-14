"use client"

import type React from "react"
import { Component, type ErrorInfo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[v0] Error caught in boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="edo-coral-accent p-8 max-w-md text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-[oklch(0.35_0.18_20)] mb-2">Something Went Wrong</h1>
            <p className="text-[oklch(0.45_0_0)] mb-4">{this.state.error?.message || "An unexpected error occurred"}</p>
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.reload()
              }}
              className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white"
            >
              Reload Page
            </Button>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

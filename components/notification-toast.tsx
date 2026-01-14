"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface ToastProps {
  message: string
  type?: "success" | "error" | "info" | "warning"
  duration?: number
}

export function Toast({ message, type = "info", duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  const bgColor = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
    warning: "bg-yellow-50 border-yellow-200",
  }[type]

  const textColor = {
    success: "text-green-700",
    error: "text-red-700",
    info: "text-blue-700",
    warning: "text-yellow-700",
  }[type]

  return (
    <Card className={`fixed top-4 right-4 p-4 border ${bgColor} z-50`}>
      <p className={`text-sm font-medium ${textColor}`}>{message}</p>
    </Card>
  )
}

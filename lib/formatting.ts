// Formatting utilities for consistent data display

export function formatCurrency(amount: number, currency = "₦"): string {
  return `${currency}${amount.toLocaleString()}`
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

export function formatPhoneNumber(phone: string): string {
  // Nigerian phone format
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, "+234 $1 $2 $3")
}

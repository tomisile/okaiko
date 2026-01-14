// TypeScript types for the application

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "super_admin" | "moderator"
  status: "active" | "pending" | "banned"
  registrationDate: string
}

export interface Product {
  id: string
  title: string
  description: string
  category: string
  price: number
  seller: {
    id: string
    name: string
  }
  status: "approved" | "pending" | "rejected"
  uploadDate: string
  images: string[]
}

export interface Transaction {
  id: string
  buyer: User
  seller: User
  product: Product
  amount: number
  date: string
  status: "completed" | "pending" | "disputed"
}

export interface Category {
  id: string
  name: string
  description: string
  itemCount: number
  edoMotif?: string
}

export interface Festival {
  id: string
  name: string
  startDate: string
  endDate: string
  discount: number
  description: string
  isActive: boolean
}

export interface AdminUser extends User {
  permissions: string[]
  lastLogin: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

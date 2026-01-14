// Edo marketplace admin constants

export const EDO_CATEGORIES = [
  "Agricultural Produce",
  "Handicrafts",
  "Textiles",
  "Cultural Items",
  "Herbal Products",
  "Traditional Foods",
  "Local Services",
]

export const USER_ROLES = ["admin", "super_admin", "moderator"]

export const TRANSACTION_STATUSES = ["completed", "pending", "disputed"]
export const PRODUCT_STATUSES = ["approved", "pending", "rejected"]
export const USER_STATUSES = ["active", "pending", "banned"]

export const EDO_FESTIVALS = [
  { name: "Igue Festival", month: "February" },
  { name: "Ugie Oro Festival", month: "March-April" },
  { name: "Edo Day Celebration", month: "May" },
  { name: "Abaraka Festival", month: "September" },
]

export const EDO_CULTURAL_MOTIFS = {
  benin_bronze: "Benin Bronze Artistry",
  coral_beads: "Coral Bead Patterns",
  ivory_mask: "Ivory Mask Designs",
  palace_imagery: "Benin Palace Imagery",
  traditional_textiles: "Igarra Cloth Weaving",
}

export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  dashboard: {
    metrics: "/dashboard/metrics",
  },
  users: {
    list: "/users",
    get: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
  products: {
    list: "/products",
    get: (id: string) => `/products/${id}`,
    update: (id: string) => `/products/${id}`,
    delete: (id: string) => `/products/${id}`,
  },
  transactions: {
    list: "/transactions",
    get: (id: string) => `/transactions/${id}`,
  },
  categories: {
    list: "/categories",
  },
}

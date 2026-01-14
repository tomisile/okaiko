"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Product {
  id: string
  title: string
  category: string
  seller: string
  price: number
  status: "approved" | "pending" | "rejected"
  uploadDate: string
}

const mockProducts: Product[] = [
  {
    id: "prod_001",
    title: "Hand-woven Edo Cloth",
    category: "Handicrafts",
    seller: "Okoro Crafts",
    price: 15000,
    status: "approved",
    uploadDate: "2025-01-10",
  },
  {
    id: "prod_002",
    title: "Organic Yam Bundle",
    category: "Agricultural Produce",
    seller: "Premium Produce",
    price: 8000,
    status: "pending",
    uploadDate: "2025-01-13",
  },
  {
    id: "prod_003",
    title: "Bronze Mask Replica",
    category: "Cultural Items",
    seller: "Heritage Arts",
    price: 25000,
    status: "approved",
    uploadDate: "2025-01-11",
  },
  {
    id: "prod_004",
    title: "Coral Beadwork Set",
    category: "Traditional Items",
    seller: "Grace Crafts",
    price: 12000,
    status: "pending",
    uploadDate: "2025-01-14",
  },
  {
    id: "prod_005",
    title: "Herbal Wellness Blend",
    category: "Herbal Products",
    seller: "Herbal Wellness",
    price: 5000,
    status: "rejected",
    uploadDate: "2025-01-12",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleApproveProduct = (id: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, status: "approved" as const } : p)))
  }

  const handleRejectProduct = (id: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, status: "rejected" as const } : p)))
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const categories = [
    "all",
    "Agricultural Produce",
    "Handicrafts",
    "Cultural Items",
    "Herbal Products",
    "Traditional Items",
  ]

  const filteredProducts = products.filter(
    (p) =>
      (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.seller.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "all" || p.category === categoryFilter),
  )

  const handleExportCSV = () => {
    const csv =
      "ID,Title,Category,Seller,Price,Status,Upload Date\n" +
      filteredProducts
        .map((p) => `${p.id},"${p.title}",${p.category},${p.seller},${p.price},${p.status},${p.uploadDate}`)
        .join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "products.csv"
    a.click()
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[oklch(0.35_0.18_20)]">Product Management</h1>
          <p className="text-[oklch(0.45_0_0)] mt-1">Manage marketplace listings and approvals</p>
        </div>
        <Button
          variant="outline"
          onClick={handleExportCSV}
          className="border-[oklch(0.88_0.02_80)] text-[oklch(0.35_0.18_20)] bg-transparent"
        >
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="edo-gold-border p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Search</Label>
            <Input
              placeholder="Search by title or seller..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="flex-1">
            <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Category</Label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-[oklch(0.88_0.02_80)] rounded px-3 py-2 mt-1"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="edo-coral-accent p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[oklch(0.88_0.02_80)]">
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">ID</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Title</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Category</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Seller</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Price</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Status</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Upload Date</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-[oklch(0.95_0.02_80)] hover:bg-[oklch(0.97_0.02_80)]">
                <td className="py-3">{product.id}</td>
                <td className="py-3 font-medium text-[oklch(0.35_0.18_20)]">{product.title}</td>
                <td className="py-3">{product.category}</td>
                <td className="py-3">{product.seller}</td>
                <td className="py-3 font-semibold">₦{product.price.toLocaleString()}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      product.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : product.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-3 text-[oklch(0.45_0_0)]">{new Date(product.uploadDate).toLocaleDateString()}</td>
                <td className="py-3 space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedProduct(product)}
                        className="text-[oklch(0.7_0.15_60)] hover:bg-[oklch(0.9_0.02_80)]"
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-[oklch(0.35_0.18_20)]">Edit Product</DialogTitle>
                      </DialogHeader>
                      {selectedProduct && (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Title</Label>
                            <Input value={selectedProduct.title} disabled />
                          </div>
                          <div>
                            <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Price</Label>
                            <Input type="number" value={selectedProduct.price} disabled />
                          </div>
                          <div>
                            <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Status</Label>
                            <select className="w-full border border-[oklch(0.88_0.02_80)] rounded px-3 py-2">
                              <option value="approved">Approved</option>
                              <option value="pending">Pending</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  {product.status === "pending" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleApproveProduct(product.id)}
                        className="text-green-600 hover:bg-green-50"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRejectProduct(product.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

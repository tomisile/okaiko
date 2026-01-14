"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Category {
  id: string
  name: string
  icon: string
  description: string
  itemCount: number
  edoMotif?: string
}

const mockCategories: Category[] = [
  {
    id: "cat_001",
    name: "Agricultural Produce",
    icon: "🌾",
    description: "Yams, cassava, plantains, and other traditional crops",
    itemCount: 234,
    edoMotif: "Benin palace harvest symbols",
  },
  {
    id: "cat_002",
    name: "Handicrafts",
    icon: "🎨",
    description: "Hand-woven textiles, masks, and traditional crafts",
    itemCount: 156,
    edoMotif: "Benin bronze patterns",
  },
  {
    id: "cat_003",
    name: "Cultural Items",
    icon: "🏛️",
    description: "Festival merchandise and cultural artifacts",
    itemCount: 89,
    edoMotif: "Ivory mask designs",
  },
  {
    id: "cat_004",
    name: "Herbal Products",
    icon: "🌿",
    description: "Indigenous herbs and medicinal remedies",
    itemCount: 124,
    edoMotif: "Esan healing traditions",
  },
  {
    id: "cat_005",
    name: "Traditional Foods",
    icon: "🍲",
    description: "Native soups and prepared local cuisines",
    itemCount: 67,
    edoMotif: "Palace feast imagery",
  },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [formData, setFormData] = useState({ name: "", icon: "", description: "", edoMotif: "" })

  const handleAddCategory = () => {
    if (!formData.name) return
    const newCategory: Category = {
      id: `cat_${Date.now()}`,
      name: formData.name,
      icon: formData.icon || "📦",
      description: formData.description,
      itemCount: 0,
      edoMotif: formData.edoMotif,
    }
    setCategories([...categories, newCategory])
    setFormData({ name: "", icon: "", description: "", edoMotif: "" })
    setIsAddingCategory(false)
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[oklch(0.35_0.18_20)]">Category Management</h1>
          <p className="text-[oklch(0.45_0_0)] mt-1">Manage product categories with Edo cultural themes</p>
        </div>
        <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
          <DialogTrigger asChild>
            <Button className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white">Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-[oklch(0.35_0.18_20)]">Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Category Name</Label>
                <Input
                  placeholder="e.g., Igarra Cloth Weaving"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Icon (emoji)</Label>
                <Input
                  placeholder="e.g., 🎨"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  maxLength={2}
                />
              </div>
              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Description</Label>
                <textarea
                  placeholder="Category description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-[oklch(0.88_0.02_80)] rounded px-3 py-2"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Edo Cultural Motif</Label>
                <Input
                  placeholder="e.g., Benin bronze patterns"
                  value={formData.edoMotif}
                  onChange={(e) => setFormData({ ...formData, edoMotif: e.target.value })}
                />
              </div>
              <Button
                onClick={handleAddCategory}
                className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white w-full"
              >
                Create Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="edo-coral-accent p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="text-lg font-bold text-[oklch(0.35_0.18_20)]">{category.name}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteCategory(category.id)}
                className="text-red-600 hover:bg-red-50"
              >
                ✕
              </Button>
            </div>
            <p className="text-sm text-[oklch(0.45_0_0)] mb-3">{category.description}</p>
            {category.edoMotif && (
              <p className="text-xs text-[oklch(0.65_0.12_30)] mb-3 italic">Motif: {category.edoMotif}</p>
            )}
            <div className="mt-auto pt-4 border-t border-[oklch(0.88_0.02_80)]">
              <p className="text-sm text-[oklch(0.45_0_0)]">
                <span className="font-semibold text-[oklch(0.35_0.18_20)]">{category.itemCount}</span> items listed
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Festival {
  id: string
  name: string
  startDate: string
  endDate: string
  discount: number
  description: string
  isActive: boolean
}

const mockFestivals: Festival[] = [
  {
    id: "fest_001",
    name: "Igue Festival",
    startDate: "2025-02-01",
    endDate: "2025-02-28",
    discount: 15,
    description: "New Year celebration with special promotions on all items",
    isActive: true,
  },
  {
    id: "fest_002",
    name: "Ugie Oro Festival",
    startDate: "2025-03-15",
    endDate: "2025-04-15",
    discount: 20,
    description: "Harvest season celebration with discounts on agricultural products",
    isActive: false,
  },
  {
    id: "fest_003",
    name: "Edo Day Celebration",
    startDate: "2025-05-20",
    endDate: "2025-05-31",
    discount: 25,
    description: "Heritage celebration with special focus on cultural items",
    isActive: false,
  },
]

export default function FestivalsPage() {
  const [festivals, setFestivals] = useState<Festival[]>(mockFestivals)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Omit<Festival, "id">>({
    name: "",
    startDate: "",
    endDate: "",
    discount: 10,
    description: "",
    isActive: true,
  })

  const handleCreateFestival = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) return
    const newFestival: Festival = {
      id: `fest_${Date.now()}`,
      ...formData,
    }
    setFestivals([...festivals, newFestival])
    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      discount: 10,
      description: "",
      isActive: true,
    })
    setIsCreating(false)
  }

  const handleToggleFestival = (id: string) => {
    setFestivals(festivals.map((f) => (f.id === id ? { ...f, isActive: !f.isActive } : f)))
  }

  const handleDeleteFestival = (id: string) => {
    setFestivals(festivals.filter((f) => f.id !== id))
  }

  const handleScheduleNotification = (id: string) => {
    alert(`Notifications scheduled for festival ${id}`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[oklch(0.35_0.18_20)]">Festival Promotions</h1>
          <p className="text-[oklch(0.45_0_0)] mt-1">Manage seasonal Edo festival promotions and discounts</p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white">
              Create Festival
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-[oklch(0.35_0.18_20)]">Create New Festival Promotion</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Festival Name</Label>
                <Input
                  placeholder="e.g., Igue Festival"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Start Date</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-[oklch(0.35_0.18_20)] font-semibold">End Date</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Discount Percentage</Label>
                <Input
                  type="number"
                  placeholder="10"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: Number.parseInt(e.target.value) || 10 })}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Description</Label>
                <textarea
                  placeholder="Festival details and promotion description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-[oklch(0.88_0.02_80)] rounded px-3 py-2"
                  rows={3}
                ></textarea>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <Label htmlFor="isActive" className="text-[oklch(0.35_0.18_20)]">
                  Activate immediately
                </Label>
              </div>
              <Button
                onClick={handleCreateFestival}
                className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white w-full"
              >
                Create Festival
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Festivals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {festivals.map((festival) => (
          <Card key={festival.id} className="edo-coral-accent p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[oklch(0.35_0.18_20)]">{festival.name}</h3>
                <p className="text-sm text-[oklch(0.45_0_0)] mt-1">{festival.description}</p>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  festival.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                }`}
              >
                {festival.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div>
                <span className="text-[oklch(0.45_0_0)]">Start Date:</span>
                <span className="font-semibold text-[oklch(0.35_0.18_20)] ml-2">
                  {new Date(festival.startDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-[oklch(0.45_0_0)]">End Date:</span>
                <span className="font-semibold text-[oklch(0.35_0.18_20)] ml-2">
                  {new Date(festival.endDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-[oklch(0.45_0_0)]">Discount:</span>
                <span className="font-semibold text-[oklch(0.7_0.15_60)] ml-2">{festival.discount}%</span>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-[oklch(0.88_0.02_80)] space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleScheduleNotification(festival.id)}
                className="w-full border-[oklch(0.88_0.02_80)] text-[oklch(0.35_0.18_20)] bg-transparent"
              >
                Schedule Notifications
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleFestival(festival.id)}
                  className={`flex-1 text-sm ${
                    festival.isActive ? "text-red-600 hover:bg-red-50" : "text-green-600 hover:bg-green-50"
                  }`}
                >
                  {festival.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteFestival(festival.id)}
                  className="flex-1 text-red-600 hover:bg-red-50 text-sm"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {festivals.length === 0 && (
        <Card className="edo-gold-border p-8 text-center">
          <p className="text-[oklch(0.45_0_0)]">No festivals scheduled yet. Create one to get started!</p>
        </Card>
      )}
    </div>
  )
}

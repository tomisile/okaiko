"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const staticUser = {
  name: "Admin User",
  email: "admin@marketplace.edo",
  role: "Administrator",
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: staticUser.name,
    email: staticUser.email,
  })

  const handleSave = async () => {
    // API call to save changes
    setIsEditing(false)
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-[oklch(0.35_0.18_20)] mb-6">Admin Profile</h1>

      {/* Profile Information */}
      <Card className="edo-coral-accent p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-[oklch(0.7_0.15_60)] flex items-center justify-center text-white text-2xl font-bold">
            {staticUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[oklch(0.35_0.18_20)]">{staticUser.name}</h2>
            <p className="text-sm text-[oklch(0.45_0_0)]">{staticUser.role}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Full Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white"
              >
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white"
          >
            Edit Profile
          </Button>
        )}
      </Card>

      {/* Password Section */}
      <Card className="edo-gold-border p-6">
        <h3 className="text-lg font-bold text-[oklch(0.35_0.18_20)] mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Current Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div>
            <Label className="text-[oklch(0.35_0.18_20)] font-semibold">New Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div>
            <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Confirm Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white">Update Password</Button>
        </div>
      </Card>
    </div>
  )
}

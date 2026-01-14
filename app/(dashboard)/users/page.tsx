"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface User {
  id: string
  name: string
  email: string
  role: "buyer" | "seller"
  registrationDate: string
  status: "active" | "banned" | "pending"
}

const mockUsers: User[] = [
  {
    id: "user_001",
    name: "Chinedu Okonkwo",
    email: "chinedu@example.com",
    role: "seller",
    registrationDate: "2024-12-01",
    status: "active",
  },
  {
    id: "user_002",
    name: "Blessing Eze",
    email: "blessing@example.com",
    role: "buyer",
    registrationDate: "2024-12-15",
    status: "active",
  },
  {
    id: "user_003",
    name: "Grace Adekunle",
    email: "grace@example.com",
    role: "seller",
    registrationDate: "2025-01-05",
    status: "pending",
  },
  {
    id: "user_004",
    name: "Emeka Nwosu",
    email: "emeka@example.com",
    role: "buyer",
    registrationDate: "2024-11-20",
    status: "active",
  },
  {
    id: "user_005",
    name: "Zainab Ahmed",
    email: "zainab@example.com",
    role: "seller",
    registrationDate: "2024-10-10",
    status: "banned",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newAdminEmail, setNewAdminEmail] = useState("")

  const handleBanUser = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: "banned" as const } : u)))
  }

  const handleActivateUser = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: "active" as const } : u)))
  }

  const handleInviteAdmin = () => {
    // API call to invite admin
    setNewAdminEmail("")
  }

  const handleExportCSV = () => {
    const csv =
      "ID,Name,Email,Role,Registration Date,Status\n" +
      users.map((u) => `${u.id},${u.name},${u.email},${u.role},${u.registrationDate},${u.status}`).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "users.csv"
    a.click()
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[oklch(0.35_0.18_20)]">User Management</h1>
          <p className="text-[oklch(0.45_0_0)] mt-1">Manage marketplace users and roles</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white">
                Invite Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-[oklch(0.35_0.18_20)]">Invite New Admin</DialogTitle>
                <DialogDescription>Send an invitation to a new admin user</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleInviteAdmin}
                  className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white w-full"
                >
                  Send Invitation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="border-[oklch(0.88_0.02_80)] text-[oklch(0.35_0.18_20)] bg-transparent"
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="edo-gold-border p-4">
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </Card>

      {/* Users Table */}
      <Card className="edo-coral-accent p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[oklch(0.88_0.02_80)]">
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">ID</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Name</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Email</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Role</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Registration</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Status</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-[oklch(0.95_0.02_80)] hover:bg-[oklch(0.97_0.02_80)]">
                <td className="py-3">{user.id}</td>
                <td className="py-3 font-medium text-[oklch(0.35_0.18_20)]">{user.name}</td>
                <td className="py-3">{user.email}</td>
                <td className="py-3">
                  <span className="bg-[oklch(0.85_0.02_80)] text-[oklch(0.35_0.18_20)] px-2 py-1 rounded text-xs font-semibold">
                    {user.role}
                  </span>
                </td>
                <td className="py-3 text-[oklch(0.45_0_0)]">{new Date(user.registrationDate).toLocaleDateString()}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : user.status === "banned"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-3 space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedUser(user)}
                        className="text-[oklch(0.7_0.15_60)] hover:bg-[oklch(0.9_0.02_80)]"
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-[oklch(0.35_0.18_20)]">Edit User</DialogTitle>
                      </DialogHeader>
                      {selectedUser && (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Name</Label>
                            <Input value={selectedUser.name} disabled />
                          </div>
                          <div>
                            <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Email</Label>
                            <Input value={selectedUser.email} disabled />
                          </div>
                          <div>
                            <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Status</Label>
                            <select className="w-full border border-[oklch(0.88_0.02_80)] rounded px-3 py-2">
                              <option value="active">Active</option>
                              <option value="banned">Banned</option>
                              <option value="pending">Pending</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  {user.status !== "banned" ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBanUser(user.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Ban
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleActivateUser(user.id)}
                      className="text-green-600 hover:bg-green-50"
                    >
                      Activate
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

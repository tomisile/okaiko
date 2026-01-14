"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { apiClient } from "@/lib/api-client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

interface DashboardMetrics {
  totalUsers: number
  activeListings: number
  categoriesCount: number
  totalRevenue: number
  userGrowth: Array<{ month: string; users: number }>
  salesByCategory: Array<{ category: string; sales: number }>
  recentTransactions: Array<{ id: string; buyer: string; amount: number; date: string }>
}

const COLORS = ["oklch(0.35_0.18_20)", "oklch(0.7_0.15_60)", "oklch(0.65_0.12_30)", "oklch(0.55_0.06_65)"]

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await apiClient.get<DashboardMetrics>("/dashboard/metrics")
        setMetrics(data)
      } catch (err) {
        setError("Failed to load dashboard metrics")
        // Use mock data for demo
        setMetrics(mockMetrics)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="edo-sword-spin text-4xl mb-4">⚔️</div>
          <p className="text-[oklch(0.45_0_0)]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700">
          {error || "Failed to load metrics"}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[oklch(0.35_0.18_20)]">Dashboard Overview</h1>
          <p className="text-[oklch(0.45_0_0)] mt-1">Welcome back. Here's your marketplace performance.</p>
        </div>
        <Button className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white">Refresh</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Users" value={metrics.totalUsers.toLocaleString()} trend="+12% this month" icon="👥" />
        <MetricCard
          label="Active Listings"
          value={metrics.activeListings.toLocaleString()}
          trend="+8% this week"
          icon="🛍️"
        />
        <MetricCard label="Categories" value={metrics.categoriesCount.toString()} trend="All active" icon="📂" />
        <MetricCard
          label="Total Revenue"
          value={`₦${(metrics.totalRevenue / 1000).toFixed(1)}K`}
          trend="+24% this month"
          icon="💰"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card className="edo-gold-border p-6">
          <h3 className="text-lg font-bold text-[oklch(0.35_0.18_20)] mb-4">User Growth (Last 6 Months)</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88_0.02_80)" />
                <XAxis dataKey="month" stroke="oklch(0.45_0_0)" />
                <YAxis stroke="oklch(0.45_0_0)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.98_0_0)",
                    border: "1px solid oklch(0.88_0.02_80)",
                    borderRadius: "4px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="oklch(0.35_0.18_20)"
                  strokeWidth={2}
                  dot={{ fill: "oklch(0.7_0.15_60)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Sales by Category Chart */}
        <Card className="edo-gold-border p-6">
          <h3 className="text-lg font-bold text-[oklch(0.35_0.18_20)] mb-4">Sales by Category</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.salesByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88_0.02_80)" />
                <XAxis dataKey="category" stroke="oklch(0.45_0_0)" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="oklch(0.45_0_0)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.98_0_0)",
                    border: "1px solid oklch(0.88_0.02_80)",
                    borderRadius: "4px",
                  }}
                />
                <Bar dataKey="sales" fill="oklch(0.35_0.18_20)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="edo-coral-accent p-6">
        <h3 className="text-lg font-bold text-[oklch(0.35_0.18_20)] mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[oklch(0.88_0.02_80)]">
                <th className="text-left py-2 text-[oklch(0.45_0_0)] font-semibold">ID</th>
                <th className="text-left py-2 text-[oklch(0.45_0_0)] font-semibold">Buyer</th>
                <th className="text-left py-2 text-[oklch(0.45_0_0)] font-semibold">Amount</th>
                <th className="text-left py-2 text-[oklch(0.45_0_0)] font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {metrics.recentTransactions.slice(0, 5).map((tx) => (
                <tr key={tx.id} className="border-b border-[oklch(0.95_0.02_80)] hover:bg-[oklch(0.97_0.02_80)]">
                  <td className="py-3">{tx.id.slice(0, 8)}</td>
                  <td className="py-3">{tx.buyer}</td>
                  <td className="py-3 font-semibold text-[oklch(0.35_0.18_20)]">₦{tx.amount.toLocaleString()}</td>
                  <td className="py-3 text-[oklch(0.45_0_0)]">{new Date(tx.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Links */}
      <Card className="edo-gold-border p-6">
        <h3 className="text-lg font-bold text-[oklch(0.35_0.18_20)] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            variant="outline"
            className="border-[oklch(0.88_0.02_80)] text-[oklch(0.35_0.18_20)] bg-transparent hover:bg-[oklch(0.95_0.02_80)]"
          >
            Approve Listings
          </Button>
          <Button
            variant="outline"
            className="border-[oklch(0.88_0.02_80)] text-[oklch(0.35_0.18_20)] bg-transparent hover:bg-[oklch(0.95_0.02_80)]"
          >
            Review Disputes
          </Button>
          <Button
            variant="outline"
            className="border-[oklch(0.88_0.02_80)] text-[oklch(0.35_0.18_20)] bg-transparent hover:bg-[oklch(0.95_0.02_80)]"
          >
            User Reports
          </Button>
          <Button
            variant="outline"
            className="border-[oklch(0.88_0.02_80)] text-[oklch(0.35_0.18_20)] bg-transparent hover:bg-[oklch(0.95_0.02_80)]"
          >
            Invite Admins
          </Button>
        </div>
      </Card>
    </div>
  )
}

interface MetricCardProps {
  label: string
  value: string
  trend: string
  icon: string
}

function MetricCard({ label, value, trend, icon }: MetricCardProps) {
  return (
    <Card className="edo-gold-border p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[oklch(0.45_0_0)] font-medium">{label}</p>
          <p className="text-2xl font-bold text-[oklch(0.35_0.18_20)] mt-2">{value}</p>
          <p className="text-xs text-[oklch(0.65_0.12_30)] mt-1">{trend}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </Card>
  )
}

// Mock data for demonstration
const mockMetrics: DashboardMetrics = {
  totalUsers: 2847,
  activeListings: 1234,
  categoriesCount: 12,
  totalRevenue: 485200,
  userGrowth: [
    { month: "Jan", users: 400 },
    { month: "Feb", users: 520 },
    { month: "Mar", users: 680 },
    { month: "Apr", users: 850 },
    { month: "May", users: 1200 },
    { month: "Jun", users: 2847 },
  ],
  salesByCategory: [
    { category: "Agricultural Produce", sales: 4500 },
    { category: "Handicrafts", sales: 3800 },
    { category: "Textiles", sales: 3200 },
    { category: "Cultural Items", sales: 2800 },
    { category: "Herbal Products", sales: 2100 },
    { category: "Local Services", sales: 1600 },
  ],
  recentTransactions: [
    { id: "tx_001", buyer: "Chinedu Okonkwo", amount: 45000, date: "2025-01-14" },
    { id: "tx_002", buyer: "Blessing Eze", amount: 28500, date: "2025-01-13" },
    { id: "tx_003", buyer: "Grace Adekunle", amount: 62000, date: "2025-01-13" },
    { id: "tx_004", buyer: "Emeka Nwosu", amount: 15200, date: "2025-01-12" },
    { id: "tx_005", buyer: "Zainab Ahmed", amount: 38900, date: "2025-01-12" },
  ],
}

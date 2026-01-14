"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockAnalyticsData = {
  salesByCategory: [
    { category: "Agricultural Produce", sales: 4500, percentage: 28 },
    { category: "Handicrafts", sales: 3800, percentage: 24 },
    { category: "Textiles", sales: 3200, percentage: 20 },
    { category: "Cultural Items", sales: 2800, percentage: 17 },
    { category: "Herbal Products", sales: 2100, percentage: 11 },
  ],
  userDemographics: [
    { region: "Benin City", users: 1200, percentage: 42 },
    { region: "Edo Rural", users: 850, percentage: 30 },
    { region: "Diaspora (US)", users: 420, percentage: 15 },
    { region: "Diaspora (UK)", users: 377, percentage: 13 },
  ],
  topSellers: [
    { name: "Okoro Crafts", revenue: 185000, items: 128 },
    { name: "Edo Textiles Ltd", revenue: 162000, items: 94 },
    { name: "Premium Produce", revenue: 145000, items: 187 },
    { name: "Heritage Arts", revenue: 128000, items: 76 },
    { name: "Herbal Wellness", revenue: 98000, items: 145 },
  ],
}

const CHART_COLORS = [
  "oklch(0.35_0.18_20)",
  "oklch(0.7_0.15_60)",
  "oklch(0.65_0.12_30)",
  "oklch(0.55_0.06_65)",
  "oklch(0.5_0.08_45)",
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState({ start: "2025-01-01", end: "2025-01-14" })

  const handleExportCSV = () => {
    // Export analytics data as CSV
    const csv =
      "Category,Sales,Percentage\n" +
      mockAnalyticsData.salesByCategory.map((d) => `${d.category},${d.sales},${d.percentage}`).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "analytics.csv"
    a.click()
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[oklch(0.35_0.18_20)]">Analytics & Reports</h1>
        <p className="text-[oklch(0.45_0_0)] mt-1">Detailed insights into marketplace performance</p>
      </div>

      {/* Date Range Filter */}
      <Card className="edo-gold-border p-4">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div>
            <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Start Date</Label>
            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-[oklch(0.35_0.18_20)] font-semibold">End Date</Label>
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="mt-1"
            />
          </div>
          <Button className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white">Apply Filter</Button>
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="border-[oklch(0.88_0.02_80)] text-[oklch(0.35_0.18_20)] bg-transparent"
          >
            Export CSV
          </Button>
        </div>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category Pie Chart */}
        <Card className="edo-coral-accent p-6">
          <h3 className="text-lg font-bold text-[oklch(0.35_0.18_20)] mb-4">Sales Distribution by Category</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockAnalyticsData.salesByCategory}
                  dataKey="sales"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {mockAnalyticsData.salesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.98_0_0)",
                    border: "1px solid oklch(0.88_0.02_80)",
                    borderRadius: "4px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {mockAnalyticsData.salesByCategory.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                ></div>
                <span className="text-[oklch(0.45_0_0)]">{item.category}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* User Demographics */}
        <Card className="edo-gold-border p-6">
          <h3 className="text-lg font-bold text-[oklch(0.35_0.18_20)] mb-4">User Distribution by Region</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalyticsData.userDemographics}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88_0.02_80)" />
                <XAxis dataKey="region" stroke="oklch(0.45_0_0)" angle={-15} textAnchor="end" height={60} />
                <YAxis stroke="oklch(0.45_0_0)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.98_0_0)",
                    border: "1px solid oklch(0.88_0.02_80)",
                    borderRadius: "4px",
                  }}
                />
                <Bar dataKey="users" fill="oklch(0.7_0.15_60)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Top Sellers Table */}
      <Card className="edo-coral-accent p-6">
        <h3 className="text-lg font-bold text-[oklch(0.35_0.18_20)] mb-4">Top Sellers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[oklch(0.88_0.02_80)]">
                <th className="text-left py-2 text-[oklch(0.45_0_0)] font-semibold">Seller Name</th>
                <th className="text-left py-2 text-[oklch(0.45_0_0)] font-semibold">Revenue</th>
                <th className="text-left py-2 text-[oklch(0.45_0_0)] font-semibold">Items Listed</th>
                <th className="text-left py-2 text-[oklch(0.45_0_0)] font-semibold">Performance</th>
              </tr>
            </thead>
            <tbody>
              {mockAnalyticsData.topSellers.map((seller, idx) => (
                <tr key={idx} className="border-b border-[oklch(0.95_0.02_80)] hover:bg-[oklch(0.97_0.02_80)]">
                  <td className="py-3 font-medium text-[oklch(0.35_0.18_20)]">{seller.name}</td>
                  <td className="py-3 font-semibold">₦{seller.revenue.toLocaleString()}</td>
                  <td className="py-3">{seller.items}</td>
                  <td className="py-3">
                    <span className="bg-[oklch(0.65_0.12_30)] text-white px-2 py-1 rounded text-xs font-semibold">
                      Top
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

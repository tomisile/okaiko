"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Transaction {
  id: string
  buyer: string
  seller: string
  item: string
  amount: number
  date: string
  status: "completed" | "pending" | "disputed"
}

const mockTransactions: Transaction[] = [
  {
    id: "txn_001",
    buyer: "Chinedu Okonkwo",
    seller: "Okoro Crafts",
    item: "Hand-woven Edo Cloth",
    amount: 15000,
    date: "2025-01-14",
    status: "completed",
  },
  {
    id: "txn_002",
    buyer: "Grace Adekunle",
    seller: "Premium Produce",
    item: "Organic Yam Bundle",
    amount: 8000,
    date: "2025-01-13",
    status: "completed",
  },
  {
    id: "txn_003",
    buyer: "Blessing Eze",
    seller: "Heritage Arts",
    item: "Bronze Mask Replica",
    amount: 25000,
    date: "2025-01-12",
    status: "disputed",
  },
  {
    id: "txn_004",
    buyer: "Emeka Nwosu",
    seller: "Grace Crafts",
    item: "Coral Beadwork Set",
    amount: 12000,
    date: "2025-01-11",
    status: "pending",
  },
  {
    id: "txn_005",
    buyer: "Zainab Ahmed",
    seller: "Herbal Wellness",
    item: "Herbal Wellness Blend",
    amount: 5000,
    date: "2025-01-10",
    status: "completed",
  },
]

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [resolutionNote, setResolutionNote] = useState("")

  const handleResolveDispute = (id: string) => {
    setTransactions(transactions.map((t) => (t.id === id ? { ...t, status: "completed" as const } : t)))
    setSelectedTransaction(null)
    setResolutionNote("")
  }

  const filteredTransactions = transactions.filter(
    (t) =>
      t.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.item.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalRevenue = transactions.reduce((sum, t) => (t.status === "completed" ? sum + t.amount : sum), 0)
  const totalFees = (totalRevenue * 0.025).toFixed(2) // 2.5% platform fee

  const handleExportCSV = () => {
    const csv =
      "ID,Buyer,Seller,Item,Amount,Date,Status\n" +
      filteredTransactions
        .map((t) => `${t.id},${t.buyer},${t.seller},"${t.item}",${t.amount},${t.date},${t.status}`)
        .join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transactions.csv"
    a.click()
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[oklch(0.35_0.18_20)]">Transactions & Orders</h1>
          <p className="text-[oklch(0.45_0_0)] mt-1">Manage buyer-seller transactions and disputes</p>
        </div>
        <Button
          variant="outline"
          onClick={handleExportCSV}
          className="border-[oklch(0.88_0.02_80)] text-[oklch(0.35_0.18_20)] bg-transparent"
        >
          Export CSV
        </Button>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="edo-gold-border p-6">
          <p className="text-sm text-[oklch(0.45_0_0)] font-medium">Total Revenue</p>
          <p className="text-2xl font-bold text-[oklch(0.35_0.18_20)] mt-2">₦{(totalRevenue / 1000).toFixed(1)}K</p>
        </Card>
        <Card className="edo-gold-border p-6">
          <p className="text-sm text-[oklch(0.45_0_0)] font-medium">Platform Fees (2.5%)</p>
          <p className="text-2xl font-bold text-[oklch(0.7_0.15_60)] mt-2">₦{totalFees}</p>
        </Card>
        <Card className="edo-gold-border p-6">
          <p className="text-sm text-[oklch(0.45_0_0)] font-medium">Disputed Transactions</p>
          <p className="text-2xl font-bold text-red-600 mt-2">
            {transactions.filter((t) => t.status === "disputed").length}
          </p>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="edo-gold-border p-4">
        <Input
          placeholder="Search by buyer, seller, or item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </Card>

      {/* Transactions Table */}
      <Card className="edo-coral-accent p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[oklch(0.88_0.02_80)]">
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">ID</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Buyer</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Seller</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Item</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Amount</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Date</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Status</th>
              <th className="text-left py-3 text-[oklch(0.45_0_0)] font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-[oklch(0.95_0.02_80)] hover:bg-[oklch(0.97_0.02_80)]">
                <td className="py-3">{transaction.id}</td>
                <td className="py-3">{transaction.buyer}</td>
                <td className="py-3">{transaction.seller}</td>
                <td className="py-3 font-medium text-[oklch(0.35_0.18_20)]">{transaction.item}</td>
                <td className="py-3 font-semibold">₦{transaction.amount.toLocaleString()}</td>
                <td className="py-3 text-[oklch(0.45_0_0)]">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-3">
                  {transaction.status === "disputed" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTransaction(transaction)}
                          className="text-[oklch(0.7_0.15_60)] hover:bg-[oklch(0.9_0.02_80)]"
                        >
                          Resolve
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-[oklch(0.35_0.18_20)]">Resolve Dispute</DialogTitle>
                        </DialogHeader>
                        {selectedTransaction && (
                          <div className="space-y-4">
                            <div>
                              <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Dispute Details</Label>
                              <div className="bg-[oklch(0.95_0.02_80)] p-3 rounded text-sm text-[oklch(0.45_0_0)]">
                                <p>
                                  <strong>Buyer:</strong> {selectedTransaction.buyer}
                                </p>
                                <p>
                                  <strong>Seller:</strong> {selectedTransaction.seller}
                                </p>
                                <p>
                                  <strong>Item:</strong> {selectedTransaction.item}
                                </p>
                                <p>
                                  <strong>Amount:</strong> ₦{selectedTransaction.amount.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div>
                              <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Resolution Note</Label>
                              <textarea
                                placeholder="Document your resolution..."
                                value={resolutionNote}
                                onChange={(e) => setResolutionNote(e.target.value)}
                                className="w-full border border-[oklch(0.88_0.02_80)] rounded px-3 py-2"
                                rows={4}
                              ></textarea>
                            </div>
                            <Button
                              onClick={() => handleResolveDispute(selectedTransaction.id)}
                              className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white w-full"
                            >
                              Mark as Resolved
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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

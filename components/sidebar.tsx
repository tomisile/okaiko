"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/users", label: "Users", icon: "👥" },
  { href: "/products", label: "Products", icon: "🛍️" },
  { href: "/categories", label: "Categories", icon: "📂" },
  { href: "/transactions", label: "Transactions", icon: "💳" },
  { href: "/festivals", label: "Festivals", icon: "🎉" },
  { href: "/analytics", label: "Analytics", icon: "📈" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "bg-[oklch(0.15_0_0)] text-[oklch(0.92_0.02_80)] border-r border-[oklch(0.25_0_0)] transition-all duration-300",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      {/* Logo Section */}
      <div className="edo-coral-accent p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            <div>
              <h1 className="text-lg font-bold text-[oklch(0.7_0.15_60)]">Edo</h1>
              <p className="text-xs text-[oklch(0.85_0.02_80)]">Admin</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[oklch(0.7_0.15_60)] hover:bg-[oklch(0.25_0_0)]"
        >
          {isCollapsed ? "→" : "←"}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 transition-colors",
                isCollapsed ? "justify-center" : "",
                pathname === item.href
                  ? "bg-[oklch(0.7_0.15_60)] text-[oklch(0.15_0_0)] hover:bg-[oklch(0.7_0.15_60)]"
                  : "text-[oklch(0.85_0.02_80)] hover:bg-[oklch(0.25_0_0)] hover:text-[oklch(0.7_0.15_60)]",
              )}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[oklch(0.25_0_0)] text-xs text-[oklch(0.6_0.02_80)]">
          <p>Edo Marketplace v1.0</p>
        </div>
      )}
    </aside>
  )
}

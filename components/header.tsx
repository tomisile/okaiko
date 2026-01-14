"use client"

export function Header() {
  return (
    <header className="bg-white border-b border-[oklch(0.88_0.02_80)] px-6 py-4 flex items-center justify-between shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-[oklch(0.35_0.18_20)]">Admin Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-[oklch(0.35_0.18_20)]">Admin User</p>
          <p className="text-xs text-[oklch(0.45_0_0)]">Administrator</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[oklch(0.7_0.15_60)] flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </header>
  )
}

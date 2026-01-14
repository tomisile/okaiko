"use client"

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="edo-sword-spin text-5xl mb-4">⚔️</div>
        <p className="text-[oklch(0.45_0_0)] font-medium">Loading...</p>
      </div>
    </div>
  )
}

export function PageLoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="edo-sword-spin text-6xl mb-6">⚔️</div>
        <h2 className="text-2xl font-bold text-[oklch(0.35_0.18_20)] mb-2">Loading Edo Admin</h2>
        <p className="text-[oklch(0.45_0_0)]">Preparing your marketplace dashboard...</p>
      </div>
    </div>
  )
}

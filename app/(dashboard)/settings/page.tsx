"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ThemeSettings {
  primaryColor: string
  accentColor: string
  darkMode: boolean
}

interface PlatformSettings {
  platformFee: number
  minWithdrawal: number
  maxProductPrice: number
  maintenanceMode: boolean
}

export default function SettingsPage() {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    primaryColor: "oklch(0.35_0.18_20)",
    accentColor: "oklch(0.7_0.15_60)",
    darkMode: false,
  })

  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>({
    platformFee: 2.5,
    minWithdrawal: 1000,
    maxProductPrice: 1000000,
    maintenanceMode: false,
  })

  const [paymentIntegrations, setPaymentIntegrations] = useState({
    stripe: { enabled: false, apiKey: "" },
    paystack: { enabled: true, apiKey: "pk_live_***" },
    flutterwave: { enabled: true, apiKey: "pk_***" },
  })

  const [savedMessage, setSavedMessage] = useState("")

  const handleSaveTheme = () => {
    setSavedMessage("Theme settings saved!")
    setTimeout(() => setSavedMessage(""), 3000)
  }

  const handleSavePlatformSettings = () => {
    setSavedMessage("Platform settings saved!")
    setTimeout(() => setSavedMessage(""), 3000)
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[oklch(0.35_0.18_20)]">Platform Settings</h1>
        <p className="text-[oklch(0.45_0_0)] mt-1">Configure theme, integrations, and platform behavior</p>
      </div>

      {savedMessage && (
        <Card className="bg-green-50 border-green-200 p-4">
          <p className="text-green-700 text-sm font-medium">{savedMessage}</p>
        </Card>
      )}

      <Tabs defaultValue="theme" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[oklch(0.95_0.02_80)]">
          <TabsTrigger
            value="theme"
            className="data-[state=active]:bg-[oklch(0.35_0.18_20)] data-[state=active]:text-white"
          >
            Theme
          </TabsTrigger>
          <TabsTrigger
            value="platform"
            className="data-[state=active]:bg-[oklch(0.35_0.18_20)] data-[state=active]:text-white"
          >
            Platform
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="data-[state=active]:bg-[oklch(0.35_0.18_20)] data-[state=active]:text-white"
          >
            Payments
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="data-[state=active]:bg-[oklch(0.35_0.18_20)] data-[state=active]:text-white"
          >
            APIs
          </TabsTrigger>
        </TabsList>

        {/* Theme Settings Tab */}
        <TabsContent value="theme" className="space-y-6">
          <Card className="edo-coral-accent p-6">
            <h3 className="text-lg font-bold text-[oklch(0.35_0.18_20)] mb-4">Theme Customization</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Primary Color</Label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="color"
                    value={themeSettings.primaryColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                    className="w-16 h-10 rounded cursor-pointer"
                  />
                  <Input value={themeSettings.primaryColor} disabled className="flex-1" />
                </div>
                <p className="text-xs text-[oklch(0.45_0_0)] mt-1">Deep red for Edo aesthetics</p>
              </div>

              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Accent Color</Label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="color"
                    value={themeSettings.accentColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, accentColor: e.target.value })}
                    className="w-16 h-10 rounded cursor-pointer"
                  />
                  <Input value={themeSettings.accentColor} disabled className="flex-1" />
                </div>
                <p className="text-xs text-[oklch(0.45_0_0)] mt-1">Gold accents for highlights</p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="darkMode"
                  checked={themeSettings.darkMode}
                  onChange={(e) => setThemeSettings({ ...themeSettings, darkMode: e.target.checked })}
                />
                <Label htmlFor="darkMode" className="text-[oklch(0.35_0.18_20)]">
                  Enable dark mode theme
                </Label>
              </div>

              <Button
                onClick={handleSaveTheme}
                className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white mt-4"
              >
                Save Theme Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Platform Settings Tab */}
        <TabsContent value="platform" className="space-y-6">
          <Card className="edo-coral-accent p-6">
            <h3 className="text-lg font-bold text-[oklch(0.35_0.18_20)] mb-4">Platform Configuration</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Platform Fee (%)</Label>
                <Input
                  type="number"
                  value={platformSettings.platformFee}
                  onChange={(e) =>
                    setPlatformSettings({ ...platformSettings, platformFee: Number.parseFloat(e.target.value) })
                  }
                  className="mt-1"
                  min="0"
                  max="50"
                  step="0.1"
                />
                <p className="text-xs text-[oklch(0.45_0_0)] mt-1">Percentage deducted from each transaction</p>
              </div>

              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Minimum Withdrawal (₦)</Label>
                <Input
                  type="number"
                  value={platformSettings.minWithdrawal}
                  onChange={(e) =>
                    setPlatformSettings({ ...platformSettings, minWithdrawal: Number.parseInt(e.target.value) })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Maximum Product Price (₦)</Label>
                <Input
                  type="number"
                  value={platformSettings.maxProductPrice}
                  onChange={(e) =>
                    setPlatformSettings({ ...platformSettings, maxProductPrice: Number.parseInt(e.target.value) })
                  }
                  className="mt-1"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="maintenance"
                  checked={platformSettings.maintenanceMode}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, maintenanceMode: e.target.checked })}
                />
                <Label htmlFor="maintenance" className="text-[oklch(0.35_0.18_20)]">
                  Enable maintenance mode
                </Label>
              </div>

              <Button
                onClick={handleSavePlatformSettings}
                className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white mt-4"
              >
                Save Platform Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Payment Integrations Tab */}
        <TabsContent value="payments" className="space-y-6">
          <Card className="edo-coral-accent p-6">
            <h3 className="text-lg font-bold text-[oklch(0.35_0.18_20)] mb-4">Payment Gateway Integrations</h3>
            <div className="space-y-4">
              {Object.entries(paymentIntegrations).map(([gateway, config]) => (
                <div key={gateway} className="p-4 border border-[oklch(0.88_0.02_80)] rounded">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-[oklch(0.35_0.18_20)] font-semibold capitalize">{gateway}</Label>
                    <input
                      type="checkbox"
                      checked={config.enabled}
                      onChange={(e) => {
                        setPaymentIntegrations({
                          ...paymentIntegrations,
                          [gateway]: { ...config, enabled: e.target.checked },
                        })
                      }}
                      className="w-4 h-4"
                    />
                  </div>
                  {config.enabled && (
                    <Input
                      type="password"
                      placeholder="API Key"
                      value={config.apiKey}
                      onChange={(e) => {
                        setPaymentIntegrations({
                          ...paymentIntegrations,
                          [gateway]: { ...config, apiKey: e.target.value },
                        })
                      }}
                      className="mt-2 text-sm"
                    />
                  )}
                </div>
              ))}
              <Button
                onClick={handleSavePlatformSettings}
                className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white w-full mt-4"
              >
                Save Payment Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* API Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className="edo-gold-border p-6">
            <h3 className="text-lg font-bold text-[oklch(0.35_0.18_20)] mb-4">API Integrations</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Email Service</Label>
                <Input placeholder="SendGrid API Key" className="mt-1 text-sm" type="password" />
              </div>
              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">SMS Service</Label>
                <Input placeholder="Twilio API Key" className="mt-1 text-sm" type="password" />
              </div>
              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">Analytics Service</Label>
                <Input placeholder="Google Analytics ID" className="mt-1 text-sm" />
              </div>
              <div>
                <Label className="text-[oklch(0.35_0.18_20)] font-semibold">File Storage</Label>
                <select className="w-full border border-[oklch(0.88_0.02_80)] rounded px-3 py-2 mt-1">
                  <option>AWS S3</option>
                  <option>Google Cloud Storage</option>
                  <option>Cloudinary</option>
                </select>
              </div>
              <Button
                onClick={handleSavePlatformSettings}
                className="bg-[oklch(0.35_0.18_20)] hover:bg-[oklch(0.3_0.18_20)] text-white w-full mt-4"
              >
                Save API Settings
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

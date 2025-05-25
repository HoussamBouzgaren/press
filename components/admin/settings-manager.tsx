"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"

interface SiteSettings {
  siteName: string
  siteDescription: string
  siteUrl: string
  adminEmail: string
  allowComments: boolean
  requireApproval: boolean
  maintenanceMode: boolean
}

export function SettingsManager() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "الأخبار العربية",
    siteDescription: "موقع إخباري شامل يقدم آخر الأخبار والتطورات",
    siteUrl: "https://example.com",
    adminEmail: "admin@example.com",
    allowComments: true,
    requireApproval: true,
    maintenanceMode: false,
  })

  useEffect(() => {
    const storedSettings = localStorage.getItem("siteSettings")
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("siteSettings", JSON.stringify(settings))
    alert("تم حفظ الإعدادات بنجاح")
  }

  const handleChange = (key: keyof SiteSettings, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">إعدادات الموقع</h2>
        <p className="text-gray-600 mt-2">إدارة الإعدادات العامة للموقع</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>الإعدادات العامة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">اسم الموقع</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="siteDescription">وصف الموقع</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleChange("siteDescription", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="siteUrl">رابط الموقع</Label>
              <Input id="siteUrl" value={settings.siteUrl} onChange={(e) => handleChange("siteUrl", e.target.value)} />
            </div>

            <div>
              <Label htmlFor="adminEmail">بريد المدير</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleChange("adminEmail", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إعدادات المحتوى</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowComments">السماح بالتعليقات</Label>
                <p className="text-sm text-gray-500">السماح للزوار بالتعليق على المقالات</p>
              </div>
              <Switch
                id="allowComments"
                checked={settings.allowComments}
                onCheckedChange={(checked) => handleChange("allowComments", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireApproval">مراجعة التعليقات</Label>
                <p className="text-sm text-gray-500">مراجعة التعليقات قبل نشرها</p>
              </div>
              <Switch
                id="requireApproval"
                checked={settings.requireApproval}
                onCheckedChange={(checked) => handleChange("requireApproval", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">وضع الصيانة</Label>
                <p className="text-sm text-gray-500">إخفاء الموقع عن الزوار مؤقتاً</p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleChange("maintenanceMode", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إعدادات النسخ الاحتياطي</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => {
                const data = {
                  articles: JSON.parse(localStorage.getItem("articles") || "[]"),
                  users: JSON.parse(localStorage.getItem("users") || "[]"),
                  settings: JSON.parse(localStorage.getItem("siteSettings") || "{}"),
                }
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = `backup-${new Date().toISOString().split("T")[0]}.json`
                a.click()
              }}
            >
              تصدير النسخة الاحتياطية
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.accept = ".json"
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                      try {
                        const data = JSON.parse(e.target?.result as string)
                        if (data.articles) localStorage.setItem("articles", JSON.stringify(data.articles))
                        if (data.users) localStorage.setItem("users", JSON.stringify(data.users))
                        if (data.settings) localStorage.setItem("siteSettings", JSON.stringify(data.settings))
                        alert("تم استيراد النسخة الاحتياطية بنجاح")
                        window.location.reload()
                      } catch (error) {
                        alert("خطأ في استيراد النسخة الاحتياطية")
                      }
                    }
                    reader.readAsText(file)
                  }
                }
                input.click()
              }}
            >
              استيراد النسخة الاحتياطية
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 ml-2" />
          حفظ الإعدادات
        </Button>
      </div>
    </div>
  )
}

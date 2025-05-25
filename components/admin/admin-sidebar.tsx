"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Users, Settings, BarChart3, ImageIcon } from "lucide-react"

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "لوحة المعلومات", icon: LayoutDashboard },
    { id: "articles", label: "إدارة المقالات", icon: FileText },
    { id: "users", label: "إدارة المستخدمين", icon: Users },
    { id: "media", label: "إدارة الوسائط", icon: ImageIcon },
    { id: "analytics", label: "الإحصائيات", icon: BarChart3 },
    { id: "settings", label: "الإعدادات", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-white shadow-sm border-r min-h-screen">
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4 ml-2" />
                {item.label}
              </Button>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}

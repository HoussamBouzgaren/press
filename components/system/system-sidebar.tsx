"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Users, Settings, BarChart3, ImageIcon, Shield } from "lucide-react"

interface SystemSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function SystemSidebar({ activeTab, onTabChange }: SystemSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "لوحة المعلومات", icon: LayoutDashboard },
    { id: "articles", label: "إدارة المقالات", icon: FileText },
    { id: "users", label: "إدارة المستخدمين", icon: Users },
    { id: "media", label: "إدارة الوسائط", icon: ImageIcon },
    { id: "analytics", label: "الإحصائيات", icon: BarChart3 },
    { id: "settings", label: "الإعدادات", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-gray-900 text-white shadow-lg border-r border-gray-700 min-h-screen">
      <nav className="p-4">
        <div className="mb-6 p-3 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">نظام محمي</span>
          </div>
        </div>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
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

"use client"

import { useState } from "react"
import { AdminSidebar } from "./admin-sidebar"
import { AdminHeader } from "./admin-header"
import { ArticleManager } from "./article-manager"
import { UserManager } from "./user-manager"
import { SettingsManager } from "./settings-manager"
import { DashboardOverview } from "./dashboard-overview"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />
      case "articles":
        return <ArticleManager />
      case "users":
        return <UserManager />
      case "settings":
        return <SettingsManager />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}

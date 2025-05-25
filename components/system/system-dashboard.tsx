"use client"

import { useState } from "react"
import { SystemSidebar } from "./system-sidebar"
import { SystemHeader } from "./system-header"
import { ArticleManager } from "../admin/article-manager"
import { UserManager } from "../admin/user-manager"
import { SettingsManager } from "../admin/settings-manager"
import { DashboardOverview } from "../admin/dashboard-overview"

export function SystemDashboard() {
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
      <SystemHeader />
      <div className="flex">
        <SystemSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { SystemLogin } from "@/components/system/system-login"
import { SystemDashboard } from "@/components/system/system-dashboard"

export default function ControlCenterPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const systemAuth = localStorage.getItem("systemAuth_x9z8")
    if (systemAuth === "authenticated_2024") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <div>جاري التحميل...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <SystemLogin onLogin={() => setIsAuthenticated(true)} />
  }

  return <SystemDashboard />
}

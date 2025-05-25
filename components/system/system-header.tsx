"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Home, Shield } from "lucide-react"
import Link from "next/link"

export function SystemHeader() {
  const handleLogout = () => {
    localStorage.removeItem("systemAuth_x9z8")
    window.location.href = "/"
  }

  return (
    <header className="bg-gray-900 text-white shadow-lg border-b border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Shield className="w-6 h-6 text-blue-400" />
          <h1 className="text-2xl font-bold">نظام إدارة المحتوى</h1>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          <Link href="/">
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Home className="w-4 h-4 ml-2" />
              الموقع الرئيسي
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-red-600 text-red-400 hover:bg-red-900/20"
          >
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>
    </header>
  )
}

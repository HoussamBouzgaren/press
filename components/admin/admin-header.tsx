"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Home } from "lucide-react"
import Link from "next/link"

export function AdminHeader() {
  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    window.location.reload()
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>

        <div className="flex items-center space-x-4 space-x-reverse">
          <Link href="/">
            <Button variant="outline" size="sm">
              <Home className="w-4 h-4 ml-2" />
              الموقع الرئيسي
            </Button>
          </Link>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>
    </header>
  )
}

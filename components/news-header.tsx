"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Menu, X, Globe, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Date formatting function
function formatDateArabic(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  const formatted = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return formatted
    .replace("January", "يناير")
    .replace("February", "فبراير")
    .replace("March", "مارس")
    .replace("April", "أبريل")
    .replace("May", "مايو")
    .replace("June", "يونيو")
    .replace("July", "يوليو")
    .replace("August", "أغسطس")
    .replace("September", "سبتمبر")
    .replace("October", "أكتوبر")
    .replace("November", "نوفمبر")
    .replace("December", "ديسمبر")
}

export function NewsHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const date = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Convert to Arabic but keep English numbers
    const arabicDate = date
      .replace("Sunday", "الأحد")
      .replace("Monday", "الاثنين")
      .replace("Tuesday", "الثلاثاء")
      .replace("Wednesday", "الأربعاء")
      .replace("Thursday", "الخميس")
      .replace("Friday", "الجمعة")
      .replace("Saturday", "السبت")
      .replace("January", "يناير")
      .replace("February", "فبراير")
      .replace("March", "مارس")
      .replace("April", "أبريل")
      .replace("May", "مايو")
      .replace("June", "يونيو")
      .replace("July", "يوليو")
      .replace("August", "أغسطس")
      .replace("September", "سبتمبر")
      .replace("October", "أكتوبر")
      .replace("November", "نوفمبر")
      .replace("December", "ديسمبر")

    setCurrentDate(arabicDate)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white text-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Clock className="w-4 h-4" />
                <span>{currentDate || "جاري التحميل..."}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link href="#" className="hover:text-gray-300 text-xs">
                English
              </Link>
              <Globe className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b-2 border-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-4xl font-bold text-black">
              الشرق الأوسط
            </Link>

            <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
              <Link
                href="/"
                className="text-black hover:text-gray-600 font-medium border-b-2 border-transparent hover:border-black transition-all"
              >
                الرئيسية
              </Link>
              <Link
                href="/politics"
                className="text-black hover:text-gray-600 font-medium border-b-2 border-transparent hover:border-black transition-all"
              >
                سياسة
              </Link>
              <Link
                href="/economy"
                className="text-black hover:text-gray-600 font-medium border-b-2 border-transparent hover:border-black transition-all"
              >
                اقتصاد
              </Link>
              <Link
                href="/sports"
                className="text-black hover:text-gray-600 font-medium border-b-2 border-transparent hover:border-black transition-all"
              >
                رياضة
              </Link>
              <Link
                href="/technology"
                className="text-black hover:text-gray-600 font-medium border-b-2 border-transparent hover:border-black transition-all"
              >
                تكنولوجيا
              </Link>
              <Link
                href="/culture"
                className="text-black hover:text-gray-600 font-medium border-b-2 border-transparent hover:border-black transition-all"
              >
                ثقافة
              </Link>
              <Link
                href="/world"
                className="text-black hover:text-gray-600 font-medium border-b-2 border-transparent hover:border-black transition-all"
              >
                عالمي
              </Link>
            </nav>

            <div className="flex items-center space-x-4 space-x-reverse">
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <Input
                  type="search"
                  placeholder="البحث في الأخبار..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 border-2 border-gray-300 focus:border-black rounded-none pl-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleSearchClick}
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black h-8 w-8"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </form>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-black hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <Input
                  type="search"
                  placeholder="البحث في الأخبار..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-2 border-gray-300 focus:border-black rounded-none pl-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleSearchClick}
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black h-8 w-8"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </form>

              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-black hover:text-gray-600 font-medium py-2">
                  الرئيسية
                </Link>
                <Link href="/politics" className="text-black hover:text-gray-600 font-medium py-2">
                  سياسة
                </Link>
                <Link href="/economy" className="text-black hover:text-gray-600 font-medium py-2">
                  اقتصاد
                </Link>
                <Link href="/sports" className="text-black hover:text-gray-600 font-medium py-2">
                  رياضة
                </Link>
                <Link href="/technology" className="text-black hover:text-gray-600 font-medium py-2">
                  تكنولوجيا
                </Link>
                <Link href="/culture" className="text-black hover:text-gray-600 font-medium py-2">
                  ثقافة
                </Link>
                <Link href="/world" className="text-black hover:text-gray-600 font-medium py-2">
                  عالمي
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { NewsHeader } from "@/components/news-header"
import { NewsFooter } from "@/components/news-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, ArrowRight } from "lucide-react"

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

interface Article {
  id: string
  title: string
  content: string
  author: string
  category: string
  image?: string
  publishedAt: string
  featured?: boolean
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchResults, setSearchResults] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (query) {
      const articles = JSON.parse(localStorage.getItem("articles") || "[]")
      const results = articles.filter((article: Article) => {
        const searchTerm = query.toLowerCase()
        return (
          article.title.toLowerCase().includes(searchTerm) ||
          article.content.toLowerCase().includes(searchTerm) ||
          article.author.toLowerCase().includes(searchTerm) ||
          article.category.toLowerCase().includes(searchTerm)
        )
      })
      setSearchResults(results)
    }
    setIsLoading(false)
  }, [query])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <NewsHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-pulse">جاري البحث...</div>
          </div>
        </div>
        <NewsFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <NewsHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Search className="w-6 h-6 text-black ml-3" />
            <h1 className="text-3xl font-bold text-black">نتائج البحث</h1>
            <Separator className="flex-1 mr-6 bg-gray-300" />
          </div>

          {query && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700">
                <span className="font-medium">البحث عن:</span> "{query}"
              </p>
              <p className="text-sm text-gray-500 mt-1">تم العثور على {searchResults.length} نتيجة</p>
            </div>
          )}
        </div>

        {/* Search Results */}
        {!query ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-black mb-4">ابحث في الأخبار</h2>
            <p className="text-gray-600">استخدم مربع البحث أعلاه للعثور على المقالات والأخبار</p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-black mb-4">لم يتم العثور على نتائج</h2>
            <p className="text-gray-600 mb-8">لم نتمكن من العثور على أي مقالات تحتوي على "{query}"</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded-md"
            >
              <ArrowRight className="w-4 h-4 ml-2" />
              العودة للرئيسية
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchResults.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-md"
              >
                <Link href={`/article/${article.id}`}>
                  <div className="relative h-56">
                    {article.image ? (
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-black text-white hover:bg-gray-800">{article.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-black mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors leading-tight">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {article.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="font-medium">{article.author}</span>
                      <span>{formatDateArabic(article.publishedAt)}</span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}

        {/* Search Tips */}
        {query && searchResults.length > 0 && (
          <div className="mt-16 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-black mb-4">نصائح للبحث:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• استخدم كلمات مفتاحية محددة للحصول على نتائج أفضل</li>
              <li>• يمكنك البحث في العناوين والمحتوى وأسماء الكتاب</li>
              <li>• جرب البحث باستخدام مرادفات مختلفة</li>
              <li>• البحث يشمل جميع الأقسام والفئات</li>
            </ul>
          </div>
        )}
      </main>

      <NewsFooter />
    </div>
  )
}

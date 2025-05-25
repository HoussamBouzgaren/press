"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { NewsHeader } from "@/components/news-header"
import { NewsFooter } from "@/components/news-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

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

interface CategoryPageProps {
  category: string
}

export function CategoryPage({ category }: CategoryPageProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles") || "[]")
    const categoryArticles = storedArticles.filter((article: Article) => article.category === category)
    setArticles(categoryArticles)
    setIsLoaded(true)
  }, [category])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white">
        <NewsHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-pulse">جاري التحميل...</div>
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
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <h1 className="text-4xl font-bold text-black">{category}</h1>
            <Separator className="flex-1 mr-6 bg-gray-300" />
          </div>
          <p className="text-gray-600 text-lg">آخر أخبار {category} من المنطقة والعالم</p>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-black mb-4">لا توجد مقالات في هذا القسم</h2>
            <p className="text-gray-600 mb-8">سيتم إضافة مقالات جديدة قريباً</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded-md"
            >
              العودة للرئيسية
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card
                key={article.id}
                className={`overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-md ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <Link href={`/article/${article.id}`}>
                  <div className={`relative ${index === 0 ? "h-80" : "h-56"}`}>
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
                  <CardContent className={`${index === 0 ? "p-8" : "p-6"}`}>
                    <h3
                      className={`font-bold text-black mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors leading-tight ${
                        index === 0 ? "text-2xl" : "text-xl"
                      }`}
                    >
                      {article.title}
                    </h3>

                    <p
                      className={`text-gray-600 mb-4 line-clamp-3 leading-relaxed ${
                        index === 0 ? "text-base" : "text-sm"
                      }`}
                    >
                      {article.content.replace(/<[^>]*>/g, "").substring(0, index === 0 ? 200 : 150)}...
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
      </main>

      <NewsFooter />
    </div>
  )
}

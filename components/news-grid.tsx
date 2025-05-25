"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
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

export function NewsGrid() {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories] = useState(["سياسة", "اقتصاد", "رياضة", "تكنولوجيا", "ثقافة", "عالمي"])

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles") || "[]")
    setArticles(storedArticles.filter((article: Article) => !article.featured))
  }, [])

  if (articles.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black mb-4">آخر الأخبار</h2>
            <Separator className="w-24 mx-auto mb-8 bg-black h-0.5" />
            <div className="text-gray-500">
              <p className="text-lg">لا توجد مقالات منشورة حالياً</p>
              <p className="mt-2">يمكنك إضافة مقالات جديدة من لوحة التحكم</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const getArticlesByCategory = (category: string) => {
    return articles.filter((article) => article.category === category).slice(0, 3)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Latest News Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold text-black">آخر الأخبار</h2>
            <Separator className="flex-1 mr-6 bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 6).map((article) => (
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
        </div>

        {/* Category Sections */}
        {categories.map((category) => {
          const categoryArticles = getArticlesByCategory(category)
          if (categoryArticles.length === 0) return null

          return (
            <div key={category} className="mb-16">
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-bold text-black">{category}</h2>
                <Separator className="flex-1 mr-6 bg-gray-300" />
                <Link
                  href={`/category/${category}`}
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  عرض المزيد
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categoryArticles.map((article, index) => (
                  <Card
                    key={article.id}
                    className={`overflow-hidden hover:shadow-lg transition-shadow group border-0 ${index === 0 ? "md:row-span-2" : ""}`}
                  >
                    <Link href={`/article/${article.id}`}>
                      <div className={`relative ${index === 0 ? "h-64" : "h-48"}`}>
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
                      </div>
                      <CardContent className="p-4">
                        <h3
                          className={`font-bold text-black mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors ${index === 0 ? "text-lg" : "text-base"}`}
                        >
                          {article.title}
                        </h3>

                        {index === 0 && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {article.content.replace(/<[^>]*>/g, "").substring(0, 120)}...
                          </p>
                        )}

                        <div className="text-xs text-gray-500">
                          <span>{formatDateArabic(article.publishedAt)}</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

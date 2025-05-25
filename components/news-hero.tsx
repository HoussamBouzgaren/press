"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

export function NewsHero() {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null)
  const [sideArticles, setSideArticles] = useState<Article[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const articles = JSON.parse(localStorage.getItem("articles") || "[]")
    const featured = articles.find((article: Article) => article.featured)
    const others = articles.filter((article: Article) => !article.featured).slice(0, 4)

    if (featured) {
      setFeaturedArticle(featured)
    }
    setSideArticles(others)
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <section className="bg-gray-50 py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="animate-pulse">جاري التحميل...</div>
          </div>
        </div>
      </section>
    )
  }

  if (!featuredArticle && sideArticles.length === 0) {
    return (
      <section className="bg-gray-50 py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-black mb-4">أهلاً بكم في الشرق الأوسط</h1>
            <p className="text-xl text-gray-600">آخر الأخبار والتطورات من المنطقة والعالم</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-8 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            {featuredArticle && (
              <Card className="relative overflow-hidden group cursor-pointer border-0 shadow-lg">
                <Link href={`/article/${featuredArticle.id}`}>
                  <div className="relative h-96">
                    {featuredArticle.image ? (
                      <Image
                        src={featuredArticle.image || "/placeholder.svg"}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <Badge className="bg-red-600 hover:bg-red-700 mb-4 text-sm">{featuredArticle.category}</Badge>
                      <h1 className="text-3xl font-bold mb-4 leading-tight">{featuredArticle.title}</h1>
                      <p className="text-gray-200 mb-4 text-lg leading-relaxed">
                        {featuredArticle.content.replace(/<[^>]*>/g, "").substring(0, 200)}...
                      </p>
                      <div className="flex items-center text-sm text-gray-300">
                        <span>{featuredArticle.author}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDateArabic(featuredArticle.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            )}
          </div>

          {/* Side Articles */}
          <div className="space-y-6">
            <div className="border-b-2 border-black pb-2 mb-6">
              <h2 className="text-2xl font-bold text-black">أهم الأخبار</h2>
            </div>

            {sideArticles.map((article, index) => (
              <Card key={article.id} className="border-0 shadow-sm hover:shadow-md transition-shadow group">
                <Link href={`/article/${article.id}`}>
                  <div className="flex space-x-4 space-x-reverse p-4">
                    {article.image && (
                      <div className="relative w-24 h-20 flex-shrink-0">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover rounded group-hover:opacity-90 transition-opacity"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <Badge variant="outline" className="text-xs mb-2 border-gray-300">
                        {article.category}
                      </Badge>
                      <h3 className="font-bold text-black text-sm leading-tight mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="text-xs text-gray-500">{formatDateArabic(article.publishedAt)}</div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

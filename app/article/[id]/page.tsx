"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { NewsHeader } from "@/components/news-header"
import { NewsFooter } from "@/components/news-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Share2, Facebook, Twitter, Clock, User } from "lucide-react"

// Date formatting functions
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

function formatDateTimeArabic(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  const dateFormatted = formatDateArabic(dateObj)
  const timeFormatted = dateObj
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace("AM", "ص")
    .replace("PM", "م")

  return `${dateFormatted} في ${timeFormatted}`
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

export default function ArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])

  useEffect(() => {
    const articles = JSON.parse(localStorage.getItem("articles") || "[]")
    const currentArticle = articles.find((a: Article) => a.id === params.id)

    if (currentArticle) {
      setArticle(currentArticle)

      // Get related articles from same category
      const related = articles
        .filter((a: Article) => a.category === currentArticle.category && a.id !== currentArticle.id)
        .slice(0, 4)
      setRelatedArticles(related)
    }
  }, [params.id])

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <NewsHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6 text-black">المقال غير موجود</h1>
            <p className="text-gray-600 mb-8">عذراً، لم نتمكن من العثور على المقال المطلوب</p>
            <Link href="/">
              <Button className="bg-black text-white hover:bg-gray-800">
                <ArrowRight className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Button>
            </Link>
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
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-black transition-colors">
                الرئيسية
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/category/${article.category}`} className="hover:text-black transition-colors">
                {article.category}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-black">{article.title.substring(0, 50)}...</span>
            </div>
          </nav>

          <article className="mb-16">
            {/* Article Header */}
            <div className="mb-8">
              <Badge className="bg-black text-white hover:bg-gray-800 mb-4 text-sm">{article.category}</Badge>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-black">{article.title}</h1>

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center text-gray-600 mb-4 md:mb-0">
                  <User className="w-4 h-4 ml-2" />
                  <span className="font-medium">{article.author}</span>
                  <Separator orientation="vertical" className="mx-4 h-4" />
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{formatDateTimeArabic(article.publishedAt)}</span>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-black text-black hover:bg-black hover:text-white"
                  >
                    <Share2 className="w-4 h-4 ml-2" />
                    مشاركة
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Article Image */}
            {article.image && (
              <div className="mb-8">
                <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
              <div
                className="article-content text-lg leading-8"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span>نُشر في: {formatDateArabic(article.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-sm text-gray-600">شارك المقال:</span>
                  <Button variant="ghost" size="sm">
                    <Facebook className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Twitter className="w-4 h-4 text-blue-400" />
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section>
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-bold text-black">مقالات ذات صلة</h2>
                <Separator className="flex-1 mr-6 bg-gray-300" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Card
                    key={relatedArticle.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow group border-0 shadow-md"
                  >
                    <Link href={`/article/${relatedArticle.id}`}>
                      {relatedArticle.image && (
                        <div className="relative h-40">
                          <Image
                            src={relatedArticle.image || "/placeholder.svg"}
                            alt={relatedArticle.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <Badge variant="outline" className="text-xs mb-2">
                          {relatedArticle.category}
                        </Badge>
                        <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                          {relatedArticle.content.replace(/<[^>]*>/g, "").substring(0, 80)}...
                        </p>
                        <div className="text-xs text-gray-500">{formatDateArabic(relatedArticle.publishedAt)}</div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <NewsFooter />
    </div>
  )
}

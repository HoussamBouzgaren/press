"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticleEditor } from "./article-editor"
import { ArticleList } from "./article-list"
import { Plus } from "lucide-react"

interface Article {
  id: string
  title: string
  content: string
  author: string
  category: string
  image?: string
  publishedAt: string
  featured?: boolean
  status: "draft" | "published"
}

export function ArticleManager() {
  const [view, setView] = useState<"list" | "editor">("list")
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles") || "[]")
    setArticles(storedArticles)
  }, [])

  const handleNewArticle = () => {
    setEditingArticle(null)
    setView("editor")
  }

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article)
    setView("editor")
  }

  const handleSaveArticle = (article: Article) => {
    const updatedArticles = editingArticle
      ? articles.map((a) => (a.id === editingArticle.id ? article : a))
      : [...articles, { ...article, id: Date.now().toString() }]

    setArticles(updatedArticles)
    localStorage.setItem("articles", JSON.stringify(updatedArticles))
    setView("list")
  }

  const handleDeleteArticle = (id: string) => {
    const updatedArticles = articles.filter((a) => a.id !== id)
    setArticles(updatedArticles)
    localStorage.setItem("articles", JSON.stringify(updatedArticles))
  }

  if (view === "editor") {
    return <ArticleEditor article={editingArticle} onSave={handleSaveArticle} onCancel={() => setView("list")} />
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>إدارة المقالات</CardTitle>
            <Button onClick={handleNewArticle}>
              <Plus className="w-4 h-4 ml-2" />
              مقال جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ArticleList articles={articles} onEdit={handleEditArticle} onDelete={handleDeleteArticle} />
        </CardContent>
      </Card>
    </div>
  )
}

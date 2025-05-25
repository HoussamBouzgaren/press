"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Eye, TrendingUp } from "lucide-react"

export function DashboardOverview() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    totalUsers: 0,
    totalViews: 0,
  })

  useEffect(() => {
    const articles = JSON.parse(localStorage.getItem("articles") || "[]")
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    setStats({
      totalArticles: articles.length,
      publishedArticles: articles.filter((a: any) => a.status === "published").length,
      totalUsers: users.length,
      totalViews: Math.floor(Math.random() * 10000) + 1000, // Mock data
    })
  }, [])

  const statCards = [
    {
      title: "إجمالي المقالات",
      value: stats.totalArticles,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "المقالات المنشورة",
      value: stats.publishedArticles,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "المستخدمين",
      value: stats.totalUsers,
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "المشاهدات",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">لوحة المعلومات</h2>
        <p className="text-gray-600 mt-2">نظرة عامة على إحصائيات الموقع</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>آخر المقالات</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentArticles />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إحصائيات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <QuickStats />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function RecentArticles() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles") || "[]")
    setArticles(storedArticles.slice(0, 5))
  }, [])

  if (articles.length === 0) {
    return <p className="text-gray-500">لا توجد مقالات حالياً</p>
  }

  return (
    <div className="space-y-3">
      {articles.map((article: any) => (
        <div key={article.id} className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">{article.title}</p>
            <p className="text-xs text-gray-500">بقلم: {article.author}</p>
          </div>
          <span
            className={`px-2 py-1 rounded text-xs ${
              article.status === "published" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
            }`}
          >
            {article.status === "published" ? "منشور" : "مسودة"}
          </span>
        </div>
      ))}
    </div>
  )
}

function QuickStats() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">مقالات اليوم</span>
        <span className="font-medium">3</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">مقالات هذا الأسبوع</span>
        <span className="font-medium">12</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">مقالات هذا الشهر</span>
        <span className="font-medium">45</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">متوسط المشاهدات</span>
        <span className="font-medium">234</span>
      </div>
    </div>
  )
}

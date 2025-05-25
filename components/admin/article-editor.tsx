"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Save, Eye, Upload, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react"

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

interface ArticleEditorProps {
  article?: Article | null
  onSave: (article: Article) => void
  onCancel: () => void
}

export function ArticleEditor({ article, onSave, onCancel }: ArticleEditorProps) {
  const [title, setTitle] = useState(article?.title || "")
  const [content, setContent] = useState(article?.content || "")
  const [author, setAuthor] = useState(article?.author || "")
  const [category, setCategory] = useState(article?.category || "")
  const [image, setImage] = useState(article?.image || "")
  const [featured, setFeatured] = useState(article?.featured || false)
  const [status, setStatus] = useState<"draft" | "published">(article?.status || "draft")
  const [preview, setPreview] = useState(false)

  const contentRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = ["سياسة", "اقتصاد", "رياضة", "تكنولوجيا", "ثقافة", "صحة", "تعليم", "بيئة"]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const formatText = (command: string) => {
    const textarea = contentRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let formattedText = ""

    switch (command) {
      case "bold":
        formattedText = `<strong>${selectedText}</strong>`
        break
      case "italic":
        formattedText = `<em>${selectedText}</em>`
        break
      case "underline":
        formattedText = `<u>${selectedText}</u>`
        break
      default:
        formattedText = selectedText
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end)
    setContent(newContent)
  }

  const handleSave = () => {
    const articleData: Article = {
      id: article?.id || Date.now().toString(),
      title,
      content,
      author,
      category,
      image,
      featured,
      status,
      publishedAt: article?.publishedAt || new Date().toISOString(),
    }

    onSave(articleData)
  }

  if (preview) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">معاينة المقال</h2>
          <div className="space-x-2 space-x-reverse">
            <Button variant="outline" onClick={() => setPreview(false)}>
              العودة للتحرير
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            {image && (
              <img src={image || "/placeholder.svg"} alt={title} className="w-full h-64 object-cover rounded-lg mb-6" />
            )}

            <div className="mb-4">
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm font-medium">{category}</span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{title}</h1>

            <div className="text-gray-600 mb-6">
              بقلم: {author} • {new Date().toLocaleDateString("ar-SA")}
            </div>

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{article ? "تحرير المقال" : "مقال جديد"}</h2>
        <div className="space-x-2 space-x-reverse">
          <Button variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
          <Button variant="outline" onClick={() => setPreview(true)}>
            <Eye className="w-4 h-4 ml-2" />
            معاينة
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 ml-2" />
            حفظ
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>محتوى المقال</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">عنوان المقال</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="أدخل عنوان المقال"
                  className="text-lg font-semibold"
                />
              </div>

              <div>
                <Label>أدوات التنسيق</Label>
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => formatText("bold")}>
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => formatText("italic")}>
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => formatText("underline")}>
                    <Underline className="w-4 h-4" />
                  </Button>
                  <div className="border-l h-6 mx-2" />
                  <Button type="button" variant="ghost" size="sm">
                    <AlignLeft className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm">
                    <AlignCenter className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm">
                    <AlignRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="content">محتوى المقال</Label>
                <Textarea
                  ref={contentRef}
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="اكتب محتوى المقال هنا..."
                  className="min-h-[400px] font-arabic"
                  dir="rtl"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات النشر</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">حالة المقال</Label>
                <Select value={status} onValueChange={(value: "draft" | "published") => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">مسودة</SelectItem>
                    <SelectItem value="published">منشور</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="author">الكاتب</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="اسم الكاتب"
                />
              </div>

              <div>
                <Label htmlFor="category">التصنيف</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="featured"
                  checked={featured}
                  onCheckedChange={(checked) => setFeatured(checked as boolean)}
                />
                <Label htmlFor="featured">مقال مميز</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>صورة المقال</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 ml-2" />
                  رفع صورة
                </Button>
              </div>

              {image && (
                <div className="relative">
                  <img
                    src={image || "/placeholder.svg"}
                    alt="معاينة الصورة"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setImage("")}
                  >
                    حذف
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

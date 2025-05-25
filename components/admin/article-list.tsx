"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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

interface ArticleListProps {
  articles: Article[]
  onEdit: (article: Article) => void
  onDelete: (id: string) => void
}

export function ArticleList({ articles, onEdit, onDelete }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>لا توجد مقالات حالياً</p>
        <p className="text-sm mt-2">ابدأ بإنشاء مقال جديد</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>العنوان</TableHead>
            <TableHead>الكاتب</TableHead>
            <TableHead>التصنيف</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>تاريخ النشر</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="font-medium">{article.title}</span>
                  {article.featured && <Badge variant="secondary">مميز</Badge>}
                </div>
              </TableCell>
              <TableCell>{article.author}</TableCell>
              <TableCell>
                <Badge variant="outline">{article.category}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={article.status === "published" ? "default" : "secondary"}>
                  {article.status === "published" ? "منشور" : "مسودة"}
                </Badge>
              </TableCell>
              <TableCell>{new Date(article.publishedAt).toLocaleDateString("ar-SA")}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(article)}>
                    <Edit className="w-4 h-4" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                        <AlertDialogDescription>
                          هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(article.id)}>حذف</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

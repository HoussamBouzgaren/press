"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface User {
  id: string
  username: string
  email: string
  role: "admin" | "editor" | "author"
  createdAt: string
}

export function UserManager() {
  const [users, setUsers] = useState<User[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "author" as User["role"],
  })

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    if (storedUsers.length === 0) {
      // Add default admin user
      const defaultUsers = [
        {
          id: "1",
          username: "admin",
          email: "admin@example.com",
          role: "admin" as const,
          createdAt: new Date().toISOString(),
        },
      ]
      setUsers(defaultUsers)
      localStorage.setItem("users", JSON.stringify(defaultUsers))
    } else {
      setUsers(storedUsers)
    }
  }, [])

  const handleSaveUser = () => {
    const userData: User = {
      id: editingUser?.id || Date.now().toString(),
      ...formData,
      createdAt: editingUser?.createdAt || new Date().toISOString(),
    }

    const updatedUsers = editingUser ? users.map((u) => (u.id === editingUser.id ? userData : u)) : [...users, userData]

    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    setIsDialogOpen(false)
    setEditingUser(null)
    setFormData({ username: "", email: "", role: "author" })
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteUser = (id: string) => {
    const updatedUsers = users.filter((u) => u.id !== id)
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))
  }

  const getRoleBadge = (role: User["role"]) => {
    const roleMap = {
      admin: { label: "مدير", variant: "default" as const },
      editor: { label: "محرر", variant: "secondary" as const },
      author: { label: "كاتب", variant: "outline" as const },
    }
    return roleMap[role]
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>إدارة المستخدمين</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingUser(null)
                    setFormData({ username: "", email: "", role: "author" })
                  }}
                >
                  <Plus className="w-4 h-4 ml-2" />
                  مستخدم جديد
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingUser ? "تحرير المستخدم" : "مستخدم جديد"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username">اسم المستخدم</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="أدخل اسم المستخدم"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="أدخل البريد الإلكتروني"
                    />
                  </div>

                  <div>
                    <Label htmlFor="role">الصلاحية</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: User["role"]) => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="author">كاتب - يمكنه كتابة المقالات فقط</SelectItem>
                        <SelectItem value="editor">محرر - يمكنه تحرير ونشر المقالات</SelectItem>
                        <SelectItem value="admin">مدير - صلاحيات كاملة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end space-x-2 space-x-reverse">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      إلغاء
                    </Button>
                    <Button onClick={handleSaveUser}>حفظ</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم المستخدم</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الصلاحية</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const roleBadge = getRoleBadge(user.role)
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={roleBadge.variant}>{roleBadge.label}</Badge>
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString("ar-SA")}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        {user.role !== "admin" && (
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Lock } from "lucide-react"

interface SystemLoginProps {
  onLogin: () => void
}

export function SystemLogin({ onLogin }: SystemLoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Enhanced security credentials
    if (username === "system_admin" && password === "SecurePass2024!") {
      localStorage.setItem("systemAuth_x9z8", "authenticated_2024")
      onLogin()
    } else {
      setError("بيانات الدخول غير صحيحة")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="absolute inset-0 bg-black/50"></div>
      <Card className="w-full max-w-md relative z-10 bg-gray-900 border-gray-700 text-white">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-gray-800 rounded-full w-fit">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <CardTitle className="text-2xl text-white">نظام التحكم</CardTitle>
          <p className="text-gray-400 text-sm">الدخول للنظام المحمي</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-gray-300">
                اسم المستخدم
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="system_admin"
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">
                كلمة المرور
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="SecurePass2024!"
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-900/50 border-red-700">
                <Lock className="h-4 w-4" />
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Shield className="w-4 h-4 ml-2" />
              دخول النظام
            </Button>
          </form>

          <div className="mt-6 text-xs text-gray-500 text-center space-y-1">
            <p>بيانات الدخول:</p>
            <p>المستخدم: system_admin</p>
            <p>كلمة المرور: SecurePass2024!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

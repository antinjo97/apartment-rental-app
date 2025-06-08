"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { signIn } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { User, Shield, Key, CheckCircle, AlertCircle } from "lucide-react"

export default function TestLoginPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")

  const testAccounts = [
    {
      email: "admin@admin.com",
      password: "admin123",
      role: "Admin",
      description: "Puni admin pristup - može upravljati apartmanima i rezervacijama",
      color: "bg-red-100 text-red-800",
    },
    {
      email: "test@test.com",
      password: "test123",
      role: "Korisnik",
      description: "Obični korisnik - može pregledavati i rezervirati apartmane",
      color: "bg-blue-100 text-blue-800",
    },
  ]

  const handleTestLogin = async (email: string, password: string) => {
    setLoading(true)
    setMessage("")

    try {
      await signIn(email, password)
      setMessage(`Uspješno ste se prijavili kao ${email}`)
      setMessageType("success")

      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (error: any) {
      setMessage(`Greška: ${error.message}`)
      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Key className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Prijava</h1>
            <p className="text-gray-600 text-lg">Koristite test račune za brzu prijavu u aplikaciju</p>
          </div>

          {message && (
            <Alert className={`mb-6 ${messageType === "success" ? "border-green-500" : "border-red-500"}`}>
              {messageType === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={messageType === "success" ? "text-green-700" : "text-red-700"}>
                {message}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testAccounts.map((account, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {account.role === "Admin" ? (
                        <Shield className="w-5 h-5 text-red-600" />
                      ) : (
                        <User className="w-5 h-5 text-blue-600" />
                      )}
                      Test {account.role}
                    </div>
                    <Badge className={account.color}>{account.role}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{account.description}</p>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Email:</span>
                      <code className="text-sm">{account.email}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Lozinka:</span>
                      <code className="text-sm">{account.password}</code>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleTestLogin(account.email, account.password)}
                    disabled={loading}
                    className={`w-full ${
                      account.role === "Admin"
                        ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    }`}
                  >
                    {loading ? "Prijavljivanje..." : `Prijavi se kao ${account.role}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">ℹ️ Napomene</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <p className="text-gray-700">
                  <strong>Admin račun</strong> ima pristup admin panelu za upravljanje apartmanima i rezervacijama
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <p className="text-gray-700">
                  <strong>Korisnički račun</strong> može pregledavati apartmane i napraviti rezervacije
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <p className="text-gray-700">Svi test računi su već potvrđeni i spremni za korištenje</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

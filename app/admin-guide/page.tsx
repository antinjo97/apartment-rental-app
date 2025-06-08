"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/components/language-provider"
import { Shield, User, Mail, Key, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AdminGuidePage() {
  const { t } = useLanguage()

  const adminEmails = [
    "admin@example.com",
    "admin@apartmani.hr",
    "admin@apartrent.com",
    "admin@admin.com",
    "test@admin.com",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Panel Pristup</h1>
            <p className="text-gray-600 text-lg">Vodič za pristup administratorskom panelu</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* How to become admin */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Kako postati administrator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Registriraj se s admin emailom</h4>
                      <p className="text-sm text-gray-600">Koristi jedan od admin email adresa za registraciju</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Potvrdi email</h4>
                      <p className="text-sm text-gray-600">Provjeri email i klikni na link za potvrdu</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Prijavi se</h4>
                      <p className="text-sm text-gray-600">Prijavi se s admin emailom i lozinkom</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold">Pristup admin panelu</h4>
                      <p className="text-sm text-gray-600">Admin Panel link će se pojaviti u navigaciji</p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>Admin status se automatski dodjeljuje na temelju email adrese</AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Admin emails */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Admin Email Adrese
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">Koristi bilo koju od ovih email adresa za admin pristup:</p>

                <div className="space-y-2">
                  {adminEmails.map((email, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <code className="text-sm font-mono">{email}</code>
                    </div>
                  ))}
                </div>

                <Alert>
                  <Key className="h-4 w-4" />
                  <AlertDescription>Lozinka može biti bilo što (minimalno 6 znakova)</AlertDescription>
                </Alert>

                <div className="pt-4 space-y-2">
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-teal-600">
                    <Link href="/auth/signup">
                      <User className="w-4 h-4 mr-2" />
                      Registriraj se kao admin
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full">
                    <Link href="/auth/signin">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Već imaš admin račun? Prijavi se
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick test */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-center">🚀 Brzi test</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-700">Želiš brzo testirati admin panel? Koristi:</p>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-mono text-sm">
                  <strong>Email:</strong> admin@admin.com
                  <br />
                  <strong>Lozinka:</strong> admin123
                </p>
              </div>
              <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-blue-600">
                <Link href="/auth/signup">Registriraj se sada</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

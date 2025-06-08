"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { Shield, Code, User, Settings, Database, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DevAdminPage() {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Code className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Development Admin Panel</h1>
            <p className="text-gray-600 text-lg">Lokalno zaobilaženje autentifikacije za development</p>
          </div>

          {/* Status */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Trenutni Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Environment:</span>
                  <Badge className="bg-orange-100 text-orange-800">{process.env.NODE_ENV || "development"}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Prijavljen:</span>
                  <Badge className={user ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {user ? "Da" : "Ne"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Admin:</span>
                  <Badge className={isAdmin ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
                    {isAdmin ? "Da" : "Ne"}
                  </Badge>
                </div>
              </div>

              {user && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Korisnik podaci:</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>ID:</strong> {user.id}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Tip:</strong>{" "}
                      {process.env.NODE_ENV === "development" ? "Mock Admin (lokalno)" : "Pravi korisnik"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Funkcionalnosti */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Admin Funkcije
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">Pristup admin funkcionalnostima:</p>
                <div className="space-y-2">
                  <Button asChild className="w-full justify-start">
                    <Link href="/admin">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/supabase-setup">
                      <Database className="w-4 h-4 mr-2" />
                      Supabase Setup
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/test-login">
                      <User className="w-4 h-4 mr-2" />
                      Test Login
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Kako funkcionira</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Development Mode</p>
                    <p className="text-sm text-gray-600">Automatski si prijavljen kao admin</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Zaobilazi autentifikaciju</p>
                    <p className="text-sm text-gray-600">Nema potrebe za prijavu</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Production sigurnost</p>
                    <p className="text-sm text-gray-600">Radi samo u development modu</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upozorenje */}
          <Alert className="mt-8 border-red-200 bg-red-50">
            <Shield className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Važno:</strong> Ovo zaobilaženje radi samo u development modu (NODE_ENV=development). U production
              modu će se koristiti normalna Supabase autentifikacija.
            </AlertDescription>
          </Alert>

          {/* Test računi */}
          <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">🎯 Pravi admin računi za testiranje</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-blue-600 mb-2">Ante Admin</h4>
                  <p className="font-mono text-sm">
                    <strong>Email:</strong> ante@admin.hr
                    <br />
                    <strong>Lozinka:</strong> admin
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-red-600 mb-2">Glavni Admin</h4>
                  <p className="font-mono text-sm">
                    <strong>Email:</strong> admin@admin.com
                    <br />
                    <strong>Lozinka:</strong> admin123
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

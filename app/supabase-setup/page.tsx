"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { SupabaseStatus } from "@/components/supabase-status"
import { Database, ExternalLink, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function SupabaseSetupPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const envTemplate = `# Dodaj ove varijable u .env.local datoteku
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Database className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Supabase Setup</h1>
            <p className="text-gray-600 text-lg">Postavi Supabase bazu podataka za apartmane</p>
          </div>

          {/* Status provjera */}
          <div className="mb-8">
            <SupabaseStatus />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Korak 1: Stvori projekt */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  Stvori Supabase projekt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">Idi na Supabase i stvori novi projekt:</p>
                <Button asChild className="w-full">
                  <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Otvori Supabase Dashboard
                  </a>
                </Button>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Klikni "New project"</p>
                  <p>• Odaberi organizaciju</p>
                  <p>• Unesi ime projekta (npr. "apartment-rental")</p>
                  <p>• Odaberi regiju (Europe West)</p>
                  <p>• Stvori jaku lozinku za bazu</p>
                </div>
              </CardContent>
            </Card>

            {/* Korak 2: Kopiraj podatke */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  Kopiraj API podatke
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">U Supabase dashboardu:</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Idi na Settings → API</p>
                  <p>• Kopiraj "Project URL"</p>
                  <p>• Kopiraj "anon public" ključ</p>
                </div>
                <Alert>
                  <AlertDescription>
                    <strong>Važno:</strong> Nikad ne dijeli service_role ključ javno!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Korak 3: .env.local */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  Stvori .env.local datoteku
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">Stvori .env.local datoteku u root direktoriju projekta:</p>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{envTemplate}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(envTemplate, "env")}
                  >
                    {copied === "env" ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <Alert>
                  <AlertDescription>
                    Zamijeni "your-project-id" i "your-anon-key" s tvojim stvarnim podacima iz Supabase dashboarda.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Korak 4: SQL skripte */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  Pokreni SQL skripte
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">U Supabase SQL editoru pokreni ove skripte redom:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Badge variant="outline">1. Tablice</Badge>
                    <p className="text-sm text-gray-600">scripts/create-tables.sql</p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline">2. Podaci</Badge>
                    <p className="text-sm text-gray-600">scripts/create-5-best-croatian-apartments.sql</p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline">3. Admin</Badge>
                    <p className="text-sm text-gray-600">scripts/add-admin-simple.sql</p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline">4. Provjera</Badge>
                    <p className="text-sm text-gray-600">scripts/check-admin-users-fixed.sql</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test podaci */}
          <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">🎯 Test podaci za prijavu</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-red-600 mb-2">Admin račun</h4>
                  <p className="font-mono text-sm">
                    <strong>Email:</strong> admin@admin.com
                    <br />
                    <strong>Lozinka:</strong> admin123
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-blue-600 mb-2">Korisnik račun</h4>
                  <p className="font-mono text-sm">
                    <strong>Email:</strong> test@test.com
                    <br />
                    <strong>Lozinka:</strong> test123
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

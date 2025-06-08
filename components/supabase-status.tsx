"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { CheckCircle, XCircle, AlertCircle, Database } from "lucide-react"

export function SupabaseStatus() {
  const [status, setStatus] = useState<{
    connected: boolean
    tablesExist: boolean
    error?: string
    loading: boolean
  }>({
    connected: false,
    tablesExist: false,
    loading: true,
  })

  useEffect(() => {
    async function checkSupabaseConnection() {
      try {
        // Test basic connection
        const { data, error } = await supabase.from("apartments").select("count", { count: "exact", head: true })

        if (error) {
          setStatus({
            connected: false,
            tablesExist: false,
            error: error.message,
            loading: false,
          })
          return
        }

        // Check if tables exist by trying to query them
        const { error: apartmentError } = await supabase.from("apartments").select("id").limit(1)
        const { error: authError } = await supabase.auth.getSession()

        setStatus({
          connected: true,
          tablesExist: !apartmentError,
          error: apartmentError?.message,
          loading: false,
        })
      } catch (err: any) {
        setStatus({
          connected: false,
          tablesExist: false,
          error: err.message,
          loading: false,
        })
      }
    }

    checkSupabaseConnection()
  }, [])

  if (status.loading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Provjeravam Supabase konekciju...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Supabase Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Konekcija:</span>
          <Badge className={status.connected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
            {status.connected ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Povezano
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3 mr-1" />
                Nije povezano
              </>
            )}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span>Tablice:</span>
          <Badge className={status.tablesExist ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
            {status.tablesExist ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Postoje
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 mr-1" />
                Trebaju se kreirati
              </>
            )}
          </Badge>
        </div>

        {status.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Greška:</strong> {status.error}
            </AlertDescription>
          </Alert>
        )}

        {!status.connected && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Kako riješiti:</strong>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>
                  Stvori Supabase projekt na{" "}
                  <a href="https://supabase.com" className="text-blue-600 underline">
                    supabase.com
                  </a>
                </li>
                <li>Kopiraj Project URL i anon key</li>
                <li>Dodaj ih u .env.local datoteku</li>
                <li>Pokreni SQL skripte za kreiranje tablica</li>
              </ol>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

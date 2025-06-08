"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, Code } from "lucide-react"

export function DevAdminBanner() {
  // Prikaži samo u development modu
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <Alert className="border-orange-200 bg-orange-50">
      <Code className="h-4 w-4 text-orange-600" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-orange-600" />
          <span className="text-orange-800">
            <strong>DEV MODE:</strong> Automatski si prijavljen kao admin (zaobilazi autentifikaciju)
          </span>
        </div>
        <Badge variant="outline" className="border-orange-300 text-orange-700">
          Development
        </Badge>
      </AlertDescription>
    </Alert>
  )
}

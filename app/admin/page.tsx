"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApartmentManagement } from "@/components/admin/apartment-management"
import { ReservationManagement } from "@/components/admin/reservation-management"
import { ImageManager } from "@/components/admin/image-manager"
import { AvailabilityCalendar } from "@/components/admin/availability-calendar"
import { useLanguage } from "@/components/language-provider"
import { Building, Calendar, ImageIcon, CalendarDays } from "lucide-react"

export default function AdminPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("apartments")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t("admin_panel", "Admin Panel")}</h1>
          <p className="text-gray-600">{t("manage_apartments", "Manage your apartments and reservations")}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <TabsTrigger value="apartments" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              {t("apartments", "Apartments")}
            </TabsTrigger>
            <TabsTrigger value="reservations" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {t("reservations", "Reservations")}
            </TabsTrigger>
            <TabsTrigger value="availability" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              {t("availability", "Availability")}
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              {t("images", "Images")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="apartments" className="space-y-6">
            <ApartmentManagement />
          </TabsContent>

          <TabsContent value="reservations" className="space-y-6">
            <ReservationManagement />
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <AvailabilityCalendar />
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <ImageManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

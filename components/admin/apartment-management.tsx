"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { getApartments, createApartment, updateApartment, deleteApartment } from "@/lib/apartments"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, MapPin, Users, Home, Instagram, Facebook } from "lucide-react"
import type { Apartment } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"

export function ApartmentManagement() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price_per_night: "",
    number_of_rooms: "",
    capacity: "",
    address: "",
    latitude: "",
    longitude: "",
    amenities: "",
    image_urls: "",
    instagram_url: "",
    facebook_url: "",
  })

  const { t } = useLanguage()
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    fetchApartments()
  }, [])

  const fetchApartments = async () => {
    try {
      const data = await getApartments()
      setApartments(data)
    } catch (error) {
      console.error("Error fetching apartments:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const apartmentData = {
        name: formData.name,
        description: formData.description,
        price_per_night: Number.parseFloat(formData.price_per_night),
        number_of_rooms: Number.parseInt(formData.number_of_rooms),
        capacity: Number.parseInt(formData.capacity),
        address: formData.address,
        latitude: formData.latitude ? Number.parseFloat(formData.latitude) : undefined,
        longitude: formData.longitude ? Number.parseFloat(formData.longitude) : undefined,
        amenities: formData.amenities
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        image_urls: formData.image_urls
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean),
        instagram_url: formData.instagram_url.trim() || null,
        facebook_url: formData.facebook_url.trim() || null,
        owner_id: user?.id, // Dodaj owner_id za vlasništvo
      }

      if (editingApartment) {
        await updateApartment(editingApartment.id, apartmentData)
        toast({
          title: t("success", "Success"),
          description: t("apartment_updated", "Apartment updated successfully"),
        })
      } else {
        await createApartment(apartmentData)
        toast({
          title: t("success", "Success"),
          description: t("apartment_created", "Apartment created successfully"),
        })
      }

      setIsDialogOpen(false)
      setEditingApartment(null)
      resetForm()
      fetchApartments()
    } catch (error) {
      console.error("Error saving apartment:", error)
      toast({
        title: t("error", "Error"),
        description: t("apartment_save_error", "Error saving apartment"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (apartment: Apartment) => {
    setEditingApartment(apartment)
    setFormData({
      name: apartment.name,
      description: apartment.description,
      price_per_night: apartment.price_per_night.toString(),
      number_of_rooms: apartment.number_of_rooms.toString(),
      capacity: apartment.capacity.toString(),
      address: apartment.address,
      latitude: apartment.latitude?.toString() || "",
      longitude: apartment.longitude?.toString() || "",
      amenities: apartment.amenities.join(", "),
      image_urls: apartment.image_urls.join(", "),
      instagram_url: apartment.instagram_url || "",
      facebook_url: apartment.facebook_url || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm(t("confirm_delete", "Are you sure you want to delete this apartment?"))) {
      return
    }

    try {
      await deleteApartment(id)
      toast({
        title: t("success", "Success"),
        description: t("apartment_deleted", "Apartment deleted successfully"),
      })
      fetchApartments()
    } catch (error) {
      console.error("Error deleting apartment:", error)
      toast({
        title: t("error", "Error"),
        description: t("apartment_delete_error", "Error deleting apartment"),
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price_per_night: "",
      number_of_rooms: "",
      capacity: "",
      address: "",
      latitude: "",
      longitude: "",
      amenities: "",
      image_urls: "",
      instagram_url: "",
      facebook_url: "",
    })
  }

  const openCreateDialog = () => {
    setEditingApartment(null)
    resetForm()
    setIsDialogOpen(true)
  }

  if (loading && apartments.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t("apartment_management", "Apartment Management")}</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="bg-gradient-to-r from-blue-600 to-teal-600">
              <Plus className="w-4 h-4 mr-2" />
              {t("add_apartment", "Add Apartment")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingApartment ? t("edit_apartment", "Edit Apartment") : t("add_apartment", "Add Apartment")}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("name", "Name")}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">{t("price_per_night", "Price per Night")}</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price_per_night}
                    onChange={(e) => setFormData({ ...formData, price_per_night: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t("description", "Description")}</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rooms">{t("number_of_rooms", "Number of Rooms")}</Label>
                  <Input
                    id="rooms"
                    type="number"
                    value={formData.number_of_rooms}
                    onChange={(e) => setFormData({ ...formData, number_of_rooms: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">{t("capacity", "Capacity")}</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{t("address", "Address")}</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">
                    {t("latitude", "Latitude")} ({t("optional", "optional")})
                  </Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">
                    {t("longitude", "Longitude")} ({t("optional", "optional")})
                  </Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amenities">
                  {t("amenities", "Amenities")} ({t("comma_separated", "comma separated")})
                </Label>
                <Input
                  id="amenities"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  placeholder="WiFi, Pool, Parking, Kitchen"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">
                    {t("instagram_url", "Instagram URL")} ({t("optional", "optional")})
                  </Label>
                  <Input
                    id="instagram"
                    value={formData.instagram_url}
                    onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                    placeholder="https://instagram.com/your_apartment"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">
                    {t("facebook_url", "Facebook URL")} ({t("optional", "optional")})
                  </Label>
                  <Input
                    id="facebook"
                    value={formData.facebook_url}
                    onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                    placeholder="https://facebook.com/your_apartment"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">
                  {t("image_urls", "Image URLs")} ({t("comma_separated", "comma separated")})
                </Label>
                <Textarea
                  id="images"
                  value={formData.image_urls}
                  onChange={(e) => setFormData({ ...formData, image_urls: e.target.value })}
                  placeholder="/placeholder.svg?height=400&width=600, /placeholder.svg?height=400&width=600"
                  rows={2}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-600 to-teal-600">
                  {loading
                    ? t("saving", "Saving...")
                    : editingApartment
                      ? t("update", "Update")
                      : t("create", "Create")}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {t("cancel", "Cancel")}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {apartments.map((apartment) => (
          <Card key={apartment.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{apartment.name}</span>
                <div className="flex gap-2">
                  {apartment.instagram_url && (
                    <a
                      href={apartment.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    >
                      <Instagram className="w-3 h-3" />
                    </a>
                  )}
                  {apartment.facebook_url && (
                    <a
                      href={apartment.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded bg-blue-600 text-white"
                    >
                      <Facebook className="w-3 h-3" />
                    </a>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(apartment)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(apartment.id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm line-clamp-2">{apartment.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">${apartment.price_per_night}</span>
                <span className="text-gray-600">/ {t("night", "night")}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  <span>
                    {apartment.number_of_rooms} {t("rooms", "rooms")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>
                    {apartment.capacity} {t("guests", "guests")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{apartment.address}</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {apartment.amenities.slice(0, 3).map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {apartment.amenities.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{apartment.amenities.length - 3} {t("more", "more")}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/language-provider"
import { imageStorage } from "@/lib/image-storage"
import { Upload, ImageIcon, Trash2, Eye } from "lucide-react"

interface ImageManagerProps {
  apartmentId?: number
  currentImages?: string[]
  onImagesChange?: (images: string[]) => void
}

export function ImageManager({ apartmentId, currentImages = [], onImagesChange }: ImageManagerProps) {
  const [images, setImages] = useState<string[]>(currentImages)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { toast } = useToast()
  const { t } = useLanguage()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))

      if (files.length > 0) {
        await uploadFiles(files)
      }
    },
    [apartmentId],
  )

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      await uploadFiles(files)
    }
  }

  const uploadFiles = async (files: File[]) => {
    setUploading(true)
    try {
      const results = await imageStorage.uploadMultipleImages(files, apartmentId)
      const successfulUploads = results.filter((result) => !result.error)
      const failedUploads = results.filter((result) => result.error)

      if (successfulUploads.length > 0) {
        const newImages = [...images, ...successfulUploads.map((result) => result.url)]
        setImages(newImages)
        onImagesChange?.(newImages)

        toast({
          title: t("success", "Success"),
          description: t("images_uploaded", `${successfulUploads.length} images uploaded successfully`),
        })
      }

      if (failedUploads.length > 0) {
        toast({
          title: t("error", "Error"),
          description: t("some_uploads_failed", `${failedUploads.length} uploads failed`),
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: t("error", "Error"),
        description: t("upload_error", "Error uploading images"),
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const removeImage = async (imageUrl: string, index: number) => {
    try {
      // Extract path from URL for deletion
      const urlParts = imageUrl.split("/")
      const bucketIndex = urlParts.findIndex((part) => part === "apartment-images")
      if (bucketIndex !== -1 && bucketIndex < urlParts.length - 1) {
        const path = urlParts.slice(bucketIndex + 1).join("/")
        await imageStorage.deleteImage(path)
      }

      const newImages = images.filter((_, i) => i !== index)
      setImages(newImages)
      onImagesChange?.(newImages)

      toast({
        title: t("success", "Success"),
        description: t("image_deleted", "Image deleted successfully"),
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: t("error", "Error"),
        description: t("delete_error", "Error deleting image"),
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          {t("image_management", "Image Management")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">{t("drag_drop_images", "Drag and drop images here")}</p>
              <p className="text-sm text-gray-600">{t("or_click_to_select", "or click to select files")}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-white hover:bg-gray-50"
            >
              {uploading ? t("uploading", "Uploading...") : t("select_files", "Select Files")}
            </Button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Image Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((imageUrl, index) => (
              <div key={index} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setPreviewImage(imageUrl)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeImage(imageUrl, index)}
                      className="bg-red-500/90 hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>{t("no_images", "No images uploaded yet")}</p>
          </div>
        )}

        {/* Preview Dialog */}
        <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{t("image_preview", "Image Preview")}</DialogTitle>
            </DialogHeader>
            {previewImage && (
              <div className="flex justify-center">
                <img
                  src={previewImage || "/placeholder.svg"}
                  alt="Preview"
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

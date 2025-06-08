import { supabase } from "./supabase"

export interface ImageUploadResult {
  url: string
  path: string
  error?: string
}

export class ImageStorage {
  private bucketName = "apartment-images"

  async initializeBucket() {
    try {
      // Check if bucket exists
      const { data: buckets } = await supabase.storage.listBuckets()
      const bucketExists = buckets?.some((bucket) => bucket.name === this.bucketName)

      if (!bucketExists) {
        // Create bucket if it doesn't exist
        const { error } = await supabase.storage.createBucket(this.bucketName, {
          public: true,
          allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
          fileSizeLimit: 5242880, // 5MB
        })

        if (error) {
          console.error("Error creating bucket:", error)
          throw error
        }
      }
    } catch (error) {
      console.error("Error initializing bucket:", error)
      throw error
    }
  }

  async uploadImage(file: File, apartmentId?: number): Promise<ImageUploadResult> {
    try {
      await this.initializeBucket()

      // Generate unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = apartmentId ? `apartment-${apartmentId}/${fileName}` : `general/${fileName}`

      // Upload file
      const { data, error } = await supabase.storage.from(this.bucketName).upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        console.error("Upload error:", error)
        return { url: "", path: "", error: error.message }
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(this.bucketName).getPublicUrl(filePath)

      return {
        url: publicUrl,
        path: filePath,
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      return { url: "", path: "", error: error instanceof Error ? error.message : "Unknown error" }
    }
  }

  async uploadMultipleImages(files: File[], apartmentId?: number): Promise<ImageUploadResult[]> {
    const results: ImageUploadResult[] = []

    for (const file of files) {
      const result = await this.uploadImage(file, apartmentId)
      results.push(result)
    }

    return results
  }

  async deleteImage(path: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage.from(this.bucketName).remove([path])

      if (error) {
        console.error("Delete error:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Error deleting image:", error)
      return false
    }
  }

  async deleteMultipleImages(paths: string[]): Promise<boolean> {
    try {
      const { error } = await supabase.storage.from(this.bucketName).remove(paths)

      if (error) {
        console.error("Delete multiple error:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Error deleting multiple images:", error)
      return false
    }
  }

  async listImages(apartmentId?: number): Promise<string[]> {
    try {
      const folderPath = apartmentId ? `apartment-${apartmentId}` : "general"

      const { data, error } = await supabase.storage.from(this.bucketName).list(folderPath)

      if (error) {
        console.error("List error:", error)
        return []
      }

      return (
        data?.map((file) => {
          const {
            data: { publicUrl },
          } = supabase.storage.from(this.bucketName).getPublicUrl(`${folderPath}/${file.name}`)
          return publicUrl
        }) || []
      )
    } catch (error) {
      console.error("Error listing images:", error)
      return []
    }
  }

  getPublicUrl(path: string): string {
    const {
      data: { publicUrl },
    } = supabase.storage.from(this.bucketName).getPublicUrl(path)
    return publicUrl
  }
}

export const imageStorage = new ImageStorage()

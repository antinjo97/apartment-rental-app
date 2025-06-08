"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react"
import { motion } from "framer-motion"

interface ApartmentGalleryProps {
  images: string[]
}

export function ApartmentGallery({ images }: ApartmentGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-2 h-96 rounded-2xl overflow-hidden">
        <motion.div
          className="col-span-2 row-span-2 relative cursor-pointer group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsGalleryOpen(true)}
        >
          <Image
            src={images[0] || "/placeholder.svg"}
            alt="Main apartment view"
            fill
            className="object-cover group-hover:brightness-90 transition-all duration-300"
          />
        </motion.div>

        {images.slice(1, 5).map((image, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setSelectedImage(index + 1)
              setIsGalleryOpen(true)
            }}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Apartment view ${index + 2}`}
              fill
              className="object-cover group-hover:brightness-90 transition-all duration-300"
            />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-center">
                  <Grid3X3 className="w-8 h-8 mx-auto mb-2" />
                  <span className="text-lg font-semibold">+{images.length - 5} more</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
          <div className="relative w-full h-full bg-black">
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt={`Apartment view ${selectedImage + 1}`}
              fill
              className="object-contain"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
              onClick={prevImage}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 rounded-full px-4 py-2">
              <span className="text-white text-sm">
                {selectedImage + 1} / {images.length}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

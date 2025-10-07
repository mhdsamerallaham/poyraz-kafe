'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ImageUploader({ onUpload, currentImage }) {
  const [preview, setPreview] = useState(currentImage || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setError(null)

    // Preview oluştur
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload
    setUploading(true)
    try {
      const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost'

      if (isProduction) {
        // Production: base64 olarak sakla
        const reader = new FileReader()
        reader.onloadend = () => {
          onUpload(reader.result) // base64 string
          setError(null)
          setUploading(false)
        }
        reader.onerror = () => {
          setError('Resim yüklenirken hata oluştu!')
          setUploading(false)
        }
        reader.readAsDataURL(file)
      } else {
        // Development: API kullan
        const formData = new FormData()
        formData.append('image', file)

        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Upload başarısız')
        }

        if (data.success) {
          onUpload(data.imagePath)
          setError(null)
        } else {
          setError('Resim yüklenemedi! Lütfen tekrar deneyin.')
        }
        setUploading(false)
      }
    } catch (error) {
      console.error('Upload error:', error)
      // Fallback: base64 kullan
      try {
        const reader = new FileReader()
        reader.onloadend = () => {
          onUpload(reader.result)
          setError(null)
          setUploading(false)
        }
        reader.readAsDataURL(file)
      } catch (fallbackError) {
        setError(error.message || 'Resim yüklenirken hata oluştu!')
        setUploading(false)
      }
    }
  }

  return (
    <div>
      <label className="block text-charcoal/70 font-light text-xs md:text-sm mb-2 md:mb-3 tracking-wide">
        Ürün Resmi
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-3 block w-full text-xs md:text-sm text-charcoal/60 file:mr-3 file:py-2 md:file:py-2.5 file:px-4 md:file:px-5 file:rounded-xl file:border-0 file:text-xs md:file:text-sm file:font-light file:bg-gradient-to-r file:from-sand-600 file:to-sand-700 file:text-white hover:file:from-sand-700 hover:file:to-sand-800 file:shadow-sm disabled:opacity-50 cursor-pointer"
        disabled={uploading}
      />
      {uploading && (
        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-xs md:text-sm text-blue-600 font-light flex items-center gap-2">
            <span className="animate-spin">⏳</span>
            Yükleniyor...
          </p>
        </div>
      )}
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-xs md:text-sm text-red-600 font-light flex items-center gap-2">
            <span>⚠️</span>
            {error}
          </p>
        </div>
      )}
      {preview && (
        <div className="relative w-full max-w-xs h-48 rounded-xl overflow-hidden border border-charcoal/10 shadow-sm">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 384px"
          />
        </div>
      )}
    </div>
  )
}

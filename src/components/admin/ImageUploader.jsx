'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ImageUploader({ onUpload, currentImage }) {
  const [preview, setPreview] = useState(currentImage || null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Preview oluştur
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        onUpload(data.imagePath)
      } else {
        alert('Resim yüklenemedi!')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Resim yüklenirken hata oluştu!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">Ürün Resmi</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-poyraz-red file:text-white hover:file:bg-poyraz-red-dark"
        disabled={uploading}
      />
      {uploading && (
        <p className="text-sm text-blue-600 mb-2">Yükleniyor...</p>
      )}
      {preview && (
        <div className="relative w-48 h-36 rounded-lg overflow-hidden border">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  )
}

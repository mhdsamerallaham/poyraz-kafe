import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('image')

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Vercel Blob'a yükle
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true,
      })

      return NextResponse.json({
        imagePath: blob.url,
        success: true,
      })
    } else {
      // Development'ta base64 kullan (client-side)
      return NextResponse.json({
        error: 'Blob storage not available in development',
        useBase64: true,
      }, { status: 503 })
    }
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    )
  }
}

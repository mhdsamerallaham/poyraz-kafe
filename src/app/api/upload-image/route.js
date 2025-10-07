import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextResponse } from 'next/server'
import { existsSync } from 'fs'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('image')

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure directory exists
    const uploadDir = join(process.cwd(), 'public/images/products')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate filename (slug + timestamp)
    const timestamp = Date.now()
    const originalName = file.name.split('.')[0].toLowerCase().replace(/\s+/g, '-')
    const extension = file.name.split('.').pop()
    const filename = `${originalName}-${timestamp}.${extension}`
    const filepath = join(uploadDir, filename)

    // Save file
    await writeFile(filepath, buffer)

    return NextResponse.json({
      imagePath: `/images/products/${filename}`,
      success: true,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    )
  }
}

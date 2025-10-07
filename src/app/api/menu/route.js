import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

const MENU_PATH = join(process.cwd(), 'public/data/menu.json')

export async function GET() {
  try {
    // Önce Vercel KV'den kontrol et
    if (process.env.KV_REST_API_URL) {
      const data = await kv.get('poyraz-menu')
      if (data) {
        return NextResponse.json(data)
      }
    }

    // KV'de yoksa veya development'taysa, dosyadan oku
    const fileData = await readFile(MENU_PATH, 'utf-8')
    return NextResponse.json(JSON.parse(fileData))
  } catch (error) {
    console.error('Read error:', error)
    return NextResponse.json(
      { error: 'Failed to read menu' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate data structure
    if (!body.categories || !body.products) {
      return NextResponse.json(
        { error: 'Invalid data structure' },
        { status: 400 }
      )
    }

    // Vercel KV'ye kaydet
    if (process.env.KV_REST_API_URL) {
      await kv.set('poyraz-menu', body)
    } else {
      // Development'ta localStorage'da kalacak
      console.log('Development mode: KV not available, client will use localStorage')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Write error:', error)
    return NextResponse.json(
      { error: 'Failed to save menu', details: error.message },
      { status: 500 }
    )
  }
}

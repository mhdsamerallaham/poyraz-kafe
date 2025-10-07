import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
import { NextResponse } from 'next/server'

const MENU_PATH = join(process.cwd(), 'public/data/menu.json')

export async function GET() {
  try {
    const data = await readFile(MENU_PATH, 'utf-8')
    return NextResponse.json(JSON.parse(data))
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

    // Write to file with pretty formatting
    await writeFile(MENU_PATH, JSON.stringify(body, null, 2), 'utf-8')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Write error:', error)
    return NextResponse.json(
      { error: 'Failed to save menu', details: error.message },
      { status: 500 }
    )
  }
}

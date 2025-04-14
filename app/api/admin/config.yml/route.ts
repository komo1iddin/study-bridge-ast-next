import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'app', 'admin', 'config.yml')
    const fileContents = fs.readFileSync(filePath, 'utf8')

    return new NextResponse(fileContents, {
      status: 200,
      headers: {
        'Content-Type': 'text/yaml; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Error reading config.yml:', error)
    return new NextResponse('Error loading configuration', { status: 500 })
  }
} 
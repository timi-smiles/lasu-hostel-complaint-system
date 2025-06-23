import { NextResponse } from 'next/server'
import { getJWTSecret } from '@/lib/jwt-config'

export async function GET() {
  try {
    const secret = getJWTSecret()
    return NextResponse.json({
      status: 'SUCCESS',
      JWT_SECRET: 'EXISTS',
      length: secret.length,
      firstChars: secret.substring(0, 10) + '...'
    })
  } catch (error) {
    return NextResponse.json({
      status: 'ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
      envKeys: Object.keys(process.env).filter(key => key.includes('JWT'))
    })
  }
}
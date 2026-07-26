import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse(
    'google-site-verification: googleZE6t3Cp_mTyq5vRL9MSbtdye5SFoZvrbdDSDwBYIVas.html',
    { headers: { 'Content-Type': 'text/html' } }
  )
}

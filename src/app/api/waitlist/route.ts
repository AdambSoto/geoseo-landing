import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const email = data.email
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Store email in the database
    try {
      await prisma.waitlistEntry.create({
        data: { email },
      })
    } catch (prismaError: any) {
      if (prismaError.code === 'P2002') {
        // Unique constraint failed (email already exists)
        return NextResponse.json({ error: 'This email is already on the waitlist.' }, { status: 409 })
      }
      throw prismaError;
    }

    // Email sending removed
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving submission:', error)
    return NextResponse.json(
      { error: 'Failed to save submission', details: (error as any)?.message || String(error) },
      { status: 500 }
    )
  }
} 
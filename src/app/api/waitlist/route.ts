import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const email = data.email
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Store email in the database
    await prisma.waitlistEntry.create({
      data: { email },
    })

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to the GEOSEO Waitlist',
      text: 'You have been added to the waitlist for the GEOSEO Dashboard to optimize content for AI Algorithms.',
      html: '<p>You have been added to the waitlist for the <b>GEOSEO Dashboard</b> to optimize content for AI Algorithms.</p>',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving submission:', error)
    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    )
  }
} 
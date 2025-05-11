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
      subject: "✅ You're On the List – Let's Make Your Site Visible",
      text: `Thank you for joining the waitlist!

Welcome aboard. You've officially joined the GEOSEO waitlist.

You're one step closer to seeing how search engines actually interpret your content — and getting actionable insights to improve your visibility, rankings, and reach.

We'll notify you as soon as early demos open up.
In the meantime, here's what to expect:
  •  🔍 Early access to our Semantic Vector Simulator
  •  📊 Personalized SEO insights, AI-style
  •  🧠 Tips on how to rank smarter, not harder

Want to boost your spot in line?
Share GEOSEO with your network and earn early demo access.

[👉 Share the Waitlist (geoseodashboard.com)]

Thanks again — we can't wait to show you what AI sees.

—
The GEOSEO Team
Translating your content into the language of search engines.`,
      html: `<p>Thank you for joining the waitlist!</p>
<p>Welcome aboard. You've officially joined the <b>GEOSEO waitlist</b>.</p>
<p>You're one step closer to seeing how search engines actually interpret your content — and getting actionable insights to improve your visibility, rankings, and reach.</p>
<p>We'll notify you as soon as early demos open up.<br />In the meantime, here's what to expect:</p>
<ul>
  <li>🔍 Early access to our <b>Semantic Vector Simulator</b></li>
  <li>📊 Personalized SEO insights, AI-style</li>
  <li>🧠 Tips on how to rank smarter, not harder</li>
</ul>
<p><b>Want to boost your spot in line?</b><br />Share GEOSEO with your network and earn early demo access.</p>
<p><a href="https://geoseodashboard.com" style="color:#4F46E5;font-weight:bold;">👉 Share the Waitlist (geoseodashboard.com)</a></p>
<p>Thanks again — we can't wait to show you what AI sees.</p>
<p>—<br />The GEOSEO Team<br /><span style="color:#888;">Translating your content into the language of search engines.</span></p>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving submission:', error)
    return NextResponse.json(
      { error: 'Failed to save submission', details: (error as any)?.message || String(error) },
      { status: 500 }
    )
  }
} 
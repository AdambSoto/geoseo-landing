'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GlowEffect } from '@/components/ui/glow-effect'

export default function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>()

  const onSubmit = async (data: { email: string }) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-[350px]">
        <div className="max-w-md w-full bg-[#19191b] rounded-xl shadow-xl p-8 text-center border border-zinc-800 relative">
          <GlowEffect mode='breathe' blur='stronger' scale={1.08} colors={['#a21caf','#f43f5e','#f59e42']} className="z-0" />
          <h2 className="text-2xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-zinc-300">
            We've received your submission and will be in touch soon.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[350px]">
      <div className={
        `max-w-md w-full bg-[#19191b] rounded-xl shadow-xl p-8 border border-zinc-800 relative flex flex-col justify-end min-h-[300px]`}
        style={{ boxShadow: isSubmitting ? '0 0 40px 8px #a21caf, 0 0 80px 16px #f43f5e, 0 0 120px 32px #f59e42' : undefined }}
      >
        {isSubmitting && (
          <GlowEffect mode='breathe' blur='stronger' scale={1.08} colors={['#a21caf','#f43f5e','#f59e42']} className="z-0" />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full justify-between relative z-10">
          <h2 className="text-2xl font-bold text-white mb-6 text-left">Join the waitlist</h2>
          <input
            type="email"
            id="email"
            {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
            className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-900 text-white placeholder-zinc-400 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 px-4 py-3 text-lg"
            placeholder="your@email.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">Valid email is required</p>
          )}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black font-medium rounded-xl px-6 py-3 text-lg shadow transition-all focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            >
              {isSubmitting ? 'Submitting...' : 'Sign Me Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 
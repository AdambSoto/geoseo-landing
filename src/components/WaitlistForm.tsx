'use client'

import { useState } from 'react'
import { Check, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, Toaster } from 'sonner'

interface EmailToastProps {
  message: string
  description?: string
  duration?: number
  position?: 'bottom-center' | 'top-center' | 'top-right' | 'bottom-right'
}

const EmailToast = ({
  message,
  description,
  duration = 3000,
  position = 'bottom-center',
}: EmailToastProps) => {
  return (
    <Toaster
      position={position}
      toastOptions={{
        duration: duration,
        classNames: {
          toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
    />
  )
}

interface WaitlistFormProps {
  onSubmit?: (email: string) => Promise<void>
}

const WaitlistForm = ({ onSubmit }: WaitlistFormProps) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    try {
      if (onSubmit) {
        await onSubmit(email)
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
      toast.success('Successfully joined waitlist!', {
        description: `We'll notify ${email} when we launch.`,
        icon: (
          <div className="p-0.5 bg-emerald-500/10 dark:bg-emerald-500/25 rounded-full shadow-sm border border-emerald-500/20 dark:border-emerald-500/25 justify-center items-center gap-1.5 flex overflow-hidden">
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
          </div>
        ),
        action: {
          label: 'Dismiss',
          onClick: () => {},
        },
      })
      setEmail('')
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong', {
        description: 'Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <EmailToast message="Successfully joined waitlist!" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Join our waitlist
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 pr-10 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Mail className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            We'll notify you when we launch. No spam, promise!
          </p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isSubmitting ? 'loading' : 'submit'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Join Waitlist'
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </form>
    </div>
  )
}

export default WaitlistForm 
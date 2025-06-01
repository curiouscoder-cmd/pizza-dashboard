'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function VerifyEmail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      setStatus('error')
      setMessage('Invalid verification link')
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`)
        const result = await response.json()

        if (response.ok) {
          setStatus('success')
          setMessage('Email verified successfully!')
        } else {
          setStatus('error')
          setMessage(result.error || 'Verification failed')
        }
      } catch (error) {
        console.error('Verification error:', error)
        setStatus('error')
        setMessage('An unexpected error occurred')
      }
    }

    verifyEmail()
  }, [searchParams])

  const handleResendVerification = async () => {
    // This would need the user's email - in a real app, you might store this in localStorage
    // or require the user to enter their email again
    console.log('Resend verification email functionality would go here')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4 ${
            status === 'loading' 
              ? 'bg-gray-500' 
              : status === 'success' 
              ? 'bg-green-500' 
              : 'bg-red-500'
          }`}>
            {status === 'loading' && <Loader2 className="h-8 w-8 text-white animate-spin" />}
            {status === 'success' && <CheckCircle className="h-8 w-8 text-white" />}
            {status === 'error' && <XCircle className="h-8 w-8 text-white" />}
          </div>
          
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {status === 'loading' && 'Verifying Email...'}
            {status === 'success' && 'Email Verified!'}
            {status === 'error' && 'Verification Failed'}
          </h2>
          
          <p className="mt-2 text-sm text-gray-600">
            {message}
          </p>
        </div>

        <div className="space-y-4">
          {status === 'success' && (
            <Button
              onClick={() => router.push('/auth/signin')}
              className="w-full"
              size="lg"
            >
              Continue to Sign In
            </Button>
          )}
          
          {status === 'error' && (
            <>
              <Button
                onClick={() => router.push('/auth/signup')}
                className="w-full"
                size="lg"
              >
                Try Signing Up Again
              </Button>
              
              <Button
                onClick={() => router.push('/auth/signin')}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Back to Sign In
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

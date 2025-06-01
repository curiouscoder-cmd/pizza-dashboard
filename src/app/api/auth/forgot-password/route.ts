import { NextRequest, NextResponse } from 'next/server'
import { UserStorage } from '@/lib/userStorage'
import { forgotPasswordSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = forgotPasswordSchema.parse(body)
    
    // Generate reset token
    const resetToken = await UserStorage.generateResetToken(validatedData.email)
    
    if (!resetToken) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: 'If an account with that email exists, a password reset link has been sent.' },
        { status: 200 }
      )
    }
    
    // Send password reset email (simulated)
    await UserStorage.sendPasswordResetEmail(validatedData.email, resetToken)
    
    return NextResponse.json(
      { message: 'If an account with that email exists, a password reset link has been sent.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

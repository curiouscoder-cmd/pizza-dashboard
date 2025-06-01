'use client'

import React from 'react'
import { checkPasswordStrength, getPasswordStrengthLabel, getPasswordStrengthColor } from '@/lib/validations'

interface PasswordStrengthIndicatorProps {
  password: string
  show?: boolean
}

export function PasswordStrengthIndicator({ password, show = true }: PasswordStrengthIndicatorProps) {
  if (!show || !password) return null

  const { score, feedback } = checkPasswordStrength(password)
  const label = getPasswordStrengthLabel(score)
  const colorClass = getPasswordStrengthColor(score)

  return (
    <div className="mt-2 space-y-2">
      {/* Strength bar */}
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full ${
              level <= score
                ? score <= 1
                  ? 'bg-red-500'
                  : score <= 2
                  ? 'bg-orange-500'
                  : score <= 3
                  ? 'bg-yellow-500'
                  : score <= 4
                  ? 'bg-blue-500'
                  : 'bg-green-500'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      
      {/* Strength label */}
      <p className={`text-sm font-medium ${colorClass}`}>
        Password strength: {label}
      </p>
      
      {/* Feedback */}
      {feedback.length > 0 && (
        <ul className="text-xs text-gray-600 space-y-1">
          {feedback.map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

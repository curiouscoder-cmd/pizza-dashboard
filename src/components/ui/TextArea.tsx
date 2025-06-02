import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle } from 'lucide-react'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  success?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({
    className,
    label,
    error,
    helperText,
    success,
    resize = 'vertical',
    ...props
  }, ref) => {
    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize'
    }

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-slate-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            className={cn(
              "flex min-h-[80px] w-full rounded-lg border-2 bg-white px-3 py-2 text-sm transition-all duration-200",
              "border-[#F4E1B5] focus:border-[#E63946] focus:outline-none focus:ring-2 focus:ring-red-100",
              "placeholder:text-slate-400 text-black",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
              resizeClasses[resize],
              error && "border-red-500 focus:border-red-500 focus:ring-red-100",
              success && "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-100",
              className
            )}
            ref={ref}
            {...props}
          />

          {/* Status icon */}
          {(error || success) && (
            <div className="absolute right-3 top-3">
              {error && (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              {success && !error && (
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              )}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className="mt-2">
            {error && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-sm text-slate-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    )
  }
)

TextArea.displayName = "TextArea"

export { TextArea }

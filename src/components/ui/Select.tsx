import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, AlertCircle, CheckCircle } from 'lucide-react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  success?: boolean
  leftIcon?: React.ReactNode
  options: { value: string; label: string }[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    className,
    label,
    error,
    helperText,
    success,
    leftIcon,
    options,
    placeholder,
    ...props
  }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-slate-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 z-10">
              {leftIcon}
            </div>
          )}

          <select
            className={cn(
              "flex h-10 w-full rounded-lg border-2 bg-white px-3 py-2 text-sm transition-all duration-200",
              "border-[#F4E1B5] focus:border-[#E63946] focus:outline-none focus:ring-2 focus:ring-red-100",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
              "appearance-none cursor-pointer",
              leftIcon && "pl-10",
              "pr-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-100",
              success && "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-100",
              className
            )}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Right side icons */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 pointer-events-none">
            {error && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
            {success && !error && (
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            )}
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
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

Select.displayName = "Select"

export { Select }

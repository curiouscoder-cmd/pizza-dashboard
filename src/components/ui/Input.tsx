import React, { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  success?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'floating'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type,
    label,
    error,
    helperText,
    success,
    leftIcon,
    rightIcon,
    variant = 'default',
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue)

    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }

    if (variant === 'floating') {
      return (
        <div className="relative">
          <div className="relative">
            {leftIcon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                {leftIcon}
              </div>
            )}

            <input
              type={inputType}
              className={cn(
                "peer w-full h-12 px-4 pt-6 pb-2 text-sm bg-white border-2 rounded-lg transition-all duration-200",
                "border-[#F4E1B5] focus:border-[#E63946] focus:outline-none",
                "placeholder-transparent text-black",
                leftIcon && "pl-10",
                (rightIcon || isPassword || error || success) && "pr-10",
                error && "border-red-500 focus:border-red-500",
                success && "border-emerald-500 focus:border-emerald-500",
                className
              )}
              ref={ref}
              placeholder={label}
              onFocus={(e) => {
                setIsFocused(true)
                props.onFocus?.(e)
              }}
              onBlur={(e) => {
                setIsFocused(false)
                props.onBlur?.(e)
              }}
              onChange={handleInputChange}
              {...props}
            />

            {label && (
              <label className={cn(
                "absolute left-4 transition-all duration-200 pointer-events-none",
                leftIcon && "left-10",
                "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400",
                "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-[#E63946]",
                (hasValue || isFocused) && "top-2 translate-y-0 text-xs",
                (hasValue || isFocused) && !error && !success && "text-[#E63946]",
                error && "text-red-500",
                success && "text-emerald-600"
              )}>
                {label}
                {props.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}

            {/* Right side icons */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              {error && (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              {success && !error && (
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              )}
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              )}
              {rightIcon && !isPassword && !error && !success && (
                <div className="text-slate-400">
                  {rightIcon}
                </div>
              )}
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

    // Default variant
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
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            type={inputType}
            className={cn(
              "flex h-10 w-full rounded-lg border-2 bg-white px-3 py-2 text-sm transition-all duration-200",
              "border-[#F4E1B5] focus:border-[#E63946] focus:outline-none focus:ring-2 focus:ring-red-100",
              "placeholder:text-slate-400 text-black",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
              leftIcon && "pl-10",
              (rightIcon || isPassword || error || success) && "pr-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-100",
              success && "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-100",
              className
            )}
            ref={ref}
            onChange={handleInputChange}
            {...props}
          />

          {/* Right side icons */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {error && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
            {success && !error && (
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            )}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
            {rightIcon && !isPassword && !error && !success && (
              <div className="text-slate-400">
                {rightIcon}
              </div>
            )}
          </div>
        </div>

        {(error || helperText) && (
          <div className="space-y-1">
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

Input.displayName = "Input"

export { Input }

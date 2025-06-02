import React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'warning'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    loading,
    children,
    disabled,
    icon,
    iconPosition = 'left',
    ...props
  }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"

    const variants = {
      primary: "bg-[#E63946] text-[#FFF5E1] hover:bg-[#dc2626] focus:ring-[#E63946] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0",
      secondary: "bg-[#F4E1B5] text-[#555555] hover:bg-[#e6d09a] focus:ring-[#E63946] border border-[#F4E1B5] hover:border-[#e6d09a]",
      outline: "border-2 border-[#E63946] bg-transparent text-[#E63946] hover:bg-[#FFF5E1] focus:ring-[#E63946] hover:border-[#dc2626]",
      ghost: "text-[#555555] hover:bg-[#F4E1B5] focus:ring-[#E63946] hover:text-[#555555]",
      destructive: "bg-[#E63946] text-[#FFF5E1] hover:bg-[#dc2626] focus:ring-[#E63946] shadow-lg hover:shadow-xl",
      success: "bg-[#7FB069] text-[#FFF5E1] hover:bg-[#6a9c56] focus:ring-[#7FB069] shadow-lg hover:shadow-xl",
      warning: "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500 shadow-lg hover:shadow-xl"
    }

    const sizes = {
      xs: "h-7 px-2.5 text-xs gap-1",
      sm: "h-8 px-3 text-sm gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-11 px-6 text-base gap-2",
      xl: "h-12 px-8 text-base gap-2.5"
    }

    const iconSizes = {
      xs: "h-3 w-3",
      sm: "h-3.5 w-3.5",
      md: "h-4 w-4",
      lg: "h-4 w-4",
      xl: "h-5 w-5"
    }

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {/* Ripple effect */}
        <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150 rounded-lg"></span>

        {loading && (
          <Loader2 className={cn("animate-spin", iconSizes[size], children && "mr-2")} />
        )}

        {!loading && icon && iconPosition === 'left' && (
          <span className={cn(iconSizes[size], children && "mr-2")}>
            {icon}
          </span>
        )}

        {children}

        {!loading && icon && iconPosition === 'right' && (
          <span className={cn(iconSizes[size], children && "ml-2")}>
            {icon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }

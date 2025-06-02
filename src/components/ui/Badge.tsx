import React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  pulse?: boolean
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', icon, pulse = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-slate-100 text-slate-800 border-slate-200",
      secondary: "bg-slate-100 text-slate-600 border-slate-200",
      success: "bg-emerald-100 text-emerald-800 border-emerald-200",
      warning: "bg-amber-100 text-amber-800 border-amber-200",
      error: "bg-red-100 text-red-800 border-red-200",
      info: "bg-blue-100 text-blue-800 border-blue-200",
      outline: "bg-transparent text-slate-600 border-slate-300"
    }

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
      lg: "px-3 py-1.5 text-sm"
    }

    const iconSizes = {
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-full border font-medium transition-all duration-200",
          variants[variant],
          sizes[size],
          pulse && "animate-pulse",
          className
        )}
        {...props}
      >
        {icon && (
          <span className={cn(iconSizes[size])}>
            {icon}
          </span>
        )}
        {children}
      </div>
    )
  }
)

Badge.displayName = "Badge"

export { Badge }

// Status-specific badge components for convenience
export const StatusBadge = ({ status, ...props }: { status: string } & Omit<BadgeProps, 'variant'>) => {
  const getVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning'
      case 'preparing':
        return 'info'
      case 'out for delivery':
        return 'default'
      case 'delivered':
        return 'success'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Badge variant={getVariant(status)} {...props}>
      {status}
    </Badge>
  )
}

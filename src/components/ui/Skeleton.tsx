import React from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circular' | 'rectangular' | 'text'
  width?: string | number
  height?: string | number
  lines?: number
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'default', width, height, lines = 1, ...props }, ref) => {
    const baseClasses = "animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%]"
    
    const variants = {
      default: "rounded-md",
      circular: "rounded-full",
      rectangular: "rounded-none",
      text: "rounded-sm h-4"
    }

    const style = {
      width: width || (variant === 'circular' ? height : undefined),
      height: height || (variant === 'text' ? '1rem' : undefined),
      ...props.style
    }

    if (variant === 'text' && lines > 1) {
      return (
        <div className="space-y-2" ref={ref}>
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                baseClasses,
                variants[variant],
                index === lines - 1 && "w-3/4", // Last line is shorter
                className
              )}
              style={style}
              {...props}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          className
        )}
        style={style}
        {...props}
      />
    )
  }
)

Skeleton.displayName = "Skeleton"

// Predefined skeleton components for common use cases
export const SkeletonCard = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-4 p-6", className)} {...props}>
    <Skeleton variant="text" lines={1} className="h-6 w-3/4" />
    <Skeleton variant="text" lines={3} />
    <div className="flex space-x-2">
      <Skeleton variant="rectangular" className="h-8 w-20" />
      <Skeleton variant="rectangular" className="h-8 w-20" />
    </div>
  </div>
)

export const SkeletonAvatar = ({ size = 40, className, ...props }: { size?: number } & React.HTMLAttributes<HTMLDivElement>) => (
  <Skeleton
    variant="circular"
    width={size}
    height={size}
    className={className}
    {...props}
  />
)

export const SkeletonButton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <Skeleton
    variant="rectangular"
    className={cn("h-10 w-24 rounded-lg", className)}
    {...props}
  />
)

export const SkeletonTable = ({ rows = 5, columns = 4, className, ...props }: { rows?: number; columns?: number } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-4", className)} {...props}>
    {/* Header */}
    <div className="flex space-x-4">
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={index} variant="text" className="h-4 flex-1" />
      ))}
    </div>
    
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-4">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} variant="text" className="h-4 flex-1" />
        ))}
      </div>
    ))}
  </div>
)

export const SkeletonStats = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)} {...props}>
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-sm p-6 space-y-3">
        <div className="flex items-center space-x-3">
          <Skeleton variant="rectangular" className="h-12 w-12 rounded-lg" />
          <div className="space-y-2 flex-1">
            <Skeleton variant="text" className="h-4 w-20" />
            <Skeleton variant="text" className="h-6 w-16" />
          </div>
        </div>
      </div>
    ))}
  </div>
)

export { Skeleton }

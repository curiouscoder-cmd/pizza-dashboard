'use client'

import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { Button } from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'

      // Reset scroll position when modal opens
      setTimeout(() => {
        const modalBody = document.querySelector('[data-modal-body]')
        if (modalBody) {
          modalBody.scrollTop = 0
        }
      }, 0)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full bg-[#FFF5E1] rounded-2xl shadow-2xl border border-[#F4E1B5] animate-scale-in max-h-[90vh] flex flex-col',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-[#F4E1B5] flex-shrink-0">
            <h2 className="text-xl font-semibold text-[#555555]">{title}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}

interface ModalHeaderProps {
  children: React.ReactNode
  className?: string
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className }) => (
  <div className={cn('mb-4', className)}>
    {children}
  </div>
)

interface ModalBodyProps {
  children: React.ReactNode
  className?: string
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => (
  <div
    data-modal-body
    className={cn('flex-1 overflow-y-auto p-6 space-y-4', className)}
    style={{ maxHeight: 'calc(90vh - 200px)' }}
  >
    {children}
  </div>
)

interface ModalFooterProps {
  children: React.ReactNode
  className?: string
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => (
  <div className={cn('flex items-center justify-end gap-3 px-6 py-4 border-t border-[#F4E1B5] flex-shrink-0 bg-[#FFF5E1]', className)}>
    {children}
  </div>
)

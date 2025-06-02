'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, ModalBody, ModalFooter } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { TextArea } from '@/components/ui/TextArea'
import { Button } from '@/components/ui/Button'
import { addCustomerSchema, type AddCustomerFormData } from '@/lib/validations'
import { User, Mail, Phone, MapPin, UserCheck, FileText } from 'lucide-react'

interface AddCustomerModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (customer: any) => void
}

export default function AddCustomerModal({ isOpen, onClose, onSuccess }: AddCustomerModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<AddCustomerFormData>({
    resolver: zodResolver(addCustomerSchema),
    defaultValues: {
      status: 'active'
    }
  })

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'vip', label: 'VIP' }
  ]

  const handleClose = () => {
    reset()
    setSubmitError(null)
    onClose()
  }

  const handleFormSubmit = async (data: AddCustomerFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create customer')
      }

      // Success
      onSuccess(result.customer)
      handleClose()
    } catch (error) {
      console.error('Error creating customer:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to create customer')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Customer" size="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col h-full">
        <ModalBody>
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Customer Name */}
            <Input
              label="Customer Name"
              placeholder="Enter full name"
              leftIcon={<User className="h-4 w-4" />}
              error={errors.name?.message}
              {...register('name')}
              required
            />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              placeholder="customer@example.com"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
              required
            />

            {/* Phone */}
            <Input
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
              leftIcon={<Phone className="h-4 w-4" />}
              error={errors.phone?.message}
              {...register('phone')}
              required
            />

            {/* Status */}
            <Select
              label="Customer Status"
              options={statusOptions}
              placeholder="Select status"
              leftIcon={<UserCheck className="h-4 w-4" />}
              error={errors.status?.message}
              {...register('status')}
              required
            />
          </div>

          {/* Address - Full Width */}
          <div className="mt-4">
            <Input
              label="Address"
              placeholder="Enter complete address"
              leftIcon={<MapPin className="h-4 w-4" />}
              error={errors.address?.message}
              {...register('address')}
              required
            />
          </div>

          {/* Notes - Full Width */}
          <div className="mt-4">
            <TextArea
              label="Notes (Optional)"
              placeholder="Add any additional notes about the customer..."
              rows={3}
              error={errors.notes?.message}
              {...register('notes')}
            />
          </div>

          {/* Customer Preview */}
          <div className="mt-6 p-4 bg-[#F4E1B5]/30 rounded-lg border border-[#F4E1B5]">
            <h4 className="text-sm font-medium text-[#555555] mb-2 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Customer Preview
            </h4>
            <div className="text-sm text-[#555555]/80 space-y-1">
              <p><span className="font-medium">Name:</span> {watch('name') || 'Not entered'}</p>
              <p><span className="font-medium">Email:</span> {watch('email') || 'Not entered'}</p>
              <p><span className="font-medium">Phone:</span> {watch('phone') || 'Not entered'}</p>
              <p><span className="font-medium">Status:</span> {watch('status')?.toUpperCase() || 'ACTIVE'}</p>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            loading={isSubmitting}
            icon={<User className="h-4 w-4" />}
          >
            {isSubmitting ? 'Creating Customer...' : 'Create Customer'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

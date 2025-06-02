'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, ModalBody, ModalFooter } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { TextArea } from '@/components/ui/TextArea'
import { Button } from '@/components/ui/Button'
import { scheduleDeliverySchema, type ScheduleDeliveryFormData } from '@/lib/validations'
import { Calendar, Clock, User, MapPin, Phone, Package, AlertTriangle } from 'lucide-react'

interface ScheduleDeliveryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ScheduleDeliveryFormData) => void
}

// Mock data for dropdowns
const availableDrivers = [
  { value: 'mike-johnson', label: 'Mike Johnson' },
  { value: 'sarah-martinez', label: 'Sarah Martinez' },
  { value: 'alex-rodriguez', label: 'Alex Rodriguez' },
  { value: 'lisa-chen', label: 'Lisa Chen' },
  { value: 'david-wilson', label: 'David Wilson' }
]

const priorityOptions = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' }
]

const commonItems = [
  'Large Margherita Pizza',
  'Medium Pepperoni Pizza',
  'Large Hawaiian Pizza',
  'Medium BBQ Chicken Pizza',
  'Large Supreme Pizza',
  'Garlic Bread',
  'Caesar Salad',
  'Buffalo Wings',
  'Mozzarella Sticks',
  'Chicken Wings',
  'Garlic Knots',
  'Greek Salad',
  'Coke',
  'Pepsi',
  'Sprite',
  'Water'
]

export const ScheduleDeliveryModal: React.FC<ScheduleDeliveryModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [customItem, setCustomItem] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<ScheduleDeliveryFormData>({
    resolver: zodResolver(scheduleDeliverySchema),
    defaultValues: {
      estimatedDuration: 30,
      priority: 'medium',
      items: []
    }
  })

  const handleClose = () => {
    reset()
    setSelectedItems([])
    setCustomItem('')
    onClose()
  }

  const handleFormSubmit = async (data: ScheduleDeliveryFormData) => {
    try {
      const formData = {
        ...data,
        items: selectedItems
      }
      await onSubmit(formData)
      handleClose()
    } catch (error) {
      console.error('Error scheduling delivery:', error)
    }
  }

  const addItem = (item: string) => {
    if (!selectedItems.includes(item)) {
      const newItems = [...selectedItems, item]
      setSelectedItems(newItems)
      setValue('items', newItems)
    }
  }

  const removeItem = (item: string) => {
    const newItems = selectedItems.filter(i => i !== item)
    setSelectedItems(newItems)
    setValue('items', newItems)
  }

  const addCustomItem = () => {
    if (customItem.trim() && !selectedItems.includes(customItem.trim())) {
      addItem(customItem.trim())
      setCustomItem('')
    }
  }

  // Generate time slots for today and tomorrow
  const generateTimeSlots = () => {
    const slots = []
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    // Start from next hour if current minute > 30, otherwise start from current hour + 30 minutes
    const startHour = currentMinute > 30 ? currentHour + 1 : currentHour
    const startMinute = currentMinute > 30 ? 0 : 30

    // Generate slots for the rest of today (until 11 PM)
    for (let hour = startHour; hour <= 23; hour++) {
      for (let minute = hour === startHour ? startMinute : 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        slots.push({ value: timeString, label: timeString })
      }
    }

    return slots
  }

  const timeSlots = generateTimeSlots()

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Schedule New Delivery" size="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <ModalBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Order ID */}
            <Input
              label="Order ID"
              placeholder="e.g., PZA026"
              leftIcon={<Package className="h-4 w-4" />}
              error={errors.orderId?.message}
              {...register('orderId')}
              required
            />

            {/* Customer Name */}
            <Input
              label="Customer Name"
              placeholder="Enter customer name"
              leftIcon={<User className="h-4 w-4" />}
              error={errors.customerName?.message}
              {...register('customerName')}
              required
            />

            {/* Customer Phone */}
            <Input
              label="Customer Phone"
              placeholder="+1 (555) 123-4567"
              leftIcon={<Phone className="h-4 w-4" />}
              error={errors.customerPhone?.message}
              {...register('customerPhone')}
              required
            />

            {/* Priority */}
            <Select
              label="Priority"
              options={priorityOptions}
              placeholder="Select priority"
              leftIcon={<AlertTriangle className="h-4 w-4" />}
              error={errors.priority?.message}
              {...register('priority')}
              required
            />

            {/* Scheduled Date */}
            <Input
              label="Scheduled Date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              leftIcon={<Calendar className="h-4 w-4" />}
              error={errors.scheduledDate?.message}
              {...register('scheduledDate')}
              required
            />

            {/* Scheduled Time */}
            <Select
              label="Scheduled Time"
              options={timeSlots}
              placeholder="Select time"
              leftIcon={<Clock className="h-4 w-4" />}
              error={errors.scheduledTime?.message}
              {...register('scheduledTime')}
              required
            />

            {/* Estimated Duration */}
            <Input
              label="Estimated Duration (minutes)"
              type="number"
              min="10"
              max="120"
              placeholder="30"
              error={errors.estimatedDuration?.message}
              {...register('estimatedDuration', { valueAsNumber: true })}
              required
            />

            {/* Driver */}
            <Select
              label="Assign Driver"
              options={availableDrivers}
              placeholder="Select driver"
              leftIcon={<User className="h-4 w-4" />}
              error={errors.driverName?.message}
              {...register('driverName')}
              required
            />
          </div>

          {/* Address */}
          <div className="mt-4">
            <Input
              label="Delivery Address"
              placeholder="Enter complete delivery address"
              leftIcon={<MapPin className="h-4 w-4" />}
              error={errors.address?.message}
              {...register('address')}
              required
            />
          </div>

          {/* Items Selection */}
          <div className="mt-4">
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Order Items <span className="text-red-500">*</span>
            </label>
            
            {/* Common Items */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
              {commonItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => addItem(item)}
                  disabled={selectedItems.includes(item)}
                  className={`p-2 text-xs rounded-lg border transition-colors ${
                    selectedItems.includes(item)
                      ? 'bg-[#E63946] text-white border-[#E63946]'
                      : 'bg-white border-[#F4E1B5] hover:bg-[#FFF5E1] text-[#555555]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Custom Item Input */}
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Add custom item"
                value={customItem}
                onChange={(e) => setCustomItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomItem())}
              />
              <Button type="button" onClick={addCustomItem} disabled={!customItem.trim()}>
                Add
              </Button>
            </div>

            {/* Selected Items */}
            {selectedItems.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Selected Items:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#E63946] text-white text-sm rounded-full"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeItem(item)}
                        className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {errors.items && (
              <p className="text-sm text-red-600 mt-1">At least one item is required</p>
            )}
          </div>

          {/* Notes */}
          <div className="mt-4">
            <TextArea
              label="Delivery Notes"
              placeholder="Any special instructions for the delivery..."
              rows={3}
              error={errors.notes?.message}
              {...register('notes')}
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Schedule Delivery
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

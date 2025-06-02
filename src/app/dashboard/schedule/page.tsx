'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ScheduleDeliveryModal } from '@/components/ScheduleDeliveryModal'
import { Calendar, Clock, Plus, User, MapPin, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { type ScheduleDeliveryFormData } from '@/lib/validations'
import { useToast } from '@/components/ui/Toast'

interface DeliverySchedule {
  id: string
  orderId: string
  customerName: string
  customerPhone: string
  address: string
  scheduledTime: string
  estimatedDuration: number
  status: 'scheduled' | 'in-progress' | 'completed' | 'delayed'
  driverName: string
  priority: 'low' | 'medium' | 'high'
  items: string[]
  notes?: string
}

// Generate dynamic timestamps for realistic delivery schedule
const now = new Date()

const mockSchedule: DeliverySchedule[] = [
  // Today's deliveries - current and upcoming
  {
    id: 'DEL001',
    orderId: 'PZA025',
    customerName: 'Michael Chen',
    customerPhone: '+1 (555) 123-4567',
    address: '123 Broadway, New York, NY 10001',
    scheduledTime: new Date(now.getTime() + 15 * 60 * 1000).toISOString(), // 15 minutes from now
    estimatedDuration: 25,
    status: 'scheduled',
    driverName: 'Sarah Martinez',
    priority: 'high',
    items: ['Large Pepperoni Pizza', 'Garlic Bread', 'Coke'],
    notes: 'Customer prefers contactless delivery'
  },
  {
    id: 'DEL002',
    orderId: 'PZA024',
    customerName: 'Jessica Rodriguez',
    customerPhone: '+1 (555) 234-5678',
    address: '456 Oak Ave, Brooklyn, NY 11201',
    scheduledTime: new Date(now.getTime() + 5 * 60 * 1000).toISOString(), // 5 minutes from now
    estimatedDuration: 30,
    status: 'in-progress',
    driverName: 'Mike Johnson',
    priority: 'high',
    items: ['Medium Margherita Pizza', 'Caesar Salad'],
    notes: 'Ring doorbell twice'
  },
  {
    id: 'DEL003',
    orderId: 'PZA023',
    customerName: 'David Kim',
    customerPhone: '+1 (555) 345-6789',
    address: '789 Pine St, Queens, NY 11375',
    scheduledTime: new Date(now.getTime() + 45 * 60 * 1000).toISOString(), // 45 minutes from now
    estimatedDuration: 35,
    status: 'scheduled',
    driverName: 'Alex Rodriguez',
    priority: 'medium',
    items: ['Large Hawaiian Pizza', 'Buffalo Wings', 'Sprite'],
    notes: 'Apartment 4B, use side entrance'
  },
  {
    id: 'DEL004',
    orderId: 'PZA022',
    customerName: 'Amanda Wilson',
    customerPhone: '+1 (555) 456-7890',
    address: '321 Elm St, Manhattan, NY 10002',
    scheduledTime: new Date(now.getTime() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    estimatedDuration: 20,
    status: 'completed',
    driverName: 'Lisa Chen',
    priority: 'low',
    items: ['Small Veggie Pizza', 'Diet Coke']
  },
  {
    id: 'DEL005',
    orderId: 'PZA021',
    customerName: 'Robert Taylor',
    customerPhone: '+1 (555) 567-8901',
    address: '654 Maple Dr, Bronx, NY 10451',
    scheduledTime: new Date(now.getTime() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
    estimatedDuration: 40,
    status: 'scheduled',
    driverName: 'Sarah Martinez',
    priority: 'medium',
    items: ['Large Meat Lovers Pizza', 'Chicken Wings', 'Pepsi'],
    notes: 'Call when arriving - gated community'
  },
  {
    id: 'DEL006',
    orderId: 'PZA020',
    customerName: 'Emily Davis',
    customerPhone: '+1 (555) 678-9012',
    address: '987 Cedar Ave, Staten Island, NY 10301',
    scheduledTime: new Date(now.getTime() + 60 * 60 * 1000).toISOString(), // 1 hour from now
    estimatedDuration: 45,
    status: 'scheduled',
    driverName: 'Mike Johnson',
    priority: 'low',
    items: ['Medium BBQ Chicken Pizza', 'Mozzarella Sticks'],
    notes: 'Leave at door if no answer'
  },
  {
    id: 'DEL007',
    orderId: 'PZA019',
    customerName: 'Christopher Lee',
    customerPhone: '+1 (555) 789-0123',
    address: '147 Park Ave, Manhattan, NY 10016',
    scheduledTime: new Date(now.getTime() + 90 * 60 * 1000).toISOString(), // 1.5 hours from now
    estimatedDuration: 25,
    status: 'scheduled',
    driverName: 'Alex Rodriguez',
    priority: 'high',
    items: ['Large Supreme Pizza', 'Garlic Knots', 'Orange Soda'],
    notes: 'Office building - ask for Christopher at reception'
  },
  {
    id: 'DEL008',
    orderId: 'PZA018',
    customerName: 'Maria Gonzalez',
    customerPhone: '+1 (555) 890-1234',
    address: '258 First Ave, Brooklyn, NY 11215',
    scheduledTime: new Date(now.getTime() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    estimatedDuration: 35,
    status: 'in-progress',
    driverName: 'Lisa Chen',
    priority: 'medium',
    items: ['Medium Mushroom Pizza', 'Greek Salad', 'Water'],
    notes: 'Third floor, apartment 3C'
  },
  {
    id: 'DEL009',
    orderId: 'PZA017',
    customerName: 'James Wilson',
    customerPhone: '+1 (555) 901-2345',
    address: '369 Second St, Queens, NY 11101',
    scheduledTime: new Date(now.getTime() + 120 * 60 * 1000).toISOString(), // 2 hours from now
    estimatedDuration: 30,
    status: 'scheduled',
    driverName: 'Sarah Martinez',
    priority: 'low',
    items: ['Large White Pizza', 'Chicken Caesar Wrap'],
    notes: 'House with red door'
  },
  {
    id: 'DEL010',
    orderId: 'PZA016',
    customerName: 'Lisa Thompson',
    customerPhone: '+1 (555) 012-3456',
    address: '741 Third Ave, Bronx, NY 10456',
    scheduledTime: new Date(now.getTime() + 20 * 60 * 1000).toISOString(), // 20 minutes from now
    estimatedDuration: 50,
    status: 'delayed',
    driverName: 'Mike Johnson',
    priority: 'high',
    items: ['Large Quattro Stagioni Pizza', 'Tiramisu', 'Iced Tea'],
    notes: 'Traffic delay reported - customer notified'
  }
]

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<DeliverySchedule[]>(mockSchedule)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newlyAddedId, setNewlyAddedId] = useState<string | null>(null)
  const { addToast } = useToast()

  const filteredSchedule = useMemo(() => {
    const today = new Date(selectedDate)
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return schedule.filter(item => {
      const itemDate = new Date(item.scheduledTime)
      return itemDate >= today && itemDate < tomorrow
    }).sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime())
  }, [schedule, selectedDate])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'info'
      case 'in-progress': return 'warning'
      case 'completed': return 'success'
      case 'delayed': return 'error'
      default: return 'secondary'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error'
      case 'medium': return 'warning'
      case 'low': return 'success'
      default: return 'secondary'
    }
  }

  const stats = {
    total: filteredSchedule.length,
    scheduled: filteredSchedule.filter(s => s.status === 'scheduled').length,
    inProgress: filteredSchedule.filter(s => s.status === 'in-progress').length,
    completed: filteredSchedule.filter(s => s.status === 'completed').length,
    delayed: filteredSchedule.filter(s => s.status === 'delayed').length
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
    setSelectedDate(newDate)
  }

  const handleScheduleDelivery = (formData: ScheduleDeliveryFormData) => {
    // Generate new delivery ID
    const newId = `DEL${String(schedule.length + 1).padStart(3, '0')}`

    // Convert form data to DeliverySchedule format
    const newDelivery: DeliverySchedule = {
      id: newId,
      orderId: formData.orderId,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      address: formData.address,
      scheduledTime: new Date(`${formData.scheduledDate}T${formData.scheduledTime}`).toISOString(),
      estimatedDuration: formData.estimatedDuration,
      status: 'scheduled',
      driverName: availableDrivers.find(d => d.value === formData.driverName)?.label || formData.driverName,
      priority: formData.priority,
      items: formData.items,
      notes: formData.notes
    }

    console.log('Adding new delivery:', newDelivery)

    // Add to schedule
    setSchedule(prev => {
      const updated = [...prev, newDelivery]
      console.log('Updated schedule:', updated)
      return updated
    })

    // Set the selected date to the delivery date to show the new delivery
    const deliveryDate = new Date(formData.scheduledDate)
    setSelectedDate(deliveryDate)

    // Mark as newly added for visual feedback
    setNewlyAddedId(newId)
    setTimeout(() => setNewlyAddedId(null), 3000) // Remove highlight after 3 seconds

    setIsModalOpen(false)

    // Show success message
    addToast({
      type: 'success',
      title: 'Delivery Scheduled!',
      description: `Delivery for ${formData.customerName} has been scheduled for ${new Date(formData.scheduledDate).toLocaleDateString()} at ${formData.scheduledTime}`,
      duration: 5000
    })
  }

  // Driver options for the form
  const availableDrivers = [
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'sarah-martinez', label: 'Sarah Martinez' },
    { value: 'alex-rodriguez', label: 'Alex Rodriguez' },
    { value: 'lisa-chen', label: 'Lisa Chen' },
    { value: 'david-wilson', label: 'David Wilson' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#555555]">Delivery Schedule</h1>
          <p className="text-[#555555]/70 mt-1">Manage delivery schedules and driver assignments</p>
        </div>
        <Button icon={<Plus className="h-4 w-4" />} onClick={() => setIsModalOpen(true)}>
          Schedule Delivery
        </Button>
      </div>

      {/* Date Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigateDate('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-[#555555]">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h2>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigateDate('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'day' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('day')}
              >
                Day View
              </Button>
              <Button
                variant={viewMode === 'week' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('week')}
              >
                Week View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#555555]">{stats.total}</p>
              <p className="text-sm text-[#555555]/70">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
              <p className="text-sm text-[#555555]/70">Scheduled</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">{stats.inProgress}</p>
              <p className="text-sm text-[#555555]/70">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#7FB069]">{stats.completed}</p>
              <p className="text-sm text-[#555555]/70">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#E63946]">{stats.delayed}</p>
              <p className="text-sm text-[#555555]/70">Delayed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#E63946]" />
            Today&apos;s Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSchedule.map((delivery, index) => (
              <div key={delivery.id} className="relative">
                {index < filteredSchedule.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-[#F4E1B5]"></div>
                )}
                <div className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-500 ${
                  delivery.id === newlyAddedId
                    ? 'border-[#E63946] bg-[#E63946]/10 shadow-lg animate-pulse'
                    : 'border-[#F4E1B5] hover:bg-[#FFF5E1]/50'
                }`}>
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      delivery.status === 'completed' ? 'bg-[#7FB069]' :
                      delivery.status === 'in-progress' ? 'bg-amber-500' :
                      delivery.status === 'delayed' ? 'bg-[#E63946]' :
                      'bg-blue-500'
                    }`}>
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-[#555555]">{delivery.customerName}</h3>
                        <p className="text-sm text-[#555555]/70">Order #{delivery.orderId}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(delivery.priority)}>
                          {delivery.priority.toUpperCase()}
                        </Badge>
                        <Badge variant={getStatusColor(delivery.status)}>
                          {delivery.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-[#555555]/70">
                          <Clock className="h-4 w-4" />
                          {formatTime(delivery.scheduledTime)} ({delivery.estimatedDuration} min)
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#555555]/70">
                          <User className="h-4 w-4" />
                          Driver: {delivery.driverName}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-[#555555]/70">
                          <Phone className="h-4 w-4" />
                          {delivery.customerPhone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#555555]/70">
                          <MapPin className="h-4 w-4" />
                          {delivery.address}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium text-[#555555] mb-1">Items:</p>
                      <p className="text-sm text-[#555555]/70">{delivery.items.join(', ')}</p>
                    </div>
                    
                    {delivery.notes && (
                      <div className="bg-[#F4E1B5]/50 p-3 rounded-lg">
                        <p className="text-sm text-[#555555]"><strong>Notes:</strong> {delivery.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredSchedule.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-[#555555]/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#555555] mb-2">No deliveries scheduled</h3>
              <p className="text-[#555555]/70">No deliveries are scheduled for this date</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Delivery Modal */}
      <ScheduleDeliveryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleScheduleDelivery}
      />
    </div>
  )
}

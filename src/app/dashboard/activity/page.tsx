'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import {
  Search,
  Download,
  ShoppingCart,
  User,
  Truck,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar,
  RefreshCw
} from 'lucide-react'

interface Activity {
  id: string
  type: 'order' | 'customer' | 'delivery' | 'system' | 'payment'
  action: string
  description: string
  timestamp: string
  user?: string
  orderId?: string
  customerId?: string
  status: 'success' | 'warning' | 'error' | 'info'
  metadata?: Record<string, string | number | boolean>
}

const mockActivities: Activity[] = [
  {
    id: 'ACT001',
    type: 'order',
    action: 'Order Created',
    description: 'New order PZA020 created by John Smith',
    timestamp: '2024-01-16T14:30:00',
    user: 'System',
    orderId: 'PZA020',
    customerId: 'CUST001',
    status: 'success',
    metadata: { amount: 24.99, items: 2 }
  },
  {
    id: 'ACT002',
    type: 'order',
    action: 'Order Status Updated',
    description: 'Order PZA019 status changed to "Preparing"',
    timestamp: '2024-01-16T14:25:00',
    user: 'Kitchen Staff',
    orderId: 'PZA019',
    status: 'info',
    metadata: { previousStatus: 'Pending', newStatus: 'Preparing' }
  },
  {
    id: 'ACT003',
    type: 'delivery',
    action: 'Delivery Started',
    description: 'Driver Mike Johnson started delivery for order PZA018',
    timestamp: '2024-01-16T14:20:00',
    user: 'Mike Johnson',
    orderId: 'PZA018',
    status: 'info',
    metadata: { estimatedTime: 25, driverPhone: '+1-555-0123' }
  },
  {
    id: 'ACT004',
    type: 'payment',
    action: 'Payment Processed',
    description: 'Payment of $32.50 processed for order PZA017',
    timestamp: '2024-01-16T14:15:00',
    user: 'Payment Gateway',
    orderId: 'PZA017',
    status: 'success',
    metadata: { amount: 32.50, method: 'Credit Card', last4: '4242' }
  },
  {
    id: 'ACT005',
    type: 'customer',
    action: 'Customer Registered',
    description: 'New customer Emily Wilson registered',
    timestamp: '2024-01-16T14:10:00',
    user: 'System',
    customerId: 'CUST005',
    status: 'success',
    metadata: { email: 'emily.wilson@email.com', phone: '+1-555-0456' }
  },
  {
    id: 'ACT006',
    type: 'order',
    action: 'Order Cancelled',
    description: 'Order PZA016 cancelled by customer request',
    timestamp: '2024-01-16T14:05:00',
    user: 'Customer Service',
    orderId: 'PZA016',
    status: 'warning',
    metadata: { reason: 'Customer request', refundAmount: 18.75 }
  },
  {
    id: 'ACT007',
    type: 'delivery',
    action: 'Delivery Completed',
    description: 'Order PZA015 successfully delivered to Sarah Johnson',
    timestamp: '2024-01-16T14:00:00',
    user: 'Alex Rodriguez',
    orderId: 'PZA015',
    customerId: 'CUST002',
    status: 'success',
    metadata: { deliveryTime: 23, rating: 5 }
  },
  {
    id: 'ACT008',
    type: 'system',
    action: 'System Alert',
    description: 'Low inventory alert for Mozzarella Cheese',
    timestamp: '2024-01-16T13:55:00',
    user: 'Inventory System',
    status: 'warning',
    metadata: { item: 'Mozzarella Cheese', currentStock: 5, threshold: 10 }
  },
  {
    id: 'ACT009',
    type: 'order',
    action: 'Order Modified',
    description: 'Order PZA014 modified - added extra toppings',
    timestamp: '2024-01-16T13:50:00',
    user: 'Customer Service',
    orderId: 'PZA014',
    status: 'info',
    metadata: { addedItems: ['Extra Cheese', 'Pepperoni'], additionalCost: 4.50 }
  },
  {
    id: 'ACT010',
    type: 'delivery',
    action: 'Delivery Delayed',
    description: 'Delivery for order PZA013 delayed due to traffic',
    timestamp: '2024-01-16T13:45:00',
    user: 'Lisa Chen',
    orderId: 'PZA013',
    status: 'error',
    metadata: { originalETA: '14:00', newETA: '14:20', reason: 'Heavy traffic' }
  }
]

export default function ActivityPage() {
  const [activities] = useState<Activity[]>(mockActivities)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'order' | 'customer' | 'delivery' | 'system' | 'payment'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'warning' | 'error' | 'info'>('all')
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month' | 'all'>('today')

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesType = typeFilter === 'all' || activity.type === typeFilter
      const matchesStatus = statusFilter === 'all' || activity.status === statusFilter
      
      // Date filtering logic
      const activityDate = new Date(activity.timestamp)
      const now = new Date()
      let matchesDate = true
      
      if (dateFilter === 'today') {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        matchesDate = activityDate >= today && activityDate < tomorrow
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        matchesDate = activityDate >= weekAgo
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        matchesDate = activityDate >= monthAgo
      }
      
      return matchesSearch && matchesType && matchesStatus && matchesDate
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [activities, searchTerm, typeFilter, statusFilter, dateFilter])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return ShoppingCart
      case 'customer': return User
      case 'delivery': return Truck
      case 'system': return Settings
      case 'payment': return CheckCircle
      default: return AlertCircle
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle
      case 'warning': return AlertCircle
      case 'error': return AlertCircle
      case 'info': return Clock
      default: return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success'
      case 'warning': return 'warning'
      case 'error': return 'error'
      case 'info': return 'info'
      default: return 'secondary'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'order': return 'bg-[#E63946]/10 text-[#E63946]'
      case 'customer': return 'bg-[#7FB069]/10 text-[#7FB069]'
      case 'delivery': return 'bg-blue-100 text-blue-600'
      case 'system': return 'bg-purple-100 text-purple-600'
      case 'payment': return 'bg-amber-100 text-amber-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  const stats = {
    total: filteredActivities.length,
    success: filteredActivities.filter(a => a.status === 'success').length,
    warning: filteredActivities.filter(a => a.status === 'warning').length,
    error: filteredActivities.filter(a => a.status === 'error').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#555555]">Activity Log</h1>
          <p className="text-[#555555]/70 mt-1">Monitor all system activities and events</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={<RefreshCw className="h-4 w-4" />}>
            Refresh
          </Button>
          <Button icon={<Download className="h-4 w-4" />}>
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-[#E63946]/10 p-3 rounded-xl">
                <Clock className="h-6 w-6 text-[#E63946]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#555555]/80">Total Activities</p>
                <p className="text-2xl font-bold text-[#555555]">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-[#7FB069]/10 p-3 rounded-xl">
                <CheckCircle className="h-6 w-6 text-[#7FB069]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#555555]/80">Successful</p>
                <p className="text-2xl font-bold text-[#555555]">{stats.success}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-100 p-3 rounded-xl">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#555555]/80">Warnings</p>
                <p className="text-2xl font-bold text-[#555555]">{stats.warning}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-3 rounded-xl">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#555555]/80">Errors</p>
                <p className="text-2xl font-bold text-[#555555]">{stats.error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftIcon={<Search className="h-4 w-4" />}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-1">
                <span className="text-sm font-medium text-[#555555] py-2">Type:</span>
                {['all', 'order', 'customer', 'delivery', 'system', 'payment'].map((type) => (
                  <Button
                    key={type}
                    variant={typeFilter === type ? 'primary' : 'secondary'}
                    size="xs"
                    onClick={() => setTypeFilter(type as typeof typeFilter)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
              
              <div className="flex gap-1">
                <span className="text-sm font-medium text-[#555555] py-2">Status:</span>
                {['all', 'success', 'warning', 'error', 'info'].map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'primary' : 'secondary'}
                    size="xs"
                    onClick={() => setStatusFilter(status as typeof statusFilter)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
              
              <div className="flex gap-1">
                <span className="text-sm font-medium text-[#555555] py-2">Time:</span>
                {['today', 'week', 'month', 'all'].map((period) => (
                  <Button
                    key={period}
                    variant={dateFilter === period ? 'primary' : 'secondary'}
                    size="xs"
                    onClick={() => setDateFilter(period as typeof dateFilter)}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#E63946]" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => {
              const ActivityIcon = getActivityIcon(activity.type)
              const StatusIcon = getStatusIcon(activity.status)
              
              return (
                <div key={activity.id} className="relative">
                  {index < filteredActivities.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-[#F4E1B5]"></div>
                  )}
                  <div className="flex items-start gap-4 p-4 rounded-lg border border-[#F4E1B5] hover:bg-[#FFF5E1]/50 transition-colors">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(activity.type)}`}>
                      <ActivityIcon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-[#555555]">{activity.action}</h3>
                          <p className="text-sm text-[#555555]/70">{activity.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(activity.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {activity.status.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-[#555555]/60">{formatTimestamp(activity.timestamp)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-[#555555]/70">
                        {activity.user && (
                          <span>
                            <User className="h-3 w-3 inline mr-1" />
                            {activity.user}
                          </span>
                        )}
                        {activity.orderId && (
                          <span>
                            <ShoppingCart className="h-3 w-3 inline mr-1" />
                            {activity.orderId}
                          </span>
                        )}
                        {activity.customerId && (
                          <span>
                            <User className="h-3 w-3 inline mr-1" />
                            {activity.customerId}
                          </span>
                        )}
                      </div>
                      
                      {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                        <div className="mt-3 p-3 bg-[#F4E1B5]/30 rounded-lg">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {Object.entries(activity.metadata).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium text-[#555555]">{key}:</span>
                                <span className="text-[#555555]/70 ml-1">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-[#555555]/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#555555] mb-2">No activities found</h3>
              <p className="text-[#555555]/70">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

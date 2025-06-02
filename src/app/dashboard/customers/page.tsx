'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Search, Plus, Phone, Mail, MapPin, Calendar, ShoppingCart, Star, MoreVertical, Edit } from 'lucide-react'
import { Modal, ModalBody, ModalFooter } from '@/components/ui/Modal'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  status: 'active' | 'inactive' | 'vip'
  joinDate: string
  favoriteItems: string[]
  rating: number
}

const mockCustomers: Customer[] = [
  {
    id: 'CUST001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    totalOrders: 24,
    totalSpent: 486.50,
    lastOrder: '2024-01-15',
    status: 'vip',
    joinDate: '2023-06-15',
    favoriteItems: ['Margherita Pizza', 'Caesar Salad'],
    rating: 4.8
  },
  {
    id: 'CUST002',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, Brooklyn, NY 11201',
    totalOrders: 12,
    totalSpent: 234.75,
    lastOrder: '2024-01-14',
    status: 'active',
    joinDate: '2023-09-22',
    favoriteItems: ['Pepperoni Pizza', 'Garlic Bread'],
    rating: 4.5
  },
  {
    id: 'CUST003',
    name: 'Mike Davis',
    email: 'mike.davis@email.com',
    phone: '+1 (555) 345-6789',
    address: '789 Pine St, Queens, NY 11375',
    totalOrders: 8,
    totalSpent: 156.25,
    lastOrder: '2024-01-10',
    status: 'active',
    joinDate: '2023-11-08',
    favoriteItems: ['Hawaiian Pizza'],
    rating: 4.2
  },
  {
    id: 'CUST004',
    name: 'Emily Wilson',
    email: 'emily.w@email.com',
    phone: '+1 (555) 456-7890',
    address: '321 Elm St, Manhattan, NY 10002',
    totalOrders: 3,
    totalSpent: 67.50,
    lastOrder: '2023-12-28',
    status: 'inactive',
    joinDate: '2023-12-15',
    favoriteItems: ['Veggie Pizza'],
    rating: 4.0
  },
  {
    id: 'CUST005',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1 (555) 567-8901',
    address: '654 Maple Dr, Bronx, NY 10451',
    totalOrders: 18,
    totalSpent: 378.90,
    lastOrder: '2024-01-13',
    status: 'vip',
    joinDate: '2023-07-03',
    favoriteItems: ['Meat Lovers Pizza', 'Buffalo Wings'],
    rating: 4.7
  }
]

export default function CustomersPage() {
  const [customers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'vip'>('all')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.phone.includes(searchTerm)
      
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [customers, searchTerm, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip': return 'warning'
      case 'active': return 'success'
      case 'inactive': return 'secondary'
      default: return 'secondary'
    }
  }

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    vip: customers.filter(c => c.status === 'vip').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#555555]">Customer Management</h1>
          <p className="text-[#555555]/70 mt-1">Manage your customer relationships and insights</p>
        </div>
        <Button icon={<Plus className="h-4 w-4" />}>
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-[#E63946]/10 p-3 rounded-xl">
                <ShoppingCart className="h-6 w-6 text-[#E63946]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#555555]/80">Total Customers</p>
                <p className="text-2xl font-bold text-[#555555]">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-[#7FB069]/10 p-3 rounded-xl">
                <Star className="h-6 w-6 text-[#7FB069]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#555555]/80">Active Customers</p>
                <p className="text-2xl font-bold text-[#555555]">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-100 p-3 rounded-xl">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#555555]/80">VIP Customers</p>
                <p className="text-2xl font-bold text-[#555555]">{stats.vip}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-[#E63946]/10 p-3 rounded-xl">
                <Calendar className="h-6 w-6 text-[#E63946]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#555555]/80">Total Revenue</p>
                <p className="text-2xl font-bold text-[#555555]">${stats.totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setStatusFilter('active')}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === 'vip' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setStatusFilter('vip')}
              >
                VIP
              </Button>
              <Button
                variant={statusFilter === 'inactive' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setStatusFilter('inactive')}
              >
                Inactive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} hover className="cursor-pointer" onClick={() => setSelectedCustomer(customer)}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-[#555555] text-lg">{customer.name}</h3>
                  <p className="text-sm text-[#555555]/70">{customer.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(customer.status)}>
                    {customer.status.toUpperCase()}
                  </Badge>
                  <Button variant="ghost" size="xs">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-[#555555]/70">
                  <Mail className="h-4 w-4" />
                  {customer.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#555555]/70">
                  <Phone className="h-4 w-4" />
                  {customer.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#555555]/70">
                  <MapPin className="h-4 w-4" />
                  {customer.address}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#F4E1B5]">
                <div>
                  <p className="text-xs text-[#555555]/60">Total Orders</p>
                  <p className="font-semibold text-[#555555]">{customer.totalOrders}</p>
                </div>
                <div>
                  <p className="text-xs text-[#555555]/60">Total Spent</p>
                  <p className="font-semibold text-[#555555]">${customer.totalSpent}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-[#555555]/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#555555] mb-2">No customers found</h3>
            <p className="text-[#555555]/70">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          title="Customer Details"
          size="lg"
        >
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#555555] mb-3">Customer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-[#555555]/80">Name</label>
                      <p className="text-[#555555]">{selectedCustomer.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#555555]/80">Email</label>
                      <p className="text-[#555555]">{selectedCustomer.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#555555]/80">Phone</label>
                      <p className="text-[#555555]">{selectedCustomer.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#555555]/80">Address</label>
                      <p className="text-[#555555]">{selectedCustomer.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#555555]/80">Status</label>
                      <div className="mt-1">
                        <Badge variant={getStatusColor(selectedCustomer.status)}>
                          {selectedCustomer.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Statistics */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#555555] mb-3">Order Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F4E1B5]/30 p-4 rounded-lg">
                      <p className="text-sm text-[#555555]/80">Total Orders</p>
                      <p className="text-2xl font-bold text-[#555555]">{selectedCustomer.totalOrders}</p>
                    </div>
                    <div className="bg-[#F4E1B5]/30 p-4 rounded-lg">
                      <p className="text-sm text-[#555555]/80">Total Spent</p>
                      <p className="text-2xl font-bold text-[#555555]">${selectedCustomer.totalSpent}</p>
                    </div>
                    <div className="bg-[#F4E1B5]/30 p-4 rounded-lg">
                      <p className="text-sm text-[#555555]/80">Average Rating</p>
                      <div className="flex items-center gap-1">
                        <p className="text-2xl font-bold text-[#555555]">{selectedCustomer.rating}</p>
                        <Star className="h-5 w-5 text-amber-500 fill-current" />
                      </div>
                    </div>
                    <div className="bg-[#F4E1B5]/30 p-4 rounded-lg">
                      <p className="text-sm text-[#555555]/80">Last Order</p>
                      <p className="text-sm font-semibold text-[#555555]">
                        {new Date(selectedCustomer.lastOrder).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#555555] mb-3">Favorite Items</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.favoriteItems.map((item, index) => (
                      <Badge key={index} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#555555] mb-3">Account Details</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium text-[#555555]/80">Customer ID</label>
                      <p className="text-[#555555]">{selectedCustomer.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#555555]/80">Join Date</label>
                      <p className="text-[#555555]">
                        {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button variant="secondary" onClick={() => setSelectedCustomer(null)}>
              Close
            </Button>
            <Button icon={<Edit className="h-4 w-4" />}>
              Edit Customer
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  )
}

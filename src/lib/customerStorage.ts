import { randomBytes } from 'crypto'

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
  totalSpent: number
  lastOrder: string | null
  status: 'active' | 'inactive' | 'vip'
  joinDate: string
  favoriteItems: string[]
  rating: number
  notes?: string
}

// In-memory storage for demonstration (in production, use a real database)
const customers: Map<string, Customer> = new Map()
const customersByEmail: Map<string, Customer> = new Map()

export class CustomerStorage {
  static async createCustomer(
    name: string,
    email: string,
    phone: string,
    address: string,
    status: 'active' | 'inactive' | 'vip' = 'active',
    notes?: string
  ): Promise<Customer> {
    // Check if customer already exists
    if (customersByEmail.has(email)) {
      throw new Error('Customer with this email already exists')
    }

    // Generate customer ID
    const customerId = this.generateCustomerId()
    
    const customer: Customer = {
      id: customerId,
      name,
      email,
      phone,
      address,
      totalOrders: 0,
      totalSpent: 0,
      lastOrder: null,
      status,
      joinDate: new Date().toISOString().split('T')[0],
      favoriteItems: [],
      rating: 0,
      notes
    }

    customers.set(customer.id, customer)
    customersByEmail.set(email, customer)

    return customer
  }

  static async findCustomerByEmail(email: string): Promise<Customer | null> {
    return customersByEmail.get(email) || null
  }

  static async findCustomerById(id: string): Promise<Customer | null> {
    return customers.get(id) || null
  }

  static async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | null> {
    const customer = customers.get(id)
    if (!customer) return null

    // If email is being updated, update the email index
    if (updates.email && updates.email !== customer.email) {
      customersByEmail.delete(customer.email)
      customersByEmail.set(updates.email, customer)
    }

    Object.assign(customer, updates)
    return customer
  }

  static async deleteCustomer(id: string): Promise<boolean> {
    const customer = customers.get(id)
    if (!customer) return false

    customers.delete(id)
    customersByEmail.delete(customer.email)
    return true
  }

  static async getAllCustomers(): Promise<Customer[]> {
    return Array.from(customers.values())
  }

  static async searchCustomers(query: string): Promise<Customer[]> {
    const allCustomers = Array.from(customers.values())
    const lowercaseQuery = query.toLowerCase()

    return allCustomers.filter(customer =>
      customer.name.toLowerCase().includes(lowercaseQuery) ||
      customer.email.toLowerCase().includes(lowercaseQuery) ||
      customer.phone.includes(query) ||
      customer.id.toLowerCase().includes(lowercaseQuery)
    )
  }

  static async getCustomersByStatus(status: 'active' | 'inactive' | 'vip'): Promise<Customer[]> {
    const allCustomers = Array.from(customers.values())
    return allCustomers.filter(customer => customer.status === status)
  }

  private static generateCustomerId(): string {
    let id: string
    do {
      // Generate a random 3-digit number
      const randomNum = Math.floor(Math.random() * 900) + 100
      id = `CUST${randomNum.toString().padStart(3, '0')}`
    } while (customers.has(id))
    
    return id
  }

  // Utility method to get customer count
  static getCustomerCount(): number {
    return customers.size
  }

  // Method to add order to customer (for future integration)
  static async addOrderToCustomer(customerId: string, orderValue: number, items: string[]): Promise<Customer | null> {
    const customer = customers.get(customerId)
    if (!customer) return null

    customer.totalOrders += 1
    customer.totalSpent += orderValue
    customer.lastOrder = new Date().toISOString().split('T')[0]

    // Update favorite items (simple logic - add new items)
    items.forEach(item => {
      if (!customer.favoriteItems.includes(item)) {
        customer.favoriteItems.push(item)
      }
    })

    // Update status based on spending (simple logic)
    if (customer.totalSpent > 500) {
      customer.status = 'vip'
    } else if (customer.totalOrders > 0) {
      customer.status = 'active'
    }

    // Calculate simple rating based on orders (placeholder logic)
    customer.rating = Math.min(5, 3 + (customer.totalOrders * 0.1))

    return customer
  }
}

// Initialize with some demo customers for testing
const initializeDemoCustomers = async () => {
  try {
    await CustomerStorage.createCustomer(
      'John Smith',
      'john.smith@email.com',
      '+1 (555) 123-4567',
      '123 Main St, New York, NY 10001',
      'vip',
      'Loyal customer since 2023'
    )

    await CustomerStorage.createCustomer(
      'Sarah Johnson',
      'sarah.j@email.com',
      '+1 (555) 234-5678',
      '456 Oak Ave, Brooklyn, NY 11201',
      'active',
      'Prefers vegetarian options'
    )

    await CustomerStorage.createCustomer(
      'Mike Davis',
      'mike.davis@email.com',
      '+1 (555) 345-6789',
      '789 Pine St, Queens, NY 11375',
      'active'
    )

    console.log('Demo customers initialized')
  } catch (error) {
    // Customers might already exist, ignore error
  }
}

// Initialize demo data
initializeDemoCustomers()

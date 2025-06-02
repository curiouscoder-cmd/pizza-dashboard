export interface PizzaOrder {
  id: string
  customerName: string
  pizzaType: string
  quantity: number
  orderDate: string
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled'
}

export interface User {
  id: string
  name: string
  email: string
  image?: string
  emailVerified?: boolean
  provider?: 'google' | 'credentials'
}

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

// NextAuth types extension
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}

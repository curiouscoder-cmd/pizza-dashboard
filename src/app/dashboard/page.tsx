'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Users, TrendingUp, Clock } from 'lucide-react'

export default function Dashboard() {
  const { data: session } = useSession()

  const stats = [
    {
      name: 'Total Orders',
      value: '20',
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      name: 'Active Orders',
      value: '8',
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      name: 'Completed Today',
      value: '12',
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      name: 'Total Customers',
      value: '18',
      icon: Users,
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4">
          <Image
            src={session?.user?.image || '/default-avatar.png'}
            alt={session?.user?.name || 'User'}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Hello, {session?.user?.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome to your pizza order management dashboard
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/dashboard/orders"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="h-8 w-8 text-orange-500 mr-4" />
            <div>
              <h3 className="font-medium text-gray-900">View All Orders</h3>
              <p className="text-sm text-gray-600">Manage and track pizza orders</p>
            </div>
          </Link>
          <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
            <TrendingUp className="h-8 w-8 text-gray-400 mr-4" />
            <div>
              <h3 className="font-medium text-gray-500">Analytics (Coming Soon)</h3>
              <p className="text-sm text-gray-400">View detailed reports and insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-600">Order PZA020 was marked as pending</span>
            <span className="text-gray-400 ml-auto">2 minutes ago</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-gray-600">Order PZA019 is now being prepared</span>
            <span className="text-gray-400 ml-auto">5 minutes ago</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            <span className="text-gray-600">Order PZA018 is out for delivery</span>
            <span className="text-gray-400 ml-auto">10 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

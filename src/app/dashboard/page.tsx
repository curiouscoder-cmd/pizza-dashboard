'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Users, TrendingUp, Clock, ArrowUpRight, Pizza, Star, Calendar, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const { data: session } = useSession()
  const [animatedValues, setAnimatedValues] = useState({
    totalOrders: 0,
    activeOrders: 0,
    completedToday: 0,
    totalCustomers: 0
  })

  const stats = [
    {
      name: 'Total Orders',
      value: 20,
      displayValue: animatedValues.totalOrders,
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Active Orders',
      value: 8,
      displayValue: animatedValues.activeOrders,
      icon: Clock,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      change: '+3',
      changeType: 'positive'
    },
    {
      name: 'Completed Today',
      value: 12,
      displayValue: animatedValues.completedToday,
      icon: TrendingUp,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: 'Total Customers',
      value: 18,
      displayValue: animatedValues.totalCustomers,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      change: '+2',
      changeType: 'positive'
    },
  ]

  // Animate counter values on mount
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedValues({
        totalOrders: Math.floor(20 * progress),
        activeOrders: Math.floor(8 * progress),
        completedToday: Math.floor(12 * progress),
        totalCustomers: Math.floor(18 * progress)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedValues({
          totalOrders: 20,
          activeOrders: 8,
          completedToday: 12,
          totalCustomers: 18
        })
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  const recentActivity = [
    {
      id: 1,
      type: 'order',
      message: 'New order PZA020 received',
      time: '2 minutes ago',
      status: 'pending',
      icon: ShoppingCart
    },
    {
      id: 2,
      type: 'order',
      message: 'Order PZA019 is being prepared',
      time: '5 minutes ago',
      status: 'preparing',
      icon: Clock
    },
    {
      id: 3,
      type: 'delivery',
      message: 'Order PZA018 out for delivery',
      time: '10 minutes ago',
      status: 'delivery',
      icon: TrendingUp
    },
    {
      id: 4,
      type: 'completed',
      message: 'Order PZA017 delivered successfully',
      time: '15 minutes ago',
      status: 'completed',
      icon: Star
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card variant="elevated" className="overflow-hidden">
        <div className="bg-gradient-to-r from-[#E63946] to-[#dc2626] p-8 text-[#FFF5E1]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Image
                  src={session?.user?.image || '/default-avatar.svg'}
                  alt={session?.user?.name || 'User'}
                  width={80}
                  height={80}
                  className="rounded-2xl border-4 border-[#FFF5E1]/20 shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#7FB069] text-[#FFF5E1] rounded-full p-2">
                  <Pizza className="h-4 w-4" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Welcome back, {session?.user?.name?.split(' ')[0]}! 👋
                </h1>
                <p className="text-[#FFF5E1]/90 text-lg mb-1">
                  Ready to manage your pizza empire?
                </p>
                <p className="text-[#FFF5E1]/70 text-sm">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="text-right">
                <p className="text-[#FFF5E1]/80 text-sm">Today's Date</p>
                <p className="text-[#FFF5E1] font-semibold">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={stat.name}
            variant="elevated"
            hover
            className="group cursor-pointer animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-200`}>
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#555555]/80 mb-1">{stat.name}</p>
                    <p className="text-3xl font-bold text-[#555555]">{stat.displayValue}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={stat.changeType === 'positive' ? 'success' : 'error'}
                    className="mb-2"
                  >
                    {stat.change}
                  </Badge>
                  <ArrowUpRight className="h-4 w-4 text-[#555555]/60 group-hover:text-[#E63946] transition-colors" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-r from-[#E63946] to-[#dc2626] rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-4 w-4 text-[#FFF5E1]" />
                </div>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/dashboard/orders">
                  <Card hover className="group cursor-pointer border-2 border-transparent hover:border-[#E63946]/30">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-[#E63946]/10 p-3 rounded-xl group-hover:bg-[#E63946] transition-colors duration-200">
                          <ShoppingCart className="h-6 w-6 text-[#E63946] group-hover:text-[#FFF5E1]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#555555] group-hover:text-[#E63946] transition-colors">
                            View All Orders
                          </h3>
                          <p className="text-sm text-[#555555]/70">Manage and track pizza orders</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-[#555555]/60 group-hover:text-[#E63946] ml-auto" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Card className="border-2 border-dashed border-slate-200 bg-slate-50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-slate-200 p-3 rounded-xl">
                        <TrendingUp className="h-6 w-6 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-500">Analytics</h3>
                        <p className="text-sm text-slate-400">Coming soon...</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Link href="/dashboard/customers">
                  <Card hover className="group cursor-pointer border-2 border-transparent hover:border-[#7FB069]/30">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-[#7FB069]/10 p-3 rounded-xl group-hover:bg-[#7FB069] transition-colors duration-200">
                          <Users className="h-6 w-6 text-[#7FB069] group-hover:text-[#FFF5E1]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#555555] group-hover:text-[#7FB069] transition-colors">
                            Customer Management
                          </h3>
                          <p className="text-sm text-[#555555]/70">View customer details</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-[#555555]/60 group-hover:text-[#7FB069] ml-auto" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/dashboard/schedule">
                  <Card hover className="group cursor-pointer border-2 border-transparent hover:border-blue-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-500 transition-colors duration-200">
                          <Calendar className="h-6 w-6 text-blue-600 group-hover:text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#555555] group-hover:text-blue-600 transition-colors">
                            Schedule
                          </h3>
                          <p className="text-sm text-[#555555]/70">Manage delivery schedule</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-[#555555]/60 group-hover:text-blue-500 ml-auto" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`p-2 rounded-lg ${
                      activity.status === 'pending' ? 'bg-amber-100' :
                      activity.status === 'preparing' ? 'bg-blue-100' :
                      activity.status === 'delivery' ? 'bg-purple-100' :
                      'bg-emerald-100'
                    }`}>
                      <activity.icon className={`h-4 w-4 ${
                        activity.status === 'pending' ? 'text-amber-600' :
                        activity.status === 'preparing' ? 'text-blue-600' :
                        activity.status === 'delivery' ? 'text-purple-600' :
                        'text-emerald-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#F4E1B5]">
                <Link href="/dashboard/activity">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Activity
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

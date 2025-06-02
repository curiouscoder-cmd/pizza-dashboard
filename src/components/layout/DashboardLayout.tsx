'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Home, ShoppingCart, LogOut, Menu, X, Settings, Bell, Search, ChevronDown, User, Calendar } from 'lucide-react'


interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    if (status === 'loading') return // Still loading
    if (!session) router.push('/auth/signin')
  }, [session, status, router])

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🍕</span>
            </div>
          </div>
          <p className="text-slate-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' })
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, description: 'Overview & stats' },
    { name: 'Pizza Orders', href: '/dashboard/orders', icon: ShoppingCart, description: 'Manage orders' },
    { name: 'Customers', href: '/dashboard/customers', icon: User, description: 'Customer management' },
    { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar, description: 'Delivery schedule' },
    { name: 'Activity', href: '/dashboard/activity', icon: Bell, description: 'System activity' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E1] to-[#F4E1B5]">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 rounded-xl bg-[#FFF5E1]/90 backdrop-blur-sm shadow-lg border border-[#F4E1B5]/50 hover:bg-[#FFF5E1] transition-all duration-200"
        >
          {sidebarOpen ? <X className="h-5 w-5 text-[#555555]" /> : <Menu className="h-5 w-5 text-[#555555]" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 ${sidebarCollapsed ? 'w-20' : 'w-72'} bg-[#FFF5E1]/95 backdrop-blur-xl shadow-2xl border-r border-[#F4E1B5]/50 transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-[#F4E1B5]/50">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-[#E63946] to-[#dc2626] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">🍕</span>
            </div>
            {!sidebarCollapsed && (
              <div className="animate-fade-in">
                <h1 className="text-xl font-bold text-[#555555]">Pizza Dashboard</h1>
                <p className="text-xs text-[#555555]/70">Order Management</p>
              </div>
            )}
          </div>

          {/* Collapse button (desktop only) */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-[#F4E1B5] transition-colors"
          >
            <Menu className="h-4 w-4 text-[#555555]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#E63946] to-[#dc2626] text-[#FFF5E1] shadow-lg'
                        : 'text-[#555555] hover:bg-[#F4E1B5] hover:text-[#555555]'
                    }`}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    <item.icon className={`h-5 w-5 ${isActive ? 'text-[#FFF5E1]' : 'text-[#555555]/70 group-hover:text-[#555555]'} transition-colors`} />
                    {!sidebarCollapsed && (
                      <div className="ml-3 animate-fade-in">
                        <div className="font-medium">{item.name}</div>
                        <div className={`text-xs ${isActive ? 'text-[#FFF5E1]/80' : 'text-[#555555]/60'}`}>
                          {item.description}
                        </div>
                      </div>
                    )}
                    {isActive && (
                      <div className="ml-auto">
                        <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200/50">
          {!sidebarCollapsed ? (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={session.user?.image || '/default-avatar.svg'}
                    alt={session.user?.name || 'User'}
                    width={40}
                    height={40}
                    className="rounded-xl border-2 border-white shadow-sm"
                  />
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {session.user?.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {session.user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 group"
              >
                <LogOut className="mr-3 h-4 w-4 group-hover:text-red-600" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <Image
                src={session.user?.image || '/default-avatar.svg'}
                alt={session.user?.name || 'User'}
                width={32}
                height={32}
                className="rounded-lg border border-white shadow-sm"
              />
              <button
                onClick={handleSignOut}
                className="p-2 text-slate-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Top Header */}
      <div className={`fixed top-0 right-0 left-0 ${sidebarCollapsed ? 'lg:left-20' : 'lg:left-72'} z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 transition-all duration-300`}>
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-4">
            {/* Breadcrumb */}
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <span className="text-slate-500">Dashboard</span>
              {pathname !== '/dashboard' && (
                <>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-900 font-medium">
                    {pathname.includes('orders') ? 'Orders' : 'Page'}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 text-sm bg-slate-100 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
              >
                <Image
                  src={session.user?.image || '/default-avatar.svg'}
                  alt={session.user?.name || 'User'}
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <ChevronDown className="h-4 w-4" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 animate-scale-in">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900">{session.user?.name}</p>
                    <p className="text-xs text-slate-500">{session.user?.email}</p>
                  </div>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <User className="mr-3 h-4 w-4" />
                    Profile
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        <main className="pt-24 pb-8 px-6 lg:px-8 min-h-screen">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

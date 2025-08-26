import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  FileText,
  Package,
  Move,
  Brain,
  Bell,
  User,
  Search,
  Filter,
  Calendar,
  Building,
  MessageSquare,
  Home,
  Factory,
  MapPin
} from 'lucide-react'

const Layout = ({ children }) => {
  const location = useLocation()
  const [filters, setFilters] = useState({
    plant: '',
    supplier: '',
    storageLocation: '',
    sku: ''
  })

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Purchase Orders', href: '/purchase-order', icon: FileText },
    { name: 'Post Goods Issue', href: '/stock-movement', icon: Move },
    { name: 'Post Goods Receipt', href: '/goods-receipt', icon: Package },
    { name: 'AI Insights', href: '/ml-insights', icon: Brain },
    { name: 'Conversational Insights', href: '/conversational-insights', icon: MessageSquare },
    { name: 'Notifications', href: '/notifications', icon: Bell }
  ]

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-[#e6f0ff]">
      {/* Top Header - SAP FIORI Style */}
      <div className="fiori-header">
        <div className="fiori-header-content">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#0070f3] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Subcontracting Dashboard</h1>
                <p className="text-sm text-gray-600">Streamline your subcontracting processes</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome,</p>
                <p className="font-medium text-gray-900">Aditya</p>
              </div>
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Filter Section - Above Navigation Tabs */}
      <div className="fiori-filter-section mx-6 mt-6">
        <div className="fiori-filter-header py-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Plant Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 min-w-[70px]">Plant:</label>
              <div className="flex-1 relative">
                <Factory className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter plant code"
                  value={filters.plant}
                  onChange={(e) => handleFilterChange('plant', e.target.value)}
                  className="fiori-input pl-8 py-1.5 text-sm"
                />
              </div>
            </div>

            {/* Supplier Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 min-w-[70px]">Supplier:</label>
              <div className="flex-1 relative">
                <Building className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter supplier name"
                  value={filters.supplier}
                  onChange={(e) => handleFilterChange('supplier', e.target.value)}
                  className="fiori-input pl-8 py-1.5 text-sm"
                />
              </div>
            </div>

            {/* Storage Location Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 min-w-[70px]">Storage Location:</label>
              <div className="flex-1 relative">
                <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter storage location"
                  value={filters.storageLocation}
                  onChange={(e) => handleFilterChange('storageLocation', e.target.value)}
                  className="fiori-input pl-8 py-1.5 text-sm"
                />
              </div>
            </div>

            {/* SKU Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 min-w-[70px]">SKU:</label>
              <div className="flex-1 relative">
                <Package className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter SKU"
                  value={filters.sku}
                  onChange={(e) => handleFilterChange('sku', e.target.value)}
                  className="fiori-input pl-8 py-1.5 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <button className="fiori-button-primary py-1.5 px-3 text-sm">
                Apply Filters
              </button>
              <button 
                onClick={() => setFilters({ plant: '', supplier: '', storageLocation: '', sku: '' })}
                className="fiori-button-secondary py-1.5 px-3 text-sm"
              >
                Clear Filters
              </button>
            </div>
            <div className="text-xs text-gray-500">
              Filters apply to all views
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - SAP FIORI Style */}
      <div className="bg-white border-b border-gray-200 shadow-sm mx-6 mt-6">
        <div className="px-6">
          <nav className="flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`fiori-nav-tab ${
                    isActive(item.href)
                      ? 'fiori-nav-tab-active'
                      : 'fiori-nav-tab-inactive'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}

export default Layout 
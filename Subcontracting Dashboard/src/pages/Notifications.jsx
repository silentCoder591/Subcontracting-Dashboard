import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Eye,
  Bell,
  CheckCircle,
  Clock,
  AlertTriangle,
  Info,
  Calendar,
  Building,
  Package,
  User
} from 'lucide-react'

const Notifications = () => {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [filters, setFilters] = useState({
    supplier: '',
    material: '',
    dateFrom: '',
    dateTo: '',
    priority: 'all',
    type: 'all'
  })

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Mock data for demonstration
  const notifications = [
    {
      id: 'NOT-2024-001',
      title: 'Purchase Order Approval Required',
      message: 'PO-2024-001 for Component A requires your approval',
      type: 'approval',
      priority: 'high',
      supplier: 'ABC Manufacturing',
      material: 'Component A',
      status: 'unread',
      createdDate: '2024-01-15T10:30:00',
      dueDate: '2024-01-16T17:00:00',
      createdBy: 'System',
      category: 'Purchase Order'
    },
    {
      id: 'NOT-2024-002',
      title: 'Goods Receipt Completed',
      message: 'GR-2024-002 for Component B has been completed successfully',
      type: 'info',
      priority: 'medium',
      supplier: 'XYZ Industries',
      material: 'Component B',
      status: 'read',
      createdDate: '2024-01-16T14:15:00',
      dueDate: null,
      createdBy: 'Jane Smith',
      category: 'Goods Receipt'
    },
    {
      id: 'NOT-2024-003',
      title: 'Quality Issue Detected',
      message: 'Quality issue detected in Component C from DEF Corp',
      type: 'alert',
      priority: 'high',
      supplier: 'DEF Corp',
      material: 'Component C',
      status: 'unread',
      createdDate: '2024-01-17T09:45:00',
      dueDate: '2024-01-18T12:00:00',
      createdBy: 'Quality System',
      category: 'Quality'
    },
    {
      id: 'NOT-2024-004',
      title: 'Supplier Performance Warning',
      message: 'ABC Manufacturing performance below threshold',
      type: 'warning',
      priority: 'medium',
      supplier: 'ABC Manufacturing',
      material: 'Component A',
      status: 'read',
      createdDate: '2024-01-17T16:20:00',
      dueDate: '2024-01-20T17:00:00',
      createdBy: 'ML System',
      category: 'Performance'
    }
  ]

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityConfig[priority] || priorityConfig.medium}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    )
  }

  const getTypeBadge = (type) => {
    const typeConfig = {
      approval: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      info: { color: 'bg-green-100 text-green-800', icon: Info },
      alert: { color: 'bg-red-100 text-red-800', icon: AlertTriangle },
      warning: { color: 'bg-orange-100 text-orange-800', icon: AlertTriangle }
    }
    
    const config = typeConfig[type] || typeConfig.info
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    )
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      unread: 'bg-blue-100 text-blue-800',
      read: 'bg-gray-100 text-gray-800'
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[status] || statusConfig.read}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.material.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = selectedPriority === 'all' || notification.priority === selectedPriority
    
    return matchesSearch && matchesPriority
  })

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return `${Math.floor(diffInHours / 168)}w ago`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-2">Manage and track all system notifications and alerts</p>
        </div>
        <div className="flex space-x-3">
          <button className="fiori-button-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="fiori-button-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Notification</span>
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Filter className="w-5 h-5 mr-2 text-sap-blue" />
          </h2>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {/* Supplier Filter */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 min-w-[80px]">Supplier:</label>
              <div className="flex-1 relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter supplier name"
                  value={filters.supplier}
                  onChange={(e) => handleFilterChange('supplier', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sap-blue focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Material Filter */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 min-w-[80px]">Material:</label>
              <div className="flex-1 relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter material ID"
                  value={filters.material}
                  onChange={(e) => handleFilterChange('material', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sap-blue focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Date From Filter */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 min-w-[80px]">Date From:</label>
              <div className="flex-1 relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sap-blue focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Date To Filter */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 min-w-[80px]">Date To:</label>
              <div className="flex-1 relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sap-blue focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Priority Filter */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 min-w-[80px]">Priority:</label>
              <div className="flex-1 relative">
                <select
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sap-blue focus:border-transparent text-sm"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 min-w-[80px]">Type:</label>
              <div className="flex-1 relative">
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sap-blue focus:border-transparent text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="approval">Approval</option>
                  <option value="info">Info</option>
                  <option value="alert">Alert</option>
                  <option value="warning">Warning</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-sap-blue text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm">
                Apply Filters
              </button>
              <button 
                onClick={() => setFilters({ supplier: '', material: '', dateFrom: '', dateTo: '', priority: 'all', type: 'all' })}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-sm"
              >
                Clear Filters
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Showing results for current filters
            </div>
          </div>
        </div>
      </div>

      {/* Search and Quick Filters */}
      <div className="fiori-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by notification ID, title, or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="fiori-input pl-10"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="fiori-input min-w-[150px]"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="fiori-card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Notifications ({filteredNotifications.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="fiori-table">
            <thead className="fiori-table-header">
              <tr>
                <th className="fiori-table-header-cell">Notification ID</th>
                <th className="fiori-table-header-cell">Title</th>
                <th className="fiori-table-header-cell">Type</th>
                <th className="fiori-table-header-cell">Priority</th>
                <th className="fiori-table-header-cell">Supplier</th>
                <th className="fiori-table-header-cell">Material</th>
                <th className="fiori-table-header-cell">Status</th>
                <th className="fiori-table-header-cell">Created</th>
                <th className="fiori-table-header-cell">Due Date</th>
                <th className="fiori-table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <tr key={notification.id} className={`hover:bg-gray-50 ${notification.status === 'unread' ? 'bg-blue-50' : ''}`}>
                  <td className="fiori-table-cell font-medium text-sap-blue">
                    {notification.id}
                  </td>
                  <td className="fiori-table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{notification.title}</div>
                      <div className="text-sm text-gray-500">{notification.message}</div>
                    </div>
                  </td>
                  <td className="fiori-table-cell">{getTypeBadge(notification.type)}</td>
                  <td className="fiori-table-cell">{getPriorityBadge(notification.priority)}</td>
                  <td className="fiori-table-cell">{notification.supplier}</td>
                  <td className="fiori-table-cell">{notification.material}</td>
                  <td className="fiori-table-cell">{getStatusBadge(notification.status)}</td>
                  <td className="fiori-table-cell">
                    <div>
                      <div className="text-sm text-gray-900">{formatDate(notification.createdDate)}</div>
                      <div className="text-xs text-gray-500">{getTimeAgo(notification.createdDate)}</div>
                    </div>
                  </td>
                  <td className="fiori-table-cell">
                    {notification.dueDate ? (
                      <div>
                        <div className="text-sm text-gray-900">{formatDate(notification.dueDate)}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(notification.dueDate) > new Date() ? 'Upcoming' : 'Overdue'}
                        </div>
                      </div>
                    ) : '-'}
                  </td>
                  <td className="fiori-table-cell">
                    <div className="flex space-x-2">
                      <button className="p-1 text-sap-blue hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-sap-orange hover:bg-orange-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-sap-red hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Notification Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowForm(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Create Notification</h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input type="text" className="fiori-input" placeholder="Enter notification title" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select className="fiori-input">
                        <option>Select Type</option>
                        <option value="approval">Approval</option>
                        <option value="info">Info</option>
                        <option value="alert">Alert</option>
                        <option value="warning">Warning</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select className="fiori-input">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select className="fiori-input">
                        <option>Select Category</option>
                        <option value="Purchase Order">Purchase Order</option>
                        <option value="Goods Receipt">Goods Receipt</option>
                        <option value="Quality">Quality</option>
                        <option value="Performance">Performance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                      <select className="fiori-input">
                        <option>Select Supplier</option>
                        <option>ABC Manufacturing</option>
                        <option>XYZ Industries</option>
                        <option>DEF Corp</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                      <select className="fiori-input">
                        <option>Select Material</option>
                        <option>Component A</option>
                        <option>Component B</option>
                        <option>Component C</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                      <input type="datetime-local" className="fiori-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                      <select className="fiori-input">
                        <option>Select Recipient</option>
                        <option>All Users</option>
                        <option>Managers</option>
                        <option>Quality Team</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea rows={3} className="fiori-input" placeholder="Enter notification message..."></textarea>
                  </div>
                </form>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="fiori-button-secondary"
                >
                  Cancel
                </button>
                <button className="fiori-button-primary">
                  Create Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications 
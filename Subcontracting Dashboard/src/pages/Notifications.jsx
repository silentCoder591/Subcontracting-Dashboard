import React, { useState } from 'react'
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Clock, 
  Package, 
  FileText, 
  TrendingDown,
  TrendingUp,
  X,
  Filter,
  Search
} from 'lucide-react'

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedNotifications, setSelectedNotifications] = useState(new Set())

  // Mock notifications data based on SAP subcontracting processes
  const notificationsData = [
    {
      id: 'NOTIF-001',
      type: 'success',
      title: 'Goods Receipt Posted Successfully',
      message: 'GR 5000000001 for Assembly MAT-001 has been posted. 30 PCS received from ABC Manufacturing.',
      timestamp: '2024-01-20 14:30',
      priority: 'high',
      relatedEntity: 'GR-5000000001',
      entityType: 'Goods Receipt',
      isRead: false,
      actionRequired: false
    },
    {
      id: 'NOTIF-002',
      id: 'NOTIF-002',
      type: 'warning',
      title: 'Component Stock Shortage Alert',
      message: 'Component COMP-001 stock is below safety level (15 PCS remaining). Consider replenishment.',
      timestamp: '2024-01-20 13:45',
      priority: 'high',
      relatedEntity: 'COMP-001',
      entityType: 'Material',
      isRead: false,
      actionRequired: true
    },
    {
      id: 'NOTIF-003',
      type: 'info',
      title: 'Purchase Order Ready for Closure',
      message: 'PO 4500000001 for Assembly MAT-001 is 100% delivered and invoiced. Ready for closure.',
      timestamp: '2024-01-20 12:15',
      priority: 'medium',
      relatedEntity: 'PO-4500000001',
      entityType: 'Purchase Order',
      isRead: false,
      actionRequired: true
    },
    {
      id: 'NOTIF-004',
      type: 'success',
      title: 'Component Consumption Posted',
      message: 'Movement 543 posted for 25 PCS of COMP-001 consumption in Assembly MAT-001.',
      timestamp: '2024-01-20 11:30',
      priority: 'medium',
      relatedEntity: 'MVT-543-001',
      entityType: 'Movement',
      isRead: true,
      actionRequired: false
    },
    {
      id: 'NOTIF-005',
      type: 'warning',
      title: 'Delivery Date Overdue',
      message: 'PO 4500000002 for Assembly MAT-002 is 3 days overdue. Supplier: XYZ Industries.',
      timestamp: '2024-01-20 10:00',
      priority: 'high',
      relatedEntity: 'PO-4500000002',
      entityType: 'Purchase Order',
      isRead: false,
      actionRequired: true
    },
    {
      id: 'NOTIF-006',
      type: 'info',
      title: 'Subcontracting Order Created',
      message: 'New subcontracting order SO-6000000001 created for Assembly MAT-003 with 25 PCS quantity.',
      timestamp: '2024-01-20 09:15',
      priority: 'low',
      relatedEntity: 'SO-6000000001',
      entityType: 'Subcontracting Order',
      isRead: true,
      actionRequired: false
    },
    {
      id: 'NOTIF-007',
      type: 'warning',
      title: 'Quality Issue Detected',
      message: 'Quality issue reported for Assembly MAT-001. 5 PCS rejected during goods receipt.',
      timestamp: '2024-01-19 16:45',
      priority: 'high',
      relatedEntity: 'GR-5000000001',
      entityType: 'Goods Receipt',
      isRead: false,
      actionRequired: true
    },
    {
      id: 'NOTIF-008',
      type: 'success',
      title: 'Invoice Received and Matched',
      message: 'Invoice INV-7000000001 for PO 4500000001 has been received and matched successfully.',
      timestamp: '2024-01-19 15:20',
      priority: 'medium',
      relatedEntity: 'INV-7000000001',
      entityType: 'Invoice',
      isRead: true,
      actionRequired: false
    },
    {
      id: 'NOTIF-009',
      type: 'info',
      title: 'Stock Transfer Completed',
      message: 'Stock transfer from unrestricted to issued stock completed for Assembly MAT-002.',
      timestamp: '2024-01-19 14:10',
      priority: 'low',
      relatedEntity: 'ST-8000000001',
      entityType: 'Stock Transfer',
      isRead: true,
      actionRequired: false
    },
    {
      id: 'NOTIF-010',
      type: 'warning',
      title: 'Supplier Performance Alert',
      message: 'ABC Manufacturing has 2 late deliveries in the last 30 days. Performance below threshold.',
      timestamp: '2024-01-19 13:30',
      priority: 'medium',
      relatedEntity: 'SUP-ABC-001',
      entityType: 'Supplier',
      isRead: false,
      actionRequired: true
    }
  ]

  const getNotificationIcon = (type) => {
    const iconConfig = {
      success: { icon: CheckCircle, color: 'text-green-600 bg-green-100' },
      warning: { icon: AlertTriangle, color: 'text-yellow-600 bg-yellow-100' },
      info: { icon: Info, color: 'text-blue-600 bg-blue-100' },
      error: { icon: AlertTriangle, color: 'text-red-600 bg-red-100' }
    }
    
    const config = iconConfig[type] || iconConfig.info
    const Icon = config.icon
    
    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.color}`}>
        <Icon className="w-4 h-4" />
      </div>
    )
  }

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-gray-100 text-gray-800'
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig[priority]}`}>
        {priority.toUpperCase()}
      </span>
    )
  }

  const filteredNotifications = notificationsData.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.relatedEntity.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'unread' && !notification.isRead) ||
                         (selectedFilter === 'action-required' && notification.actionRequired) ||
                         (selectedFilter === 'type' && notification.type === selectedFilter)
    
    return matchesSearch && matchesFilter
  })

  const unreadCount = notificationsData.filter(n => !n.isRead).length
  const actionRequiredCount = notificationsData.filter(n => n.actionRequired).length

  const handleMarkAsRead = (notificationId) => {
    // TODO: Implement mark as read functionality
    console.log('Mark as read:', notificationId)
  }

  const handleMarkAllAsRead = () => {
    // TODO: Implement mark all as read functionality
    console.log('Mark all as read')
  }

  const handleSelectNotification = (notificationId) => {
    setSelectedNotifications(prev => {
      const newSet = new Set(prev)
      if (newSet.has(notificationId)) {
        newSet.delete(notificationId)
      } else {
        newSet.add(notificationId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications Inbox</h1>
          <p className="text-gray-600 mt-2">Stay updated with your subcontracting operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleMarkAllAsRead}
            className="fiori-button-secondary flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="fiori-card">
          <div className="fiori-card-content">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                <p className="text-2xl font-bold text-gray-900">{notificationsData.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fiori-card">
          <div className="fiori-card-content">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fiori-card">
          <div className="fiori-card-content">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Action Required</p>
                <p className="text-2xl font-bold text-gray-900">{actionRequiredCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="fiori-card">
        <div className="fiori-card-content">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="fiori-input pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="fiori-input min-w-[150px]"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="action-required">Action Required</option>
                <option value="success">Success</option>
                <option value="warning">Warnings</option>
                <option value="info">Info</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="fiori-card">
        <div className="fiori-card-header">
          <h3 className="text-lg font-semibold text-gray-900">
            Notifications ({filteredNotifications.length})
          </h3>
        </div>
        <div className="fiori-card-content p-0">
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  !notification.isRead ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h4 className={`text-sm font-medium ${
                          !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                        {notification.actionRequired && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                            Action Required
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getPriorityBadge(notification.priority)}
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                      </div>
                    </div>
                    
                    <p className="mt-2 text-sm text-gray-600">
                      {notification.message}
                    </p>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-gray-500">
                          {notification.entityType}: {notification.relatedEntity}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  Download, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react'

const PurchaseOrder = () => {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock data for demonstration
  const purchaseOrders = [
    {
      id: '4500000001',
      supplier: 'ABC Manufacturing',
      material: 'Component A',
      quantity: 100,
      unitPrice: 25.50,
      totalValue: 2550.00,
      status: 'active',
      createdDate: '2024-01-15',
      deliveryDate: '2024-02-15',
      createdBy: 'John Doe',
      priority: 'high'
    },
    {
      id: '4500000002',
      supplier: 'XYZ Industries',
      material: 'Component B',
      quantity: 50,
      unitPrice: 45.75,
      totalValue: 2287.50,
      status: 'pending',
      createdDate: '2024-01-16',
      deliveryDate: '2024-02-20',
      createdBy: 'Jane Smith',
      priority: 'medium'
    },
    {
      id: '4500000003',
      supplier: 'DEF Corp',
      material: 'Component C',
      quantity: 200,
      unitPrice: 12.25,
      totalValue: 2450.00,
      status: 'completed',
      createdDate: '2024-01-10',
      deliveryDate: '2024-02-10',
      createdBy: 'Mike Johnson',
      priority: 'low'
    }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { color: 'fiori-badge', icon: Clock, label: 'Draft' },
      pending: { color: 'fiori-badge-warning', icon: AlertTriangle, label: 'Pending' },
      active: { color: 'fiori-badge-info', icon: CheckCircle, label: 'Active' },
      completed: { color: 'fiori-badge-success', icon: CheckCircle, label: 'Completed' },
      cancelled: { color: 'fiori-badge-error', icon: AlertTriangle, label: 'Cancelled' }
    }
    
    const config = statusConfig[status] || statusConfig.draft
    const Icon = config.icon
    
    return (
      <span className={`${config.color} flex items-center`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    )
  }

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: 'fiori-badge-success',
      medium: 'fiori-badge-warning',
      high: 'fiori-badge-error'
    }
    
    return (
      <span className={`${priorityConfig[priority] || priorityConfig.medium} capitalize`}>
        {priority}
      </span>
    )
  }

  const filteredOrders = purchaseOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.material.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchase Order Management</h1>
          <p className="text-gray-600 mt-2">Create, manage, and track subcontracting purchase orders</p>
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
            <span>Create Purchase Order</span>
          </button>
        </div>
      </div>

      {/* Search and Quick Filters */}
      <div className="fiori-card">
        <div className="fiori-card-content">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by PO number, supplier, or material..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="fiori-input pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="fiori-input min-w-[150px]"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Orders Table */}
      <div className="fiori-card">
        <div className="fiori-card-header">
          <h3 className="text-lg font-semibold text-gray-900">
            Purchase Orders ({filteredOrders.length})
          </h3>
        </div>
        <div className="fiori-card-content p-0">
          <div className="overflow-x-auto">
            <table className="fiori-table">
              <thead className="fiori-table-header">
                <tr>
                  <th className="fiori-table-header-cell">PO Number</th>
                  <th className="fiori-table-header-cell">Supplier</th>
                  <th className="fiori-table-header-cell">Material</th>
                  <th className="fiori-table-header-cell">Quantity</th>
                  <th className="fiori-table-header-cell">Unit Price</th>
                  <th className="fiori-table-header-cell">Total Value</th>
                  <th className="fiori-table-header-cell">Status</th>
                  <th className="fiori-table-header-cell">Priority</th>
                  <th className="fiori-table-header-cell">Delivery Date</th>
                  <th className="fiori-table-header-cell">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="fiori-table-cell font-medium text-[#0070f3]">
                      {order.id}
                    </td>
                    <td className="fiori-table-cell">{order.supplier}</td>
                    <td className="fiori-table-cell">{order.material}</td>
                    <td className="fiori-table-cell">{order.quantity.toLocaleString()}</td>
                    <td className="fiori-table-cell">${order.unitPrice.toFixed(2)}</td>
                    <td className="fiori-table-cell font-medium">${order.totalValue.toFixed(2)}</td>
                    <td className="fiori-table-cell">{getStatusBadge(order.status)}</td>
                    <td className="fiori-table-cell">{getPriorityBadge(order.priority)}</td>
                    <td className="fiori-table-cell">{order.deliveryDate}</td>
                    <td className="fiori-table-cell">
                      <div className="flex space-x-2">
                        <button className="p-1 text-[#0070f3] hover:bg-[#e6f0ff] rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-[#d69e00] hover:bg-[#fff4ce] rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-[#d13438] hover:bg-[#fde7e9] rounded">
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
      </div>

      {/* Create Purchase Order Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowForm(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Create Purchase Order</h3>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                      <input type="number" className="fiori-input" placeholder="Enter quantity" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
                      <input type="number" step="0.01" className="fiori-input" placeholder="Enter unit price" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                      <input type="date" className="fiori-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select className="fiori-input">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea rows={3} className="fiori-input" placeholder="Enter any notes about the purchase order..."></textarea>
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
                  Create Purchase Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PurchaseOrder 
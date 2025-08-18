import React, { useState } from 'react'
import { Plus, Package, Building, Calendar, CheckCircle, Clock, AlertTriangle, ArrowDown } from 'lucide-react'

const GoodsReceipt = () => {
  const [showForm, setShowForm] = useState(false)
  const [selectedPO, setSelectedPO] = useState(null)
  const [draggedPO, setDraggedPO] = useState(null)

  // Mock data for POs that can be used for Goods Receipt
  const availablePOs = [
    {
      id: '4500000001',
      supplier: 'ABC Manufacturing',
      material: 'Component A',
      quantity: 100,
      unitPrice: 25.50,
      totalValue: 2550.00,
      status: 'active',
      deliveryDate: '2024-02-15',
      createdDate: '2024-01-15'
    },
    {
      id: '4500000002',
      supplier: 'XYZ Industries',
      material: 'Component B',
      quantity: 50,
      unitPrice: 45.75,
      totalValue: 2287.50,
      status: 'active',
      deliveryDate: '2024-02-20',
      createdDate: '2024-01-16'
    },
    {
      id: '4500000003',
      supplier: 'DEF Corp',
      material: 'Component C',
      quantity: 200,
      unitPrice: 12.25,
      totalValue: 2450.00,
      status: 'active',
      deliveryDate: '2024-02-10',
      createdDate: '2024-01-10'
    }
  ]

  // Mock data for existing Goods Receipts
  const goodsReceipts = [
    {
      id: '5000000001',
      poId: '4500000001',
      supplier: 'ABC Manufacturing',
      material: 'Component A',
      orderedQty: 100,
      receivedQty: 95,
      unitPrice: 25.50,
      totalValue: 2422.50,
      receivedDate: '2024-01-20',
      status: 'Completed'
    },
    {
      id: '5000000002',
      poId: '4500000002',
      supplier: 'XYZ Industries',
      material: 'Component B',
      orderedQty: 50,
      receivedQty: 52,
      unitPrice: 45.75,
      totalValue: 2379.00,
      receivedDate: '2024-01-22',
      status: 'Completed'
    }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Completed': 'fiori-badge-success',
      'In Progress': 'fiori-badge-warning',
      'Pending': 'fiori-badge-info',
      'Cancelled': 'fiori-badge-error'
    }
    
    return (
      <span className={`${statusConfig[status] || statusConfig.Pending} capitalize`}>
        {status}
      </span>
    )
  }

  // Drag and Drop handlers
  const handleDragStart = (e, po) => {
    setDraggedPO(po)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', po.id)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, dropZone) => {
    e.preventDefault()
    if (draggedPO) {
      setSelectedPO(draggedPO)
      setDraggedPO(null)
      // Auto-open the form when PO is dropped
      setShowForm(true)
    }
  }

  const handleDragEnd = () => {
    setDraggedPO(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Post Goods Receipt</h1>
          <p className="text-gray-600 mt-2">Post goods receipts using Purchase Orders</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowForm(true)}
            className="fiori-button-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Post Goods Receipt</span>
          </button>
        </div>
      </div>

      {/* Available POs for Drag & Drop */}
      <div className="fiori-card">
        <div className="fiori-card-header">
          <h3 className="text-lg font-semibold text-gray-900">Open Purchase Orders</h3>
          <p className="text-sm text-gray-600">Drag and drop POs to the drop zone on the right to post goods receipt</p>
        </div>
        <div className="fiori-card-content p-0">
          <div className="flex">
            {/* Left Side - Scrollable POs List */}
            <div className="flex-1 border-r border-gray-200">
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {availablePOs.map((po) => (
                    <div 
                      key={po.id} 
                      className={`p-3 border-2 border-dashed rounded-lg transition-all duration-200 cursor-move ${
                        draggedPO?.id === po.id 
                          ? 'border-blue-500 bg-blue-100 shadow-lg scale-105' 
                          : 'border-blue-300 bg-blue-50 hover:bg-blue-100'
                      }`}
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, po)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-[#0070f3]">{po.id}</span>
                        <Package className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="font-medium">{po.supplier}</div>
                        <div>{po.material}</div>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>Qty: {po.quantity.toLocaleString()}</div>
                        <div>Unit Price: ${po.unitPrice.toFixed(2)}</div>
                        <div>Total: ${po.totalValue.toFixed(2)}</div>
                        <div>Delivery: {po.deliveryDate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Drop Zone */}
            <div className="flex-1">
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Drop Zone</h4>
                <div 
                  className={`min-h-[300px] flex items-center justify-center transition-all duration-200 rounded-lg ${
                    draggedPO 
                      ? 'bg-blue-50 border-2 border-dashed border-blue-400' 
                      : 'bg-gray-50 border-2 border-dashed border-gray-300'
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'main')}
                >
                  {selectedPO ? (
                    <div className="text-center">
                      <div className="text-green-600 mb-2">
                        <CheckCircle className="w-12 h-12 mx-auto" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">PO Selected!</h4>
                      <p className="text-gray-600 mb-4">
                        {selectedPO.id} - {selectedPO.material}
                      </p>
                      <button 
                        onClick={() => setShowForm(true)}
                        className="fiori-button-primary"
                      >
                        Continue to Post Goods Receipt
                      </button>
                    </div>
                  ) : draggedPO ? (
                    <div className="text-center">
                      <div className="text-blue-600 mb-2">
                        <ArrowDown className="w-12 h-12 mx-auto animate-bounce" />
                      </div>
                      <p className="text-lg font-semibold text-gray-900">Drop here to select</p>
                      <p className="text-gray-600">{draggedPO.id} - {draggedPO.material}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-gray-400 mb-2">
                        <Package className="w-12 h-12 mx-auto" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Drop Zone</h3>
                      <p className="text-gray-600">Drag a Purchase Order from the left and drop it here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posted Goods Receipts */}
      <div className="fiori-card">
        <div className="fiori-card-header">
          <h3 className="text-lg font-semibold text-gray-900">Posted Goods Receipts</h3>
        </div>
        <div className="fiori-card-content p-0">
          <div className="overflow-x-auto">
            <table className="fiori-table">
              <thead className="fiori-table-header">
                <tr>
                  <th className="fiori-table-header-cell">Material Document</th>
                  <th className="fiori-table-header-cell">PO Number</th>
                  <th className="fiori-table-header-cell">Supplier</th>
                  <th className="fiori-table-header-cell">Material</th>
                  <th className="fiori-table-header-cell">Ordered Qty</th>
                  <th className="fiori-table-header-cell">Received Qty</th>
                  <th className="fiori-table-header-cell">Unit Price</th>
                  <th className="fiori-table-header-cell">Total Value</th>
                  <th className="fiori-table-header-cell">Received Date</th>
                  <th className="fiori-table-header-cell">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {goodsReceipts.map((gr) => (
                  <tr key={gr.id} className="hover:bg-gray-50">
                    <td className="fiori-table-cell font-medium text-[#0070f3]">{gr.id}</td>
                    <td className="fiori-table-cell">{gr.poId}</td>
                    <td className="fiori-table-cell">{gr.supplier}</td>
                    <td className="fiori-table-cell">{gr.material}</td>
                    <td className="fiori-table-cell">{gr.orderedQty.toLocaleString()}</td>
                    <td className="fiori-table-cell">{gr.receivedQty.toLocaleString()}</td>
                    <td className="fiori-table-cell">${gr.unitPrice.toFixed(2)}</td>
                    <td className="fiori-table-cell font-medium">${gr.totalValue.toFixed(2)}</td>
                    <td className="fiori-table-cell">{gr.receivedDate}</td>
                    <td className="fiori-table-cell">{getStatusBadge(gr.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Goods Receipt Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowForm(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Post Goods Receipt</h3>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Order</label>
                      <select 
                        className="fiori-input"
                        value={selectedPO?.id || ''}
                        onChange={(e) => {
                          const po = availablePOs.find(p => p.id === e.target.value)
                          setSelectedPO(po)
                        }}
                      >
                        <option value="">Select Purchase Order</option>
                        {availablePOs.map((po) => (
                          <option key={po.id} value={po.id}>
                            {po.id} - {po.material}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                      <input 
                        type="text" 
                        className="fiori-input" 
                        placeholder="Supplier name" 
                        value={selectedPO?.supplier || ''}
                        readOnly 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                      <input 
                        type="text" 
                        className="fiori-input" 
                        placeholder="Material" 
                        value={selectedPO?.material || ''}
                        readOnly 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ordered Quantity</label>
                      <input 
                        type="number" 
                        className="fiori-input" 
                        placeholder="Ordered qty" 
                        value={selectedPO?.quantity || ''}
                        readOnly 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Received Quantity</label>
                      <input type="number" className="fiori-input" placeholder="Enter received qty" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
                      <input 
                        type="number" 
                        step="0.01" 
                        className="fiori-input" 
                        placeholder="Unit price" 
                        value={selectedPO?.unitPrice || ''}
                        readOnly 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Received Date</label>
                      <input type="date" className="fiori-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <input type="text" className="fiori-input" placeholder="Any notes" />
                    </div>
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
                  Post Goods Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GoodsReceipt 
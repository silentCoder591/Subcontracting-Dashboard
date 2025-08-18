import React, { useState } from 'react'
import { Plus, Package, Move, Building, CheckCircle, ArrowDown, FileText } from 'lucide-react'

const StockMovement = () => {
  const [showForm, setShowForm] = useState(false)
  const [selectedPO, setSelectedPO] = useState(null)
  const [draggedPO, setDraggedPO] = useState(null)

  // Mock data for POs that can be used for Goods Issue (showing components per PO)
  const availablePOs = [
    {
      id: '4500000001',
      supplier: 'ABC Manufacturing',
      material: 'Component A',
      totalQuantity: 100,
      componentsIssued: 0,
      componentsRemaining: 100,
      unitPrice: 25.50,
      totalValue: 2550.00,
      status: 'active',
      deliveryDate: '2024-02-15',
      createdDate: '2024-01-15',
      components: [
        { id: 'COMP-001', name: 'Component A-1', quantity: 50, issued: 0 },
        { id: 'COMP-002', name: 'Component A-2', quantity: 30, issued: 0 },
        { id: 'COMP-003', name: 'Component A-3', quantity: 20, issued: 0 }
      ]
    },
    {
      id: '4500000002',
      supplier: 'XYZ Industries',
      material: 'Component B',
      totalQuantity: 50,
      componentsIssued: 20,
      componentsRemaining: 30,
      unitPrice: 45.75,
      totalValue: 2287.50,
      status: 'active',
      deliveryDate: '2024-02-20',
      createdDate: '2024-01-16',
      components: [
        { id: 'COMP-004', name: 'Component B-1', quantity: 30, issued: 20 },
        { id: 'COMP-005', name: 'Component B-2', quantity: 20, issued: 0 }
      ]
    },
    {
      id: '4500000003',
      supplier: 'DEF Corp',
      material: 'Component C',
      totalQuantity: 200,
      componentsIssued: 150,
      componentsRemaining: 50,
      unitPrice: 12.25,
      totalValue: 2450.00,
      status: 'active',
      deliveryDate: '2024-02-10',
      createdDate: '2024-01-10',
      components: [
        { id: 'COMP-006', name: 'Component C-1', quantity: 100, issued: 100 },
        { id: 'COMP-007', name: 'Component C-2', quantity: 100, issued: 50 }
      ]
    }
  ]

  // Mock data for existing Goods Issues
  const goodsIssues = [
    {
      id: 'GI-5000000001',
      poId: '4500000001',
      supplier: 'ABC Manufacturing',
      material: 'Component A',
      quantityIssued: 50,
      issueDate: '2024-01-20',
      status: 'Completed',
      componentsIssued: ['COMP-001']
    },
    {
      id: 'GI-5000000002',
      poId: '4500000002',
      supplier: 'XYZ Industries',
      material: 'Component B',
      quantityIssued: 20,
      issueDate: '2024-01-22',
      status: 'Completed',
      componentsIssued: ['COMP-004']
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
          <h1 className="text-2xl font-bold text-gray-900">Post Goods Issue</h1>
          <p className="text-gray-600 mt-2">Issue components to suppliers using Purchase Orders</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowForm(true)}
            className="fiori-button-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Post Goods Issue</span>
          </button>
        </div>
      </div>

      {/* Available POs for Drag & Drop */}
      <div className="fiori-card">
        <div className="fiori-card-header">
          <h3 className="text-lg font-semibold text-gray-900">Open Purchase Orders</h3>
          <p className="text-sm text-gray-600">Drag and drop POs to the drop zone on the right to issue components</p>
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
                          ? 'border-green-500 bg-green-100 shadow-lg scale-105' 
                          : 'border-green-300 bg-green-50 hover:bg-green-100'
                      }`}
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, po)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-[#0070f3]">{po.id}</span>
                        <Move className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="font-medium">{po.supplier}</div>
                        <div>{po.material}</div>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1 mb-2">
                        <div>Total Qty: {po.totalQuantity.toLocaleString()}</div>
                        <div>Issued: {po.componentsIssued.toLocaleString()}</div>
                        <div>Remaining: {po.componentsRemaining.toLocaleString()}</div>
                        <div>Unit Price: ${po.unitPrice.toFixed(2)}</div>
                        <div>Delivery: {po.deliveryDate}</div>
                      </div>
                      
                      {/* Components breakdown */}
                      <div className="border-t border-gray-200 pt-2">
                        <div className="text-xs font-medium text-gray-700 mb-1">Components:</div>
                        <div className="space-y-1">
                          {po.components.map((comp) => (
                            <div key={comp.id} className="flex justify-between text-xs text-gray-600">
                              <span>{comp.name}</span>
                              <span className="font-medium">
                                {comp.issued}/{comp.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
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
                      ? 'bg-green-50 border-2 border-dashed border-green-400' 
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
                      <div className="text-sm text-gray-600 mb-4">
                        <div>Components Remaining: {selectedPO.componentsRemaining}</div>
                        <div>Supplier: {selectedPO.supplier}</div>
                      </div>
                      <button 
                        onClick={() => setShowForm(true)}
                        className="fiori-button-primary"
                      >
                        Continue to Post Goods Issue
                      </button>
                    </div>
                  ) : draggedPO ? (
                    <div className="text-center">
                      <div className="text-green-600 mb-2">
                        <ArrowDown className="w-12 h-12 mx-auto animate-bounce" />
                      </div>
                      <p className="text-lg font-semibold text-gray-900">Drop here to select</p>
                      <p className="text-gray-600">{draggedPO.id} - {draggedPO.material}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-gray-400 mb-2">
                        <Move className="w-12 h-12 mx-auto" />
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

      {/* Posted Goods Issues */}
      <div className="fiori-card">
        <div className="fiori-card-header">
          <h3 className="text-lg font-semibold text-gray-900">Posted Goods Issues</h3>
        </div>
        <div className="fiori-card-content p-0">
          <div className="overflow-x-auto">
            <table className="fiori-table">
              <thead className="fiori-table-header">
                <tr>
                  <th className="fiori-table-header-cell">Goods Issue ID</th>
                  <th className="fiori-table-header-cell">PO Number</th>
                  <th className="fiori-table-header-cell">Supplier</th>
                  <th className="fiori-table-header-cell">Material</th>
                  <th className="fiori-table-header-cell">Quantity Issued</th>
                  <th className="fiori-table-header-cell">Issue Date</th>
                  <th className="fiori-table-header-cell">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {goodsIssues.map((gi) => (
                  <tr key={gi.id} className="hover:bg-gray-50">
                    <td className="fiori-table-cell font-medium text-[#0070f3]">{gi.id}</td>
                    <td className="fiori-table-cell">{gi.poId}</td>
                    <td className="fiori-table-cell">{gi.supplier}</td>
                    <td className="fiori-table-cell">{gi.material}</td>
                    <td className="fiori-table-cell">{gi.quantityIssued.toLocaleString()}</td>
                    <td className="fiori-table-cell">{gi.issueDate}</td>
                    <td className="fiori-table-cell">{getStatusBadge(gi.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Goods Issue Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowForm(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Post Goods Issue</h3>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Quantity</label>
                      <input 
                        type="number" 
                        className="fiori-input" 
                        placeholder="Total qty" 
                        value={selectedPO?.totalQuantity || ''}
                        readOnly 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Components Remaining</label>
                      <input 
                        type="number" 
                        className="fiori-input" 
                        placeholder="Remaining" 
                        value={selectedPO?.componentsRemaining || ''}
                        readOnly 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity to Issue</label>
                      <input type="number" className="fiori-input" placeholder="Enter quantity to issue" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                      <input type="date" className="fiori-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <input type="text" className="fiori-input" placeholder="Any notes" />
                    </div>
                  </div>

                  {/* Components breakdown */}
                  {selectedPO && (
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Components Breakdown:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedPO.components.map((comp) => (
                          <div key={comp.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-600">{comp.name}</span>
                            <span className="text-sm font-medium text-gray-900">
                              {comp.issued}/{comp.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
                  Post Goods Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StockMovement 
import React, { useState } from 'react'
import { 
  Plus, 
  PackageCheck, 
  Package, 
  CheckCircle, 
  X,
  Edit,
  Clock,
  Search
} from 'lucide-react'

const PurchaseOrder = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data for Open Purchase Orders
  const purchaseOrderData = [
    {
      poNumber: '4500000001',
      lineItem: '001',
      material: 'COMP-001',
      description: 'Component A-1 for Assembly',
      plant: 'PLANT-A',
      storageLocation: 'SL-001',
      poQuantity: 100,
      uom: 'PCS',
      deliveryDate: '2024-03-15',
      netPrice: 25.50,
      currency: 'USD',
      deliveredQuantity: 60,
      invoicedQuantity: 50,
      openQuantity: 40,
      supplier: 'ABC Manufacturing'
    },
    {
      poNumber: '4500000001',
      lineItem: '002',
      material: 'COMP-002',
      description: 'Component A-2 for Assembly',
      plant: 'PLANT-A',
      storageLocation: 'SL-002',
      poQuantity: 75,
      uom: 'PCS',
      deliveryDate: '2024-03-20',
      netPrice: 18.75,
      currency: 'USD',
      deliveredQuantity: 45,
      invoicedQuantity: 40,
      openQuantity: 30,
      supplier: 'ABC Manufacturing'
    },
    {
      poNumber: '4500000002',
      lineItem: '001',
      material: 'COMP-003',
      description: 'Component B-1 for Secondary Assembly',
      plant: 'PLANT-B',
      storageLocation: 'SL-003',
      poQuantity: 80,
      uom: 'PCS',
      deliveryDate: '2024-03-25',
      netPrice: 32.00,
      currency: 'USD',
      deliveredQuantity: 0,
      invoicedQuantity: 0,
      openQuantity: 80,
      supplier: 'XYZ Industries'
    },
    {
      poNumber: '4500000003',
      lineItem: '001',
      material: 'COMP-004',
      description: 'Component B-2 for Secondary Assembly',
      plant: 'PLANT-B',
      storageLocation: 'SL-004',
      poQuantity: 120,
      uom: 'PCS',
      deliveryDate: '2024-04-01',
      netPrice: 28.50,
      currency: 'USD',
      deliveredQuantity: 0,
      invoicedQuantity: 0,
      openQuantity: 120,
      supplier: 'XYZ Industries'
    }
  ]

  const [purchaseOrders, setPurchaseOrders] = useState(purchaseOrderData)
  const [showPostGRModal, setShowPostGRModal] = useState(false)
  const [selectedPOItem, setSelectedPOItem] = useState(null)
  const [postGRForm, setPostGRForm] = useState({
    quantity: '',
    notes: '',
    receiptDate: new Date().toISOString().split('T')[0]
  })

  // New state for Component Consumption modal
  const [showComponentConsumptionModal, setShowComponentConsumptionModal] = useState(false)
  const [consumptionForm, setConsumptionForm] = useState({
    quantity: '',
    notes: '',
    consumptionDate: new Date().toISOString().split('T')[0]
  })

  // Action handlers for Purchase Orders
  const handleBookComponentConsumption = (poItem) => {
    setSelectedPOItem(poItem)
    setShowComponentConsumptionModal(true)
  }

  const handlePostGR = (poItem) => {
    setSelectedPOItem(poItem)
    setShowPostGRModal(true)
  }

  const handleClosePOItem = (poItem) => {
    // Remove the PO item from the open list
    setPurchaseOrders(prev => prev.filter(item => 
      !(item.poNumber === poItem.poNumber && item.lineItem === poItem.lineItem)
    ))
  }

  const handleCreatePO = () => {
    console.log('Create new PO')
    // TODO: Implement PO creation
  }

  const handleEditPO = (poItem) => {
    console.log('Edit PO:', poItem)
    // TODO: Implement PO editing
  }

  const handleViewHistory = (poItem) => {
    console.log('View History:', poItem)
    // TODO: Implement history view
  }

  const handlePostConsumption = () => {
    console.log('Post Consumption')
    // TODO: Implement consumption posting
  }

  // Filter purchase orders based on search term
  const filteredPurchaseOrders = purchaseOrders.filter(poItem => {
    const searchLower = searchTerm.toLowerCase()
    return (
      poItem.poNumber.toLowerCase().includes(searchLower) ||
      poItem.material.toLowerCase().includes(searchLower) ||
      poItem.description.toLowerCase().includes(searchLower) ||
      poItem.supplier.toLowerCase().includes(searchLower) ||
      poItem.plant.toLowerCase().includes(searchLower) ||
      poItem.storageLocation.toLowerCase().includes(searchLower)
    )
  })

  // New handlers for modals
  const handlePostGRSubmit = (e) => {
    e.preventDefault()
    
    if (!selectedPOItem || !postGRForm.quantity) return

    const quantity = parseInt(postGRForm.quantity)
    
    // Update the PO delivered quantity
    setPurchaseOrders(prev => prev.map(item => {
      if (item.poNumber === selectedPOItem.poNumber && item.lineItem === selectedPOItem.lineItem) {
        const newDeliveredQuantity = item.deliveredQuantity + quantity
        const newOpenQuantity = Math.max(0, item.poQuantity - newDeliveredQuantity)
        return {
          ...item,
          deliveredQuantity: newDeliveredQuantity,
          openQuantity: newOpenQuantity
        }
      }
      return item
    }))

    // Reset form and close modal
    setPostGRForm({
      quantity: '',
      notes: '',
      receiptDate: new Date().toISOString().split('T')[0]
    })
    setShowPostGRModal(false)
    setSelectedPOItem(null)
  }

  const handleComponentConsumptionSubmit = (e) => {
    e.preventDefault()
    
    if (!selectedPOItem || !consumptionForm.quantity) return

    const quantity = parseInt(consumptionForm.quantity)
    
    // TODO: Implement SAP movement 543 for subcontracting
    console.log('Posting SAP movement 543 for component consumption:', {
      poItem: selectedPOItem,
      quantity: quantity,
      date: consumptionForm.consumptionDate,
      notes: consumptionForm.notes
    })

    // Reset form and close modal
    setConsumptionForm({
      quantity: '',
      notes: '',
      consumptionDate: new Date().toISOString().split('T')[0]
    })
    setShowComponentConsumptionModal(false)
    setSelectedPOItem(null)
  }

  const closePostGRModal = () => {
    setShowPostGRModal(false)
    setSelectedPOItem(null)
    setPostGRForm({
      quantity: '',
      notes: '',
      receiptDate: new Date().toISOString().split('T')[0]
    })
  }

  const closeComponentConsumptionModal = () => {
    setShowComponentConsumptionModal(false)
    setSelectedPOItem(null)
    setConsumptionForm({
      quantity: '',
      notes: '',
      consumptionDate: new Date().toISOString().split('T')[0]
    })
  }

  // PO grouping and collapse functionality
  const getGroupedPOs = () => {
    const grouped = {}
    filteredPurchaseOrders.forEach(item => {
      if (!grouped[item.poNumber]) {
        grouped[item.poNumber] = []
      }
      grouped[item.poNumber].push(item)
    })
    return grouped
  }

  return (
    <div className="space-y-6">
      {/* Open Purchase Orders Section */}
      <div className="fiori-card">
        <div className="fiori-card-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-gray-900">Open Purchase Orders</h3>
              <span className="text-sm text-gray-500">({filteredPurchaseOrders.length} items)</span>
            </div>
            
            {/* Search Section - Moved to header */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search POs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0070f3] focus:border-transparent text-sm"
                />
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCreatePO}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white bg-[#0070f3] rounded-md hover:bg-[#0057d2] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create PO</span>
              </button>
              <button
                onClick={handlePostConsumption}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
              >
                <Package className="w-4 h-4" />
                <span>Post Consumption</span>
              </button>
              <button
                onClick={() => setShowPostGRModal(true)}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
              >
                <PackageCheck className="w-4 h-4" />
                <span>Post Goods Receipt</span>
              </button>
            </div>
          </div>
        </div>

        <div className="fiori-card-content">
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full border-collapse">
              <colgroup>
                <col className="w-32" /> {/* Purchase Order */}
                <col className="w-20" /> {/* Line Item */}
                <col className="w-28" /> {/* Material */}
                <col className="w-48" /> {/* Description */}
                <col className="w-24" /> {/* Plant */}
                <col className="w-28" /> {/* Storage Location */}
                <col className="w-24" /> {/* PO Quantity */}
                <col className="w-16" /> {/* UoM */}
                <col className="w-28" /> {/* Delivery Date */}
                <col className="w-24" /> {/* Net Price */}
                <col className="w-20" /> {/* Currency */}
                <col className="w-24" /> {/* Delivered Qty */}
                <col className="w-16" /> {/* UoM */}
                <col className="w-24" /> {/* Invoiced Qty */}
                <col className="w-16" /> {/* UoM */}
                <col className="w-24" /> {/* Open Qty */}
                <col className="w-16" /> {/* UoM */}
                <col className="w-24" /> {/* Actions */}
              </colgroup>
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr className="border-b-2 border-gray-400 border-t-2 border-gray-400">
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">Purchase Order</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">Line Item</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">Material</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">Description</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">Plant</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">Storage Location</th>
                  <th className="py-3 px-4 text-center text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">PO Quantity</th>
                  <th className="py-3 px-4 text-center text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">UoM</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">Delivery Date</th>
                  <th className="py-3 px-4 text-right text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">Net Price</th>
                  <th className="py-3 px-4 text-center text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">Currency</th>
                  <th className="py-3 px-4 text-center text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">Delivered Qty</th>
                  <th className="py-3 px-4 text-center text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">UoM</th>
                  <th className="py-3 px-4 text-center text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">Invoiced Qty</th>
                  <th className="py-3 px-4 text-center text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">UoM</th>
                  <th className="py-3 px-4 text-center text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">Open Qty</th>
                  <th className="py-3 px-4 text-center text-sm font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200">UoM</th>
                  <th className="py-3 px-4 text-center text-sm font-bold text-gray-900 bg-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(getGroupedPOs()).flatMap(([poNumber, poItems]) => 
                  poItems.map((poItem, index) => (
                    <tr key={`${poItem.poNumber}-${poItem.lineItem}-${index}`} className="bg-white hover:bg-blue-50 transition-colors border-b border-gray-200">
                      <td className="py-3 px-4 border-r border-gray-200">
                        <span className="text-sm font-medium text-gray-900">{poItem.poNumber}</span>
                      </td>
                      <td className="py-3 px-4 border-r border-gray-200">
                        <span className="text-sm text-gray-600">{poItem.lineItem}</span>
                      </td>
                      <td className="py-3 px-4 border-r border-gray-200">
                        <span className="text-sm font-medium text-gray-900">{poItem.material}</span>
                      </td>
                      <td className="py-3 px-4 border-r border-gray-200">
                        <span className="text-sm text-gray-600">{poItem.description}</span>
                      </td>
                      <td className="py-3 px-4 border-r border-gray-200">
                        <span className="text-sm text-gray-600">{poItem.plant}</span>
                      </td>
                      <td className="py-3 px-4 border-r border-gray-200">
                        <span className="text-sm text-gray-600">{poItem.storageLocation}</span>
                      </td>
                      <td className="py-3 px-4 text-center border-r border-gray-200">
                        <span className="text-sm text-gray-900">{poItem.poQuantity}</span>
                      </td>
                      <td className="py-3 px-4 text-center border-r border-gray-200">
                        <span className="text-xs text-gray-500">{poItem.uom}</span>
                      </td>
                      <td className="py-3 px-4 border-r border-gray-200">
                        <span className="text-sm text-gray-600">{poItem.deliveryDate}</span>
                      </td>
                      <td className="py-3 px-4 text-right border-r border-gray-200">
                        <span className="text-sm text-gray-900">{poItem.netPrice.toFixed(2)}</span>
                      </td>
                      <td className="py-3 px-4 text-center border-r border-gray-200">
                        <span className="text-xs text-gray-500">{poItem.currency}</span>
                      </td>
                      <td className="py-3 px-4 text-center border-r border-gray-200">
                        <span className="text-sm text-gray-900">{poItem.deliveredQuantity}</span>
                      </td>
                      <td className="py-3 px-4 text-center border-r border-gray-200">
                        <span className="text-xs text-gray-500">{poItem.uom}</span>
                      </td>
                      <td className="py-3 px-4 text-center border-r border-gray-200">
                        <span className="text-sm text-gray-900">{poItem.invoicedQuantity}</span>
                      </td>
                      <td className="py-3 px-4 text-center border-r border-gray-200">
                        <span className="text-xs text-gray-500">{poItem.uom}</span>
                      </td>
                      <td className="py-3 px-4 text-center border-r border-gray-200">
                        <span className={`text-sm font-medium ${
                          poItem.openQuantity > 0 ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {poItem.openQuantity}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center border-r border-gray-200">
                        <span className="text-xs text-gray-500">{poItem.uom}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditPO(poItem)}
                            className="p-1 text-[#d69e00] hover:text-[#b8860b] hover:bg-[#fff4ce] rounded transition-colors"
                            title="Edit PO"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleViewHistory(poItem)}
                            className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
                            title="View History"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleClosePOItem(poItem)}
                            className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
                            title="Close PO Item"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Post Goods Receipt Modal */}
      {showPostGRModal && selectedPOItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl border-4 border-green-500">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-green-50">
              <h3 className="text-lg font-semibold text-gray-900">Post Goods Receipt</h3>
                  <button
                onClick={closePostGRModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                <X className="w-5 h-5" />
                  </button>
                </div>
                
            {/* Modal Content */}
            <div className="p-4">
              <form onSubmit={handlePostGRSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Material (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material
                    </label>
                    <input
                      type="text"
                      value={selectedPOItem.material}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  {/* Description (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={selectedPOItem.description}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  {/* Supplier (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supplier
                    </label>
                    <input
                      type="text"
                      value={selectedPOItem.supplier}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  {/* Quantity to Receive */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity to Receive *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={postGRForm.quantity}
                      onChange={(e) => setPostGRForm(prev => ({ ...prev, quantity: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0070f3] focus:border-transparent"
                      placeholder="Enter quantity to receive"
                    />
                    </div>

                  {/* Receipt Date */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Receipt Date
                    </label>
                    <input
                      type="date"
                      value={postGRForm.receiptDate}
                      onChange={(e) => setPostGRForm(prev => ({ ...prev, receiptDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0070f3] focus:border-transparent"
                    />
                  </div>
                    </div>

                {/* Notes - Full Width */}
                    <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    rows={2}
                    value={postGRForm.notes}
                    onChange={(e) => setPostGRForm(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0070f3] focus:border-transparent"
                    placeholder="Enter any notes about this goods receipt..."
                  />
                </div>
              </form>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={closePostGRModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070f3]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!postGRForm.quantity}
                onClick={handlePostGRSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-[#0070f3] border border-transparent rounded-md hover:bg-[#0057d2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070f3] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Goods Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Component Consumption Modal */}
      {showComponentConsumptionModal && selectedPOItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl border-4 border-purple-500">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-purple-50">
              <h3 className="text-lg font-semibold text-gray-900">Book Component Consumption</h3>
              <button
                onClick={closeComponentConsumptionModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
                    </div>

            {/* Modal Content */}
            <div className="p-4">
              <form onSubmit={handleComponentConsumptionSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Material (Read-only) */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material
                    </label>
                    <input
                      type="text"
                      value={selectedPOItem.material}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                    </div>

                  {/* Description (Read-only) */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={selectedPOItem.description}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                    </div>

                  {/* Supplier (Read-only) */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supplier
                    </label>
                    <input
                      type="text"
                      value={selectedPOItem.supplier}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                    </div>

                  {/* Quantity to Consume */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity to Consume *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={consumptionForm.quantity}
                      onChange={(e) => setConsumptionForm(prev => ({ ...prev, quantity: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0070f3] focus:border-transparent"
                      placeholder="Enter quantity to consume"
                    />
                  </div>
                  
                  {/* Consumption Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consumption Date
                    </label>
                    <input
                      type="date"
                      value={consumptionForm.consumptionDate}
                      onChange={(e) => setConsumptionForm(prev => ({ ...prev, consumptionDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0070f3] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Notes - Full Width */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    rows={2}
                    value={consumptionForm.notes}
                    onChange={(e) => setConsumptionForm(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0070f3] focus:border-transparent"
                    placeholder="Enter any notes about this component consumption..."
                  />
                  </div>
                </form>
              </div>
              
            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200 bg-gray-50">
                <button
                type="button"
                onClick={closeComponentConsumptionModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070f3]"
                >
                  Cancel
                </button>
              <button
                type="submit"
                disabled={!consumptionForm.quantity}
                onClick={handleComponentConsumptionSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-[#0070f3] border border-transparent rounded-md hover:bg-[#0057d2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070f3] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book Component Consumption
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PurchaseOrder 
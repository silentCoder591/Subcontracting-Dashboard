import React, { useState } from 'react'
import { Package, Move, Building, Factory, MapPin, ArrowRight, ChevronDown, ChevronRight, X, Plus, FileText, CheckCircle, PackageCheck } from 'lucide-react'

const Home = () => {
  // Mock data for stock overview with parent-child relationships
  const stockData = [
    {
      id: 'MAT-001',
      material: 'Assembly A',
      description: 'Main Assembly Component',
      unrestrictedStock: 50,
      uom: 'PCS',
      stockIssuedToSubcontractor: 20,
      isParent: true,
      supplier: 'ABC Manufacturing',
      children: [
        {
          id: 'COMP-001',
          material: 'Component A-1',
          description: 'Sub-component A-1',
          unrestrictedStock: 100,
          uom: 'PCS',
          stockIssuedToSubcontractor: 40,
          isParent: false,
          parentId: 'MAT-001',
          supplier: 'ABC Manufacturing'
        },
        {
          id: 'COMP-002',
          material: 'Component A-2',
          description: 'Sub-component A-2',
          unrestrictedStock: 75,
          uom: 'PCS',
          stockIssuedToSubcontractor: 30,
          isParent: false,
          parentId: 'MAT-001',
          supplier: 'ABC Manufacturing'
        }
      ]
    },
    {
      id: 'MAT-002',
      material: 'Assembly B',
      description: 'Secondary Assembly Component',
      unrestrictedStock: 30,
      uom: 'PCS',
      stockIssuedToSubcontractor: 15,
      isParent: true,
      supplier: 'XYZ Industries',
      children: [
        {
          id: 'COMP-003',
          material: 'Component B-1',
          description: 'Sub-component B-1',
          unrestrictedStock: 60,
          uom: 'PCS',
          stockIssuedToSubcontractor: 25,
          isParent: false,
          parentId: 'MAT-002',
          supplier: 'XYZ Industries'
        },
        {
          id: 'COMP-004',
          material: 'Component B-2',
          description: 'Sub-component B-2',
          unrestrictedStock: 45,
          uom: 'PCS',
          stockIssuedToSubcontractor: 20,
          isParent: false,
          parentId: 'MAT-002',
          supplier: 'XYZ Industries'
        }
      ]
    }
  ]

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
      openQuantity: 120,
      supplier: 'XYZ Industries'
    }
  ]

  const [stockItems, setStockItems] = useState(stockData)
  const [purchaseOrders, setPurchaseOrders] = useState(purchaseOrderData)
  const [draggedItem, setDraggedItem] = useState(null)
  const [collapsedSections, setCollapsedSections] = useState({
    stockOverview: false,
    openPurchaseOrders: false
  })
  const [showGoodsIssueModal, setShowGoodsIssueModal] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [goodsIssueForm, setGoodsIssueForm] = useState({
    quantity: '',
    notes: '',
    issueDate: new Date().toISOString().split('T')[0]
  })

  // New state for Post GR modal
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

  // State for PO grouping and collapsed POs
  const [collapsedPOs, setCollapsedPOs] = useState({})

  const toggleSection = (sectionName) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }))
  }

  const handleDragStart = (e, item) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetItem) => {
    e.preventDefault()
    
    if (!draggedItem || draggedItem.isParent) return

    // Show the goods issue modal instead of automatic transfer
    setSelectedComponent(draggedItem)
    setShowGoodsIssueModal(true)
    setDraggedItem(null)
  }

  const handleGoodsIssueSubmit = (e) => {
    e.preventDefault()
    
    if (!selectedComponent || !goodsIssueForm.quantity) return

    const quantity = parseInt(goodsIssueForm.quantity)
    
    // Update the stock quantities
    setStockItems(prevItems => {
      return prevItems.map(assembly => {
        if (assembly.id === selectedComponent.parentId) {
          return {
            ...assembly,
            children: assembly.children.map(child => {
              if (child.id === selectedComponent.id) {
                // Move specified quantity from unrestricted to issued
                const newUnrestricted = Math.max(0, child.unrestrictedStock - quantity)
                const newIssued = child.stockIssuedToSubcontractor + quantity
                return {
                  ...child,
                  unrestrictedStock: newUnrestricted,
                  stockIssuedToSubcontractor: newIssued
                }
              }
              return child
            })
          }
        }
        return assembly
      })
    })

    // Reset form and close modal
    setGoodsIssueForm({
      quantity: '',
      notes: '',
      issueDate: new Date().toISOString().split('T')[0]
    })
    setShowGoodsIssueModal(false)
    setSelectedComponent(null)
  }

  const closeModal = () => {
    setShowGoodsIssueModal(false)
    setSelectedComponent(null)
    setGoodsIssueForm({
      quantity: '',
      notes: '',
      issueDate: new Date().toISOString().split('T')[0]
    })
  }

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
  const togglePO = (poNumber) => {
    setCollapsedPOs(prev => ({
      ...prev,
      [poNumber]: !prev[poNumber]
    }))
  }

  const getGroupedPOs = () => {
    const grouped = {}
    purchaseOrders.forEach(item => {
      if (!grouped[item.poNumber]) {
        grouped[item.poNumber] = []
      }
      grouped[item.poNumber].push(item)
    })
    return grouped
  }

  const renderStockRow = (item, isChild = false) => {
    const rowClass = isChild 
      ? 'bg-gray-50 border-l-4 border-[#0070f3]' 
      : 'bg-white font-medium'
    
    const indentClass = isChild ? 'pl-8' : 'pl-4'

    return (
      <tr key={item.id} className={`${rowClass} hover:bg-gray-100 transition-colors`}>
        <td className={`py-3 ${indentClass}`}>
          <div className="flex items-center space-x-2">
            {isChild && <ArrowRight className="w-4 h-4 text-[#0070f3]" />}
            <span className={isChild ? 'text-sm' : 'font-semibold'}>
              {item.material}
            </span>
          </div>
        </td>
        <td className="py-3 px-4">
          <span className={isChild ? 'text-sm text-gray-600' : 'text-gray-900'}>
            {item.description}
          </span>
        </td>
        <td className="py-3 px-4 text-center">
          <div 
            className={`inline-block px-3 py-1 rounded-lg ${
              isChild 
                ? 'bg-blue-100 text-blue-800 cursor-move hover:bg-blue-200' 
                : 'bg-gray-100 text-gray-800'
            }`}
            draggable={isChild}
            onDragStart={isChild ? (e) => handleDragStart(e, item) : undefined}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, item)}
          >
            {item.unrestrictedStock} {item.uom}
          </div>
        </td>
        <td className="py-3 px-4 text-center">
          <span className="text-sm text-gray-600">{item.uom}</span>
        </td>
        <td className="py-3 px-4 text-center">
          <div 
            className={`inline-block px-3 py-1 rounded-lg ${
              isChild 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, item)}
          >
            {item.stockIssuedToSubcontractor} {item.uom}
          </div>
        </td>
        <td className="py-3 px-4 text-center">
          <span className="text-sm text-gray-600">{item.uom}</span>
        </td>
      </tr>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stock Overview Section */}
      <div className="fiori-card">
        <div 
          className="fiori-card-header cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => toggleSection('stockOverview')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {collapsedSections.stockOverview ? (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
              <h3 className="text-lg font-semibold text-gray-900">Stock Overview</h3>
            </div>
            <div className="text-sm text-gray-500">
              {collapsedSections.stockOverview ? 'Click to expand' : 'Click to collapse'}
            </div>
          </div>
        </div>
        
        {!collapsedSections.stockOverview && (
          <div className="fiori-card-content">
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-gray-50 z-10">
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Material</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Description</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Unrestricted Stock</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">UoM</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Stock Issued to Subcontractor</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">UoM</th>
                  </tr>
                </thead>
                <tbody>
                  {stockItems.map(assembly => (
                    <React.Fragment key={assembly.id}>
                      {renderStockRow(assembly)}
                      {assembly.children.map(child => renderStockRow(child, true))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Open Purchase Orders Section */}
      <div className="fiori-card">
        <div 
          className="fiori-card-header cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => toggleSection('openPurchaseOrders')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {collapsedSections.openPurchaseOrders ? (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
              <h3 className="text-lg font-semibold text-gray-900">Open Purchase Orders</h3>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCreatePO}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white bg-[#0070f3] rounded-md hover:bg-[#0057d2] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create PO</span>
              </button>
              <div className="text-sm text-gray-500">
                {collapsedSections.openPurchaseOrders ? 'Click to expand' : 'Click to collapse'}
              </div>
            </div>
          </div>
        </div>
        
        {!collapsedSections.openPurchaseOrders && (
          <div className="fiori-card-content">
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-gray-50 z-10">
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Purchase Order</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Line Item</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Material</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Description</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Plant</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Storage Location</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">PO Quantity</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">UoM</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Delivery Date</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">Net Price</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Currency</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Delivered Qty</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">UoM</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Open Qty</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">UoM</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(getGroupedPOs()).map(([poNumber, poItems]) => (
                    <React.Fragment key={poNumber}>
                      {/* PO Header Row - Parent */}
                      <tr className="bg-white font-medium hover:bg-gray-100 transition-colors">
                        <td className="py-3 pl-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => togglePO(poNumber)}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                              title={collapsedPOs[poNumber] ? 'Expand PO Items' : 'Collapse PO Items'}
                            >
                              {collapsedPOs[poNumber] ? (
                                <ChevronRight className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                            <span className="font-semibold text-gray-900">{poNumber}</span>
                            <span className="text-xs text-gray-500">
                              ({poItems.length} item{poItems.length > 1 ? 's' : ''})
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-600">-</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-900">PO Header</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-600">Purchase Order {poNumber}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-600">-</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-600">-</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-gray-900">-</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-gray-500">-</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-600">-</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-gray-900">-</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-gray-500">-</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-gray-900">-</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-gray-500">-</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-gray-900">-</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-gray-500">-</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-600">-</span>
                        </td>
                      </tr>
                      
                      {/* PO Line Items - Children */}
                      {!collapsedPOs[poNumber] && poItems.map((poItem, index) => (
                        <tr key={`${poItem.poNumber}-${poItem.lineItem}-${index}`} className="bg-gray-50 border-l-4 border-[#0070f3] hover:bg-gray-100 transition-colors">
                          <td className="py-3 pl-8">
                            <div className="flex items-center space-x-2">
                              <ArrowRight className="w-4 h-4 text-[#0070f3]" />
                              <span className="text-sm font-medium text-[#0070f3]">{poItem.poNumber}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-gray-600">{poItem.lineItem}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm font-medium text-gray-900">{poItem.material}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-gray-600">{poItem.description}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-gray-600">{poItem.plant}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-gray-600">{poItem.storageLocation}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm text-gray-900">{poItem.poQuantity}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-xs text-gray-500">{poItem.uom}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-gray-600">{poItem.deliveryDate}</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="text-sm text-gray-900">{poItem.netPrice.toFixed(2)}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-xs text-gray-500">{poItem.currency}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm text-gray-900">{poItem.deliveredQuantity}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-xs text-gray-500">{poItem.uom}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`text-sm font-medium ${
                              poItem.openQuantity > 0 ? 'text-orange-600' : 'text-green-600'
                            }`}>
                              {poItem.openQuantity}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-xs text-gray-500">{poItem.uom}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleBookComponentConsumption(poItem)}
                                className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                title="Book Component Consumption"
                              >
                                <Package className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handlePostGR(poItem)}
                                className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                                title="Post Goods Receipt"
                              >
                                <PackageCheck className="w-4 h-4" />
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
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Goods Issue Modal */}
      {showGoodsIssueModal && selectedComponent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl border-4 border-blue-500">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-50">
              <h3 className="text-lg font-semibold text-gray-900">Post Goods Issue</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <form onSubmit={handleGoodsIssueSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Material (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material
                    </label>
                    <input
                      type="text"
                      value={selectedComponent.material}
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
                      value={selectedComponent.description}
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
                      value={selectedComponent.supplier}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  {/* Available Stock (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Stock
                    </label>
                    <input
                      type="text"
                      value={`${selectedComponent.unrestrictedStock} ${selectedComponent.uom}`}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  {/* Quantity to Issue */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity to Issue *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={selectedComponent.unrestrictedStock}
                      value={goodsIssueForm.quantity}
                      onChange={(e) => setGoodsIssueForm(prev => ({ ...prev, quantity: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0070f3] focus:border-transparent"
                      placeholder={`Enter quantity (max: ${selectedComponent.unrestrictedStock})`}
                    />
                  </div>

                  {/* Issue Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issue Date
                    </label>
                    <input
                      type="date"
                      value={goodsIssueForm.issueDate}
                      onChange={(e) => setGoodsIssueForm(prev => ({ ...prev, issueDate: e.target.value }))}
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
                    value={goodsIssueForm.notes}
                    onChange={(e) => setGoodsIssueForm(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0070f3] focus:border-transparent"
                    placeholder="Enter any notes about this goods issue..."
                  />
                </div>
              </form>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070f3]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!goodsIssueForm.quantity}
                onClick={handleGoodsIssueSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-[#0070f3] border border-transparent rounded-md hover:bg-[#0057d2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070f3] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Goods Issue
              </button>
            </div>
          </div>
        </div>
      )}

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

export default Home

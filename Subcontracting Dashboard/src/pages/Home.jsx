import React, { useState } from 'react'
import { Package, Move, Building, Factory, MapPin, ArrowRight, X } from 'lucide-react'

const Home = () => {
  // Mock data for stock overview with parent-child relationships
  const stockData = [
    {
      id: 'MAT-001',
      material: 'Assembly A',
      description: 'Main Assembly Component',
      storageLocation: '',
      unrestrictedStock: 50,
      uom: '',
      stockIssuedToSubcontractor: "-",
      isParent: true,
      supplier: 'ABC Manufacturing',
      children: [
        {
          id: 'COMP-001',
          material: 'Component A-1',
          description: 'Sub-component A-1',
          storageLocation: '2001',
          unrestrictedStock: 100,
          uom: 'PCS',
          stockIssuedToSubcontractor: 40,
          isParent: false,
          parentId: 'MAT-001',
          supplier: 'ABC Manufacturing'
        },
        {
          id: 'COMP-001-2',
          material: 'Component A-1',
          description: 'Sub-component A-1',
          storageLocation: '2002',
          unrestrictedStock: 80,
          uom: 'PCS',
          stockIssuedToSubcontractor: 25,
          isParent: false,
          parentId: 'MAT-001',
          supplier: 'ABC Manufacturing'
        },
        {
          id: 'COMP-002',
          material: 'Component A-2',
          description: 'Sub-component A-2',
          storageLocation: '2002',
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
      storageLocation: '',
      unrestrictedStock: 30,
      uom: '',
      stockIssuedToSubcontractor: "-",
      isParent: true,
      supplier: 'XYZ Industries',
      children: [
        {
          id: 'COMP-003',
          material: 'Component B-1',
          description: 'Sub-component B-1',
          storageLocation: '2001',
          unrestrictedStock: 60,
          uom: 'PCS',
          stockIssuedToSubcontractor: 25,
          isParent: false,
          parentId: 'MAT-002',
          supplier: 'XYZ Industries'
        },
        {
          id: 'COMP-003-2',
          material: 'Component B-1',
          description: 'Sub-component B-1',
          storageLocation: '2002',
          unrestrictedStock: 50,
          uom: 'PCS',
          stockIssuedToSubcontractor: 15,
          isParent: false,
          parentId: 'MAT-002',
          supplier: 'XYZ Industries'
        },
        {
          id: 'COMP-004',
          material: 'Component B-2',
          description: 'Sub-component B-2',
          storageLocation: '2002',
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


  const [stockItems, setStockItems] = useState(stockData)
  const [draggedItem, setDraggedItem] = useState(null)
  const [showGoodsIssueModal, setShowGoodsIssueModal] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [goodsIssueForm, setGoodsIssueForm] = useState({
    quantity: '',
    notes: '',
    issueDate: new Date().toISOString().split('T')[0]
  })



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



  // Helper function to get merged stock data for a component
  const getMergedStockData = (componentMaterial, parentId) => {
    const parent = stockItems.find(item => item.id === parentId)
    if (!parent) return { totalIssued: 0, uom: '' }
    
    const components = parent.children.filter(child => child.material === componentMaterial)
    const totalIssued = components.reduce((sum, comp) => {
      const issued = typeof comp.stockIssuedToSubcontractor === 'number' ? comp.stockIssuedToSubcontractor : 0
      return sum + issued
    }, 0)
    
    return {
      totalIssued,
      uom: components[0]?.uom || '',
      components
    }
  }

  // Helper function to check if this is the first occurrence of a component material
  const isFirstOccurrence = (item, allItems) => {
    const parent = stockItems.find(parent => parent.id === item.parentId)
    if (!parent) return true
    
    const sameMaterialItems = parent.children.filter(child => child.material === item.material)
    return sameMaterialItems[0]?.id === item.id
  }

  // Helper function to get the count of same material items for rowspan
  const getSameMaterialCount = (item) => {
    const parent = stockItems.find(parent => parent.id === item.parentId)
    if (!parent) return 1
    
    const sameMaterialItems = parent.children.filter(child => child.material === item.material)
    return sameMaterialItems.length
  }

  const renderStockRow = (item, isChild = false) => {
    const rowClass = isChild 
      ? 'bg-gray-50 border-l-4 border-[#0070f3]' 
      : 'bg-white font-medium'
    
    const indentClass = isChild ? 'pl-8' : 'pl-4'
    
    // Get merged stock data for components
    const mergedData = isChild ? getMergedStockData(item.material, item.parentId) : null
    const isFirstOccurrenceOfComponent = isChild ? isFirstOccurrence(item, stockItems) : true

    return (
      <tr key={item.id} className={`${rowClass} hover:bg-blue-50 transition-colors border-b border-gray-200`}>
        <td className={`py-1 ${indentClass} border-r border-gray-200`}>
          <div className="flex items-center space-x-1">
            {isChild && <ArrowRight className="w-3 h-3 text-[#0070f3]" />}
            <span className={`text-sm ${isChild ? '' : 'font-semibold'} truncate`} title={item.material}>
              {item.material}
            </span>
          </div>
        </td>
        <td className="py-1 px-2 border-r border-gray-200">
          <span className={`text-sm ${isChild ? 'text-gray-600' : 'text-gray-900'} truncate block`} title={item.description}>
            {item.description}
          </span>
        </td>
        <td className="py-1 px-2 text-center border-r border-gray-200">
          <span className={`text-sm ${isChild ? 'text-gray-600' : 'text-gray-900'} truncate block`} title={item.storageLocation}>
            {item.storageLocation}
          </span>
        </td>
        <td className="py-1 px-2 text-center border-r border-gray-200">
          <div 
            className={`inline-block px-2 py-0.5 rounded text-xs ${
              isChild 
                ? 'bg-blue-100 text-blue-800 cursor-move hover:bg-blue-200' 
                : 'bg-gray-100 text-gray-800'
            }`}
            draggable={isChild}
            onDragStart={isChild ? (e) => handleDragStart(e, item) : undefined}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, item)}
            title={`${item.unrestrictedStock} ${item.uom}`}
          >
            {item.unrestrictedStock} {item.uom}
          </div>
        </td>
        <td className="py-1 px-2 text-center border-r border-gray-200">
          <span className="text-sm text-gray-600 truncate block" title={item.uom}>{item.uom}</span>
        </td>
        {isChild && isFirstOccurrenceOfComponent ? (
          <td 
            className="py-1 px-2 text-center border-r border-gray-200 align-middle"
            rowSpan={getSameMaterialCount(item)}
          >
            <div 
              className="inline-block px-2 py-0.5 rounded text-xs bg-green-100 text-green-800 font-medium"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item)}
              title={`Total: ${mergedData.totalIssued} ${mergedData.uom} (from ${mergedData.components.length} storage location${mergedData.components.length > 1 ? 's' : ''})`}
            >
              {mergedData.totalIssued} {mergedData.uom}
            </div>
          </td>
        ) : !isChild ? (
          <td className="py-1 px-2 text-center border-r border-gray-200">
            <div 
              className="inline-block px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item)}
              title={`${item.stockIssuedToSubcontractor} ${item.uom}`}
            >
              {item.stockIssuedToSubcontractor} {item.uom}
            </div>
          </td>
        ) : null}
        {isChild && isFirstOccurrenceOfComponent ? (
          <td 
            className="py-1 px-2 text-center align-middle"
            rowSpan={getSameMaterialCount(item)}
          >
            <span className="text-sm text-gray-600 truncate block" title={item.uom}>{item.uom}</span>
          </td>
        ) : !isChild ? (
          <td className="py-1 px-2 text-center">
            <span className="text-sm text-gray-600 truncate block" title={item.uom}>{item.uom}</span>
          </td>
        ) : null}
      </tr>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stock Overview Section */}
      <div className="fiori-card">
        <div className="fiori-card-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-gray-900">Stock Overview</h3>
            </div>
          </div>
        </div>
        
        <div className="fiori-card-content">
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full border-collapse table-fixed">
              <colgroup>
                <col className="w-24" /> {/* Material */}
                <col className="w-32" /> {/* Description */}
                <col className="w-20" /> {/* Storage Location */}
                <col className="w-24" /> {/* Unrestricted Stock */}
                <col className="w-12" /> {/* UoM */}
                <col className="w-28" /> {/* Stock Issued to Subcontractor */}
                <col className="w-12" /> {/* UoM */}
              </colgroup>
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr className="border-b-2 border-gray-400 border-t-2 border-gray-400">
                  <th className="py-2 px-2 text-left text-xs font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200 leading-tight">Material</th>
                  <th className="py-2 px-2 text-left text-xs font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200 leading-tight">Description</th>
                  <th className="py-2 px-2 text-center text-xs font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200 leading-tight">Storage<br/>Location</th>
                  <th className="py-2 px-2 text-center text-xs font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200 leading-tight">Unrestricted<br/>Stock</th>
                  <th className="py-2 px-2 text-center text-xs font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200 leading-tight">UoM</th>
                  <th className="py-2 px-2 text-center text-xs font-bold text-gray-900 border-r-2 border-gray-400 bg-gray-200 leading-tight">Stock Issued<br/>to Subcontractor</th>
                  <th className="py-2 px-2 text-center text-xs font-bold text-gray-900 bg-gray-200 leading-tight">UoM</th>
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


    </div>
  )
}

export default Home

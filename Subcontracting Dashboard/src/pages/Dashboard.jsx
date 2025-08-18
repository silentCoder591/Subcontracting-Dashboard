import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Package, 
  Move, 
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Calendar,
  Users,
  BarChart3
} from 'lucide-react'

const Dashboard = () => {
  // Mock data for overdue POs for GR
  const overduePOsForGR = [
    {
      id: '4500000001',
      supplier: 'ABC Manufacturing',
      material: 'Component A',
      quantity: 100,
      dueDate: '2024-01-15',
      daysOverdue: 5,
      value: 2550.00
    },
    {
      id: '4500000002',
      supplier: 'XYZ Industries',
      material: 'Component B',
      quantity: 50,
      dueDate: '2024-01-18',
      daysOverdue: 2,
      value: 2287.50
    },
    {
      id: '4500000003',
      supplier: 'DEF Corp',
      material: 'Component C',
      quantity: 200,
      dueDate: '2024-01-20',
      daysOverdue: 1,
      value: 2450.00
    },
    {
      id: '4500000004',
      supplier: 'GHI Solutions',
      material: 'Component D',
      quantity: 75,
      dueDate: '2024-01-12',
      daysOverdue: 8,
      value: 1875.00
    }
  ]

  // Mock data for POs missing component goods issue
  const missingComponentPOs = [
    {
      id: '4500000005',
      supplier: 'JKL Manufacturing',
      material: 'Component E',
      quantity: 150,
      componentsIssued: 120,
      missingComponents: 30,
      status: 'In Progress'
    },
    {
      id: '4500000006',
      supplier: 'MNO Industries',
      material: 'Component F',
      quantity: 80,
      componentsIssued: 0,
      missingComponents: 80,
      status: 'Pending'
    },
    {
      id: '4500000007',
      supplier: 'PQR Corp',
      material: 'Component G',
      quantity: 120,
      componentsIssued: 90,
      missingComponents: 30,
      status: 'In Progress'
    }
  ]

  // Mock data for GRs with component variance
  const grVariances = [
    {
      id: '5000000001',
      poId: '4500000001',
      supplier: 'ABC Manufacturing',
      material: 'Component A',
      expectedQty: 100,
      receivedQty: 95,
      variance: -5,
      variancePercent: -5,
      date: '2024-01-20'
    },
    {
      id: '5000000002',
      poId: '4500000002',
      supplier: 'XYZ Industries',
      material: 'Component B',
      expectedQty: 50,
      receivedQty: 52,
      variance: 2,
      variancePercent: 4,
      date: '2024-01-22'
    },
    {
      id: '5000000003',
      poId: '4500000003',
      supplier: 'DEF Corp',
      material: 'Component C',
      expectedQty: 200,
      receivedQty: 198,
      variance: -2,
      variancePercent: -1,
      date: '2024-01-25'
    }
  ]

  // Mock data for supplier performance
  const supplierPerformance = [
    {
      name: 'ABC Manufacturing',
      onTimeDelivery: 95,
      qualityRating: 4.8,
      leadTime: 12,
      totalPOs: 24,
      status: 'Excellent'
    },
    {
      name: 'XYZ Industries',
      onTimeDelivery: 87,
      qualityRating: 4.2,
      leadTime: 15,
      totalPOs: 18,
      status: 'Good'
    },
    {
      name: 'DEF Corp',
      onTimeDelivery: 92,
      qualityRating: 4.5,
      leadTime: 14,
      totalPOs: 22,
      status: 'Good'
    },
    {
      name: 'GHI Solutions',
      onTimeDelivery: 78,
      qualityRating: 3.8,
      leadTime: 18,
      totalPOs: 15,
      status: 'Needs Improvement'
    }
  ]

  const getVarianceBadge = (variance) => {
    if (variance > 0) {
      return <span className="fiori-badge-success">+{variance}</span>
    } else if (variance < 0) {
      return <span className="fiori-badge-error">{variance}</span>
    } else {
      return <span className="fiori-badge-success">0</span>
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Excellent': 'fiori-badge-success',
      'Good': 'fiori-badge-info',
      'Needs Improvement': 'fiori-badge-warning',
      'Poor': 'fiori-badge-error'
    }
    
    return (
      <span className={`${statusConfig[status] || statusConfig.Good} capitalize`}>
        {status}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* KPIs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="fiori-summary-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="fiori-summary-number">24</div>
              <div className="fiori-summary-label">Open Subcontracting POs</div>
            </div>
            <div className="p-3 bg-[#0070f3] rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="fiori-summary-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="fiori-summary-number text-[#d69e00]">78%</div>
              <div className="fiori-summary-label">GR Due This Week</div>
            </div>
            <div className="p-3 bg-[#d69e00] rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="fiori-summary-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="fiori-summary-number text-[#107c10]">85%</div>
              <div className="fiori-summary-label">POs with Components Issued</div>
            </div>
            <div className="p-3 bg-[#107c10] rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="fiori-summary-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="fiori-summary-number text-[#6b4c9a]">14.2</div>
              <div className="fiori-summary-label">Avg Lead Time (Days)</div>
            </div>
            <div className="p-3 bg-[#6b4c9a] rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* POs Overdue for GR */}
        <div className="fiori-card">
          <div className="fiori-card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-[#d69e00]" />
                POs Overdue for GR
              </h3>
              <Link 
                to="/goods-receipt"
                className="text-sm text-[#0070f3] hover:text-[#0057d2] font-medium"
              >
                View All →
              </Link>
            </div>
          </div>
          <div className="fiori-card-content">
            <div className="max-h-64 overflow-y-auto space-y-3">
              {overduePOsForGR.map((po) => (
                <div key={po.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-[#0070f3]">{po.id}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {po.daysOverdue} days overdue
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {po.supplier} • {po.material} • Qty: {po.quantity}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Due: {po.dueDate} • Value: ${po.value.toFixed(2)}
                    </div>
                  </div>
                  <Link 
                    to="/goods-receipt"
                    className="text-[#0070f3] hover:text-[#0057d2] p-2 rounded-lg hover:bg-blue-50"
                  >
                    <Package className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* POs Missing Component Goods Issue */}
        <div className="fiori-card">
          <div className="fiori-card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Move className="w-5 h-5 mr-2 text-[#107c10]" />
                Missing Component Goods Issue (541)
              </h3>
              <Link 
                to="/stock-movement"
                className="text-sm text-[#0070f3] hover:text-[#0057d2] font-medium"
              >
                View All →
              </Link>
            </div>
          </div>
          <div className="fiori-card-content">
            <div className="max-h-64 overflow-y-auto space-y-3">
              {missingComponentPOs.map((po) => (
                <div key={po.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-[#0070f3]">{po.id}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {po.missingComponents} missing
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {po.supplier} • {po.material} • Total: {po.quantity}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Issued: {po.componentsIssued} • Status: {po.status}
                    </div>
                  </div>
                  <Link 
                    to="/stock-movement"
                    className="text-[#107c10] hover:text-[#0e6e0e] p-2 rounded-lg hover:bg-green-50"
                  >
                    <Move className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GRs with Component Variance */}
      <div className="fiori-card">
        <div className="fiori-card-header">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-[#6b4c9a]" />
            Material Documents with Component Variance
          </h3>
        </div>
        <div className="fiori-card-content">
          <div className="overflow-x-auto">
            <table className="fiori-table">
              <thead className="fiori-table-header">
                <tr>
                  <th className="fiori-table-header-cell">Material Document</th>
                  <th className="fiori-table-header-cell">PO ID</th>
                  <th className="fiori-table-header-cell">Supplier</th>
                  <th className="fiori-table-header-cell">Material</th>
                  <th className="fiori-table-header-cell">Expected Qty</th>
                  <th className="fiori-table-header-cell">Received Qty</th>
                  <th className="fiori-table-header-cell">Variance</th>
                  <th className="fiori-table-header-cell">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {grVariances.map((gr) => (
                  <tr key={gr.id} className="hover:bg-gray-50">
                    <td className="fiori-table-cell font-medium text-[#0070f3]">{gr.id}</td>
                    <td className="fiori-table-cell">{gr.poId}</td>
                    <td className="fiori-table-cell">{gr.supplier}</td>
                    <td className="fiori-table-cell">{gr.material}</td>
                    <td className="fiori-table-cell">{gr.expectedQty}</td>
                    <td className="fiori-table-cell">{gr.receivedQty}</td>
                    <td className="fiori-table-cell">{getVarianceBadge(gr.variance)}</td>
                    <td className="fiori-table-cell">{gr.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Supplier Performance */}
      <div className="fiori-card">
        <div className="fiori-card-header">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="w-5 h-5 mr-2 text-[#0070f3]" />
            Supplier Performance
          </h3>
        </div>
        <div className="fiori-card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supplierPerformance.map((supplier) => (
              <div key={supplier.name} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 text-sm">{supplier.name}</h4>
                  {getStatusBadge(supplier.status)}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">On-Time Delivery:</span>
                    <span className="font-medium">{supplier.onTimeDelivery}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quality Rating:</span>
                    <span className="font-medium">{supplier.qualityRating}/5.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Lead Time:</span>
                    <span className="font-medium">{supplier.leadTime} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total POs:</span>
                    <span className="font-medium">{supplier.totalPOs}</span>
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

export default Dashboard 
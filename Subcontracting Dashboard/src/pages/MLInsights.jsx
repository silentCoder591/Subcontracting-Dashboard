import React, { useState } from 'react'
import { 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, 
  Package, Building, Move, BarChart3, LineChart, Target, 
  ArrowRight, AlertCircle, Calendar, Factory
} from 'lucide-react'

const MLInsights = () => {
  // Mock data for PO Risk Prediction
  const poRiskData = [
    { poNo: '4500000001', supplier: 'ABC Manufacturing', material: 'Component A', dueDate: '2024-02-15', riskPercent: 85, trend: 'up', change: '+12%' },
    { poNo: '4500000002', supplier: 'XYZ Industries', material: 'Component B', dueDate: '2024-02-20', riskPercent: 72, trend: 'down', change: '-8%' },
    { poNo: '4500000003', supplier: 'DEF Corp', material: 'Component C', dueDate: '2024-02-10', riskPercent: 91, trend: 'up', change: '+15%' },
    { poNo: '4500000004', supplier: 'GHI Solutions', material: 'Component D', dueDate: '2024-02-25', riskPercent: 68, trend: 'down', change: '-5%' }
  ]

  // Mock data for Supplier Performance
  const supplierPerformance = {
    overallScore: 87.5,
    trend: 'up',
    change: '+2.3%',
    monthlyData: [
      { month: 'Jan', score: 82, leadTime: 12, expected: 10 },
      { month: 'Feb', score: 84, leadTime: 11, expected: 10 },
      { month: 'Mar', score: 85, leadTime: 10, expected: 10 },
      { month: 'Apr', score: 86, leadTime: 9, expected: 10 },
      { month: 'May', score: 87, leadTime: 8, expected: 10 },
      { month: 'Jun', score: 87.5, leadTime: 8, expected: 10 }
    ]
  }

  // Mock data for GR Variance Prediction
  const grVarianceData = [
    { poItem: '4500000001-001', material: 'Component A', supplier: 'ABC Manufacturing', variancePercent: 78, likelyComponents: ['A-1', 'A-2'] },
    { poItem: '4500000002-001', material: 'Component B', supplier: 'XYZ Industries', variancePercent: 65, likelyComponents: ['B-1'] },
    { poItem: '4500000003-001', material: 'Component C', supplier: 'DEF Corp', variancePercent: 82, likelyComponents: ['C-1', 'C-2', 'C-3'] },
    { poItem: '4500000004-001', material: 'Component D', supplier: 'GHI Solutions', variancePercent: 71, likelyComponents: ['D-1'] }
  ]

  // Mock data for GI Staging Forecast
  const giStagingData = [
    { poItem: '4500000001-001', component: 'Component A-1', reqQty: 100, availQty: 75, riskPercent: 85 },
    { poItem: '4500000002-001', component: 'Component B-1', reqQty: 50, availQty: 30, riskPercent: 92 },
    { poItem: '4500000003-001', component: 'Component C-1', reqQty: 200, availQty: 150, riskPercent: 78 },
    { poItem: '4500000004-001', component: 'Component D-1', reqQty: 75, availQty: 60, riskPercent: 68 }
  ]

  // Mock data for Lead Time Forecast
  const leadTimeData = [
    { supplier: 'ABC Manufacturing', material: 'Component A', planned: 10, predicted: 12, trend: 'up' },
    { supplier: 'XYZ Industries', material: 'Component B', planned: 8, predicted: 7, trend: 'down' },
    { supplier: 'DEF Corp', material: 'Component C', planned: 12, predicted: 15, trend: 'up' },
    { supplier: 'GHI Solutions', material: 'Component D', planned: 6, predicted: 6, trend: 'stable' }
  ]

  // Mock data for Anomaly Detection
  const anomalyData = [
    { type: 'PO Reversal', description: 'PO 4500000001: abnormal reversal pattern', severity: 'High', impact: 'Multiple GR reversals' },
    { type: 'Supplier Variance', description: 'Supplier Y: sudden spike in variance', severity: 'Medium', impact: '15% increase in quantity variance' },
    { type: 'Staging Delay', description: 'Component A-1: unusual staging delays', severity: 'Low', impact: '3-day average delay' }
  ]

  const getRiskPercentBadge = (percent, trend, change) => {
    let color = 'bg-green-100 text-green-800'
    if (percent >= 80) color = 'bg-red-100 text-red-800'
    else if (percent >= 60) color = 'bg-orange-100 text-orange-800'
    else if (percent >= 40) color = 'bg-yellow-100 text-yellow-800'
    
    const trendIcon = trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '→'
    
    return (
      <div className="flex items-center space-x-2">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>
          {percent}%
        </span>
        <span className="text-xs text-gray-600">
          {trendIcon} {change}
        </span>
      </div>
    )
  }

  const getSeverityBadge = (severity) => {
    const config = {
      'High': 'bg-red-100 text-red-800 border-red-200',
      'Medium': 'bg-orange-100 text-orange-800 border-orange-200',
      'Low': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${config[severity] || config.Low}`}>
        {severity}
      </span>
    )
  }

  const handlePOFilter = (poNo) => {
    window.location.href = `/goods-receipt?po=${poNo}`
  }

  const handleSupplierFilter = (supplier) => {
    window.location.href = `/goods-receipt?supplier=${supplier}`
  }

  const handleGIFilter = (po) => {
    window.location.href = `/stock-movement?po=${po}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
          <p className="text-gray-600 mt-2">AI-powered insights for subcontracting optimization</p>
        </div>
      </div>

      {/* Row 1: PO Risk & Supplier Performance - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PO Risk Prediction - Table Card */}
        <div className="fiori-card">
          <div className="fiori-card-header">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-[#d69e00]" />
              PO Risk Prediction
            </h3>
            <p className="text-sm text-gray-600">AI model trained on past subcontracting POs</p>
          </div>
          <div className="fiori-card-content p-0">
            <div className="overflow-x-auto">
              <table className="fiori-table">
                <thead className="fiori-table-header">
                  <tr>
                    <th className="fiori-table-header-cell">PO No.</th>
                    <th className="fiori-table-header-cell">Supplier</th>
                    <th className="fiori-table-header-cell">Material</th>
                    <th className="fiori-table-header-cell">Due Date</th>
                    <th className="fiori-table-header-cell">Risk % of Late GR</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {poRiskData.map((po) => (
                    <tr key={po.poNo} className="hover:bg-gray-50 cursor-pointer" onClick={() => handlePOFilter(po.poNo)}>
                      <td className="fiori-table-cell font-medium text-[#0070f3]">{po.poNo}</td>
                      <td className="fiori-table-cell">{po.supplier}</td>
                      <td className="fiori-table-cell">{po.material}</td>
                      <td className="fiori-table-cell">{po.dueDate}</td>
                      <td className="fiori-table-cell">{getRiskPercentBadge(po.riskPercent, po.trend, po.change)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Supplier Performance Insights - KPI + Chart */}
        <div className="fiori-card">
          <div className="fiori-card-header">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Building className="w-5 h-5 mr-2 text-[#107c10]" />
              Supplier Performance Insights
            </h3>
            <p className="text-sm text-gray-600">AI-driven supplier reliability scoring</p>
          </div>
          <div className="fiori-card-content">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-4xl font-bold text-[#107c10]">{supplierPerformance.overallScore}%</span>
                <span className="text-2xl">{supplierPerformance.trend === 'up' ? '↗️' : '↘️'}</span>
              </div>
              <div className="text-sm text-gray-600">
                {supplierPerformance.change} from last month
              </div>
            </div>
            
            {/* Mini Chart */}
            <div className="h-32 flex items-end justify-center space-x-2">
              {supplierPerformance.monthlyData.map((month, index) => (
                <div key={month.month} className="flex flex-col items-center">
                  <div 
                    className="bg-[#107c10] rounded-t w-8"
                    style={{ height: `${month.score * 0.8}px` }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-1">{month.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: GR Variance & GI Staging - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GR Variance Prediction - List Card */}
        <div className="fiori-card">
          <div className="fiori-card-header">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-[#d69e00]" />
              GR Variance Prediction
            </h3>
            <p className="text-sm text-gray-600">AI learns from past GR postings (101) and 543 consumptions</p>
          </div>
          <div className="fiori-card-content">
            <div className="space-y-3">
              {grVarianceData.map((item) => (
                <div key={item.poItem} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <div className="font-medium text-[#0070f3]">{item.poItem}</div>
                    <div className="text-sm text-gray-600">{item.material} - {item.supplier}</div>
                    <div className="text-xs text-gray-500">Likely: {item.likelyComponents.join(', ')}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getRiskPercentBadge(item.variancePercent, 'up', '+0%')}
                    <button 
                      onClick={() => handlePOFilter(item.poItem.split('-')[0])}
                      className="fiori-button-primary text-xs py-1 px-2"
                    >
                      View PO
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GI Staging Forecast - Table Card */}
        <div className="fiori-card">
          <div className="fiori-card-header">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Move className="w-5 h-5 mr-2 text-[#d13438]" />
              GI (541) Staging Completeness Forecast
            </h3>
            <p className="text-sm text-gray-600">AI predicts which POs won't be staged in time</p>
          </div>
          <div className="fiori-card-content p-0">
            <div className="overflow-x-auto">
              <table className="fiori-table">
                <thead className="fiori-table-header">
                  <tr>
                    <th className="fiori-table-header-cell">PO Item</th>
                    <th className="fiori-table-header-cell">Component</th>
                    <th className="fiori-table-header-cell">Req Qty</th>
                    <th className="fiori-table-header-cell">Avail Qty</th>
                    <th className="fiori-table-header-cell">Risk % of Missing 541</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {giStagingData.map((item) => (
                    <tr key={`${item.poItem}-${item.component}`} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleGIFilter(item.poItem.split('-')[0])}>
                      <td className="fiori-table-cell font-medium text-[#0070f3]">{item.poItem}</td>
                      <td className="fiori-table-cell">{item.component}</td>
                      <td className="fiori-table-cell">{item.reqQty.toLocaleString()}</td>
                      <td className="fiori-table-cell">{item.availQty.toLocaleString()}</td>
                      <td className="fiori-table-cell">{getRiskPercentBadge(item.riskPercent, 'up', '+0%')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Lead Time Forecast & Anomaly Detection - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Time Forecast - Analytical Chart */}
        <div className="fiori-card">
          <div className="fiori-card-header">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[#6b4c9a]" />
              Subcontracting Lead Time Forecast
            </h3>
            <p className="text-sm text-gray-600">AI regression on supplier, material, historical GR dates</p>
          </div>
          <div className="fiori-card-content">
            <div className="h-48 flex items-end justify-center space-x-6">
              {leadTimeData.map((item) => (
                <div key={`${item.supplier}-${item.material}`} className="flex flex-col items-center">
                  <div className="flex flex-col items-center space-y-1">
                    <div 
                      className="bg-[#6b4c9a] rounded-t w-12"
                      style={{ height: `${item.predicted * 8}px` }}
                    ></div>
                    <div 
                      className="bg-[#d69e00] rounded-t w-12"
                      style={{ height: `${item.planned * 8}px` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2 text-center w-20">{item.supplier}</div>
                  <div className="text-xs text-gray-500">{item.material}</div>
                  <div className="text-xs font-medium">
                    Planned: {item.planned}d | Pred: {item.predicted}d
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-4 text-xs text-gray-600 mt-2">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-[#6b4c9a] rounded mr-1"></div>
                Predicted
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-[#d69e00] rounded mr-1"></div>
                Planned
              </span>
            </div>
          </div>
        </div>

        {/* Anomaly Detection - List Card */}
        <div className="fiori-card">
          <div className="fiori-card-header">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-[#d13438]" />
              Anomaly Detection in Subcontracting
            </h3>
            <p className="text-sm text-gray-600">Unsupervised ML on movement types 101/102/543/544</p>
          </div>
          <div className="fiori-card-content">
            <div className="space-y-3">
              {anomalyData.map((anomaly, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{anomaly.type}</span>
                    {getSeverityBadge(anomaly.severity)}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{anomaly.description}</div>
                  <div className="text-xs text-gray-500">Impact: {anomaly.impact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MLInsights 
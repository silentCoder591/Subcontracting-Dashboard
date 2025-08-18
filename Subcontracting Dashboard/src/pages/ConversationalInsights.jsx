import React, { useState, useEffect } from 'react'
import { 
  MessageSquare, Send, Search, BarChart3, LineChart, 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock,
  Building, Package, Move, Calendar, Factory
} from 'lucide-react'

const ConversationalInsights = () => {
  console.log('ConversationalInsights component rendering')
  
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'user',
      message: 'Show me all POs for Supplier A likely to be late this week',
      timestamp: '2024-01-20 10:30'
    },
    {
      id: 2,
      type: 'assistant',
      message: 'Based on AI analysis, here are the POs for Supplier A with high risk of delay:',
      timestamp: '2024-01-20 10:31',
      data: {
        type: 'po-risk',
        items: [
          { poNo: '4500000001', material: 'Component A', dueDate: '2024-02-15', riskPercent: 85, trend: 'up' },
          { poNo: '4500000003', material: 'Component C', dueDate: '2024-02-10', riskPercent: 91, trend: 'up' }
        ]
      }
    },
    {
      id: 3,
      type: 'user',
      message: 'Which GRs failed due to component shortages last month?',
      timestamp: '2024-01-20 10:35'
    },
    {
      id: 4,
      type: 'assistant',
      message: 'Here are the GRs that failed due to component shortages in December:',
      timestamp: '2024-01-20 10:36',
      data: {
        type: 'gr-failures',
        items: [
          { grId: '5000000001', poNo: '4500000001', reason: 'Component A-1 shortage', impact: 'High' },
          { grId: '5000000002', poNo: '4500000002', reason: 'Component B-2 unavailable', impact: 'Medium' }
        ]
      }
    }
  ])
  const [currentQuery, setCurrentQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Sample analytics data for the left canvas
  const [canvasData, setCanvasData] = useState({
    type: 'po-risk',
    title: 'PO Risk Analysis',
    items: [
      { poNo: '4500000001', material: 'Component A', dueDate: '2024-02-15', riskPercent: 85, trend: 'up' },
      { poNo: '4500000003', material: 'Component C', dueDate: '2024-02-10', riskPercent: 91, trend: 'up' }
    ]
  })

  const handleChatSubmit = async (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: chatInput,
      timestamp: new Date().toLocaleString()
    }

    setChatHistory(prev => [...prev, userMessage])
    setCurrentQuery(chatInput)
    setIsLoading(true)

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(chatInput)
      setChatHistory(prev => [...prev, aiResponse])
      setIsLoading(false)
      setChatInput('')
    }, 1500)
  }

  const generateAIResponse = (query) => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('po') && lowerQuery.includes('late')) {
      return {
        id: Date.now(),
        type: 'assistant',
        message: 'Here are the POs at risk of being late based on AI analysis:',
        timestamp: new Date().toLocaleString(),
        data: {
          type: 'po-risk',
          items: [
            { poNo: '4500000001', material: 'Component A', dueDate: '2024-02-15', riskPercent: 85, trend: 'up' },
            { poNo: '4500000002', material: 'Component B', dueDate: '2024-02-20', riskPercent: 72, trend: 'down' },
            { poNo: '4500000003', material: 'Component C', dueDate: '2024-02-10', riskPercent: 91, trend: 'up' }
          ]
        }
      }
    } else if (lowerQuery.includes('supplier') && lowerQuery.includes('performance')) {
      return {
        id: Date.now(),
        type: 'assistant',
        message: 'Here\'s the supplier performance analysis:',
        timestamp: new Date().toLocaleString(),
        data: {
          type: 'supplier-performance',
          items: [
            { supplier: 'ABC Manufacturing', score: 87, trend: 'up', change: '+5%' },
            { supplier: 'XYZ Industries', score: 72, trend: 'down', change: '-3%' },
            { supplier: 'DEF Corp', score: 91, trend: 'up', change: '+8%' }
          ]
        }
      }
    } else if (lowerQuery.includes('lead time') || lowerQuery.includes('delivery')) {
      return {
        id: Date.now(),
        type: 'assistant',
        message: 'Here\'s the lead time forecast for key suppliers:',
        timestamp: new Date().toLocaleString(),
        data: {
          type: 'lead-time',
          items: [
            { supplier: 'ABC Manufacturing', planned: 10, predicted: 12, variance: '+2 days' },
            { supplier: 'XYZ Industries', planned: 8, predicted: 7, variance: '-1 day' },
            { supplier: 'DEF Corp', planned: 12, predicted: 15, variance: '+3 days' }
          ]
        }
      }
    } else {
      return {
        id: Date.now(),
        type: 'assistant',
        message: 'I can help you with subcontracting insights. Try asking about:\n• PO risk analysis\n• Supplier performance\n• Lead time forecasts\n• GR variance predictions\n• Component shortages',
        timestamp: new Date().toLocaleString(),
        data: { type: 'help' }
      }
    }
  }

  const renderCanvasContent = (data) => {
    // Handle case where data is undefined or doesn't have expected structure
    if (!data || !data.type) {
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Subcontracting Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <div className="text-2xl font-bold text-[#0070f3]">156</div>
              <div className="text-sm text-gray-600">Total POs</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <div className="text-2xl font-bold text-[#d69e00]">23</div>
              <div className="text-sm text-gray-600">Overdue POs</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <div className="text-2xl font-bold text-[#107c10]">89</div>
              <div className="text-sm text-gray-600">Completed GRs</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <div className="text-2xl font-bold text-[#d13438]">34</div>
              <div className="text-sm text-gray-600">Pending GIs</div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>PO 4500000001 completed GR</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>PO 4500000002 overdue for 3 days</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>New PO 4500000005 created</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    switch (data.type) {
      case 'po-risk':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">PO Risk Analysis</h3>
            <div className="grid grid-cols-1 gap-3">
              {data.items && data.items.map((item) => (
                <div key={item.poNo} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#0070f3]">{item.poNo}</div>
                      <div className="text-sm text-gray-600">{item.material}</div>
                      <div className="text-xs text-gray-500">Due: {item.dueDate}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        item.riskPercent >= 80 ? 'text-red-600' : 
                        item.riskPercent >= 60 ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {item.riskPercent}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.trend === 'up' ? '↗️ Increasing' : '↘️ Decreasing'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'supplier-performance':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Supplier Performance</h3>
            <div className="space-y-3">
              {data.items && data.items.map((item) => (
                <div key={item.supplier} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{item.supplier}</div>
                      <div className="text-sm text-gray-600">Performance Score</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#107c10]">{item.score}%</div>
                      <div className={`text-xs ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change} from last month
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'lead-time':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Lead Time Forecast</h3>
            <div className="h-48 flex items-end justify-center space-x-6">
              {data.items && data.items.map((item) => (
                <div key={item.supplier} className="flex flex-col items-center">
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
                  <div className="text-xs font-medium">
                    Planned: {item.planned}d | Pred: {item.predicted}d
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-4 text-xs text-gray-600">
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
        )

      case 'gr-failures':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">GR Failures Due to Component Shortages</h3>
            <div className="grid grid-cols-1 gap-3">
              {data.items && data.items.map((item) => (
                <div key={item.grId} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#0070f3]">{item.grId}</div>
                      <div className="text-sm text-gray-600">PO: {item.poNo}</div>
                      <div className="text-xs text-gray-500">Reason: {item.reason}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium px-2 py-1 rounded ${
                        item.impact === 'High' ? 'bg-red-100 text-red-800' : 
                        item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.impact} Impact
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'help':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">AI Assistant Help</h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700 mb-3">
                I can help you with subcontracting insights. Try asking about:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• PO risk analysis</li>
                <li>• Supplier performance</li>
                <li>• Lead time forecasts</li>
                <li>• GR variance predictions</li>
                <li>• Component shortages</li>
              </ul>
            </div>
          </div>
        )

      case 'overview':
      default:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Subcontracting Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-bold text-[#0070f3]">156</div>
                <div className="text-sm text-gray-600">Total POs</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-bold text-[#d69e00]">23</div>
                <div className="text-sm text-gray-600">Overdue POs</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-bold text-[#107c10]">89</div>
                <div className="text-sm text-gray-600">Completed GRs</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-bold text-[#d13438]">34</div>
                <div className="text-sm text-gray-600">Pending GIs</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>PO 4500000001 completed GR</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>PO 4500000002 overdue for 3 days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>New PO 4500000005 created</span>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  // Update canvas when chat data changes
  useEffect(() => {
    const lastMessage = chatHistory[chatHistory.length - 1]
    console.log('Last message:', lastMessage)
    console.log('Current canvasData:', canvasData)
    if (lastMessage?.type === 'assistant' && lastMessage.data && lastMessage.data.type) {
      console.log('Setting new canvas data:', lastMessage.data)
      setCanvasData(lastMessage.data)
    }
  }, [chatHistory])

  console.log('Rendering with canvasData:', canvasData)

  return (
    <div>
    
      <div className="flex min-h-[calc(100vh-200px)]">
        {/* Left Side - Analytics Canvas */}
        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">AI Response Canvas</h1>
              <p className="text-gray-600 mt-2">AI-generated insights and data visualizations based on your questions</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                {renderCanvasContent(canvasData)}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Chat Interface */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-6 h-6 text-[#0070f3]" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
                <p className="text-sm text-gray-600">Ask about subcontracting processes</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-[#0070f3] text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="text-sm">{message.message}</div>
                  <div className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0070f3]"></div>
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleChatSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about subcontracting processes..."
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0070f3] focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !chatInput.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-[#0070f3] hover:text-[#0057d2] disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-xs text-gray-500">
                Try: "Show POs at risk", "Supplier performance", "Lead time forecast"
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationalInsights

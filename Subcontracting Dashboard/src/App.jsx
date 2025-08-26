import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import PurchaseOrder from './pages/PurchaseOrder'
import GoodsReceipt from './pages/GoodsReceipt'
import StockMovement from './pages/StockMovement'
import MLInsights from './pages/MLInsights'
import ConversationalInsights from './pages/ConversationalInsights'
import Notifications from './pages/Notifications'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/purchase-order" element={<PurchaseOrder />} />
          <Route path="/goods-receipt" element={<GoodsReceipt />} />
          <Route path="/stock-movement" element={<StockMovement />} />
          <Route path="/ml-insights" element={<MLInsights />} />
          <Route path="/conversational-insights" element={<ConversationalInsights />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App 
# Subcontracting Dashboard - SAP FIORI Proof of Concept

A modern, responsive web application that serves as a proof of concept for a SAP FIORI custom app designed to streamline subcontracting processes. This dashboard provides an intuitive interface for managing purchase orders, goods receipts, stock movements, and AI-powered insights.

## 🎯 Project Overview

The Subcontracting Dashboard addresses the current inefficiencies in SAP subcontracting processes where users need to open multiple app tiles to perform activities such as:

- **Purchase Order (PO) Creation**
- **Goods Receipt (GR) Management** - Supporting transaction types 101-543
- **Stock Movement Management**
- **ML-powered Insights and Predictions**
- **Comprehensive Notification System**

## ✨ Key Features

### 🏠 **Main Dashboard**
- Process overview with real-time statistics
- Interactive charts and analytics
- Quick action buttons for common tasks
- Recent activities feed
- Process flow visualization

### 📋 **Purchase Order Management**
- Create and manage purchase orders
- Search and filter capabilities
- Status tracking (Draft, Pending, Approved, Rejected)
- Priority management
- Supplier and material selection

### 📦 **Goods Receipt (GR) Management**
- Support for GR types 101 (PO Goods Receipt) and 543 (Subcontracting GR)
- Status tracking and approval workflow
- Warehouse management
- Quantity validation
- Notes and documentation

### 🚚 **Stock Movement with Drag & Drop**
- Interactive warehouse layout visualization
- Drag and drop functionality for stock movements
- Real-time capacity monitoring
- Location-based stock tracking
- Movement history and audit trail

### 🧠 **ML Insights & Analytics**
- AI-powered predictions and recommendations
- Anomaly detection
- Supplier performance analysis
- Cost optimization suggestions
- Risk assessment and scoring

### 🔔 **Smart Notifications**
- Category-based notification system
- Priority-based alerting
- Real-time updates
- Customizable notification preferences
- Actionable notification items

## 🛠️ Technology Stack

- **Frontend**: React 18 with modern hooks
- **Styling**: Tailwind CSS with custom FIORI design system
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography
- **Routing**: React Router for navigation
- **Build Tool**: Vite for fast development and building
- **Animations**: Framer Motion for smooth interactions

## 🎨 Design System

The application follows SAP FIORI design principles with:
- **Color Palette**: SAP-inspired colors (Blue, Green, Orange, Red)
- **Typography**: Segoe UI font family for optimal readability
- **Components**: Consistent card layouts, buttons, and form elements
- **Responsiveness**: Mobile-first design with responsive breakpoints
- **Accessibility**: Focus management and keyboard navigation support

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd subcontracting-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 📱 Application Structure

```
src/
├── components/
│   └── Layout.jsx          # Main layout with navigation
├── pages/
│   ├── Dashboard.jsx        # Main dashboard overview
│   ├── PurchaseOrder.jsx    # PO management
│   ├── GoodsReceipt.jsx     # GR management (101-543)
│   ├── StockMovement.jsx    # Stock movement with drag & drop
│   ├── MLInsights.jsx       # AI insights and analytics
│   └── Notifications.jsx    # Notification system
├── App.jsx                  # Main application component
├── main.jsx                 # Application entry point
└── index.css                # Global styles and Tailwind imports
```

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with FIORI-inspired colors and components. Custom CSS classes are available:

- `.fiori-card` - Standard card component
- `.fiori-button-primary` - Primary action button
- `.fiori-button-secondary` - Secondary action button
- `.fiori-input` - Form input styling
- `.fiori-table` - Table component styling

### Environment Variables
Create a `.env` file in the root directory for any environment-specific configurations:

```env
VITE_APP_TITLE=Subcontracting Dashboard
VITE_API_BASE_URL=http://localhost:8080/api
```

## 📊 Data Management

The current implementation uses mock data for demonstration purposes. In a production environment, this would be replaced with:

- **SAP Gateway Services** for backend integration
- **OData APIs** for data retrieval and manipulation
- **Real-time updates** via WebSocket connections
- **Authentication** via SAP authentication mechanisms

## 🎯 Future Enhancements

### Phase 2 Features
- **Real SAP Integration**: Connect to actual SAP systems
- **Advanced ML Models**: Implement production-ready AI models
- **Mobile App**: Native mobile application
- **Offline Support**: PWA capabilities for offline usage
- **Multi-language**: Internationalization support

### Phase 3 Features
- **Advanced Analytics**: Custom reporting and dashboards
- **Workflow Engine**: Automated approval processes
- **Integration Hub**: Connect with external systems
- **Performance Monitoring**: Real-time system health monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Maintain consistent naming conventions
- Add proper TypeScript types (future enhancement)

### Component Structure
- Keep components focused and single-purpose
- Use proper prop validation
- Implement error boundaries where appropriate
- Follow the established design patterns

### Testing
- Unit tests for utility functions
- Component testing with React Testing Library
- Integration tests for critical user flows
- E2E tests for complete user journeys

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Port Conflicts**
```bash
# Use different port
npm run dev -- --port 3001
```

**Styling Issues**
```bash
# Rebuild Tailwind CSS
npm run build:css
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SAP FIORI** design system for inspiration
- **React Community** for excellent tooling and libraries
- **Tailwind CSS** for utility-first CSS framework
- **Lucide** for beautiful, consistent icons

## 📞 Support

For questions, issues, or contributions:
- Create an issue in the repository
- Contact the development team
- Refer to the documentation

---

**Note**: This is a proof of concept application. For production use, additional security, performance, and integration considerations must be addressed. 
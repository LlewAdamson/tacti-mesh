# TactiMesh

<div align="center">
  <img src="assets/logo.png" alt="TactiMesh Logo" width="200" />

  **A tactical mesh network visualization and command system**

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Electron](https://img.shields.io/badge/Electron-27.1.2-blue.svg)](https://www.electronjs.org/)
  [![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
</div>

## 📖 Overview

TactiMesh is a sophisticated mesh network visualization and management system built with Electron and React. It provides real-time monitoring, control, and communication capabilities for distributed tactical networks. The application features advanced terrain visualization, network topology mapping, and secure messaging capabilities.

## ✨ Features

### Core Capabilities
- **🌐 Mesh Network Visualization**: Real-time 3D visualization of network topology using react-force-graph
- **🗺️ Tactical Terrain Mapping**: Dynamic terrain generation with elevation contours, infrastructure, and strategic points
- **💬 Secure Messaging**: Encrypted communication between network nodes with priority levels
- **📊 Node Management**: Monitor and control network nodes with health metrics and status tracking
- **🔋 Resource Monitoring**: Track battery levels, signal strength, and node performance
- **🎯 Strategic Planning**: Visual overlays for hospitals, airports, bridges, and other critical infrastructure

### Technical Features
- **Cross-platform Desktop Application**: Runs on Windows, macOS, and Linux
- **Real-time Updates**: Live network status and message synchronization
- **State Management**: Efficient state handling with Zustand
- **Modern UI**: Responsive interface built with Tailwind CSS
- **TypeScript**: Full type safety across the application

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Python 3.8+ (for backend services)
- Docker and Docker Compose (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tacti-mesh.git
   cd tacti-mesh
   ```

2. **Install Electron app dependencies**
   ```bash
   cd electron-app
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend/app
   pip install -r requirements.txt
   ```

### Running the Application

#### Development Mode
```bash
# Start the Electron app in development mode
cd electron-app
npm run electron:dev
```

This will start both the Vite development server and the Electron application with hot-reload enabled.

#### Production Build
```bash
# Build the Electron application
cd electron-app
npm run build

# The built application will be in the dist-electron folder
```

#### Docker Deployment (Optional)
```bash
# From the project root
docker-compose up -d
```

## 🏗️ Architecture

### Project Structure
```
tacti-mesh/
├── electron-app/           # Electron + React frontend
│   ├── src/
│   │   ├── main/          # Electron main process
│   │   │   ├── main.ts    # Main process entry point
│   │   │   └── preload.ts # Preload script for IPC
│   │   ├── renderer/      # React application
│   │   │   ├── App.tsx    # Main application component
│   │   │   └── App-simple.tsx # Simplified view
│   │   ├── stores/        # State management
│   │   │   └── tactiMeshStore.ts # Zustand store
│   │   └── main.tsx       # Renderer entry point
│   ├── package.json       # Node dependencies
│   └── vite.config.ts     # Vite configuration
├── backend/               # Python backend services
│   └── app/
│       ├── main.py        # FastAPI application
│       └── requirements.txt
└── docker-compose.yml     # Container orchestration
```

### Technology Stack

#### Frontend
- **Electron 27.1.2**: Desktop application framework
- **React 18.2.0**: UI library
- **TypeScript 5.2.2**: Type-safe JavaScript
- **Vite 4.5.0**: Build tool and dev server
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Zustand 5.0.6**: State management
- **react-force-graph 1.48.0**: Network visualization

#### Backend
- **Python 3.8+**: Backend runtime
- **FastAPI**: Modern web API framework (planned)
- **WebSocket**: Real-time communication (planned)

## 🎮 Usage

### Network Management
The application provides a comprehensive view of your mesh network:
- **Node Status**: View online/offline status, battery levels, and signal strength
- **Network Topology**: Interactive graph showing node connections and link quality
- **Message Console**: Send and receive encrypted messages across the network

### Terrain Visualization
The tactical map includes:
- Elevation contours and terrain features
- Infrastructure overlays (roads, bridges, buildings)
- Strategic points (hospitals, airports, fuel depots)
- Custom waypoints and planning markers

### Keyboard Shortcuts
- `Ctrl/Cmd + R`: Refresh network status
- `Ctrl/Cmd + M`: Toggle message panel
- `Ctrl/Cmd + T`: Toggle terrain view
- `Ctrl/Cmd + N`: Add new node
- `Esc`: Close active dialog

## 🛠️ Development

### Available Scripts

#### Electron App
```bash
npm run dev           # Start Vite dev server
npm run build         # Build for production
npm run electron      # Start Electron (waits for dev server)
npm run electron:dev  # Start both Vite and Electron
npm run preview       # Preview production build
```

### Code Style
- ESLint configuration for TypeScript
- Prettier for code formatting
- Pre-commit hooks with Husky (recommended setup)

### Testing
```bash
# Run unit tests (when implemented)
npm test

# Run E2E tests (when implemented)
npm run test:e2e
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Write TypeScript with proper types
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits atomic and descriptive

## 📝 Configuration

### Environment Variables
Create a `.env` file in the electron-app directory:
```env
# API Configuration
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws

# Security
VITE_ENCRYPTION_KEY=your-encryption-key

# Map Settings
VITE_DEFAULT_LAT=40.7128
VITE_DEFAULT_LNG=-74.0060
VITE_DEFAULT_ZOOM=10
```

### Build Configuration
Electron Builder configuration can be modified in `package.json`:
```json
{
  "build": {
    "appId": "com.tacti.mesh",
    "productName": "TactiMesh",
    "directories": {
      "output": "dist-electron"
    },
    "files": [
      "dist/**/*",
      "dist-electron/**/*"
    ]
  }
}
```

## 🚢 Deployment

### Desktop Application
Build packages for different platforms:
```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build images separately
docker build -t tacti-mesh-frontend ./electron-app
docker build -t tacti-mesh-backend ./backend
```

## 🔒 Security

- All inter-node communication is encrypted
- Authentication tokens for API access
- Secure storage of sensitive configuration
- Regular security audits recommended

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Electron](https://www.electronjs.org/) team for the amazing framework
- [React](https://reactjs.org/) community for the robust ecosystem
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first approach
- All contributors and supporters of the project

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/LlewAdamson/tacti-mesh/issues)
- **Discussions**: [GitHub Discussions](https://github.com/LlewAdamson/tacti-mesh/discussions)

---

<div align="center">
  Made with ❤️
</div>

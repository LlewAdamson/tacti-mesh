<div align="center">
  
  # 🌐 TactiMesh
  
  **A tactical mesh network visualization and command system**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Electron](https://img.shields.io/badge/Electron-27.1.2-blue.svg)](https://www.electronjs.org/)
  [![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
  [![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/LlewAdamson/tacti-mesh/releases)
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
- Python 3.8+ (optional, for backend services)
- Make (usually pre-installed on Unix systems)

### One-Line Setup & Run

```bash
# Clone, setup, and start TactiMesh
git clone https://github.com/LlewAdamson/tacti-mesh.git && cd tacti-mesh && make setup && make start
```

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LlewAdamson/tacti-mesh.git
   cd tacti-mesh
   ```

2. **Run initial setup** (installs all dependencies)
   ```bash
   make setup
   ```

3. **Start the application**
   ```bash
   make start    # Production mode
   # OR
   make dev      # Development mode with hot-reload
   ```

### Alternative: Manual Installation

If you prefer not to use Make:

```bash
# Install frontend dependencies
cd electron-app && npm install

# Install backend dependencies (if needed)
cd ../backend/app && pip install -r requirements.txt

# Start the application
cd ../../electron-app && npm run electron:dev
```

### Running the Application

#### Using Make (Recommended)
```bash
# Quick commands
make start    # Start in production mode
make dev      # Start in development mode
make build    # Build for production
make status   # Check project status
make help     # Show all available commands

# Shortcuts
make s        # Same as 'make start'
make d        # Same as 'make dev'
make b        # Same as 'make build'
```

#### Platform-Specific Builds
```bash
make build:mac     # Build for macOS
make build:win     # Build for Windows
make build:linux   # Build for Linux
```

#### Docker Deployment (Optional)
```bash
make docker-up     # Start with docker-compose
make docker-down   # Stop docker services
make docker-build  # Build docker images
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
│   │   │   ├── components/ # React components
│   │   │   │   ├── CommsPanel.tsx
│   │   │   │   ├── NetworkGraph.tsx
│   │   │   │   └── StatusBar.tsx
│   │   │   ├── App.tsx    # Main application component
│   │   │   └── App-simple.tsx # Simplified view
│   │   ├── stores/        # State management
│   │   │   └── tactiMeshStore.ts # Zustand store
│   │   └── main.tsx       # Renderer entry point
│   ├── package.json       # Node dependencies & build config
│   ├── tsconfig.json      # TypeScript configuration
│   ├── vite.config.ts     # Vite configuration
│   └── tailwind.config.js # Tailwind CSS configuration
├── backend/               # Python backend services
│   └── app/
│       ├── main.py        # FastAPI application
│       └── requirements.txt
├── Makefile              # Build automation & commands
├── README.md             # Project documentation
├── .gitignore            # Git ignore rules
└── docker-compose.yml    # Container orchestration
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

### Makefile Commands

The project includes a comprehensive Makefile for easy development:

```bash
# Development
make dev              # Start in development mode with hot-reload
make dev-frontend     # Start only frontend in dev mode
make dev-backend      # Start only backend in dev mode

# Building
make build            # Build for production
make build:mac        # Build for macOS
make build:win        # Build for Windows
make build:linux      # Build for Linux

# Maintenance
make clean            # Clean build artifacts
make clean-all        # Deep clean (including node_modules)
make install          # Install all dependencies
make status           # Check project status
make version          # Show current version

# Testing & Quality
make test             # Run tests
make lint             # Run linters
make format           # Format code

# Git Helpers
make push             # Quick git add, commit, and push
make pull             # Pull latest changes

# View all commands
make help             # Show all available commands with descriptions
```

### NPM Scripts

For direct npm usage in the electron-app directory:

```bash
npm run dev           # Start Vite dev server
npm run build         # Build for production
npm run electron      # Start Electron (waits for dev server)
npm run electron:dev  # Start both Vite and Electron
npm run preview       # Preview production build
npm run test          # Run tests
npm run lint          # Run linter
npm run format        # Format code
```

### Code Style
- ESLint configuration for TypeScript (planned)
- Prettier for code formatting (planned)
- Pre-commit hooks with Husky (recommended setup)

### Testing
```bash
make test             # Run all tests
make lint             # Check code style
make format           # Auto-format code
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

### Desktop Application Builds

Use Make commands for easy platform-specific builds:

```bash
# Build for current platform
make build

# Platform-specific builds
make build:mac      # Build for macOS (.dmg)
make build:win      # Build for Windows (.exe installer)
make build:linux    # Build for Linux (.AppImage)

# Clean and rebuild
make clean && make build
```

### Manual Build Process

If not using Make, from the electron-app directory:

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
# Using Make
make docker-build   # Build Docker images
make docker-up      # Start services
make docker-down    # Stop services

# Manual Docker commands
docker-compose build
docker-compose up -d
docker-compose down
```

### Release Process

1. Update version in `electron-app/package.json`
2. Build for all platforms:
   ```bash
   make clean
   make build:mac
   make build:win
   make build:linux
   ```
3. Test builds on each platform
4. Create GitHub release with built artifacts

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

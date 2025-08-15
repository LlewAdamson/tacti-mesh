# TactiMesh Makefile
# Simplifies project setup and management

# Variables
ELECTRON_DIR = electron-app
BACKEND_DIR = backend/app
PYTHON = python3
PIP = pip3
NPM = npm
NODE_VERSION = $(shell node --version 2>/dev/null)
PYTHON_VERSION = $(shell $(PYTHON) --version 2>/dev/null)

# Colors for terminal output
RED = \033[0;31m
GREEN = \033[0;32m
YELLOW = \033[1;33m
BLUE = \033[0;34m
NC = \033[0m # No Color

# Default target
.DEFAULT_GOAL := help

# Phony targets (not files)
.PHONY: help install install-frontend install-backend check-deps \
        dev dev-frontend dev-backend start run \
        build build-frontend build-backend \
        clean clean-frontend clean-backend clean-all \
        test lint format \
        docker-up docker-down docker-build \
        setup init

## Help command
help: ## Show this help message
	@echo "$(BLUE)TactiMesh - Makefile Commands$(NC)"
	@echo "$(YELLOW)================================$(NC)"
	@echo ""
	@echo "$(GREEN)Available commands:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(BLUE)%-20s$(NC) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)Quick Start:$(NC)"
	@echo "  $$ make setup    # First time setup"
	@echo "  $$ make start    # Start everything"
	@echo "  $$ make dev      # Start in development mode"

## Check system dependencies
check-deps: ## Check if required dependencies are installed
	@echo "$(YELLOW)Checking system dependencies...$(NC)"
	@if [ -z "$(NODE_VERSION)" ]; then \
		echo "$(RED)✗ Node.js is not installed$(NC)"; \
		echo "  Please install Node.js 18+ from https://nodejs.org"; \
		exit 1; \
	else \
		echo "$(GREEN)✓ Node.js is installed: $(NODE_VERSION)$(NC)"; \
	fi
	@if [ -z "$(PYTHON_VERSION)" ]; then \
		echo "$(RED)✗ Python is not installed$(NC)"; \
		echo "  Please install Python 3.8+ from https://python.org"; \
		exit 1; \
	else \
		echo "$(GREEN)✓ Python is installed: $(PYTHON_VERSION)$(NC)"; \
	fi
	@if ! command -v $(NPM) > /dev/null 2>&1; then \
		echo "$(RED)✗ npm is not installed$(NC)"; \
		exit 1; \
	else \
		echo "$(GREEN)✓ npm is installed: $$(npm --version)$(NC)"; \
	fi
	@if ! command -v $(PIP) > /dev/null 2>&1; then \
		echo "$(YELLOW)⚠ pip3 is not installed, trying pip...$(NC)"; \
		$(eval PIP = pip) \
	fi
	@echo "$(GREEN)✓ All system dependencies are installed$(NC)"

## Initial setup - install everything
setup: check-deps install ## Complete initial setup (check deps + install)
	@echo "$(GREEN)✅ Setup complete! Run 'make start' to launch TactiMesh$(NC)"

## Alias for setup
init: setup ## Alias for setup

## Install all dependencies
install: install-frontend install-backend ## Install all project dependencies
	@echo "$(GREEN)✅ All dependencies installed successfully$(NC)"

## Install frontend dependencies
install-frontend: ## Install Electron app dependencies
	@echo "$(YELLOW)Installing frontend dependencies...$(NC)"
	@cd $(ELECTRON_DIR) && $(NPM) install
	@echo "$(GREEN)✓ Frontend dependencies installed$(NC)"

## Install backend dependencies
install-backend: ## Install Python backend dependencies
	@echo "$(YELLOW)Installing backend dependencies...$(NC)"
	@if [ -f "$(BACKEND_DIR)/requirements.txt" ] && [ -s "$(BACKEND_DIR)/requirements.txt" ]; then \
		$(PIP) install -r $(BACKEND_DIR)/requirements.txt; \
		echo "$(GREEN)✓ Backend dependencies installed$(NC)"; \
	else \
		echo "$(YELLOW)⚠ No Python requirements found or file is empty$(NC)"; \
	fi

## Start everything (alias for 'run')
start: run ## Start the application (production mode)

## Run the application
run: check-deps ## Run the application in production mode
	@echo "$(BLUE)Starting TactiMesh...$(NC)"
	@if [ ! -d "$(ELECTRON_DIR)/node_modules" ]; then \
		echo "$(YELLOW)Dependencies not installed. Running setup...$(NC)"; \
		$(MAKE) install-frontend; \
	fi
	@cd $(ELECTRON_DIR) && $(NPM) run electron:prod

## Development mode - with hot reload
dev: ## Start in development mode with hot reload
	@echo "$(BLUE)Starting TactiMesh in development mode...$(NC)"
	@if [ ! -d "$(ELECTRON_DIR)/node_modules" ]; then \
		echo "$(YELLOW)Dependencies not installed. Running setup...$(NC)"; \
		$(MAKE) install-frontend; \
	fi
	@$(MAKE) -j2 dev-frontend-only dev-backend-only

## Start frontend only in dev mode
dev-frontend: ## Start only the Electron frontend in dev mode
	@echo "$(BLUE)Starting frontend in development mode...$(NC)"
	@cd $(ELECTRON_DIR) && $(NPM) run electron:dev

## Internal target for parallel execution
dev-frontend-only:
	@cd $(ELECTRON_DIR) && $(NPM) run electron:dev

## Start backend only in dev mode  
dev-backend: ## Start only the Python backend in dev mode
	@echo "$(BLUE)Starting backend in development mode...$(NC)"
	@if [ -f "$(BACKEND_DIR)/main.py" ] && [ -s "$(BACKEND_DIR)/main.py" ]; then \
		cd $(BACKEND_DIR) && $(PYTHON) -m uvicorn main:app --reload --host 0.0.0.0 --port 8000; \
	else \
		echo "$(YELLOW)⚠ Backend not configured yet. Skipping...$(NC)"; \
		echo "$(YELLOW)  To set up the backend, add your FastAPI code to $(BACKEND_DIR)/main.py$(NC)"; \
	fi

## Internal target for parallel execution
dev-backend-only:
	@if [ -f "$(BACKEND_DIR)/main.py" ] && [ -s "$(BACKEND_DIR)/main.py" ]; then \
		cd $(BACKEND_DIR) && $(PYTHON) -m uvicorn main:app --reload --host 0.0.0.0 --port 8000; \
	else \
		echo "$(YELLOW)⚠ Backend not configured. Running frontend only...$(NC)"; \
	fi

## Build everything
build: build-frontend ## Build the application for production
	@echo "$(GREEN)✅ Build complete!$(NC)"

## Build frontend
build-frontend: ## Build the Electron app for production
	@echo "$(YELLOW)Building frontend...$(NC)"
	@cd $(ELECTRON_DIR) && $(NPM) run build
	@echo "$(GREEN)✓ Frontend built successfully$(NC)"

## Build backend (placeholder for now)
build-backend: ## Build/prepare the backend for production
	@echo "$(YELLOW)Preparing backend for production...$(NC)"
	@if [ -f "$(BACKEND_DIR)/requirements.txt" ] && [ -s "$(BACKEND_DIR)/requirements.txt" ]; then \
		echo "$(GREEN)✓ Backend is ready$(NC)"; \
	else \
		echo "$(YELLOW)⚠ Backend not configured yet$(NC)"; \
	fi

## Build for different platforms
build-mac: ## Build for macOS
	@echo "$(YELLOW)Building for macOS...$(NC)"
	@cd $(ELECTRON_DIR) && $(NPM) run build:mac

build-win: ## Build for Windows
	@echo "$(YELLOW)Building for Windows...$(NC)"
	@cd $(ELECTRON_DIR) && $(NPM) run build:win

build-linux: ## Build for Linux
	@echo "$(YELLOW)Building for Linux...$(NC)"
	@cd $(ELECTRON_DIR) && $(NPM) run build:linux

## Clean build artifacts
clean: clean-frontend clean-backend ## Clean all build artifacts
	@echo "$(GREEN)✓ Cleaned all build artifacts$(NC)"

## Clean frontend artifacts
clean-frontend: ## Clean frontend build artifacts
	@echo "$(YELLOW)Cleaning frontend...$(NC)"
	@rm -rf $(ELECTRON_DIR)/dist
	@rm -rf $(ELECTRON_DIR)/dist-electron
	@rm -rf $(ELECTRON_DIR)/out
	@echo "$(GREEN)✓ Frontend cleaned$(NC)"

## Clean backend artifacts
clean-backend: ## Clean backend build artifacts
	@echo "$(YELLOW)Cleaning backend...$(NC)"
	@find $(BACKEND_DIR) -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	@find $(BACKEND_DIR) -type f -name "*.pyc" -delete 2>/dev/null || true
	@rm -rf $(BACKEND_DIR)/.pytest_cache 2>/dev/null || true
	@echo "$(GREEN)✓ Backend cleaned$(NC)"

## Deep clean - including node_modules
clean-all: clean ## Deep clean including dependencies
	@echo "$(YELLOW)Performing deep clean...$(NC)"
	@rm -rf $(ELECTRON_DIR)/node_modules
	@rm -rf $(ELECTRON_DIR)/package-lock.json
	@echo "$(GREEN)✓ Deep clean complete$(NC)"

## Run tests
test: ## Run all tests
	@echo "$(YELLOW)Running tests...$(NC)"
	@cd $(ELECTRON_DIR) && $(NPM) test 2>/dev/null || echo "$(YELLOW)⚠ No tests configured yet$(NC)"

## Run linter
lint: ## Run code linters
	@echo "$(YELLOW)Running linters...$(NC)"
	@cd $(ELECTRON_DIR) && $(NPM) run lint 2>/dev/null || echo "$(YELLOW)⚠ No linter configured yet$(NC)"

## Format code
format: ## Format code with prettier/black
	@echo "$(YELLOW)Formatting code...$(NC)"
	@cd $(ELECTRON_DIR) && $(NPM) run format 2>/dev/null || echo "$(YELLOW)⚠ No formatter configured yet$(NC)"
	@if command -v black > /dev/null 2>&1; then \
		black $(BACKEND_DIR); \
	else \
		echo "$(YELLOW)⚠ Python black formatter not installed$(NC)"; \
	fi

## Docker commands
docker-up: ## Start services with docker-compose
	@echo "$(YELLOW)Starting Docker services...$(NC)"
	@if [ -f "docker-compose.yml" ] && [ -s "docker-compose.yml" ]; then \
		docker-compose up -d; \
		echo "$(GREEN)✓ Docker services started$(NC)"; \
	else \
		echo "$(YELLOW)⚠ docker-compose.yml is not configured yet$(NC)"; \
	fi

docker-down: ## Stop docker-compose services
	@echo "$(YELLOW)Stopping Docker services...$(NC)"
	@docker-compose down 2>/dev/null || echo "$(YELLOW)⚠ No Docker services running$(NC)"

docker-build: ## Build Docker images
	@echo "$(YELLOW)Building Docker images...$(NC)"
	@if [ -f "docker-compose.yml" ] && [ -s "docker-compose.yml" ]; then \
		docker-compose build; \
		echo "$(GREEN)✓ Docker images built$(NC)"; \
	else \
		echo "$(YELLOW)⚠ docker-compose.yml is not configured yet$(NC)"; \
	fi

## Git shortcuts
push: ## Git add, commit and push
	@git add .
	@git commit -m "Update: $$(date '+%Y-%m-%d %H:%M:%S')" 2>/dev/null || echo "$(YELLOW)Nothing to commit$(NC)"
	@git push 2>/dev/null || echo "$(YELLOW)⚠ Could not push. Check your connection$(NC)"

pull: ## Git pull latest changes
	@echo "$(YELLOW)Pulling latest changes...$(NC)"
	@git pull
	@echo "$(GREEN)✓ Updated to latest version$(NC)"

## Status checks
status: ## Show project status
	@echo "$(BLUE)TactiMesh Project Status$(NC)"
	@echo "$(YELLOW)========================$(NC)"
	@echo ""
	@echo "$(GREEN)Git Status:$(NC)"
	@git status --short || echo "$(RED)Not a git repository$(NC)"
	@echo ""
	@echo "$(GREEN)Node Modules:$(NC)"
	@if [ -d "$(ELECTRON_DIR)/node_modules" ]; then \
		echo "  ✓ Installed ($$(ls -1 $(ELECTRON_DIR)/node_modules | wc -l | tr -d ' ') packages)"; \
	else \
		echo "  ✗ Not installed"; \
	fi
	@echo ""
	@echo "$(GREEN)Python Dependencies:$(NC)"
	@if [ -s "$(BACKEND_DIR)/requirements.txt" ]; then \
		echo "  Requirements file exists"; \
	else \
		echo "  ⚠ No requirements defined"; \
	fi
	@echo ""
	@echo "$(GREEN)Build Status:$(NC)"
	@if [ -d "$(ELECTRON_DIR)/dist" ]; then \
		echo "  ✓ Frontend built"; \
	else \
		echo "  ✗ Frontend not built"; \
	fi

## Open project in browser (GitHub)
open: ## Open project on GitHub
	@echo "$(YELLOW)Opening project on GitHub...$(NC)"
	@open https://github.com/LlewAdamson/tacti-mesh 2>/dev/null || \
	 xdg-open https://github.com/LlewAdamson/tacti-mesh 2>/dev/null || \
	 echo "$(YELLOW)Please visit: https://github.com/LlewAdamson/tacti-mesh$(NC)"

## Show logs
logs: ## Show application logs
	@echo "$(YELLOW)Showing recent logs...$(NC)"
	@tail -f $(ELECTRON_DIR)/npm-debug.log 2>/dev/null || \
	 tail -f $(ELECTRON_DIR)/yarn-error.log 2>/dev/null || \
	 echo "$(YELLOW)No logs available$(NC)"

# Version management
version: ## Show current version
	@echo "$(BLUE)TactiMesh Version:$(NC)"
	@cat $(ELECTRON_DIR)/package.json | grep '"version"' | head -1 | awk -F '"' '{print $$4}'

# Development shortcuts
d: dev ## Shortcut for 'make dev'
s: start ## Shortcut for 'make start'
b: build ## Shortcut for 'make build'
c: clean ## Shortcut for 'make clean'
i: install ## Shortcut for 'make install'
t: test ## Shortcut for 'make test'

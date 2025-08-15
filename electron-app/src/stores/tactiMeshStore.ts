import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// Types
export interface Node {
  id: string;
  name: string;
  type: 'command' | 'relay' | 'sensor' | 'local';
  status: 'online' | 'warning' | 'offline' | 'unknown';
  position?: {
    lat: number;
    lng: number;
  };
  metadata: {
    lastSeen: Date;
    signalStrength: number;
    batteryLevel?: number;
    version: string;
  };
}

export interface Link {
  source: string;
  target: string;
  strength: number;
  latency: number;
  status: 'active' | 'degraded' | 'inactive';
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'broadcast' | 'direct' | 'system';
  priority: 'low' | 'normal' | 'high' | 'critical';
  encrypted: boolean;
}

export interface NetworkState {
  nodes: Node[];
  links: Link[];
  messages: Message[];
  networkStatus: 'connected' | 'degraded' | 'disconnected';
  localNodeId: string;
  
  // Actions
  addNode: (node: Node) => void;
  updateNode: (id: string, updates: Partial<Node>) => void;
  removeNode: (id: string) => void;
  
  addLink: (link: Link) => void;
  updateLink: (source: string, target: string, updates: Partial<Link>) => void;
  removeLink: (source: string, target: string) => void;
  
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  sendDirectMessage: (targetNodeId: string, message: Omit<Message, 'id' | 'timestamp' | 'type'>) => { success: boolean; route?: string[] };
  clearMessages: () => void;
  
  setNetworkStatus: (status: NetworkState['networkStatus']) => void;
  
  // Computed
  getNodeById: (id: string) => Node | undefined;
  getActiveNodes: () => Node[];
  getRecentMessages: (limit?: number) => Message[];
}

export const useTactiMeshStore = create<NetworkState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    nodes: [
      {
        id: 'local',
        name: 'Command-01',
        type: 'local',
        status: 'online',
        metadata: {
          lastSeen: new Date(),
          signalStrength: 100,
          batteryLevel: 85,
          version: '1.0.0',
        },
      },
      {
        id: 'alpha',
        name: 'Alpha-Relay',
        type: 'relay',
        status: 'online',
        position: { lat: 40.7128, lng: -74.0060 },
        metadata: {
          lastSeen: new Date(Date.now() - 30000),
          signalStrength: 87,
          batteryLevel: 92,
          version: '1.0.0',
        },
      },
      {
        id: 'beta',
        name: 'Beta-Sensor',
        type: 'sensor',
        status: 'warning',
        position: { lat: 40.7589, lng: -73.9851 },
        metadata: {
          lastSeen: new Date(Date.now() - 120000),
          signalStrength: 65,
          batteryLevel: 23,
          version: '0.9.8',
        },
      },
      {
        id: 'gamma',
        name: 'Gamma-Command',
        type: 'command',
        status: 'online',
        position: { lat: 40.6892, lng: -74.0445 },
        metadata: {
          lastSeen: new Date(Date.now() - 10000),
          signalStrength: 91,
          batteryLevel: 78,
          version: '1.0.0',
        },
      },
    ],
    
    links: [
      { source: 'local', target: 'alpha', strength: 0.9, latency: 15, status: 'active' },
      { source: 'alpha', target: 'beta', strength: 0.6, latency: 45, status: 'degraded' },
      { source: 'alpha', target: 'gamma', strength: 0.8, latency: 25, status: 'active' },
      { source: 'local', target: 'gamma', strength: 0.85, latency: 20, status: 'active' },
    ],
    
    messages: [
      {
        id: '1',
        senderId: 'alpha',
        senderName: 'Alpha-Relay',
        content: 'Network initialization complete. All systems nominal.',
        timestamp: new Date(Date.now() - 300000),
        type: 'system',
        priority: 'normal',
        encrypted: false,
      },
      {
        id: '2',
        senderId: 'beta',
        senderName: 'Beta-Sensor',
        content: 'Low battery warning - 23% remaining',
        timestamp: new Date(Date.now() - 120000),
        type: 'system',
        priority: 'high',
        encrypted: false,
      },
      {
        id: '3',
        senderId: 'gamma',
        senderName: 'Gamma-Command',
        content: 'Perimeter secure. No hostile contacts detected.',
        timestamp: new Date(Date.now() - 60000),
        type: 'broadcast',
        priority: 'normal',
        encrypted: true,
      },
    ],
    
    networkStatus: 'connected',
    localNodeId: 'local',
    
    // Actions
    addNode: (node) => set((state) => ({
      nodes: [...state.nodes, node],
    })),
    
    updateNode: (id, updates) => set((state) => ({
      nodes: state.nodes.map(node => 
        node.id === id ? { ...node, ...updates } : node
      ),
    })),
    
    removeNode: (id) => set((state) => ({
      nodes: state.nodes.filter(node => node.id !== id),
      links: state.links.filter(link => 
        link.source !== id && link.target !== id
      ),
    })),
    
    addLink: (link) => set((state) => ({
      links: [...state.links, link],
    })),
    
    updateLink: (source, target, updates) => set((state) => ({
      links: state.links.map(link =>
        (link.source === source && link.target === target) ||
        (link.source === target && link.target === source)
          ? { ...link, ...updates }
          : link
      ),
    })),
    
    removeLink: (source, target) => set((state) => ({
      links: state.links.filter(link =>
        !((link.source === source && link.target === target) ||
          (link.source === target && link.target === source))
      ),
    })),
    
    addMessage: (message) => set((state) => ({
      messages: [...state.messages, {
        ...message,
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
      }],
    })),
    
    sendDirectMessage: (targetNodeId, message) => {
      const state = get();
      const targetNode = state.getNodeById(targetNodeId);
      const localNode = state.getNodeById(state.localNodeId);
      
      if (!targetNode || !localNode) {
        return { success: false };
      }
      
      // Check if target is online
      if (targetNode.status === 'offline') {
        // Add system message about offline node
        state.addMessage({
          senderId: 'system',
          senderName: 'System',
          content: `❌ Cannot send message to ${targetNode.name}: Node is offline`,
          type: 'system',
          priority: 'high',
          encrypted: false,
        });
        return { success: false };
      }
      
      // Check if there's a direct link
      const directLink = state.links.find(link => 
        (link.source === state.localNodeId && link.target === targetNodeId) ||
        (link.source === targetNodeId && link.target === state.localNodeId)
      );
      
      if (directLink && directLink.status === 'active') {
        // Direct connection available
        state.addMessage({
          ...message,
          type: 'direct',
          content: `[Direct] ${message.content}`,
        });
        return { success: true, route: [localNode.name, targetNode.name] };
      }
      
      // Try to find a route through relay nodes
      const relayNodes = state.nodes.filter(n => 
        n.type === 'relay' && n.status === 'online' && n.id !== state.localNodeId && n.id !== targetNodeId
      );
      
      for (const relay of relayNodes) {
        const toRelay = state.links.find(link => 
          (link.source === state.localNodeId && link.target === relay.id) ||
          (link.source === relay.id && link.target === state.localNodeId)
        );
        
        const fromRelay = state.links.find(link => 
          (link.source === relay.id && link.target === targetNodeId) ||
          (link.source === targetNodeId && link.target === relay.id)
        );
        
        if (toRelay?.status === 'active' && fromRelay?.status === 'active') {
          // Found a route through relay
          state.addMessage({
            ...message,
            type: 'direct',
            content: `[Via ${relay.name}] ${message.content}`,
          });
          
          // Add routing info message
          state.addMessage({
            senderId: 'system',
            senderName: 'System',
            content: `📡 Message routed to ${targetNode.name} via ${relay.name}`,
            type: 'system',
            priority: 'low',
            encrypted: false,
          });
          
          return { success: true, route: [localNode.name, relay.name, targetNode.name] };
        }
      }
      
      // No route found
      state.addMessage({
        senderId: 'system',
        senderName: 'System',
        content: `❌ Routing failed: No mesh route available to ${targetNode.name}`,
        type: 'system',
        priority: 'high',
        encrypted: false,
      });
      
      return { success: false };
    },
    
    clearMessages: () => set({ messages: [] }),
    
    setNetworkStatus: (status) => set({ networkStatus: status }),
    
    // Computed
    getNodeById: (id) => get().nodes.find(node => node.id === id),
    
    getActiveNodes: () => get().nodes.filter(node => 
      node.status === 'online' || node.status === 'warning'
    ),
    
    getRecentMessages: (limit = 10) => 
      get().messages
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, limit),
  }))
);

// Auto-update node status based on last seen
setInterval(() => {
  const store = useTactiMeshStore.getState();
  const now = new Date();
  
  store.nodes.forEach(node => {
    if (node.id === store.localNodeId) return; // Skip local node
    
    const timeSinceLastSeen = now.getTime() - node.metadata.lastSeen.getTime();
    let newStatus: Node['status'] = node.status;
    
    if (timeSinceLastSeen > 300000) { // 5 minutes
      newStatus = 'offline';
    } else if (timeSinceLastSeen > 120000) { // 2 minutes
      newStatus = 'warning';
    } else if (node.metadata.batteryLevel && node.metadata.batteryLevel < 25) {
      newStatus = 'warning';
    } else {
      newStatus = 'online';
    }
    
    if (newStatus !== node.status) {
      store.updateNode(node.id, { status: newStatus });
    }
  });
}, 30000); // Check every 30 seconds

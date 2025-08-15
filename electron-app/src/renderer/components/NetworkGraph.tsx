import React, { useRef, useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { useTactiMeshStore, Node as TactiNode, Link } from '../../stores/tactiMeshStore';

interface GraphNode extends TactiNode {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;
}

interface GraphLink extends Link {
  source: string | GraphNode;
  target: string | GraphNode;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

const NetworkGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  
  const nodes = useTactiMeshStore((state) => state.nodes);
  const links = useTactiMeshStore((state) => state.links);
  const localNodeId = useTactiMeshStore((state) => state.localNodeId);
  const updateNode = useTactiMeshStore((state) => state.updateNode);
  
  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  const getNodeColor = (node: GraphNode) => {
    if (node.id === localNodeId) return '#3b82f6'; // Local node - blue
    
    switch (node.status) {
      case 'online': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'offline': return '#ef4444';
      default: return '#6b7280';
    }
  };
  
  const getNodeSize = (node: GraphNode) => {
    if (node.id === localNodeId) return 12;
    switch (node.type) {
      case 'command': return 10;
      case 'relay': return 8;
      case 'sensor': return 6;
      default: return 8;
    }
  };
  
  const getLinkColor = (link: GraphLink) => {
    switch (link.status) {
      case 'active': return '#4a4a4b';
      case 'degraded': return '#f59e0b';
      case 'inactive': return '#ef4444';
      default: return '#3a3a3b';
    }
  };
  
  const getLinkWidth = (link: GraphLink) => {
    return Math.max(1, link.strength * 3);
  };
  
  const graphData: GraphData = {
    nodes: nodes as GraphNode[],
    links: links as GraphLink[]
  };
  
  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
    // Center the graph on the clicked node
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 1000);
    }
  };
  
  const handleNodeDrag = (node: GraphNode) => {
    // Update node position in store if needed
    if (node.position && node.x !== undefined && node.y !== undefined) {
      updateNode(node.id, {
        position: {
          lat: node.position.lat,
          lng: node.position.lng
        }
      });
    }
  };
  
  return (
    <div className="h-full w-full relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-military-dark-800/90 backdrop-blur-sm border-b border-military-dark-600 p-4">
        <h2 className="text-tactical-header text-lg mb-2">Network Topology</h2>
        <div className="flex items-center space-x-6 text-tactical-body">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-tactical-blue-500 rounded-full" />
            <span>Command</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-status-online rounded-full" />
            <span>Online</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-status-warning rounded-full" />
            <span>Warning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-status-offline rounded-full" />
            <span>Offline</span>
          </div>
        </div>
      </div>
      
      {/* Force Graph */}
      <div ref={containerRef} className="h-full w-full pt-20">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height - 80}
          backgroundColor="#0a0a0b"
          
          // Node styling
          nodeColor={getNodeColor}
          nodeVal={getNodeSize}
          nodeLabel={(node: GraphNode) => `
            <div class="bg-military-dark-800 text-military-gray-300 p-2 rounded border border-military-dark-600 font-mono text-xs">
              <div class="font-bold">${node.name}</div>
              <div>Type: ${node.type}</div>
              <div>Status: ${node.status}</div>
              <div>Signal: ${node.metadata.signalStrength}%</div>
              ${node.metadata.batteryLevel ? `<div>Battery: ${node.metadata.batteryLevel}%</div>` : ''}
              <div>Last Seen: ${node.metadata.lastSeen.toLocaleTimeString()}</div>
            </div>
          `}
          nodeCanvasObject={(node: GraphNode, ctx, globalScale) => {
            const label = node.name;
            const fontSize = Math.max(8, 12 / globalScale);
            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Draw node circle
            ctx.beginPath();
            ctx.arc(node.x!, node.y!, getNodeSize(node), 0, 2 * Math.PI, false);
            ctx.fillStyle = getNodeColor(node);
            ctx.fill();
            
            // Draw border for local node
            if (node.id === localNodeId) {
              ctx.strokeStyle = '#60a5fa';
              ctx.lineWidth = 2;
              ctx.stroke();
            }
            
            // Draw label
            ctx.fillStyle = '#d1d5db';
            ctx.fillText(label, node.x!, node.y! + getNodeSize(node) + fontSize + 2);
            
            // Draw status indicator
            if (node.status === 'warning' || node.status === 'offline') {
              ctx.beginPath();
              ctx.arc(node.x! + getNodeSize(node) - 2, node.y! - getNodeSize(node) + 2, 3, 0, 2 * Math.PI, false);
              ctx.fillStyle = node.status === 'warning' ? '#f59e0b' : '#ef4444';
              ctx.fill();
            }
          }}
          
          // Link styling
          linkColor={getLinkColor}
          linkWidth={getLinkWidth}
          linkLabel={(link: GraphLink) => `
            <div class="bg-military-dark-800 text-military-gray-300 p-2 rounded border border-military-dark-600 font-mono text-xs">
              <div>Connection: ${typeof link.source === 'string' ? link.source : link.source.name} ↔ ${typeof link.target === 'string' ? link.target : link.target.name}</div>
              <div>Strength: ${Math.round(link.strength * 100)}%</div>
              <div>Latency: ${link.latency}ms</div>
              <div>Status: ${link.status}</div>
            </div>
          `}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={0.006}
          linkDirectionalParticleWidth={2}
          linkDirectionalParticleColor={() => '#4a4a4b'}
          
          // Interactions
          onNodeClick={handleNodeClick}
          onNodeDragEnd={handleNodeDrag}
          
          // Physics
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          warmupTicks={100}
          cooldownTicks={0}
        />
      </div>
      
      {/* Selected Node Panel */}
      {selectedNode && (
        <div className="absolute top-24 right-4 w-64 panel-tactical p-4 z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-tactical-header text-sm">Node Details</h3>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-military-gray-400 hover:text-military-gray-300"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-2 text-tactical-body">
            <div><span className="text-military-gray-400">Name:</span> {selectedNode.name}</div>
            <div><span className="text-military-gray-400">Type:</span> {selectedNode.type}</div>
            <div>
              <span className="text-military-gray-400">Status:</span>
              <span className={`ml-2 ${
                selectedNode.status === 'online' ? 'status-online' :
                selectedNode.status === 'warning' ? 'status-warning' :
                selectedNode.status === 'offline' ? 'status-offline' :
                'status-unknown'
              }`}>
                {selectedNode.status.toUpperCase()}
              </span>
            </div>
            <div><span className="text-military-gray-400">Signal:</span> {selectedNode.metadata.signalStrength}%</div>
            {selectedNode.metadata.batteryLevel && (
              <div><span className="text-military-gray-400">Battery:</span> {selectedNode.metadata.batteryLevel}%</div>
            )}
            <div><span className="text-military-gray-400">Version:</span> {selectedNode.metadata.version}</div>
            <div><span className="text-military-gray-400">Last Seen:</span> {selectedNode.metadata.lastSeen.toLocaleString()}</div>
            {selectedNode.position && (
              <div>
                <span className="text-military-gray-400">Position:</span>
                <div className="ml-2 text-xs">
                  Lat: {selectedNode.position.lat.toFixed(4)}<br />
                  Lng: {selectedNode.position.lng.toFixed(4)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkGraph;

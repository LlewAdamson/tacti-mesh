import React, { useState, useEffect } from 'react';
import { useTactiMeshStore } from '../../stores/tactiMeshStore';

const StatusBar: React.FC = () => {
  const [uptime, setUptime] = useState('00:00:00');
  const [startTime] = useState(new Date());
  
  const networkStatus = useTactiMeshStore((state) => state.networkStatus);
  const nodes = useTactiMeshStore((state) => state.nodes);
  const activeNodes = useTactiMeshStore((state) => state.getActiveNodes());
  const messages = useTactiMeshStore((state) => state.messages);
  const localNodeId = useTactiMeshStore((state) => state.localNodeId);
  const getNodeById = useTactiMeshStore((state) => state.getNodeById);
  
  const localNode = getNodeById(localNodeId);
  
  // Update uptime every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setUptime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startTime]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-status-online';
      case 'degraded': return 'text-status-warning';
      case 'disconnected': return 'text-status-offline';
      default: return 'text-status-unknown';
    }
  };
  
  const getStatusDot = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-status-online';
      case 'degraded': return 'bg-status-warning';
      case 'disconnected': return 'bg-status-offline';
      default: return 'bg-status-unknown';
    }
  };
  
  return (
    <div className="bg-military-dark-900 border-t border-military-dark-600 px-6 py-3 flex items-center justify-between text-tactical-body">
      {/* Left section */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getStatusDot(networkStatus)} animate-pulse-slow`} />
          <span className={getStatusColor(networkStatus)}>Network: {networkStatus.toUpperCase()}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span>Nodes: {activeNodes.length}/{nodes.length}</span>
          <span>Messages: {messages.length}</span>
          {localNode && (
            <span>Signal: {localNode.metadata.signalStrength}%</span>
          )}
        </div>
      </div>
      
      {/* Center section */}
      <div className="flex items-center space-x-4">
        <span>Tacti-Mesh-Alpha</span>
        {localNode?.metadata.batteryLevel && (
          <div className="flex items-center space-x-1">
            <span>Battery:</span>
            <div className="w-6 h-3 border border-military-dark-600 rounded-sm relative">
              <div 
                className={`h-full rounded-sm transition-all duration-300 ${
                  localNode.metadata.batteryLevel > 50 ? 'bg-status-online' :
                  localNode.metadata.batteryLevel > 25 ? 'bg-status-warning' :
                  'bg-status-offline'
                }`}
                style={{ width: `${localNode.metadata.batteryLevel}%` }}
              />
            </div>
            <span className="text-xs">{localNode.metadata.batteryLevel}%</span>
          </div>
        )}
      </div>
      
      {/* Right section */}
      <div className="flex items-center space-x-4">
        <span>Uptime: {uptime}</span>
        <span>v{localNode?.metadata.version || '1.0.0'}</span>
        <div className={`w-3 h-3 rounded-full ${getStatusDot(networkStatus)} animate-ping-slow`} />
      </div>
    </div>
  );
};

export default StatusBar;

import React, { useState, useEffect } from 'react';
import { useTactiMeshStore } from '../../stores/tactiMeshStore';

const CommsPanel: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'normal' | 'high' | 'critical'>('normal');
  const [isEncrypted, setIsEncrypted] = useState(true);
  
  const messages = useTactiMeshStore((state) => state.getRecentMessages(50));
  const addMessage = useTactiMeshStore((state) => state.addMessage);
  const localNodeId = useTactiMeshStore((state) => state.localNodeId);
  const getNodeById = useTactiMeshStore((state) => state.getNodeById);
  
  const localNode = getNodeById(localNodeId);
  
  const sendMessage = () => {
    if (newMessage.trim() && localNode) {
      addMessage({
        senderId: localNodeId,
        senderName: localNode.name,
        content: newMessage.trim(),
        type: 'broadcast',
        priority: selectedPriority,
        encrypted: isEncrypted,
      });
      setNewMessage('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-amber-400';
      case 'normal': return 'text-military-gray-300';
      case 'low': return 'text-military-gray-400';
      default: return 'text-military-gray-300';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'system': return '⚙️';
      case 'broadcast': return '📡';
      case 'direct': return '💬';
      default: return '📨';
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-military-dark-600">
        <h3 className="text-tactical-header text-lg mb-2">Communications</h3>
        <div className="flex items-center justify-between text-tactical-body">
          <span>Messages: {messages.length}</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-status-online rounded-full" />
            <span>Secure Channel</span>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="panel-tactical p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs">{getTypeIcon(msg.type)}</span>
                <span className="text-tactical-body font-semibold">{msg.senderName}</span>
                {msg.encrypted && (
                  <div className="w-3 h-3 bg-tactical-green-500 rounded-full" title="Encrypted" />
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-military-gray-400">
                <span className={getPriorityColor(msg.priority)}>
                  {msg.priority.toUpperCase()}
                </span>
                <span>{msg.timestamp.toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="text-tactical-body">{msg.content}</div>
          </div>
        ))}
        
        {messages.length === 0 && (
          <div className="text-center text-military-gray-400 text-tactical-body py-8">
            No messages yet. Start a conversation.
          </div>
        )}
      </div>
      
      {/* Message Input */}
      <div className="p-4 border-t border-military-dark-600 space-y-3">
        {/* Message options */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-1">
              <span className="text-military-gray-400">Priority:</span>
              <select 
                value={selectedPriority} 
                onChange={(e) => setSelectedPriority(e.target.value as any)}
                className="input-tactical py-1 px-2 text-xs"
              >
                <option value="low">LOW</option>
                <option value="normal">NORMAL</option>
                <option value="high">HIGH</option>
                <option value="critical">CRITICAL</option>
              </select>
            </label>
            
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={isEncrypted}
                onChange={(e) => setIsEncrypted(e.target.checked)}
                className="rounded"
              />
              <span className="text-military-gray-400">Encrypt</span>
            </label>
          </div>
        </div>
        
        {/* Message input */}
        <div className="flex space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type secure message..."
            className="input-tactical flex-1 resize-none h-10"
            rows={1}
          />
          <button 
            onClick={sendMessage} 
            disabled={!newMessage.trim()}
            className="btn-tactical px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommsPanel;

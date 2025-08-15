import React from 'react';

function App() {
  // Generate random terrain features
  const [terrain, setTerrain] = React.useState(() => {
    const generateTerrain = () => {
      const features: {
        hills: { cx: number; cy: number; rx: number; ry: number; opacity: number; }[];
        rivers: { path: string; width: number; opacity: number; }[];
        forests: { cx: number; cy: number; r: number; opacity: number; }[];
        contours: { cx: number; cy: number; rx: number; ry: number; opacity: number; }[];
        roads: { path: string; width: number; opacity: number; }[];
        streets: { path: string; width: number; opacity: number; }[];
        pathways: { path: string; width: number; opacity: number; }[];
        hospitals: { x: number; y: number; width: number; height: number; id: string; }[];
        buildings: { x: number; y: number; width: number; height: number; type: string; }[];
        airports: { x: number; y: number; width: number; height: number; runwayPath: string; id: string; }[];
        bridges: { x: number; y: number; width: number; height: number; orientation: string; }[];
        fuelDepots: { x: number; y: number; tanks: number; id: string; }[];
        towers: { x: number; y: number; height: number; type: string; id: string; }[];
        compounds: { x: number; y: number; width: number; height: number; id: string; fencePath: string; }[];
      } = {
        hills: [],
        rivers: [],
        forests: [],
        contours: [],
        roads: [],
        streets: [],
        pathways: [],
        hospitals: [],
        buildings: [],
        airports: [],
        bridges: [],
        fuelDepots: [],
        towers: [],
        compounds: []
      };
      
      // Generate random hills (3-8 hills)
      const hillCount = Math.floor(Math.random() * 6) + 3;
      for (let i = 0; i < hillCount; i++) {
        features.hills.push({
          cx: Math.random() * 1200 + 100,
          cy: Math.random() * 700 + 100,
          rx: Math.random() * 100 + 60,
          ry: Math.random() * 60 + 40,
          opacity: Math.random() * 0.2 + 0.25
        });
      }
      
      // Generate random rivers (1-3 rivers)
      const riverCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < riverCount; i++) {
        const startX = Math.random() * 200;
        const startY = Math.random() * 900;
        const midX = Math.random() * 600 + 200;
        const midY = Math.random() * 600 + 150;
        const endX = Math.random() * 400 + 1000;
        const endY = Math.random() * 900;
        
        features.rivers.push({
          path: `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`,
          width: Math.random() * 8 + 4,
          opacity: Math.random() * 0.3 + 0.4
        });
      }
      
      // Generate random forests (4-12 forest patches)
      const forestCount = Math.floor(Math.random() * 9) + 4;
      for (let i = 0; i < forestCount; i++) {
        features.forests.push({
          cx: Math.random() * 1200 + 100,
          cy: Math.random() * 700 + 100,
          r: Math.random() * 40 + 25,
          opacity: Math.random() * 0.2 + 0.3
        });
      }
      
      // Generate elevation contours for each hill
      features.hills.forEach(hill => {
        // Outer contour
        features.contours.push({
          cx: hill.cx,
          cy: hill.cy,
          rx: hill.rx + 30,
          ry: hill.ry + 20,
          opacity: 0.25
        });
        // Inner contour
        features.contours.push({
          cx: hill.cx,
          cy: hill.cy,
          rx: hill.rx - 15,
          ry: hill.ry - 10,
          opacity: 0.35
        });
      });
      
      // Generate main roads (2-4 major roads)
      const roadCount = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < roadCount; i++) {
        const isHorizontal = Math.random() > 0.5;
        if (isHorizontal) {
          const y = Math.random() * 600 + 150;
          features.roads.push({
            path: `M 0 ${y} L 1400 ${y}`,
            width: Math.random() * 4 + 8,
            opacity: 0.7
          });
        } else {
          const x = Math.random() * 1000 + 200;
          features.roads.push({
            path: `M ${x} 0 L ${x} 900`,
            width: Math.random() * 4 + 8,
            opacity: 0.7
          });
        }
      }
      
      // Generate secondary streets (4-8 streets)
      const streetCount = Math.floor(Math.random() * 5) + 4;
      for (let i = 0; i < streetCount; i++) {
        const startX = Math.random() * 1200 + 100;
        const startY = Math.random() * 700 + 100;
        const endX = Math.random() * 1200 + 100;
        const endY = Math.random() * 700 + 100;
        
        features.streets.push({
          path: `M ${startX} ${startY} L ${endX} ${endY}`,
          width: Math.random() * 2 + 4,
          opacity: 0.6
        });
      }
      
      // Generate pathways/trails (6-12 pathways)
      const pathwayCount = Math.floor(Math.random() * 7) + 6;
      for (let i = 0; i < pathwayCount; i++) {
        const startX = Math.random() * 1300 + 50;
        const startY = Math.random() * 800 + 50;
        const midX = Math.random() * 1300 + 50;
        const midY = Math.random() * 800 + 50;
        const endX = Math.random() * 1300 + 50;
        const endY = Math.random() * 800 + 50;
        
        features.pathways.push({
          path: `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`,
          width: Math.random() * 1.5 + 1.5,
          opacity: 0.4
        });
      }
      
      // Generate hospitals (1-3 hospitals)
      const hospitalCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < hospitalCount; i++) {
        features.hospitals.push({
          x: Math.random() * 1200 + 100,
          y: Math.random() * 700 + 100,
          width: Math.random() * 40 + 80,
          height: Math.random() * 30 + 60,
          id: `H${i + 1}`
        });
      }
      
      // Generate buildings (8-20 buildings)
      const buildingCount = Math.floor(Math.random() * 13) + 8;
      for (let i = 0; i < buildingCount; i++) {
        features.buildings.push({
          x: Math.random() * 1250 + 75,
          y: Math.random() * 750 + 75,
          width: Math.random() * 30 + 20,
          height: Math.random() * 25 + 15,
          type: Math.random() > 0.7 ? 'commercial' : 'residential'
        });
      }
      
      // Generate airports (0-2 airports - rare)
      const airportCount = Math.random() > 0.3 ? 0 : Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < airportCount; i++) {
        const x = Math.random() * 800 + 300;
        const y = Math.random() * 500 + 200;
        features.airports.push({
          x: x,
          y: y,
          width: Math.random() * 100 + 200,
          height: Math.random() * 60 + 80,
          runwayPath: `M ${x - 100} ${y + 40} L ${x + 300} ${y + 40}`,
          id: `APT${i + 1}`
        });
      }
      
      // Generate bridges (2-6 bridges)
      const bridgeCount = Math.floor(Math.random() * 5) + 2;
      for (let i = 0; i < bridgeCount; i++) {
        const x = Math.random() * 1200 + 100;
        const y = Math.random() * 700 + 100;
        const isHorizontal = Math.random() > 0.5;
        
        features.bridges.push({
          x: x,
          y: y,
          width: isHorizontal ? Math.random() * 40 + 60 : Math.random() * 15 + 10,
          height: isHorizontal ? Math.random() * 15 + 10 : Math.random() * 40 + 60,
          orientation: isHorizontal ? 'horizontal' : 'vertical'
        });
      }
      
      // Generate fuel depots (1-4 fuel depots)
      const fuelDepotCount = Math.floor(Math.random() * 4) + 1;
      for (let i = 0; i < fuelDepotCount; i++) {
        const x = Math.random() * 1200 + 100;
        const y = Math.random() * 700 + 100;
        features.fuelDepots.push({
          x: x,
          y: y,
          tanks: Math.floor(Math.random() * 6) + 3, // 3-8 tanks
          id: `FUEL${i + 1}`
        });
      }
      
      // Generate communication towers (2-8 towers)
      const towerCount = Math.floor(Math.random() * 7) + 2;
      for (let i = 0; i < towerCount; i++) {
        features.towers.push({
          x: Math.random() * 1300 + 50,
          y: Math.random() * 800 + 50,
          height: Math.random() * 30 + 40,
          type: Math.random() > 0.7 ? 'radio' : 'cell',
          id: `TWR${i + 1}`
        });
      }
      
      // Generate military compounds (1-3 compounds)
      const compoundCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < compoundCount; i++) {
        const x = Math.random() * 1000 + 200;
        const y = Math.random() * 600 + 150;
        features.compounds.push({
          x: x,
          y: y,
          width: Math.random() * 80 + 120,
          height: Math.random() * 60 + 100,
          id: `BASE${i + 1}`,
          fencePath: `M ${x - 10} ${y - 10} L ${x + 130} ${y - 10} L ${x + 130} ${y + 110} L ${x - 10} ${y + 110} Z`
        });
      }
      
      return features;
    };
    
    return generateTerrain();
  });

  // Generate large-scale randomized tactical network with movement vectors
  const [nodes, setNodes] = React.useState(() => {
    const friendlyNodeCount = Math.floor(Math.random() * 51) + 15; // 15-65 friendly nodes
    const enemyNodeCount = Math.floor(Math.random() * 12) + 8; // 8-19 enemy nodes
    const nodeTypes = ['command', 'relay', 'sensor', 'repeater', 'gateway'];
    const enemyTypes = ['scout', 'patrol', 'outpost', 'recon'];
    const nodeNames = [
      'Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel',
      'India', 'Juliet', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa',
      'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu'
    ];
  // Enemy nodes will use X + number format (e.g., X1, X2, X3, etc.)
    const greekLetters = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω'];
    
    const generateNodes = () => {
      const generatedNodes = [];
      
      // Always include at least one command node
      generatedNodes.push({
        id: 'cmd-001',
        name: 'CMD',
        type: 'command',
        status: 'online',
        x: Math.random() * 1300 + 50,
        y: Math.random() * 800 + 50,
        vx: (Math.random() - 0.5) * 0.3, // velocity x (-0.15 to 0.15 px/frame)
        vy: (Math.random() - 0.5) * 0.3, // velocity y
        size: 45,
        color: '#3b82f6',
        border: '#60a5fa',
        priority: 'critical',
        faction: 'friendly'
      });
      
      // Generate friendly nodes
      for (let i = 1; i < friendlyNodeCount; i++) {
        const type = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
        let status, color, border, size;
        
        // Determine status with realistic failure rates
        const statusRoll = Math.random();
        if (statusRoll < 0.65) {
          status = 'online';
        } else if (statusRoll < 0.85) {
          status = 'warning';
        } else {
          status = 'offline'; // 15% failure rate
        }
        
        // Set properties based on type and status
        switch (type) {
          case 'command':
            size = 40;
            color = status === 'offline' ? '#f97316' : // Orange for offline
                   status === 'warning' ? '#f59e0b' : '#3b82f6';
            border = status === 'offline' ? '#ea580c' :
                    status === 'warning' ? '#d97706' : '#60a5fa';
            break;
          case 'relay':
          case 'repeater':
            size = Math.random() > 0.5 ? 32 : 28;
            color = status === 'offline' ? '#f97316' : // Orange for offline
                   status === 'warning' ? '#f59e0b' : '#10b981';
            border = status === 'offline' ? '#ea580c' :
                    status === 'warning' ? '#d97706' : '#059669';
            break;
          case 'sensor':
            size = Math.random() > 0.3 ? 24 : 20;
            color = status === 'offline' ? '#f97316' : // Orange for offline
                   status === 'warning' ? '#f59e0b' : '#10b981';
            border = status === 'offline' ? '#ea580c' :
                    status === 'warning' ? '#d97706' : '#059669';
            break;
          case 'gateway':
            size = 36;
            color = status === 'offline' ? '#f97316' : // Orange for offline
                   status === 'warning' ? '#f59e0b' : '#8b5cf6';
            border = status === 'offline' ? '#ea580c' :
                    status === 'warning' ? '#d97706' : '#a78bfa';
            break;
          default:
            size = 26;
            color = status === 'offline' ? '#f97316' : '#10b981'; // Orange for offline
            border = status === 'offline' ? '#ea580c' : '#059669';
        }
        
        // Generate name based on type
        let name;
        if (type === 'command') {
          name = `C${i.toString().padStart(2, '0')}`;
        } else if (type === 'sensor') {
          name = `S${i.toString().padStart(2, '0')}`;
        } else if (type === 'gateway') {
          name = `G${i.toString().padStart(2, '0')}`;
        } else {
          // Use phonetic alphabet or Greek letters
          if (i < nodeNames.length) {
            name = nodeNames[i - 1].substring(0, 3).toUpperCase();
          } else if (i - nodeNames.length < greekLetters.length) {
            name = greekLetters[i - nodeNames.length];
          } else {
            name = `N${i.toString().padStart(2, '0')}`;
          }
        }
        
        generatedNodes.push({
          id: `node-${i.toString().padStart(3, '0')}`,
          name: name,
          type: type,
          status: status,
          x: Math.random() * 1300 + 50,
          y: Math.random() * 800 + 50,
          vx: (Math.random() - 0.5) * 0.3, // velocity x (-0.15 to 0.15 px/frame)
          vy: (Math.random() - 0.5) * 0.3, // velocity y
          size: size,
          color: color,
          border: border,
          faction: 'friendly',
          batteryLevel: status === 'offline' ? 0 : Math.floor(Math.random() * 100) + 1,
          signalStrength: status === 'offline' ? 0 : Math.floor(Math.random() * 100) + 1,
          lastSeen: status === 'offline' ? 
            new Date(Date.now() - Math.random() * 3600000) : // Up to 1 hour ago
            new Date(Date.now() - Math.random() * 300000)    // Up to 5 minutes ago
        });
      }
      
      // Generate enemy nodes
      for (let i = 0; i < enemyNodeCount; i++) {
        const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        let size;
        
        // Set size based on enemy type
        switch (type) {
          case 'outpost':
            size = 35;
            break;
          case 'patrol':
            size = 28;
            break;
          case 'recon':
            size = 24;
            break;
          default: // scout
            size = 20;
        }
        
        // Use X plus number format for hostile identifiers
        const name = `X${(i + 1).toString()}`;
        
        generatedNodes.push({
          id: `enemy-${i.toString().padStart(3, '0')}`,
          name: name,
          type: type,
          status: 'hostile',
          x: Math.random() * 1300 + 50,
          y: Math.random() * 800 + 50,
          vx: (Math.random() - 0.5) * 0.4, // Slightly faster movement
          vy: (Math.random() - 0.5) * 0.4,
          size: size,
          color: '#dc2626', // Red for enemies
          border: '#b91c1c',
          faction: 'enemy',
          batteryLevel: Math.floor(Math.random() * 100) + 1,
          signalStrength: Math.floor(Math.random() * 80) + 20, // Enemy signals
          lastSeen: new Date(Date.now() - Math.random() * 600000) // Up to 10 minutes ago
        });
      }
      
      return generatedNodes;
    };
    
    return generateNodes();
  });

  // Animation loop for node movement
  React.useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prevNodes) => {
        // Find CMD node
        const cmdNode = prevNodes.find(node => node.id === 'cmd-001');

        // Remove eliminated hostiles first
        const activeNodes = prevNodes.filter(node => !node.eliminated);
        
        return activeNodes.map((node: any) => {
          // Keep CMD node stationary
          if (node.id === 'cmd-001') {
            return node;
          }

          // Handle tactical strike missions
          if (node.faction === 'friendly' && node.status === 'online') {
            const activeStrike = strikeTargets.find(strike => strike.friendlyId === node.id);
            if (activeStrike) {
              const targetHostile = activeNodes.find(hostile => hostile.id === activeStrike.hostileId);
              if (targetHostile) {
                const distanceToTarget = Math.sqrt(
                  Math.pow(node.x - targetHostile.x, 2) + Math.pow(node.y - targetHostile.y, 2)
                );
                
                // Check if close enough to eliminate
                if (distanceToTarget < 40) {
                  // Eliminate the hostile
                  // Calculate grid coordinates for the hostile
                  const hostileGridCol = String.fromCharCode(65 + Math.floor(targetHostile.x / 100));
                  const hostileGridRow = 9 - Math.floor(targetHostile.y / 100);
                  const hostileGridCoord = `${hostileGridCol}${hostileGridRow}`;
                  
                  const eliminationMessage = {
                    id: Date.now() + Math.random() + 3,
                    sender: node.name,
                    content: `💥 STRIKE SUCCESSFUL: ${node.name} eliminated hostile ${targetHostile.name} at grid ${hostileGridCoord} - Target neutralized`,
                    timestamp: new Date(),
                    priority: 'critical'
                  };
                  
                  setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages, eliminationMessage];
                    return updatedMessages.slice(-12);
                  });
                  
                  // Mark hostile for removal
                  targetHostile.eliminated = true;
                  
                  // Remove this strike mission
                  setStrikeTargets(prev => prev.filter(s => s.friendlyId !== node.id));
                  
                } else {
                  // Move towards target
                  const angle = Math.atan2(targetHostile.y - node.y, targetHostile.x - node.x);
                  const moveStrength = 0.7; // Faster movement for tactical strikes
                  node.vx = Math.cos(angle) * moveStrength;
                  node.vy = Math.sin(angle) * moveStrength;
                  node.onStrikeMission = true;
                }
              } else {
                // Target no longer exists, remove strike mission
                setStrikeTargets(prev => prev.filter(s => s.friendlyId !== node.id));
                node.onStrikeMission = false;
              }
            }
          }

          // Identify hostiles near CMD (existing defense system)
          if (node.faction === 'enemy') {
            const distanceToCMD = Math.sqrt(Math.pow(node.x - cmdNode.x, 2) + Math.pow(node.y - cmdNode.y, 2));
            if (distanceToCMD < 200) { // if hostiles are within 200px
              // Trigger defense alert if not already triggered recently
              if (!node.lastDefenseAlert || Date.now() - node.lastDefenseAlert > 10000) { // 10 second cooldown
                node.lastDefenseAlert = Date.now();
                
                // Calculate grid coordinates for the hostile
                const hostileGridCol = String.fromCharCode(65 + Math.floor(node.x / 100));
                const hostileGridRow = 9 - Math.floor(node.y / 100);
                const hostileGridCoord = `${hostileGridCol}${hostileGridRow}`;
                
                // Calculate CMD grid coordinates
                const cmdGridCol = String.fromCharCode(65 + Math.floor(cmdNode.x / 100));
                const cmdGridRow = 9 - Math.floor(cmdNode.y / 100);
                const cmdGridCoord = `${cmdGridCol}${cmdGridRow}`;
                
                // Generate defense alert message
                const alertMessage = {
                  id: Date.now() + Math.random(),
                  sender: 'DEFENSE-SYS',
                  content: `🚨 HOSTILE DETECTED: ${node.name} (${node.type}) at grid ${hostileGridCoord} approaching CMD at grid ${cmdGridCoord} - Deploying defenders`,
                  timestamp: new Date(),
                  priority: 'critical'
                };
                
                setMessages(prevMessages => {
                  const updatedMessages = [...prevMessages, alertMessage];
                  return updatedMessages.slice(-12);
                });
              }
              
              // Find closest defender
              let closestDefender = null;
              let closestDistance = Infinity;

              prevNodes.forEach(otherNode => {
                if (otherNode.faction === 'friendly' && otherNode.status === 'online') {
                  const distanceToHostile = Math.sqrt(Math.pow(otherNode.x - node.x, 2) + Math.pow(otherNode.y - node.y, 2));
                  if (distanceToHostile < closestDistance) {
                    closestDefender = otherNode;
                    closestDistance = distanceToHostile;
                  }
                }
              });

              // Move closest defender towards hostile
              if (closestDefender) {
                const defenderToHostileDistance = Math.sqrt(
                  Math.pow(closestDefender.x - node.x, 2) + Math.pow(closestDefender.y - node.y, 2)
                );
                
                // Check if defender is close enough to eliminate the hostile
                if (defenderToHostileDistance < 40) {
                  // Calculate grid coordinates for the hostile
                  const hostileGridCol = String.fromCharCode(65 + Math.floor(node.x / 100));
                  const hostileGridRow = 9 - Math.floor(node.y / 100);
                  const hostileGridCoord = `${hostileGridCol}${hostileGridRow}`;
                  
                  // Eliminate the hostile
                  const eliminationMessage = {
                    id: Date.now() + Math.random() + 2,
                    sender: closestDefender.name,
                    content: `🎯 TARGET ELIMINATED: ${closestDefender.name} has neutralized hostile ${node.name} at grid ${hostileGridCoord}`,
                    timestamp: new Date(),
                    priority: 'critical'
                  };
                  
                  setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages, eliminationMessage];
                    return updatedMessages.slice(-12);
                  });
                  
                  // Mark hostile for removal
                  node.eliminated = true;
                  
                  // Reset defender status
                  closestDefender.isDefending = false;
                  
                } else {
                  // Only move if not on a strike mission
                  if (!closestDefender.onStrikeMission) {
                    // Continue moving towards hostile
                    const angle = Math.atan2(node.y - closestDefender.y, node.x - closestDefender.x);
                    const moveStrength = 0.5; // Control the speed of movement
                    closestDefender.vx = Math.cos(angle) * moveStrength;
                    closestDefender.vy = Math.sin(angle) * moveStrength;
                    
                    // Mark defender as defending
                    if (!closestDefender.isDefending) {
                      closestDefender.isDefending = true;
                      // Calculate grid coordinates for the hostile
                      const hostileGridCol = String.fromCharCode(65 + Math.floor(node.x / 100));
                      const hostileGridRow = 9 - Math.floor(node.y / 100);
                      const hostileGridCoord = `${hostileGridCol}${hostileGridRow}`;
                      
                      const defenseMessage = {
                        id: Date.now() + Math.random() + 1,
                        sender: closestDefender.name,
                        content: `📡 ${closestDefender.name} responding to threat - Moving to intercept ${node.name} at grid ${hostileGridCoord}`,
                        timestamp: new Date(),
                        priority: 'high'
                      };
                      
                      setMessages(prevMessages => {
                        const updatedMessages = [...prevMessages, defenseMessage];
                        return updatedMessages.slice(-12);
                      });
                    }
                  }
                }
              }
            } else {
              // Reset defense state when hostile moves away
              if (node.lastDefenseAlert && distanceToCMD > 250) {
                node.lastDefenseAlert = null;
                // Reset defending status for all friendly nodes
                prevNodes.forEach(otherNode => {
                  if (otherNode.faction === 'friendly') {
                    otherNode.isDefending = false;
                  }
                });
              }
            }
          }

          // Update positions based on velocity for all nodes
          let newX = node.x + node.vx;
          let newY = node.y + node.vy;

          // Reflect node movement at boundaries
          if (newX > 1350 || newX < 50) {
            node.vx *= -1;
          }
          if (newY > 850 || newY < 50) {
            node.vy *= -1;
          }

          return {
            ...node,
            x: Math.max(50, Math.min(1350, newX)),
            y: Math.max(50, Math.min(850, newY))
          };
        });
      });
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Very slow automatic message generation - every 5-10 minutes for comfortable reading
  React.useEffect(() => {
    const messageTemplates = {
      status: [
        'System status: Normal operations',
        'Battery level at {battery}%',
        'Signal strength: {signal}% - All clear',
        'Performing routine diagnostics',
        'Heartbeat signal transmitted',
        'Network connectivity verified'
      ],
      alert: [
        '⚠️ Low battery warning - {battery}% remaining',
        '⚠️ Signal degradation detected',
        '⚠️ Connection unstable - attempting reconnect',
        '⚠️ Temperature warning - {temp}°C'
      ],
      tactical: [
        '📍 Position confirmed at grid {grid}',
        '🎯 Target acquired and tracking',
        '📡 Relay established with {target}',
        '🔍 Surveillance data collected'
      ]
    };

    const generateRandomMessage = () => {
      const friendlyNodes = nodes.filter(n => n.status === 'online' && n.faction === 'friendly');
      if (friendlyNodes.length === 0) return;

      const sender = friendlyNodes[Math.floor(Math.random() * friendlyNodes.length)];
      const messageTypes = Object.keys(messageTemplates);
      const messageType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
      const templates = messageTemplates[messageType];
      let content = templates[Math.floor(Math.random() * templates.length)];

      // Replace placeholders with random values
      content = content.replace('{battery}', Math.floor(Math.random() * 40) + 15);
      content = content.replace('{signal}', Math.floor(Math.random() * 30) + 70);
      content = content.replace('{temp}', Math.floor(Math.random() * 20) + 35);
      content = content.replace('{grid}', `${String.fromCharCode(65 + Math.floor(Math.random() * 8))}${Math.floor(Math.random() * 9) + 1}`);
      content = content.replace('{target}', friendlyNodes[Math.floor(Math.random() * friendlyNodes.length)].name);

      // Determine priority based on message type
      let priority;
      switch (messageType) {
        case 'alert':
          priority = Math.random() > 0.5 ? 'high' : 'critical';
          break;
        case 'tactical':
          priority = Math.random() > 0.7 ? 'high' : 'normal';
          break;
        default:
          priority = Math.random() > 0.8 ? 'normal' : 'low';
      }

      const newMessage = {
        id: Date.now() + Math.random(),
        sender: sender.name,
        content: content,
        timestamp: new Date(),
        priority: priority
      };

      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, newMessage];
        return updatedMessages.slice(-12); // Keep last 12 messages
      });
    };

    // Generate messages every 2-4 hours (very infrequent for minimal distraction)
    const scheduleNextMessage = () => {
      const delay = Math.random() * 7200000 + 7200000; // 2-4 hours
      setTimeout(() => {
        generateRandomMessage();
        scheduleNextMessage();
      }, delay);
    };

    // Start first message after 30 minutes
    setTimeout(() => {
      generateRandomMessage();
      scheduleNextMessage();
    }, 1800000);
  }, [nodes]);

  const [messages, setMessages] = React.useState([
    {
      id: 1,
      sender: 'Alpha-Relay',
      content: 'Network initialization complete. All systems nominal.',
      timestamp: new Date(),
      priority: 'normal',
      recipient: 'ALL'
    },
    {
      id: 2,
      sender: 'Beta-Sensor',
      content: '⚠️ Low battery warning - 23% remaining',
      timestamp: new Date(Date.now() - 120000),
      priority: 'high',
      recipient: 'ALL'
    }
  ]);
  const [newMessage, setNewMessage] = React.useState('');
  const [selectedPriority, setSelectedPriority] = React.useState('normal');
  const [selectedRecipient, setSelectedRecipient] = React.useState(null);
  const [strikeTargets, setStrikeTargets] = React.useState([]);

  // Auto-scroll is DISABLED - user can manually scroll through messages
  
  const sendMessage = () => {
    if (newMessage.trim()) {
      const cmdNode = nodes.find(node => node.id === 'cmd-001');
      let messageContent = newMessage.trim();
      let canSend = true;
      
      // If sending to a specific recipient, check if route exists
      if (selectedRecipient) {
        const route = findRoute(cmdNode, selectedRecipient, nodes);
        if (!route) {
          // No route available - add routing failure message
          const failureMessage = {
            id: Date.now() + Math.random(),
            sender: 'ROUTING-SYS',
            content: `❌ ROUTING FAILED: No mesh route available to ${selectedRecipient.name}. Message not delivered.`,
            timestamp: new Date(),
            priority: 'high'
          };
          setMessages(prevMessages => {
            const updatedMessages = [...prevMessages, failureMessage];
            return updatedMessages.slice(-12);
          });
          canSend = false;
        } else if (route.length > 2) {
          // Multi-hop route - add routing info
          const routeNames = route.map(node => node.name).join(' → ');
          messageContent = `[via ${routeNames}] ${messageContent}`;
          
          // Add routing success message
          const routingMessage = {
            id: Date.now() + Math.random(),
            sender: 'ROUTING-SYS',
            content: `📡 MESH ROUTE: Message to ${selectedRecipient.name} routed via ${route.length - 2} hop(s): ${routeNames}`,
            timestamp: new Date(),
            priority: 'normal'
          };
          setMessages(prevMessages => {
            const updatedMessages = [...prevMessages, routingMessage];
            return updatedMessages.slice(-12);
          });
        }
      }
      
      if (canSend) {
        const message = {
          id: messages.length + 1,
          sender: 'CMD',
          content: messageContent,
          timestamp: new Date(),
          priority: selectedPriority,
          recipient: selectedRecipient ? selectedRecipient.name : 'ALL'
        };
        setMessages([...messages, message]);
      }
      
      setNewMessage('');
    }
  };
  
  // Function to find route between nodes using mesh networking
  const findRoute = (startNode, targetNode, allNodes) => {
    if (startNode.id === targetNode.id) return [startNode];
    
    const visited = new Set();
    const queue = [[startNode]];
    visited.add(startNode.id);
    
    while (queue.length > 0) {
      const path = queue.shift();
      const currentNode = path[path.length - 1];
      
      // Find all friendly nodes that current node can directly communicate with
      // Mesh network allows connections based on distance and signal strength
      const directConnections = allNodes.filter(otherNode => {
        if (visited.has(otherNode.id) || otherNode.faction !== 'friendly' || otherNode.status !== 'online') {
          return false;
        }
        
        const distance = Math.sqrt(
          Math.pow(currentNode.x - otherNode.x, 2) + Math.pow(currentNode.y - otherNode.y, 2)
        );
        
        // Mesh connectivity based on node type and distance
        let maxRange = 150; // Base range for most nodes
        
        // Different nodes have different transmission ranges
        if (currentNode.type === 'command') {
          maxRange = 250; // Command nodes have the strongest radios
        } else if (currentNode.type === 'relay' || currentNode.type === 'repeater') {
          maxRange = 200; // Relay nodes designed for mesh networking
        } else if (currentNode.type === 'gateway') {
          maxRange = 220; // Gateways have good range
        } else if (currentNode.type === 'sensor') {
          maxRange = 120; // Sensors have shorter range to save power
        }
        
        // Allow connection if within range
        return distance <= maxRange;
      });
      
      for (const nextNode of directConnections) {
        const newPath = [...path, nextNode];
        
        if (nextNode.id === targetNode.id) {
          return newPath; // Found route!
        }
        
        visited.add(nextNode.id);
        queue.push(newPath);
      }
    }
    
    return null; // No route found
  };
  const handleNodeClick = (node) => {
    if (node.faction === 'friendly' && node.id !== 'cmd-001') {
      // Allow friendly nodes to be selected as recipients
      setSelectedRecipient(node);
    }
    
    if (node.faction === 'enemy') {
      // Identify nearby friendly units for intercept
      const nearbyFriendlies = nodes.filter(friendlyNode => {
        if (friendlyNode.faction !== 'friendly' || friendlyNode.status !== 'online') return false;
        const distance = Math.sqrt(
          Math.pow(friendlyNode.x - node.x, 2) + Math.pow(friendlyNode.y - node.y, 2)
        );
        return distance <= 200; // Range for intercept
      });
      
      if (nearbyFriendlies.length > 0) {
        // Create intercept mission
        const strikeId = Date.now();
        
        // Calculate grid coordinates for the hostile
        const hostileGridCol = String.fromCharCode(65 + Math.floor(node.x / 100));
        const hostileGridRow = 9 - Math.floor(node.y / 100);
        const hostileGridCoord = `${hostileGridCol}${hostileGridRow}`;
        
        // Generate intercept message
        const interceptMessage = {
          id: strikeId + Math.random(),
          sender: 'INTERCEPT-OPS',
          content: `⚔️ INTERCEPT ORDER: ${nearbyFriendlies.length} friendly unit(s) engaging hostile ${node.name} at grid ${hostileGridCoord}`,
          timestamp: new Date(),
          priority: 'critical'
        };
        
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages, interceptMessage];
          return updatedMessages.slice(-12);
        });
        
        // Assign intercept targets to friendlies
        const newStrikeTargets = [];
        nearbyFriendlies.forEach(friendly => {
          newStrikeTargets.push({
            friendlyId: friendly.id,
            hostileId: node.id,
            strikeId: strikeId
          });
        });
        
        setStrikeTargets(prev => [...prev, ...newStrikeTargets]);
        
        // Individual unit acknowledgment messages
        nearbyFriendlies.forEach(friendly => {
          const ackMessage = {
            id: Date.now() + Math.random() + Math.random(),
            sender: friendly.name,
            content: `⚡ ${friendly.name} acknowledging intercept order - Moving to engage ${node.name}`,
            timestamp: new Date(),
            priority: 'high'
          };
          
          setTimeout(() => {
            setMessages(prevMessages => {
              const updatedMessages = [...prevMessages, ackMessage];
              return updatedMessages.slice(-12);
            });
          }, Math.random() * 2000); // Stagger acknowledgments
        });
      }
    }
  };
  
  const handleMapClick = (event) => {
    // Get the click position relative to the map container
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Find all hostiles within 150px of the click
    const nearbyHostiles = nodes.filter(node => {
      if (node.faction !== 'enemy') return false;
      const distance = Math.sqrt(
        Math.pow(node.x - clickX, 2) + Math.pow(node.y - clickY, 2)
      );
      return distance <= 150;
    });
    
    // Find all friendly units within 200px of the click
    const nearbyFriendlies = nodes.filter(node => {
      if (node.faction !== 'friendly' || node.status !== 'online') return false;
      const distance = Math.sqrt(
        Math.pow(node.x - clickX, 2) + Math.pow(node.y - clickY, 2)
      );
      return distance <= 200;
    });
    
    if (nearbyHostiles.length > 0 && nearbyFriendlies.length > 0) {
      // Create strike mission
      const strikeId = Date.now();
      
      // Calculate grid coordinates for the strike location
      const strikeGridCol = String.fromCharCode(65 + Math.floor(clickX / 100));
      const strikeGridRow = 9 - Math.floor(clickY / 100);
      const strikeGridCoord = `${strikeGridCol}${strikeGridRow}`;
      
      // Generate tactical strike message
      const strikeMessage = {
        id: strikeId + Math.random(),
        sender: 'TACTICAL-OPS',
        content: `🎯 TACTICAL STRIKE AUTHORIZED: ${nearbyFriendlies.length} friendly units engaging ${nearbyHostiles.length} hostile(s) at grid ${strikeGridCoord}`,
        timestamp: new Date(),
        priority: 'critical'
      };
      
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, strikeMessage];
        return updatedMessages.slice(-12);
      });
      
      // Assign targets to friendlies
      const newStrikeTargets = [];
      nearbyFriendlies.forEach((friendly, index) => {
        const targetHostile = nearbyHostiles[index % nearbyHostiles.length];
        newStrikeTargets.push({
          friendlyId: friendly.id,
          hostileId: targetHostile.id,
          strikeId: strikeId
        });
      });
      
      setStrikeTargets(prev => [...prev, ...newStrikeTargets]);
      
      // Individual unit acknowledgment messages
      nearbyFriendlies.forEach(friendly => {
        const ackMessage = {
          id: Date.now() + Math.random() + Math.random(),
          sender: friendly.name,
          content: `⚡ ${friendly.name} acknowledging strike order - Moving to engage hostiles`,
          timestamp: new Date(),
          priority: 'high'
        };
        
        setTimeout(() => {
          setMessages(prevMessages => {
            const updatedMessages = [...prevMessages, ackMessage];
            return updatedMessages.slice(-12);
          });
        }, Math.random() * 2000); // Stagger acknowledgments
      });
    }
  };
  
  const clearRecipient = () => {
    setSelectedRecipient(null);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'normal': return '#d1d5db';
      case 'low': return '#9ca3af';
      default: return '#d1d5db';
    }
  };
  
  const regenerateTerrain = () => {
    const generateTerrain = () => {
      const features = {
        hills: [],
        rivers: [],
        forests: [],
        contours: [],
        roads: [],
        streets: [],
        pathways: [],
        hospitals: [],
        buildings: [],
        airports: [],
        bridges: [],
        fuelDepots: [],
        towers: [],
        compounds: [],
        ridges: [],
        valleys: [],
        lakes: []
      };
      
      // Generate a main river first as it influences other features
      const mainRiver = {
        points: [],
        width: Math.random() * 8 + 12
      };
      
      // Create a meandering main river from one side to another
      const riverStartSide = Math.random() > 0.5 ? 'left' : 'top';
      let currentX, currentY;
      
      if (riverStartSide === 'left') {
        currentX = 0;
        currentY = Math.random() * 400 + 250;
      } else {
        currentX = Math.random() * 400 + 500;
        currentY = 0;
      }
      
      mainRiver.points.push([currentX, currentY] as [number, number]);
      
      // Create meandering path
      const segmentCount = 8;
      for (let i = 1; i <= segmentCount; i++) {
        const progress = i / segmentCount;
        const targetX = riverStartSide === 'left' ? 1400 * progress : currentX + (Math.random() - 0.5) * 300;
        const targetY = riverStartSide === 'top' ? 900 * progress : currentY + (Math.random() - 0.5) * 200;
        
        currentX = Math.max(0, Math.min(1400, targetX));
        currentY = Math.max(0, Math.min(900, targetY));
        mainRiver.points.push([currentX, currentY]);
      }
      
      // Convert river points to path
      let riverPath = `M ${mainRiver.points[0][0]},${mainRiver.points[0][1]}`;
      for (let i = 1; i < mainRiver.points.length - 1; i++) {
        const [x1, y1] = mainRiver.points[i];
        const [x2, y2] = mainRiver.points[i + 1];
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        riverPath += ` Q ${x1},${y1} ${midX},${midY}`;
      }
      const lastPoint = mainRiver.points[mainRiver.points.length - 1];
      riverPath += ` T ${lastPoint[0]},${lastPoint[1]}`;
      
      features.rivers.push({
        path: riverPath,
        width: mainRiver.width,
        opacity: 0.8
      });
      
      // Add tributaries
      const tributaryCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < tributaryCount; i++) {
        const connectionPoint = mainRiver.points[Math.floor(Math.random() * mainRiver.points.length)];
        const angle = Math.random() * Math.PI * 2;
        const length = Math.random() * 300 + 150;
        const endX = connectionPoint[0] + Math.cos(angle) * length;
        const endY = connectionPoint[1] + Math.sin(angle) * length;
        
        features.rivers.push({
          path: `M ${connectionPoint[0]},${connectionPoint[1]} Q ${(connectionPoint[0] + endX) / 2 + (Math.random() - 0.5) * 100},${(connectionPoint[1] + endY) / 2 + (Math.random() - 0.5) * 100} ${endX},${endY}`,
          width: Math.random() * 4 + 3,
          opacity: 0.6
        });
      }
      
      // Generate mountain ranges and ridges
      const ridgeCount = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < ridgeCount; i++) {
        const ridgeStart = {
          x: Math.random() * 1400,
          y: Math.random() * 900
        };
        const ridgeAngle = Math.random() * Math.PI * 2;
        const ridgeLength = Math.random() * 600 + 400;
        const peakCount = Math.floor(Math.random() * 5) + 3;
        
        for (let j = 0; j < peakCount; j++) {
          const progress = j / (peakCount - 1);
          const peakX = ridgeStart.x + Math.cos(ridgeAngle) * ridgeLength * progress + (Math.random() - 0.5) * 100;
          const peakY = ridgeStart.y + Math.sin(ridgeAngle) * ridgeLength * progress + (Math.random() - 0.5) * 100;
          
          if (peakX >= 0 && peakX <= 1400 && peakY >= 0 && peakY <= 900) {
            const hillSize = Math.random() * 40 + 60 - (Math.abs(progress - 0.5) * 40); // Bigger in middle
            features.hills.push({
              cx: peakX,
              cy: peakY,
              rx: hillSize,
              ry: hillSize * 0.7,
              opacity: Math.random() * 0.15 + 0.3
            });
            
            // Add multiple contour lines for realistic elevation
            for (let k = 0; k < 3; k++) {
              features.contours.push({
                cx: peakX,
                cy: peakY,
                rx: hillSize + (k * 15),
                ry: (hillSize * 0.7) + (k * 10),
                opacity: 0.15 - (k * 0.03)
              });
            }
          }
        }
      }
      
      // Generate forests near water and on hillsides
      features.rivers.forEach(river => {
        const forestCount = Math.floor(Math.random() * 4) + 2;
        for (let i = 0; i < forestCount; i++) {
          // Place forests near river (riparian forests)
          const randomPoint = mainRiver.points[Math.floor(Math.random() * mainRiver.points.length)];
          const offsetX = (Math.random() - 0.5) * 200;
          const offsetY = (Math.random() - 0.5) * 200;
          
          const forestClusterSize = Math.floor(Math.random() * 6) + 4;
          for (let j = 0; j < forestClusterSize; j++) {
            features.forests.push({
              cx: randomPoint[0] + offsetX + (Math.random() - 0.5) * 120,
              cy: randomPoint[1] + offsetY + (Math.random() - 0.5) * 120,
              r: Math.random() * 25 + 15,
              opacity: Math.random() * 0.2 + 0.4
            });
          }
        }
      });
      
      // Add highland forests on hills
      features.hills.forEach(hill => {
        if (Math.random() > 0.4) { // 60% chance of forest on hills
          const forestCount = Math.floor(Math.random() * 3) + 2;
          for (let i = 0; i < forestCount; i++) {
            features.forests.push({
              cx: hill.cx + (Math.random() - 0.5) * hill.rx * 1.5,
              cy: hill.cy + (Math.random() - 0.5) * hill.ry * 1.5,
              r: Math.random() * 20 + 10,
              opacity: Math.random() * 0.15 + 0.35
            });
          }
        }
      });
      
      // Generate realistic road network
      // Main highway following terrain
      const mainRoad = {
        points: []
      };
      
      // Roads tend to follow valleys and avoid steep hills
      const roadPoints = 6;
      for (let i = 0; i < roadPoints; i++) {
        let bestX = Math.random() * 1400;
        let bestY = Math.random() * 900;
        let bestScore = Infinity;
        
        // Try multiple positions and pick the one with least elevation (avoid hills)
        for (let attempt = 0; attempt < 10; attempt++) {
          const testX = Math.random() * 1400;
          const testY = Math.random() * 900;
          let elevationScore = 0;
          
          // Calculate elevation score based on distance to hills
          features.hills.forEach(hill => {
            const distance = Math.sqrt(Math.pow(testX - hill.cx, 2) + Math.pow(testY - hill.cy, 2));
            if (distance < hill.rx) {
              elevationScore += (hill.rx - distance) * 10; // Penalty for being in hills
            }
          });
          
          if (elevationScore < bestScore) {
            bestScore = elevationScore;
            bestX = testX;
            bestY = testY;
          }
        }
        
              mainRoad.points.push([bestX, bestY] as [number, number]);
      }
      
      // Create smooth road path
      let roadPath = `M ${mainRoad.points[0][0]},${mainRoad.points[0][1]}`;
      for (let i = 1; i < mainRoad.points.length - 1; i++) {
        const [x1, y1] = mainRoad.points[i];
        const [x2, y2] = mainRoad.points[i + 1];
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        roadPath += ` Q ${x1},${y1} ${midX},${midY}`;
      }
      const lastRoadPoint = mainRoad.points[mainRoad.points.length - 1];
      roadPath += ` T ${lastRoadPoint[0]},${lastRoadPoint[1]}`;
      
      features.roads.push({
        path: roadPath,
        width: Math.random() * 3 + 8,
        opacity: 0.8
      });
      
      // Add connecting roads
      const connectingRoads = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < connectingRoads; i++) {
        const startPoint = mainRoad.points[Math.floor(Math.random() * mainRoad.points.length)];
        const angle = Math.random() * Math.PI * 2;
        const length = Math.random() * 400 + 200;
        const endX = Math.max(0, Math.min(1400, startPoint[0] + Math.cos(angle) * length));
        const endY = Math.max(0, Math.min(900, startPoint[1] + Math.sin(angle) * length));
        
        features.roads.push({
          path: `M ${startPoint[0]},${startPoint[1]} Q ${(startPoint[0] + endX) / 2 + (Math.random() - 0.5) * 100},${(startPoint[1] + endY) / 2 + (Math.random() - 0.5) * 100} ${endX},${endY}`,
          width: Math.random() * 2 + 4,
          opacity: 0.7
        });
      }
      
      // Generate secondary streets (4-8 streets)
      const streetCount = Math.floor(Math.random() * 5) + 4;
      for (let i = 0; i < streetCount; i++) {
        const startX = Math.random() * 1200 + 100;
        const startY = Math.random() * 700 + 100;
        const endX = Math.random() * 1200 + 100;
        const endY = Math.random() * 700 + 100;
        
        features.streets.push({
          path: `M ${startX} ${startY} L ${endX} ${endY}`,
          width: Math.random() * 2 + 4,
          opacity: 0.6
        });
      }
      
      // Generate pathways/trails (6-12 pathways)
      const pathwayCount = Math.floor(Math.random() * 7) + 6;
      for (let i = 0; i < pathwayCount; i++) {
        const startX = Math.random() * 1300 + 50;
        const startY = Math.random() * 800 + 50;
        const midX = Math.random() * 1300 + 50;
        const midY = Math.random() * 800 + 50;
        const endX = Math.random() * 1300 + 50;
        const endY = Math.random() * 800 + 50;
        
        features.pathways.push({
          path: `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`,
          width: Math.random() * 1.5 + 1.5,
          opacity: 0.4
        });
      }
      
      // Generate hospitals (1-3 hospitals)
      const hospitalCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < hospitalCount; i++) {
        features.hospitals.push({
          x: Math.random() * 1200 + 100,
          y: Math.random() * 700 + 100,
          width: Math.random() * 40 + 80,
          height: Math.random() * 30 + 60,
          id: `H${i + 1}`
        });
      }
      
      // Generate buildings (8-20 buildings)
      const buildingCount = Math.floor(Math.random() * 13) + 8;
      for (let i = 0; i < buildingCount; i++) {
        features.buildings.push({
          x: Math.random() * 1250 + 75,
          y: Math.random() * 750 + 75,
          width: Math.random() * 30 + 20,
          height: Math.random() * 25 + 15,
          type: Math.random() > 0.7 ? 'commercial' : 'residential'
        });
      }
      
      // Generate airports (0-2 airports - rare)
      const airportCount = Math.random() > 0.3 ? 0 : Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < airportCount; i++) {
        const x = Math.random() * 800 + 300;
        const y = Math.random() * 500 + 200;
        features.airports.push({
          x: x,
          y: y,
          width: Math.random() * 100 + 200,
          height: Math.random() * 60 + 80,
          runwayPath: `M ${x - 100} ${y + 40} L ${x + 300} ${y + 40}`,
          id: `APT${i + 1}`
        });
      }
      
      // Generate bridges (2-6 bridges)
      const bridgeCount = Math.floor(Math.random() * 5) + 2;
      for (let i = 0; i < bridgeCount; i++) {
        const x = Math.random() * 1200 + 100;
        const y = Math.random() * 700 + 100;
        const isHorizontal = Math.random() > 0.5;
        
        features.bridges.push({
          x: x,
          y: y,
          width: isHorizontal ? Math.random() * 40 + 60 : Math.random() * 15 + 10,
          height: isHorizontal ? Math.random() * 15 + 10 : Math.random() * 40 + 60,
          orientation: isHorizontal ? 'horizontal' : 'vertical'
        });
      }
      
      // Generate fuel depots (1-4 fuel depots)
      const fuelDepotCount = Math.floor(Math.random() * 4) + 1;
      for (let i = 0; i < fuelDepotCount; i++) {
        const x = Math.random() * 1200 + 100;
        const y = Math.random() * 700 + 100;
        features.fuelDepots.push({
          x: x,
          y: y,
          tanks: Math.floor(Math.random() * 6) + 3, // 3-8 tanks
          id: `FUEL${i + 1}`
        });
      }
      
      // Generate communication towers (2-8 towers)
      const towerCount = Math.floor(Math.random() * 7) + 2;
      for (let i = 0; i < towerCount; i++) {
        features.towers.push({
          x: Math.random() * 1300 + 50,
          y: Math.random() * 800 + 50,
          height: Math.random() * 30 + 40,
          type: Math.random() > 0.7 ? 'radio' : 'cell',
          id: `TWR${i + 1}`
        });
      }
      
      // Generate military compounds (1-3 compounds)
      const compoundCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < compoundCount; i++) {
        const x = Math.random() * 1000 + 200;
        const y = Math.random() * 600 + 150;
        features.compounds.push({
          x: x,
          y: y,
          width: Math.random() * 80 + 120,
          height: Math.random() * 60 + 100,
          id: `BASE${i + 1}`,
          fencePath: `M ${x - 10} ${y - 10} L ${x + 130} ${y - 10} L ${x + 130} ${y + 110} L ${x - 10} ${y + 110} Z`
        });
      }
      
      return features;
    };
    
    setTerrain(generateTerrain());
  };
  
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#0a0a0b',
      color: '#d1d5db',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, monospace'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#111111',
        borderBottom: '1px solid #3a3a3b',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            animation: 'pulse 2s infinite'
          }} />
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>🎯 TACTI-MESH COMMAND</h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem' }}>
          <span>Network: CONNECTED | Nodes: {nodes.length}</span>
          <span>Online: {nodes.filter(n => n.status === 'online').length}</span>
          <button
            onClick={regenerateTerrain}
            style={{
              backgroundColor: '#3b82f6',
              border: '1px solid #60a5fa',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '4px',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              fontFamily: 'system-ui, monospace',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2563eb';
              e.target.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#3b82f6';
              e.target.style.borderColor = '#60a5fa';
            }}
          >
            🗺️ NEW TERRAIN
          </button>
          <span>v1.0.0</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </header>
      
      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex' }}>
        {/* Left Panel - Communications */}
        <div style={{
          width: '320px',
          backgroundColor: '#1a1a1b',
          borderRight: '1px solid #3a3a3b',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          {/* Communications Header */}
          <div style={{ padding: '1rem 1rem 0.5rem 1rem', borderBottom: '1px solid #3a3a3b' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#d1d5db' }}>📡 COMMUNICATIONS</h3>
            <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
              Messages: {messages.length} | Secure Channel: 🟢
            </div>
          </div>
          
          {/* Messages List */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            maxHeight: 'calc(100vh - 300px)'
          }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{
                backgroundColor: '#2a2a2b',
                border: '1px solid #3a3a3b',
                borderRadius: '4px',
                padding: '0.75rem',
                marginBottom: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.25rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                      {msg.sender}
                    </span>
                    {msg.recipient && msg.recipient !== 'ALL' && (
                      <span style={{ 
                        fontSize: '0.7rem', 
                        color: '#3b82f6', 
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        padding: '0.1rem 0.3rem',
                        borderRadius: '2px'
                      }}>
                        → {msg.recipient}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      color: getPriorityColor(msg.priority),
                      fontWeight: 'bold'
                    }}>
                      {msg.priority.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div>{msg.content}</div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div style={{
            padding: '1rem',
            borderTop: '1px solid #3a3a3b',
            backgroundColor: '#111111'
          }}>
            {/* Recipient Selector */}
            {selectedRecipient && (
              <div style={{ 
                marginBottom: '0.5rem', 
                padding: '0.5rem', 
                backgroundColor: '#3b82f6', 
                borderRadius: '4px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontSize: '0.8rem'
              }}>
                <span>📡 Targeting: {selectedRecipient.name}</span>
                <button 
                  onClick={clearRecipient}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'white',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '3px',
                    fontSize: '0.7rem',
                    cursor: 'pointer'
                  }}
                >
                  CLEAR
                </button>
              </div>
            )}
            
            {/* Priority Selector */}
            <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Priority:</label>
              <select 
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                style={{
                  backgroundColor: '#2a2a2b',
                  border: '1px solid #3a3a3b',
                  color: '#d1d5db',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '3px',
                  fontSize: '0.8rem'
                }}
              >
                <option value="low">LOW</option>
                <option value="normal">NORMAL</option>
                <option value="high">HIGH</option>
                <option value="critical">CRITICAL</option>
              </select>
            </div>
            
            {/* Message Input */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type secure message..."
                style={{
                  flex: 1,
                  backgroundColor: '#2a2a2b',
                  border: '1px solid #3a3a3b',
                  color: '#d1d5db',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontFamily: 'system-ui, monospace',
                  resize: 'none',
                  minHeight: '60px',
                  outline: 'none'
                }}
                rows={2}
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                style={{
                  backgroundColor: newMessage.trim() ? '#10b981' : '#3a3a3b',
                  border: '1px solid ' + (newMessage.trim() ? '#059669' : '#4a4a4b'),
                  color: newMessage.trim() ? 'white' : '#9ca3af',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  fontFamily: 'system-ui, monospace',
                  cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  alignSelf: 'flex-end'
                }}
              >
                SEND
              </button>
            </div>
          </div>
        </div>
        
        {/* Center Panel - Network Graph */}
        <div style={{
          flex: 1,
          backgroundColor: '#111111',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ color: '#d1d5db', margin: 0 }}>🌍 TACTICAL OVERVIEW</h2>
            <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>GRID: 1400x900 | SCALE: 1:5000</div>
          </div>
          
            {/* Terrain Map with Network */}
          <div 
            style={{
              position: 'relative',
              width: '1400px',
              height: '900px',
              backgroundColor: '#1a1a1a',
              border: '2px solid #3a3a3b',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'crosshair'
            }}
            onClick={handleMapClick}
          >
            {/* Terrain Background */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              {/* Advanced Terrain Definitions */}
              <defs>
                {/* Enhanced tactical grid */}
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <defs>
                    <pattern id="fineGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4a6a4a" strokeWidth="0.3" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#fineGrid)"/>
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#5a7a5a" strokeWidth="1" opacity="0.7"/>
                </pattern>
                
                {/* Realistic terrain textures */}
                <pattern id="grassTexture" width="8" height="8" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="#3A5F3A"/>
                  <circle cx="2" cy="2" r="0.5" fill="#4A6F4A" opacity="0.6"/>
                  <circle cx="6" cy="4" r="0.3" fill="#5A7F5A" opacity="0.4"/>
                  <circle cx="4" cy="6" r="0.4" fill="#4A6F4A" opacity="0.5"/>
                </pattern>
                
                <pattern id="waterTexture" width="12" height="6" patternUnits="userSpaceOnUse">
                  <rect width="12" height="6" fill="#2E5F7F"/>
                  <path d="M0,3 Q3,1 6,3 T12,3" stroke="#3E6F8F" strokeWidth="0.5" fill="none" opacity="0.6"/>
                  <path d="M0,4 Q4,2 8,4 T12,4" stroke="#4E7F9F" strokeWidth="0.3" fill="none" opacity="0.4"/>
                </pattern>
                
                <pattern id="forestTexture" width="16" height="16" patternUnits="userSpaceOnUse">
                  <rect width="16" height="16" fill="#1E4F1E"/>
                  <circle cx="3" cy="3" r="2" fill="#2E5F2E" opacity="0.8"/>
                  <circle cx="10" cy="5" r="1.5" fill="#3E6F3E" opacity="0.7"/>
                  <circle cx="6" cy="10" r="2.2" fill="#2E5F2E" opacity="0.8"/>
                  <circle cx="13" cy="12" r="1.8" fill="#3E6F3E" opacity="0.7"/>
                  <circle cx="2" cy="13" r="1.3" fill="#4E7F4E" opacity="0.6"/>
                </pattern>
                
                <pattern id="mountainTexture" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="#6B5A47"/>
                  <path d="M0,20 L5,10 L10,15 L15,5 L20,12 L20,20 Z" fill="#7B6A57" opacity="0.7"/>
                  <path d="M0,20 L3,15 L8,18 L12,12 L18,16 L20,20 Z" fill="#5B4A37" opacity="0.8"/>
                </pattern>
                
                {/* Advanced shadow and lighting effects */}
                <filter id="buildingShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                  <feOffset dx="2" dy="2" result="offset"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.4"/>
                  </feComponentTransfer>
                  <feMerge> 
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
                
                <filter id="terrainShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                  <feOffset dx="3" dy="3" result="offset"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3"/>
                  </feComponentTransfer>
                  <feMerge> 
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
                
                <filter id="waterGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                {/* Gradient definitions for realistic terrain */}
                <radialGradient id="hillGradient" cx="0.3" cy="0.3">
                  <stop offset="0%" stopColor="#9B8A77" stopOpacity="1"/>
                  <stop offset="70%" stopColor="#7B6A57" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#5B4A37" stopOpacity="0.7"/>
                </radialGradient>
                
                <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4A8FBF" stopOpacity="0.9"/>
                  <stop offset="50%" stopColor="#2E5F7F" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#1E3F5F" stopOpacity="0.8"/>
                </linearGradient>
                
                <radialGradient id="forestGradient" cx="0.5" cy="0.5">
                  <stop offset="0%" stopColor="#4E7F4E" stopOpacity="0.9"/>
                  <stop offset="60%" stopColor="#2E5F2E" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#1E4F1E" stopOpacity="0.8"/>
                </radialGradient>
              </defs>
              {/* Base terrain layer with grass texture */}
              <rect width="100%" height="100%" fill="url(#grassTexture)"/>
              
              {/* Major grid lines */}
              <g id="majorGrid" opacity="0.4">
                {[...Array(15)].map((_, i) => (
                  <line 
                    key={`v-${i}`}
                    x1={i * 100} 
                    y1={0} 
                    x2={i * 100} 
                    y2={900} 
                    stroke="#6a8a6a" 
                    strokeWidth="1.5"
                  />
                ))}
                {[...Array(10)].map((_, i) => (
                  <line 
                    key={`h-${i}`}
                    x1={0} 
                    y1={i * 100} 
                    x2={1400} 
                    y2={i * 100} 
                    stroke="#6a8a6a" 
                    strokeWidth="1.5"
                  />
                ))}
              </g>
              
              {/* Fine grid overlay */}
              <rect width="100%" height="100%" fill="url(#grid)" opacity="0.6"/>
              
              {/* Grid coordinate labels */}
              <g id="gridLabels" fill="#8aaa8a" fontSize="10" fontFamily="monospace" fontWeight="bold">
                {/* Vertical coordinate labels (columns) */}
                {[...Array(14)].map((_, i) => (
                  <text 
                    key={`col-${i}`}
                    x={i * 100 + 50} 
                    y={15} 
                    textAnchor="middle" 
                    opacity="0.8"
                  >
                    {String.fromCharCode(65 + i)}
                  </text>
                ))}
                
                {/* Horizontal coordinate labels (rows) */}
                {[...Array(9)].map((_, i) => (
                  <text 
                    key={`row-${i}`}
                    x={15} 
                    y={i * 100 + 55} 
                    textAnchor="middle" 
                    opacity="0.8"
                  >
                    {9 - i}
                  </text>
                ))}
              </g>
              
              {/* Dynamic Terrain Features */}
              {/* Realistic Hills with texture and lighting */}
              {terrain.hills.map((hill, index) => (
                <g key={`hill-${index}`}>
                  {/* Hill shadow */}
                  <ellipse 
                    cx={hill.cx + 3} 
                    cy={hill.cy + 3} 
                    rx={hill.rx} 
                    ry={hill.ry} 
                    fill="#000000" 
                    opacity="0.2"
                  />
                  {/* Main hill with gradient and texture */}
                  <ellipse 
                    cx={hill.cx} 
                    cy={hill.cy} 
                    rx={hill.rx} 
                    ry={hill.ry} 
                    fill="url(#hillGradient)" 
                    opacity={hill.opacity + 0.2}
                    stroke="#5A4A3B" 
                    strokeWidth="1"
                  />
                  {/* Mountain texture overlay */}
                  <ellipse 
                    cx={hill.cx} 
                    cy={hill.cy} 
                    rx={hill.rx} 
                    ry={hill.ry} 
                    fill="url(#mountainTexture)" 
                    opacity="0.3"
                  />
                  {/* Highlight on hill top */}
                  <ellipse 
                    cx={hill.cx - hill.rx * 0.2} 
                    cy={hill.cy - hill.ry * 0.2} 
                    rx={hill.rx * 0.3} 
                    ry={hill.ry * 0.3} 
                    fill="#BBA997" 
                    opacity="0.4"
                  />
                </g>
              ))}
              
              {/* Realistic Rivers with texture and glow */}
              {terrain.rivers.map((river, index) => (
                <g key={`river-${index}`}>
                  {/* River glow effect */}
                  <path 
                    d={river.path} 
                    stroke="#4A8FBF" 
                    strokeWidth={river.width + 4} 
                    fill="none" 
                    opacity="0.3"
                    filter="url(#waterGlow)"
                  />
                  {/* Main river with gradient */}
                  <path 
                    d={river.path} 
                    stroke="url(#waterGradient)" 
                    strokeWidth={river.width} 
                    fill="none" 
                    opacity={river.opacity + 0.2}
                  />
                  {/* Water texture overlay */}
                  <path 
                    d={river.path} 
                    stroke="url(#waterTexture)" 
                    strokeWidth={river.width * 0.8} 
                    fill="none" 
                    opacity="0.4"
                  />
                  {/* River highlights */}
                  <path 
                    d={river.path} 
                    stroke="#6AAFDF" 
                    strokeWidth={river.width * 0.3} 
                    fill="none" 
                    opacity="0.6"
                  />
                </g>
              ))}
              
              {/* Realistic Forests with texture and depth */}
              {terrain.forests.map((forest, index) => (
                <g key={`forest-${index}`}>
                  {/* Forest shadow */}
                  <circle 
                    cx={forest.cx + 2} 
                    cy={forest.cy + 2} 
                    r={forest.r} 
                    fill="#000000" 
                    opacity="0.15"
                  />
                  {/* Main forest with gradient */}
                  <circle 
                    cx={forest.cx} 
                    cy={forest.cy} 
                    r={forest.r} 
                    fill="url(#forestGradient)" 
                    opacity={forest.opacity + 0.2}
                  />
                  {/* Forest texture overlay */}
                  <circle 
                    cx={forest.cx} 
                    cy={forest.cy} 
                    r={forest.r} 
                    fill="url(#forestTexture)" 
                    opacity="0.5"
                  />
                  {/* Individual tree highlights */}
                  {[...Array(Math.floor(forest.r / 8))].map((_, treeIndex) => {
                    const angle = (treeIndex / Math.floor(forest.r / 8)) * Math.PI * 2;
                    const distance = Math.random() * forest.r * 0.7;
                    const treeX = forest.cx + Math.cos(angle) * distance;
                    const treeY = forest.cy + Math.sin(angle) * distance;
                    return (
                      <circle 
                        key={`tree-${treeIndex}`}
                        cx={treeX} 
                        cy={treeY} 
                        r={Math.random() * 3 + 2} 
                        fill="#4E7F4E" 
                        opacity="0.6"
                      />
                    );
                  })}
                </g>
              ))}
              
              {/* Dynamic Elevation Contours */}
              {terrain.contours.map((contour, index) => (
                <ellipse 
                  key={`contour-${index}`}
                  cx={contour.cx} 
                  cy={contour.cy} 
                  rx={contour.rx} 
                  ry={contour.ry} 
                  fill="none" 
                  stroke="#8C8C8C" 
                  strokeWidth="1" 
                  opacity={contour.opacity} 
                />
              ))}
              
              {/* Realistic Roads with borders and markings */}
              {terrain.roads.map((road, index) => (
                <g key={`road-${index}`}>
                  {/* Road shadow */}
                  <path 
                    d={road.path} 
                    stroke="#000000" 
                    strokeWidth={road.width + 2} 
                    fill="none" 
                    opacity="0.2"
                    transform="translate(1,1)"
                  />
                  {/* Road base */}
                  <path 
                    d={road.path} 
                    stroke="#4A4A4A" 
                    strokeWidth={road.width + 1} 
                    fill="none" 
                    opacity="0.9"
                  />
                  {/* Road surface */}
                  <path 
                    d={road.path} 
                    stroke="#6A6A6A" 
                    strokeWidth={road.width} 
                    fill="none" 
                    opacity={road.opacity}
                  />
                  {/* Road center line */}
                  <path 
                    d={road.path} 
                    stroke="#FFD700" 
                    strokeWidth="1" 
                    fill="none" 
                    opacity="0.8"
                    strokeDasharray="8,8"
                  />
                </g>
              ))}
              
              {/* Secondary Streets */}
              {terrain.streets.map((street, index) => (
                <path 
                  key={`street-${index}`}
                  d={street.path} 
                  stroke="#9E9E9E" 
                  strokeWidth={street.width} 
                  fill="none" 
                  opacity={street.opacity} 
                />
              ))}
              
              {/* Pathways/Trails */}
              {terrain.pathways.map((pathway, index) => (
                <path 
                  key={`pathway-${index}`}
                  d={pathway.path} 
                  stroke="#D2B48C" 
                  strokeWidth={pathway.width} 
                  fill="none" 
                  opacity={pathway.opacity} 
                  strokeDasharray="2,2" 
                />
              ))}

              {/* Hospitals */}
              {terrain.hospitals.map((hospital, index) => (
                <g key={`hospital-${index}`}>
                  <rect 
                    x={hospital.x} 
                    y={hospital.y} 
                    width={hospital.width}
                    height={hospital.height}
                    fill="#ffdfdf"
                    stroke="#ff5c5c"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                  {/* Hospital Cross Symbol */}
                  <g fill="#ff5c5c" opacity="0.9">
                    <rect 
                      x={hospital.x + hospital.width/2 - 3} 
                      y={hospital.y + hospital.height/2 - 12} 
                      width="6" 
                      height="24" 
                    />
                    <rect 
                      x={hospital.x + hospital.width/2 - 12} 
                      y={hospital.y + hospital.height/2 - 3} 
                      width="24" 
                      height="6" 
                    />
                  </g>
                  {/* Hospital Label */}
                  <text 
                    x={hospital.x + hospital.width/2} 
                    y={hospital.y + hospital.height + 12} 
                    textAnchor="middle" 
                    fontSize="8" 
                    fill="#ff5c5c" 
                    fontWeight="bold"
                  >
                    {hospital.id}
                  </text>
                </g>
              ))}

              {/* Buildings */}
              {terrain.buildings.map((building, index) => (
                <g key={`building-${index}`}>
                  <rect 
                    x={building.x} 
                    y={building.y} 
                    width={building.width}
                    height={building.height}
                    fill={building.type === 'commercial' ? "#B8B0D0" : "#D4D4D8"}
                    stroke="#6B7280"
                    strokeWidth="1"
                    opacity="0.9"
                    filter="url(#buildingShadow)"
                  />
                  {/* Building Icon */}
                  <g fill={building.type === 'commercial' ? "#6b7280" : "#9ca3af"} opacity="0.9">
                    {building.type === 'commercial' ? (
                      /* Commercial Building - Office Icon */
                      <>
                        <rect x={building.x + building.width/4} y={building.y + building.height/4} width="3" height="3" />
                        <rect x={building.x + building.width/2} y={building.y + building.height/4} width="3" height="3" />
                        <rect x={building.x + 3*building.width/4 - 1.5} y={building.y + building.height/4} width="3" height="3" />
                        <rect x={building.x + building.width/4} y={building.y + building.height/2} width="3" height="3" />
                        <rect x={building.x + building.width/2} y={building.y + building.height/2} width="3" height="3" />
                        <rect x={building.x + 3*building.width/4 - 1.5} y={building.y + building.height/2} width="3" height="3" />
                      </>
                    ) : (
                      /* Residential Building - House Icon */
                      <>
                        <polygon points={`${building.x + building.width/2},${building.y + building.height/4} ${building.x + building.width/4},${building.y + building.height/2} ${building.x + 3*building.width/4},${building.y + building.height/2}`} />
                        <rect x={building.x + building.width/2 - 2} y={building.y + building.height/2} width="4" height="8" />
                      </>
                    )}
                  </g>
                </g>
              ))}

              {/* Airports */}
              {terrain.airports.map((airport, index) => (
                <g key={`airport-${index}`}>
                  <rect 
                    x={airport.x} 
                    y={airport.y} 
                    width={airport.width}
                    height={airport.height}
                    fill="#d1e7dd"
                    stroke="#20948b"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                  {/* Runway */}
                  <path
                    d={airport.runwayPath}
                    stroke="#333"
                    strokeWidth="6"
                    opacity="0.8"
                  />
                  {/* Airport Plane Icon */}
                  <g fill="#20948b" opacity="0.9">
                    <polygon points={`${airport.x + airport.width/2},${airport.y + airport.height/2 - 8} ${airport.x + airport.width/2 - 12},${airport.y + airport.height/2 + 4} ${airport.x + airport.width/2 - 4},${airport.y + airport.height/2 + 2} ${airport.x + airport.width/2},${airport.y + airport.height/2 - 2} ${airport.x + airport.width/2 + 4},${airport.y + airport.height/2 + 2} ${airport.x + airport.width/2 + 12},${airport.y + airport.height/2 + 4}`} />
                  </g>
                  {/* Airport Label */}
                  <text 
                    x={airport.x + airport.width/2} 
                    y={airport.y + airport.height + 12} 
                    textAnchor="middle" 
                    fontSize="8" 
                    fill="#20948b" 
                    fontWeight="bold"
                  >
                    {airport.id}
                  </text>
                </g>
              ))}

              {/* Bridges */}
              {terrain.bridges.map((bridge, index) => (
                <rect 
                  key={`bridge-${index}`}
                  x={bridge.x} 
                  y={bridge.y} 
                  width={bridge.width}
                  height={bridge.height}
                  fill="rgba(165, 42, 42, 0.7)"
                  stroke="#8b0000"
                  strokeWidth="2"
                />
              ))}

              {/* Fuel Depots */}
              {terrain.fuelDepots.map((depot, index) => (
                <g 
                  key={`depot-${index}`}
                >
                  {[...Array(depot.tanks)].map((_, tankIndex) => (
                    <circle
                      key={`tank-${tankIndex}`}
                      cx={depot.x + (tankIndex * 12)}
                      cy={depot.y}
                      r="6"
                      fill="#ffd700"
                      stroke="#daa520"
                      strokeWidth="1"
                      opacity="0.8"
                    />
                  ))}
                </g>
              ))}

              {/* Communication Towers */}
              {terrain.towers.map((tower, index) => (
                <line 
                  key={`tower-${index}`}
                  x1={tower.x}
                  y1={tower.y}
                  x2={tower.x}
                  y2={tower.y - tower.height}
                  stroke={tower.type === 'radio' ? "#1e90ff" : "#32cd32"}
                  strokeWidth="2"
                  opacity="0.9"
                />
              ))}

              {/* Military Compounds */}
              {terrain.compounds.map((compound, index) => (
                <g 
                  key={`compound-${index}`}
                >
                  <rect
                    x={compound.x}
                    y={compound.y}
                    width={compound.width}
                    height={compound.height}
                    fill="#808080"
                    stroke="#505050"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                  <path
                    d={compound.fencePath}
                    stroke="#505050"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.5"
                    strokeDasharray="4,4"
                  />
                </g>
              ))}
            </svg>
            
            {/* Network Connections */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
              {/* Dynamic connection lines between friendly nodes */}
              {nodes
                .filter(node => node.faction === 'friendly' && node.status === 'online')
                .map((node, i, friendlyNodes) => 
                  friendlyNodes.slice(i + 1).map((otherNode, j) => {
                    const distance = Math.sqrt(
                      Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
                    );
                    
                    // Calculate max range based on node types (same logic as findRoute)
                    let maxRange = 150; // Base range
                    
                    if (node.type === 'command') {
                      maxRange = 250;
                    } else if (node.type === 'relay' || node.type === 'repeater') {
                      maxRange = 200;
                    } else if (node.type === 'gateway') {
                      maxRange = 220;
                    } else if (node.type === 'sensor') {
                      maxRange = 120;
                    }
                    
                    // Show connection if within range
                    if (distance <= maxRange) {
                      // Connection strength visualization
                      const strength = 1 - (distance / maxRange);
                      const strokeColor = strength > 0.7 ? '#4ade80' : // Strong - green
                                         strength > 0.4 ? '#fbbf24' : // Medium - yellow
                                         '#f97316'; // Weak - orange
                      const strokeWidth = strength > 0.7 ? '3' : 
                                         strength > 0.4 ? '2' : '1';
                      const dashArray = strength < 0.4 ? '5,5' : 'none';
                      
                      return (
                        <line
                          key={`${node.id}-${otherNode.id}`}
                          x1={node.x + node.size/2}
                          y1={node.y + node.size/2}
                          x2={otherNode.x + otherNode.size/2}
                          y2={otherNode.y + otherNode.size/2}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          strokeDasharray={dashArray}
                          opacity="0.7"
                        />
                      );
                    }
                    return null;
                  })
                )}
              
              {/* Signal strength rings */}
              {nodes.map(node => (
                <circle
                  key={`ring-${node.id}`}
                  cx={node.x + node.size/2}
                  cy={node.y + node.size/2}
                  r={node.type === 'command' ? '80' : node.type === 'relay' ? '60' : '40'}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="1"
                  opacity="0.2"
                  strokeDasharray="3,3"
                />
              ))}
            </svg>
            
            {/* Dynamic Nodes */}
            {nodes.map(node => (
              <div
                key={node.id}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${node.size}px`,
                  height: `${node.size}px`,
                  borderRadius: node.id === 'cmd-001' ? '8px' : node.faction === 'enemy' ? '0' : '50%', // Square for CMD and hostiles, circular for friendlies
                  backgroundColor: selectedRecipient && selectedRecipient.id === node.id ? '#f59e0b' : 
                                   node.faction === 'enemy' ? '#dc2626' : node.color,
                  border: `3px solid ${selectedRecipient && selectedRecipient.id === node.id ? '#d97706' : 
                                        node.faction === 'enemy' ? '#b91c1c' : node.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: node.size > 35 ? '1.2rem' : node.faction === 'enemy' ? '1.1rem' : '0.7rem',
                  fontWeight: 'bold',
                  zIndex: 10,
                  boxShadow: node.faction === 'enemy' ? 
                            '0 0 25px rgba(220, 38, 38, 0.8), 0 0 50px rgba(220, 38, 38, 0.6)' :
                            '0 0 20px rgba(0,0,0,0.5), 0 0 40px ' + node.color + '40',
                  animation: node.id === 'cmd-001' ? 'cmdBlink 2s infinite' : 
                            node.faction === 'enemy' ? 'hostileFlash 1s infinite' :
                            node.status === 'warning' ? 'pulse 2s infinite' : 'none',
                  cursor: (node.faction === 'friendly' && node.id !== 'cmd-001') || node.faction === 'enemy' ? 'pointer' : 'default',
                  transition: 'all 0.3s ease',
                  transform: node.faction === 'enemy' ? 'rotate(45deg)' : 'none' // Rotate hostiles to show as diamonds
                }}
                title={`${node.name} (${node.type}) - ${node.status}${node.faction === 'friendly' && node.id !== 'cmd-001' ? ' - Click to target' : node.faction === 'enemy' ? ' - Click to intercept' : ''}`}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={(e) => {
                  e.target.style.transform = node.faction === 'enemy' ? 'rotate(45deg) scale(1.2)' : 'scale(1.2)';
                  e.target.style.zIndex = '20';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = node.faction === 'enemy' ? 'rotate(45deg) scale(1)' : 'scale(1)';
                  e.target.style.zIndex = '10';
                }}
              >
                {node.faction === 'enemy' ? (
                  <div style={{
                    transform: 'rotate(-45deg)', // Counter-rotate to keep text upright
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                    lineHeight: '1'
                  }}>
                    <div style={{ 
                      fontSize: '1.4rem', 
                      marginBottom: '-2px',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>×</div>
                    <div style={{ 
                      fontSize: '0.7rem',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '20px'
                    }}>{node.name}</div>
                  </div>
                ) : (
                  node.name
                )}
              </div>
            ))}
            
            {/* Coordinate Overlay */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              fontSize: '0.7rem',
              color: '#9ca3af',
              fontFamily: 'monospace',
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              <div>📍 COORDINATES</div>
              <div>Lat: 34°N | Lng: 118°W</div>
              <div>Alt: 1,247m ASL</div>
            </div>
            
            {/* Legend */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              fontSize: '0.7rem',
              color: '#9ca3af',
              fontFamily: 'monospace',
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              <div style={{ marginBottom: '0.25rem' }}>🟦 Command 🟢 Relay 🟡 Sensor</div>
              <div style={{ marginBottom: '0.25rem' }}>— Strong ⋯ Weak ••• No Signal</div>
              <div style={{ color: '#f59e0b', fontSize: '0.65rem' }}>🎯 Click map to order tactical strikes</div>
            </div>
          </div>
          
          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#9ca3af' }}>
            <div>🟢 Online: {nodes.filter(n => n.status === 'online').length} | 🟡 Warning: {nodes.filter(n => n.status === 'warning').length} | 🟠 Offline: {nodes.filter(n => n.status === 'offline').length} | 🔴 Hostile: {nodes.filter(n => n.status === 'hostile').length}</div>
            <div style={{ marginTop: '0.5rem' }}>Tactical Mesh Network - Live battlefield awareness with integrated terrain analysis</div>
            
            {/* Terrain Features Summary */}
            <div style={{ 
              marginTop: '1rem', 
              fontSize: '0.8rem', 
              color: '#6b7280', 
              backgroundColor: 'rgba(0,0,0,0.3)', 
              padding: '0.75rem', 
              borderRadius: '6px',
              border: '1px solid #374151'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#9ca3af' }}>📊 TERRAIN INTELLIGENCE</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                {terrain.hospitals.length > 0 && (
                  <span>🏥 Hospitals: {terrain.hospitals.length}</span>
                )}
                {terrain.buildings.length > 0 && (
                  <span>🏢 Buildings: {terrain.buildings.length} ({terrain.buildings.filter(b => b.type === 'commercial').length}C/{terrain.buildings.filter(b => b.type === 'residential').length}R)</span>
                )}
                {terrain.airports.length > 0 && (
                  <span>✈️ Airports: {terrain.airports.length}</span>
                )}
                {terrain.bridges.length > 0 && (
                  <span>🌉 Bridges: {terrain.bridges.length}</span>
                )}
                {terrain.fuelDepots.length > 0 && (
                  <span>⛽ Fuel Depots: {terrain.fuelDepots.length}</span>
                )}
                {terrain.towers.length > 0 && (
                  <span>📡 Towers: {terrain.towers.length} ({terrain.towers.filter(t => t.type === 'radio').length}R/{terrain.towers.filter(t => t.type === 'cell').length}C)</span>
                )}
                {terrain.compounds.length > 0 && (
                  <span>🏭 Compounds: {terrain.compounds.length}</span>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                <span>🗻 Hills: {terrain.hills.length}</span>
                <span>🌊 Rivers: {terrain.rivers.length}</span>
                <span>🌲 Forests: {terrain.forests.length}</span>
                <span>🛣️ Roads: {terrain.roads.length}</span>
                <span>🏘️ Streets: {terrain.streets.length}</span>
                <span>🥾 Pathways: {terrain.pathways.length}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Status Bar */}
      <footer style={{
        backgroundColor: '#111111',
        borderTop: '1px solid #3a3a3b',
        padding: '0.75rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.9rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ color: '#10b981' }}>● Network: CONNECTED</span>
          <span>Nodes: {nodes.filter(n => n.status === 'online').length}/{nodes.length}</span>
          <span>Messages: {messages.length}</span>
          <span>Failures: {nodes.filter(n => n.status === 'offline').length}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span>Tacti-Mesh-Alpha</span>
          <span>Uptime: 02:34:12</span>
          <span>v1.0.0</span>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            animation: 'pulse 2s infinite'
          }} />
        </div>
      </footer>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes cmdBlink {
          0%, 70% { 
            opacity: 1; 
            box-shadow: 0 0 20px rgba(0,0,0,0.5), 0 0 40px #3b82f640;
          }
          85%, 100% { 
            opacity: 0.3; 
            box-shadow: 0 0 20px rgba(0,0,0,0.5), 0 0 60px #3b82f6aa;
          }
        }
        @keyframes hostileFlash {
          0%, 50% { 
            background-color: #dc2626;
            border-color: #b91c1c;
            box-shadow: 0 0 25px rgba(220, 38, 38, 0.8), 0 0 50px rgba(220, 38, 38, 0.6);
          }
          51%, 100% { 
            background-color: #f87171;
            border-color: #ef4444;
            box-shadow: 0 0 30px rgba(248, 113, 113, 0.9), 0 0 60px rgba(248, 113, 113, 0.7);
          }
        }
      `}</style>
    </div>
  );
}

export default App;


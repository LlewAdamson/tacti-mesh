import React from 'react';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#0a0a0b', 
      color: '#d1d5db', 
      minHeight: '100vh', 
      padding: '2rem',
      fontFamily: 'system-ui'
    }}>
      <h1>🎯 Tacti-Mesh Command</h1>
      <p>Simple test - if you see this, React is working!</p>
      <div style={{ marginTop: '2rem' }}>
        <h2>Basic Network Status</h2>
        <ul>
          <li>✅ React: Working</li>
          <li>✅ Vite: Working</li>
          <li>⏳ Components: Loading...</li>
        </ul>
      </div>
    </div>
  );
}

export default App;

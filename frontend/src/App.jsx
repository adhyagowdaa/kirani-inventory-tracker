import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

function App() {
  // Can be 'login', 'signup', or 'dashboard'
  const [view, setView] = useState('login'); 

  return (
    <div>
      {view === 'login' && (
        <Login 
          onNavigateToSignup={() => setView('signup')} 
          onLoginSuccess={() => setView('dashboard')} 
        />
      )}
      
      {view === 'signup' && (
        <Signup onNavigateToLogin={() => setView('login')} />
      )}
      
      {view === 'dashboard' && (
        <Dashboard onLogout={() => setView('login')} />
      )}
    </div>
  );
}

export default App;
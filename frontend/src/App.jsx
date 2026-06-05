import React, { useState } from 'react';
import Login from './login';
import Dashboard from './dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
export default App;
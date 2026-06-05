import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const formData = { email, password };
      // This calls your live backend on Render safely
      const response = await axios.post('https://kirana-backend-api-zc3s.onrender.com/api/auth/login', formData);
      alert('Login successful!');
      onLoginSuccess(); // This switches the view to your Dashboard
    } catch (error) {
      alert('Invalid email or password');
    }
  };

    return (
        <div>
            <h2>Login</h2>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
export default Login;
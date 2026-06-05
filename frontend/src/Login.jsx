import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLoginSuccess, onNavigateToSignup }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    try {
      const formData = { email, password };
      // Connects safely to your live Render database backend
      const response = await axios.post('https://kirana-backend-api-zc3s.onrender.com/api/auth/login', formData);
      alert('Login successful!');
      onLoginSuccess(); // Switches view to your inventory dashboard
    } catch (error) {
      alert('Invalid email or password');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#121212',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Login</h1>
      <form onSubmit={handleLogin} style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.05)',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #444',
            background: '#222',
            color: 'white'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #444',
            background: '#222',
            color: 'white'
          }}
        />
        <button type="submit" style={{
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          background: '#333',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#aaa', textAlign: 'center' }}>
         Don't have an account?{' '}
        <span 
        onClick={onNavigateToSignup} 
        style={{ color: '#3b82f6', cursor: 'pointer', textDecoration: 'underline' }}
        >
              Sign up here
         </span>
      </p>
    </div>
  );
}
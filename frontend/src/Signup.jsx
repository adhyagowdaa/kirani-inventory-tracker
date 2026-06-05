import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onNavigateToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        // Simple validation check
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(false);
        try {
            setLoading(true);
            const response = await axios.post('https://kirana-backend-api-zc3s.onrender.com/api/auth/register', {
                email,
                password
            });

            alert(response.data.message || "Account created successfully! Redirecting to login...");
            
            // Navigate back to login screen upon success
            if (onNavigateToLogin) onNavigateToLogin();

        } catch (error) {
            console.error("Signup error details:", error);
            const errorMsg = error.response?.data?.message || "Something went wrong during signup.";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'rgb(18, 18, 18)', // Matching your exact dark theme
            color: 'white',
            fontFamily: 'sans-serif'
        }}>
            <div style={{
                background: '#1e1e1e',
                padding: '2.5rem',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                textAlign: 'center',
                width: '320px'
            }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Create Account</h2>
                
                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #333',
                            background: '#2a2a2a',
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
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #333',
                            background: '#2a2a2a',
                            color: 'white'
                        }}
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #333',
                            background: '#2a2a2a',
                            color: 'white'
                        }}
                    />
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            padding: '10px',
                            background: '#333',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            marginTop: '0.5rem'
                        }}
                    >
                        {loading ? 'Creating...' : 'Sign Up'}
                    </button>
                </form>

                <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#aaa' }}>
                    Already have an account?{' '}
                    <span 
                        onClick={onNavigateToLogin} 
                        style={{ color: '#3b82f6', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
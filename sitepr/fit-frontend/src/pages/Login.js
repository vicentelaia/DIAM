import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error.response?.data);
      setError(error.response?.data?.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      
        <div className="login-card">
          <div className="login-header">
            <div className="brand-logo-container">
              <img 
                src="/logo.png" 
                alt="Fit & Sabor Logo" 
                className="brand-logo"
                onError={(e) => {
                  e.target.src = '/default-logo.png';
                  e.target.onerror = null;
                }}
              />
            </div>
            <h1>Fit & Sabor</h1>
            <p>Entre para descobrir receitas saudáveis e deliciosas</p>
          </div>

          {error && (
            <Alert variant="danger" className="error-message">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="username"
              label="Username"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="password"
              label="Senha"
            >
              <Form.Control
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </FloatingLabel>

            <Button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </Form>

          <div className="register-link">
            Ainda não tem uma conta?
            <Link to="/register">Cadastre-se</Link>
          </div>
        </div>
      
    </div>
  );
};

export default Login;
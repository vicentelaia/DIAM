import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, FloatingLabel } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Temporariamente, apenas navega para a página inicial
    // Isso será substituído pela lógica real de login quando o backend estiver pronto
    navigate('/');
  };

  return (
    <div className="login-container">
      <Container>
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
            <div className="error-message">
              {error}
            </div>
          )}

          <Form className="login-form" onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="email"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
              />
            </FloatingLabel>

            <Button 
              type="submit" 
              className="login-button"
            >
              Entrar
            </Button>
          </Form>

          <div className="register-link">
            Ainda não tem uma conta?
            <Link to="/register">Cadastre-se</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



const NavigationBar = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <Navbar bg="success" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/home">Fit & Sabor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="ms-auto">
            <Button
              variant="light"
              className="me-2"
              as={Link}
              to="/create-recipe"
            >
              <i className="bi bi-plus-circle"></i> Nova Receita
            </Button>
            <Nav.Link as={Link} to="/profile">
              <i className="bi bi-person-circle"></i>
            </Nav.Link>
              <Button
                variant="outline-light"
                onClick={handleLogout}
                className="ms-2"
              >
                <i className="bi bi-box-arrow-right"></i> Sair
              </Button>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; 
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="success" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Fit & Sabor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/search">
              <i className="bi bi-search"></i> Pesquisar
            </Nav.Link>
          </Nav>
          <Nav>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; 
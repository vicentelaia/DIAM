import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Tab, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  // Dados mockados para teste
  const mockUser = {
    username: "Usuário Teste",
    avatar: null,
    bio: "Esta é uma bio de teste"
  };

  const mockRecipes = [
    {
      id: 1,
      title: "Receita Teste 1",
      description: "Descrição da receita teste 1",
      image: null,
      likes_count: 5
    },
    {
      id: 2,
      title: "Receita Teste 2",
      description: "Descrição da receita teste 2",
      image: null,
      likes_count: 3
    }
  ];

  const [activeTab, setActiveTab] = useState('recipes');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <i className="bi bi-person-circle mb-3" style={{ fontSize: '150px' }}></i>

              <h2>{mockUser.username}</h2>
              <p className="text-muted">
                {mockRecipes.length} receitas publicadas
              </p>

              <div className="d-grid gap-2">
                <Button
                  variant="outline-success"
                  as={Link}
                  to="/create-recipe"
                >
                  Nova Receita
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="recipes">Receitas</Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="recipes">
                    <Row xs={1} md={2} className="g-4">
                      {mockRecipes.map((recipe) => (
                        <Col key={recipe.id}>
                          <Card>
                            <Card.Body>
                              <Card.Title>{recipe.title}</Card.Title>
                              <Card.Text>
                                {recipe.description}
                              </Card.Text>
                              <div className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">
                                  {recipe.likes_count} curtidas
                                </small>
                                <Button
                                  variant="success"
                                  as={Link}
                                  to={`/recipes/${recipe.id}`}
                                >
                                  Ver Receita
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile; 
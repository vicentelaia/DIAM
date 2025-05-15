import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Tab, Nav } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState('recipes');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (authUser) {
      fetchUserData();
      fetchUserRecipes();
    }
  }, [authUser]);

  const fetchUserData = async () => {
    try {
      const response = await api.get('/api/auth/user/');
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Erro ao carregar dados do usuário');
      setLoading(false);
    }
  };

  const fetchUserRecipes = async () => {
    try {
      const response = await api.get('/api/recipes/');
      console.log('All recipes:', response.data); // Debug log
      console.log('Current user:', authUser); // Debug log
      
      // Handle both paginated and non-paginated responses
      const allRecipes = response.data.results || response.data;
      
      // Filter recipes where the author ID matches the current user's ID
      const userRecipes = allRecipes.filter(recipe => {
        console.log('Recipe author:', recipe.author); // Debug log
        return recipe.author && recipe.author.id === authUser.id;
      });
      
      console.log('User recipes:', userRecipes); // Debug log
      setRecipes(userRecipes);
    } catch (err) {
      console.error('Error fetching user recipes:', err);
      setError('Erro ao carregar receitas');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) return;

    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      await api.patch('/api/auth/user/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchUserData();
      setAvatar(null);
      setAvatarPreview(null);
    } catch (err) {
      console.error('Erro ao atualizar avatar:', err);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <p>Carregando...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <p>Usuário não encontrado.</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="rounded-circle mb-3"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              ) : (
                <i
                  className="bi bi-person-circle mb-3"
                  style={{ fontSize: '150px' }}
                ></i>
              )}

              <Form onSubmit={handleAvatarSubmit} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </Form.Group>
                {avatarPreview && (
                  <div className="mb-3">
                    <img
                      src={avatarPreview}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ maxWidth: '150px' }}
                    />
                  </div>
                )}
                <Button
                  variant="success"
                  type="submit"
                  disabled={!avatar}
                >
                  Atualizar Avatar
                </Button>
              </Form>

              <h2>{user.username}</h2>
              <p className="text-muted">
                {recipes.length} receitas publicadas
              </p>

              <div className="d-grid gap-2">
                <Button
                  variant="outline-success"
                  as={Link}
                  to="/create-recipe"
                >
                  Nova Receita
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
                      {recipes.map((recipe) => (
                        <Col key={recipe.id}>
                          <Card>
                            {recipe.image && (
                              <Card.Img
                                variant="top"
                                src={recipe.image}
                                alt={recipe.title}
                                style={{ height: '200px', objectFit: 'cover' }}
                              />
                            )}
                            <Card.Body>
                              <Card.Title>{recipe.title}</Card.Title>
                              <Card.Text>
                                {recipe.description.length > 100
                                  ? `${recipe.description.substring(0, 100)}...`
                                  : recipe.description}
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

                    {recipes.length === 0 && (
                      <p className="text-center text-muted">
                        Nenhuma receita publicada ainda.
                      </p>
                    )}
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
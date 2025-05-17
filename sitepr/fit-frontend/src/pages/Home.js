import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, InputGroup, Alert, Spinner } from 'react-bootstrap';
import { FaSearch, FaHeart, FaUtensils, FaCoffee, FaCarrot, FaAppleAlt } from 'react-icons/fa';
import api from '../api';
import './Home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [user, setUser] = useState(null);

  const categories = [
    { id: 'cafe-da-manha', name: 'Café da Manhã', icon: <FaCoffee /> },
    { id: 'almoco', name: 'Almoço', icon: <FaUtensils /> },
    { id: 'jantar', name: 'Jantar', icon: <FaUtensils /> },
    { id: 'lanche', name: 'Lanche', icon: <FaAppleAlt /> },
    { id: 'sobremesa', name: 'Sobremesa', icon: <FaCarrot /> },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/auth/user/');
        setUser(response.data);
      } catch (err) {
        console.error('Erro ao carregar usuário:', err);
      }
    };
    fetchRecipes();
    fetchUser();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/recipes/');
      const recipesData = response.data.results || response.data;
      setRecipes(Array.isArray(recipesData) ? recipesData : []);
      setError('');
    } catch (err) {
      console.error('Erro ao carregar receitas:', err);
      setError('Erro ao carregar receitas. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipes = Array.isArray(recipes)
    ? recipes.filter((recipe) => {
        const matchesSearch =
          recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || recipe.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
    : [];

  const handleLike = async (recipeId) => {
    try {
      await api.post(`/api/recipes/${recipeId}/like/`);
      fetchRecipes();
    } catch (err) {
      console.error('Erro ao curtir:', err);
    }
  };

  const handleDelete = async (recipeId) => {
    if (!window.confirm('Tem certeza que deseja remover esta receita?')) return;

    try {
      await api.delete(`/api/recipes/${recipeId}/`);
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
    } catch (err) {
      console.error('Erro ao remover receita:', err);
      alert('Erro ao remover receita.');
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={8} className="text-center text-md-start">
              <h1>Bem-vindo ao Fit & Sabor</h1>
              <p className="lead">Descubra receitas saudáveis e deliciosas para uma vida mais equilibrada.</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Search and Filter Section */}
      <Container className="search-section py-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar receitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="">Todas as categorias</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Container>

      {/* Categories Section */}
      <Container className="categories-section py-4">
        <h2 className="section-title mb-4">Categorias</h2>
        <Row>
          {categories.map((category) => (
            <Col key={category.id} xs={6} md={4} lg={2} className="mb-4">
              <Card
                className="category-card text-center"
                onClick={() => setSelectedCategory(category.id)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body>
                  <div className="category-icon">{category.icon}</div>
                  <Card.Title>{category.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Recipes Section */}
      <Container className="recipes-section py-4">
        <h2 className="section-title mb-4">Receitas</h2>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
            <p className="mt-3">Carregando receitas...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            <p className="mb-0">{error}</p>
            <Button variant="outline-danger" size="sm" className="mt-2" onClick={fetchRecipes}>
              Tentar Novamente
            </Button>
          </Alert>
        ) : (
          <Row>
            {filteredRecipes.length === 0 ? (
              <Col className="text-center py-5">
                <p className="text-muted">Nenhuma receita encontrada.</p>
              </Col>
            ) : (
              filteredRecipes.map((recipe) => (
                <Col key={recipe.id} md={4} className="mb-4">
                  <Card className="recipe-card h-100">
                    {recipe.image && (
                      <Card.Img
                        variant="top"
                        src={recipe.image}
                        alt={recipe.title}
                        className="recipe-image"
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{recipe.title}</Card.Title>
                      <Card.Text>
                        {recipe.description?.length > 100
                          ? `${recipe.description.substring(0, 100)}...`
                          : recipe.description}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-white">
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/recipe/${recipe.id}`} className="text-decoration-none">
                          <Button variant="success" size="sm">
                            Ver Receita
                          </Button>
                        </Link>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="link"
                            className="p-0 me-2"
                            onClick={() => handleLike(recipe.id)}
                          >
                            <FaHeart
                              className={
                                recipe.likes?.includes(user?.id) ? 'text-danger' : 'text-muted'
                              }
                            />
                          </Button>

                          <small className="text-muted me-3">{recipe.likes_count || 0}</small>

                          {user?.is_superuser && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(recipe.id)}
                            >
                              Remover
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;

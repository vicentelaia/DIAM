import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import api from '../api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/recipes/');
      console.log('API Response:', response.data); // Debug log
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

  const filteredRecipes = Array.isArray(recipes) ? recipes.filter((recipe) => {
    const matchesSearch = recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <p>Carregando...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar receitas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            <option value="cafe-da-manha">Café da Manhã</option>
            <option value="almoco">Almoço</option>
            <option value="jantar">Jantar</option>
            <option value="lanche">Lanche</option>
            <option value="sobremesa">Sobremesa</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {filteredRecipes.length === 0 ? (
          <Col className="text-center">
            <p>Nenhuma receita encontrada.</p>
          </Col>
        ) : (
          filteredRecipes.map((recipe) => (
            <Col key={recipe.id} md={4} className="mb-4">
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
                    {recipe.description?.length > 100
                      ? `${recipe.description.substring(0, 100)}...`
                      : recipe.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/recipe/${recipe.id}`}>
                      <Button variant="primary">Ver Receita</Button>
                    </Link>
                    <small className="text-muted">
                      {recipe.likes_count || 0} curtidas
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Home; 
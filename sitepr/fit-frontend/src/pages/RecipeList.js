import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardImg, Alert } from 'reactstrap';
import api from '../api';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/recipes/');
        console.log('API Response:', response.data); // Debug log
        
        // Handle both paginated and non-paginated responses
        const recipeData = response.data.results || response.data;
        
        if (Array.isArray(recipeData)) {
          setRecipes(recipeData);
        } else {
          console.error('Expected array but got:', typeof recipeData);
          setError('Invalid data format received from server');
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to load recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <Container className="py-5">
        <div>Loading recipes...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert color="danger">{error}</Alert>
      </Container>
    );
  }

  if (!Array.isArray(recipes) || recipes.length === 0) {
    return (
      <Container className="py-5">
        <h2>Recipes</h2>
        <div>No recipes found.</div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2>Recipes</h2>
      <Row>
        {recipes.map((recipe) => (
          <Col key={recipe.id} md={4} className="mb-4">
            <Card>
              {recipe.image && (
                <CardImg
                  top
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <CardBody>
                <CardTitle tag="h5">
                  <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                </CardTitle>
                <CardText>{recipe.description}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default RecipeList; 
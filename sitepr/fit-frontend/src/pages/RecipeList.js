import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardImg, Alert, Button, ButtonGroup } from 'reactstrap';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './RecipeList.css';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    currentPage: 1
  });

  const fetchRecipes = async (url = '/api/recipes/') => {
    try {
      setLoading(true);
      const response = await api.get(url);
      console.log('API Response:', response.data);
      
      // Atualizar dados de paginação
      setPagination({
        count: response.data.count || 0,
        next: response.data.next,
        previous: response.data.previous,
        currentPage: url.includes('page=') ? parseInt(url.split('page=')[1]) : 1
      });
      
      // Atualizar lista de receitas
      const recipeData = response.data.results || response.data;
      if (Array.isArray(recipeData)) {
        setRecipes(recipeData);
      } else {
        console.error('Expected array but got:', typeof recipeData);
        setError('Invalid data format received from server');
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Erro ao carregar receitas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handlePageChange = (url) => {
    if (url) {
      // Extrair o caminho relativo da URL completa
      const relativeUrl = url.split('/api')[1];
      fetchRecipes('/api' + relativeUrl);
    }
  };

  const handleLike = async (recipeId) => {
    if (!user) {
      // Se não estiver logado, redirecionar para login
      navigate('/login');
      return;
    }

    try {
      const response = await api.post(`/api/recipes/${recipeId}/like/`);
      console.log('Like response:', response.data);
      
      // Atualizar o estado das receitas com o novo status de like
      setRecipes(recipes.map(recipe => {
        if (recipe.id === recipeId) {
          return {
            ...recipe,
            is_liked: !recipe.is_liked,
            likes_count: recipe.is_liked ? recipe.likes_count - 1 : recipe.likes_count + 1
          };
        }
        return recipe;
      }));
    } catch (error) {
      console.error('Error liking recipe:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Erro ao curtir a receita. Tente novamente.');
      }
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
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
        <h2>Receitas</h2>
        <div>Nenhuma receita encontrada.</div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Receitas</h2>
        <div className="text-muted">
          Total: {pagination.count} receitas
        </div>
      </div>
      
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
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    color="link"
                    className={`p-0 like-button ${recipe.is_liked ? 'liked' : ''}`}
                    onClick={() => handleLike(recipe.id)}
                  >
                    {recipe.is_liked ? (
                      <FaHeart className="text-danger" />
                    ) : (
                      <FaRegHeart />
                    )}
                    <span className="ms-1">{recipe.likes_count || 0}</span>
                  </Button>
                  <Button
                    color="success"
                    outline
                    size="sm"
                    tag={Link}
                    to={`/recipes/${recipe.id}`}
                  >
                    Ver Receita
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Paginação */}
      <div className="d-flex justify-content-center mt-4">
        <ButtonGroup>
          <Button
            color="primary"
            outline
            onClick={() => handlePageChange(pagination.previous)}
            disabled={!pagination.previous}
          >
            Anterior
          </Button>
          <Button color="primary" outline disabled>
            Página {pagination.currentPage}
          </Button>
          <Button
            color="primary"
            outline
            onClick={() => handlePageChange(pagination.next)}
            disabled={!pagination.next}
          >
            Próxima
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
}

export default RecipeList; 
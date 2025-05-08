import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert, ListGroup } from 'react-bootstrap';
import api from '../services/api';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchRecipe();
    fetchComments();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await api.get(`/recipes/${id}/`);
      setRecipe(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar receita');
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(`/recipes/${id}/comments/`);
      setComments(response.data);
    } catch (err) {
      console.error('Erro ao carregar comentários:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/recipes/${id}/comments/`, { content: comment });
      setComment('');
      fetchComments();
    } catch (err) {
      console.error('Erro ao comentar:', err);
    }
  };

  const handleLike = async () => {
    try {
      await api.post(`/recipes/${id}/like/`);
      fetchRecipe();
    } catch (err) {
      console.error('Erro ao curtir:', err);
    }
  };

  const handleFavorite = async () => {
    try {
      await api.post(`/recipes/${id}/favorite/`);
      fetchRecipe();
    } catch (err) {
      console.error('Erro ao favoritar:', err);
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

  if (!recipe) {
    return (
      <Container className="py-5 text-center">
        <p>Receita não encontrada.</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            {recipe.image && (
              <Card.Img
                variant="top"
                src={recipe.image}
                alt={recipe.title}
                style={{ height: '400px', objectFit: 'cover' }}
              />
            )}
            <Card.Body>
              <Card.Title as="h1">{recipe.title}</Card.Title>
              <Card.Text className="text-muted">
                Por {recipe.author.username} • {new Date(recipe.created_at).toLocaleDateString()}
              </Card.Text>
              <Card.Text>{recipe.description}</Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>Ingredientes</Card.Header>
            <Card.Body>
              <Card.Text style={{ whiteSpace: 'pre-line' }}>
                {recipe.ingredients}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>Modo de Preparo</Card.Header>
            <Card.Body>
              <Card.Text style={{ whiteSpace: 'pre-line' }}>
                {recipe.instructions}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>Comentários</Card.Header>
            <Card.Body>
              <Form onSubmit={handleCommentSubmit} className="mb-4">
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escreva um comentário..."
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                  Comentar
                </Button>
              </Form>

              <ListGroup>
                {comments.map((comment) => (
                  <ListGroup.Item key={comment.id}>
                    <div className="d-flex justify-content-between">
                      <strong>{comment.author.username}</strong>
                      <small className="text-muted">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </small>
                    </div>
                    <p className="mb-0">{comment.content}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-grid gap-2">
                <Button
                  variant={recipe.is_liked ? 'danger' : 'outline-danger'}
                  onClick={handleLike}
                >
                  {recipe.is_liked ? 'Descurtir' : 'Curtir'} ({recipe.likes_count})
                </Button>
                <Button
                  variant={recipe.is_favorited ? 'warning' : 'outline-warning'}
                  onClick={handleFavorite}
                >
                  {recipe.is_favorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Informações</Card.Header>
            <Card.Body>
              <p><strong>Categoria:</strong> {recipe.category}</p>
              <p><strong>Comentários:</strong> {recipe.comments_count}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeDetail; 
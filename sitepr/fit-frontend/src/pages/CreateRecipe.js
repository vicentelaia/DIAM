import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Container, Row, Col, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function CreateRecipe() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    category: 'almoco',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setRecipe(prev => ({
        ...prev,
        image: files[0]
      }));
    } else {
      setRecipe(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('title', recipe.title);
    formData.append('description', recipe.description);
    formData.append('ingredients', recipe.ingredients);
    formData.append('instructions', recipe.instructions);
    formData.append('category', recipe.category);
    if (recipe.image) {
      formData.append('image', recipe.image);
    }

    try {
      console.log('Enviando dados para a API...');
      const response = await api.post('/api/recipes/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Resposta da API:', response.data);
      alert('Receita criada com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar receita:', error);
      if (error.response) {
        // O servidor respondeu com um status de erro
        console.error('Dados do erro:', error.response.data);
        setError(error.response.data.message || 'Erro ao criar receita. Verifique os dados e tente novamente.');
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        setError('Não foi possível conectar ao servidor. Verifique se o servidor está rodando.');
      } else {
        // Erro ao configurar a requisição
        setError('Erro ao processar a requisição. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-4">Criar Nova Receita</h2>
          {error && <Alert color="danger" className="mb-4">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Título</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={recipe.title}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </FormGroup>

            <FormGroup>
              <Label for="description">Descrição</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={recipe.description}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </FormGroup>

            <FormGroup>
              <Label for="ingredients">Ingredientes</Label>
              <Input
                type="textarea"
                name="ingredients"
                id="ingredients"
                value={recipe.ingredients}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </FormGroup>

            <FormGroup>
              <Label for="instructions">Instruções</Label>
              <Input
                type="textarea"
                name="instructions"
                id="instructions"
                value={recipe.instructions}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </FormGroup>

            <FormGroup>
              <Label for="category">Categoria</Label>
              <Input
                type="select"
                name="category"
                id="category"
                value={recipe.category}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="cafe-da-manha">Café da Manhã</option>
                <option value="almoco">Almoço</option>
                <option value="jantar">Jantar</option>
                <option value="lanche">Lanche</option>
                <option value="sobremesa">Sobremesa</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="image">Imagem</Label>
              <Input
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
                accept="image/*"
                disabled={loading}
              />
            </FormGroup>

            <Button color="primary" type="submit" disabled={loading}>
              {loading ? 'Criando Receita...' : 'Criar Receita'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateRecipe; 
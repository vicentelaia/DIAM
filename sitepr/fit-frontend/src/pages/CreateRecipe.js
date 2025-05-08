import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Container, Row, Col } from 'reactstrap';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function CreateRecipe() {
  const navigate = useNavigate();
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
      await api.post('/recipes/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Receita criada com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar receita:', error);
      alert('Erro ao criar receita. Por favor, tente novamente.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-4">Criar Nova Receita</h2>
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
              />
            </FormGroup>

            <Button color="primary" type="submit">
              Criar Receita
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateRecipe; 
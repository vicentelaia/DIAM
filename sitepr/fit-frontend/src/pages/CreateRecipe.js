import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import './CreateRecipe.css';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    category: 'almoco',
    image: null
  });
  const [fileName, setFileName] = useState('Nenhum ficheiro selecionado');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRecipe(prev => ({
        ...prev,
        image: file
      }));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user) {
      setError('Você precisa estar logado para criar uma receita');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', recipe.title);
      formData.append('description', recipe.description);
      formData.append('ingredients', recipe.ingredients);
      formData.append('instructions', recipe.instructions);
      formData.append('category', recipe.category);
      formData.append('author', user.id);
      if (recipe.image) {
        formData.append('image', recipe.image);
      }

      const response = await api.post('/api/recipes/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Recipe created:', response.data);
      alert('Receita criada com sucesso!');
      navigate('/home');
    } catch (error) {
      console.error('Error creating recipe:', error.response?.data);
      setError(error.response?.data?.message || 'Erro ao criar receita. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'cafe-da-manha', label: 'Café da Manhã' },
    { value: 'almoco', label: 'Almoço' },
    { value: 'jantar', label: 'Jantar' },
    { value: 'lanche', label: 'Lanche' },
    { value: 'sobremesa', label: 'Sobremesa' }
  ];

  return (
    <Container className="create-recipe-container">
      <h1 className="create-recipe-title">Criar Nova Receita</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <Form className="recipe-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <Form.Label>Título da Receita</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            placeholder="Digite o nome da sua receita"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={recipe.description}
            onChange={handleChange}
            placeholder="Descreva brevemente sua receita"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <Form.Label>Ingredientes</Form.Label>
          <Form.Control
            as="textarea"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            placeholder="Liste os ingredientes (um por linha)"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <Form.Label>Modo de Preparo</Form.Label>
          <Form.Control
            as="textarea"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            placeholder="Descreva o passo a passo do preparo"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <Form.Label>Categoria</Form.Label>
          <Form.Select
            name="category"
            value={recipe.category}
            onChange={handleChange}
            className="category-select"
            disabled={loading}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className="form-group">
          <Form.Label>Imagem da Receita</Form.Label>
          <div className="file-input-container">
            <label className="file-input-label">
              {fileName}
              <input
                type="file"
                className="file-input"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
              />
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Criando...' : 'Criar Receita'}
        </button>
      </Form>
    </Container>
  );
};

export default CreateRecipe; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import './CreateRecipe.css';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    category: 'Almoço',
    image: null
  });
  const [fileName, setFileName] = useState('Nenhum ficheiro selecionado');

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
    // Aqui será implementada a lógica de envio para o backend
    console.log('Recipe submitted:', recipe);
    // Temporariamente apenas navega de volta
    navigate('/recipes');
  };

  const categories = [
    'Almoço',
    'Jantar',
    'Café da manhã',
    'Lanche',
    'Sobremesa',
    'Bebida'
  ];

  return (
    <Container className="create-recipe-container">
      <h1 className="create-recipe-title">Criar Nova Receita</h1>
      
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
          />
        </div>

        <div className="form-group">
          <Form.Label>Categoria</Form.Label>
          <Form.Select
            name="category"
            value={recipe.category}
            onChange={handleChange}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
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
              />
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Criar Receita
        </button>
      </Form>
    </Container>
  );
};

export default CreateRecipe; 
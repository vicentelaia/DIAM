import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Container, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

function CreateRecipe() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('almoco');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be logged in to create a recipe');
      navigate('/login');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('ingredients', ingredients);
      formData.append('instructions', instructions);
      formData.append('category', category);
      formData.append('author', user.id);
      if (image) {
        formData.append('image', image);
      }

      const response = await api.post('/api/recipes/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Recipe created:', response.data);
      alert('Recipe created successfully!');
      navigate('/recipes');
    } catch (error) {
      console.error('Error creating recipe:', error.response?.data);
      setError(error.response?.data?.message || 'Failed to create recipe');
    }
  };

  return (
    <Container className="py-5">
      <h2>Create New Recipe</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="ingredients">Ingredients</Label>
          <Input
            type="textarea"
            name="ingredients"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="instructions">Instructions</Label>
          <Input
            type="textarea"
            name="instructions"
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">Category</Label>
          <Input
            type="select"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          <Label for="image">Recipe Image</Label>
          <Input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Create Recipe
        </Button>
      </Form>
    </Container>
  );
}

export default CreateRecipe; 
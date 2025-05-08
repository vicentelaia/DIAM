import React, { useState } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';

function FavoriteForm({ recipeId, toggle }) {
  const [userName, setUserName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/favoritos/', {
      receita: recipeId,
      nome_utilizador: userName
    })
      .then(() => {
        alert('Receita guardada nos favoritos!');
        toggle();
      })
      .catch(err => console.error(err));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label>Seu Nome (opcional)</label>
        <Input value={userName} onChange={e => setUserName(e.target.value)} />
      </FormGroup>
      <Button color="primary" type="submit">Guardar</Button>
    </Form>
  );
}

export default FavoriteForm;

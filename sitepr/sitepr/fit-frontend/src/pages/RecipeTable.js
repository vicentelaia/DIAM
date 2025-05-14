import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import RecipeDetailModal from './RecipeDetailModal';
import FavoriteModal from './FavoriteModal';

function RecipeTable() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/receitas/')
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h2 className="mb-3">Receitas Saudáveis</h2>
      <Table striped responsive hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Tempo de Preparo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(recipe => (
            <tr key={recipe.id}>
              <td>{recipe.nome}</td>
              <td>{recipe.categoria}</td>
              <td>{recipe.tempo_preparo} min</td>
              <td>
                <Button size="sm" color="info" className="me-2"
                  onClick={() => { setSelectedRecipe(recipe); setShowDetail(true); }}>
                  Ver
                </Button>
                <Button size="sm" color="success"
                  onClick={() => { setSelectedRecipe(recipe); setShowFavorite(true); }}>
                  Favoritar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedRecipe && (
        <>
          <RecipeDetailModal
            recipe={selectedRecipe}
            isOpen={showDetail}
            toggle={() => setShowDetail(!showDetail)}
          />
          <FavoriteModal
            recipe={selectedRecipe}
            isOpen={showFavorite}
            toggle={() => setShowFavorite(!showFavorite)}
          />
        </>
      )}
    </>
  );
}

export default RecipeTable;

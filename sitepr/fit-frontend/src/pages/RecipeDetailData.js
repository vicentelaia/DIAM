import React from 'react';

function RecipeDetailData({ recipe }) {
  return (
    <div>
      <p><strong>Categoria:</strong> {recipe.categoria}</p>
      <p><strong>Tempo de Preparo:</strong> {recipe.tempo_preparo} minutos</p>
      <p><strong>Ingredientes:</strong><br />{recipe.ingredientes}</p>
      <p><strong>Modo de Preparo:</strong><br />{recipe.modo_preparo}</p>
      {recipe.imagem && (
        <div className="mt-3 text-center">
          <img src={`http://localhost:8000${recipe.imagem}`} alt="Receita" className="img-fluid rounded" />
        </div>
      )}
    </div>
  );
}

export default RecipeDetailData;


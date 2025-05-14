import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('todas');
  
  const [user] = useState({
    name: 'Usuário Exemplo',
    email: 'usuario@exemplo.com',
    avatar: '/default-avatar.png',
    stats: {
      recipes: 12,
      favorites: 25,
      followers: 48,
      following: 36
    }
  });

  const [myRecipes] = useState([
    {
      id: 1,
      title: 'Salada Mediterrânea',
      image: '/recipe1.jpg',
      likes: 24,
      date: '2024-03-15',
      category: 'Almoço'
    },
    {
      id: 2,
      title: 'Smoothie Verde',
      image: '/recipe2.jpg',
      likes: 18,
      date: '2024-03-10',
      category: 'Bebida'
    }
  ]);

  const [favoriteRecipes] = useState([
    {
      id: 3,
      title: 'Bowl de Açaí',
      image: '/recipe3.jpg',
      likes: 32,
      date: '2024-03-12',
      category: 'Café da manhã'
    },
    {
      id: 4,
      title: 'Wrap de Frango',
      image: '/recipe4.jpg',
      likes: 15,
      date: '2024-03-08',
      category: 'Almoço'
    }
  ]);

  const categories = ['todas', 'Almoço', 'Jantar', 'Café da manhã', 'Lanche', 'Sobremesa', 'Bebida'];

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  const handleCreateRecipe = () => {
    navigate('/create-recipe');
  };

  const filterRecipes = (recipes) => {
    if (activeFilter === 'todas') return recipes;
    return recipes.filter(recipe => recipe.category === activeFilter);
  };

  const RecipeSection = ({ title, recipes, emptyMessage }) => (
    <div className="content-section">
      <h2 className="section-title">{title}</h2>
      <div className="section-nav">
        {categories.map(category => (
          <button
            key={category}
            className={`section-nav-item ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="recipe-grid">
        {filterRecipes(recipes).length > 0 ? (
          filterRecipes(recipes).map(recipe => (
            <div
              key={recipe.id}
              className="recipe-card"
              onClick={() => handleRecipeClick(recipe.id)}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
                onError={(e) => {
                  e.target.src = '/default-recipe.jpg';
                  e.target.onerror = null;
                }}
              />
              <div className="recipe-info">
                <h3 className="recipe-title">{recipe.title}</h3>
                <div className="recipe-meta">
                  <span>{recipe.likes} curtidas</span>
                  <span>{new Date(recipe.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p className="empty-state-text">{emptyMessage}</p>
            <button className="empty-state-btn" onClick={handleCreateRecipe}>
              Criar Nova Receita
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Container className="profile-container">
      <div className="profile-header">
        <img
          src={user.avatar}
          alt={user.name}
          className="profile-avatar"
          onError={(e) => {
            e.target.src = '/default-avatar.png';
            e.target.onerror = null;
          }}
        />
        <div className="profile-info">
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-number">{user.stats.recipes}</div>
              <div className="stat-label">Receitas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{user.stats.favorites}</div>
              <div className="stat-label">Favoritas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{user.stats.followers}</div>
              <div className="stat-label">Seguidores</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{user.stats.following}</div>
              <div className="stat-label">Seguindo</div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="edit-profile-btn" onClick={handleEditProfile}>
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <RecipeSection
          title="Minhas Receitas"
          recipes={myRecipes}
          emptyMessage="Você ainda não criou nenhuma receita"
        />
        <RecipeSection
          title="Receitas Favoritas"
          recipes={favoriteRecipes}
          emptyMessage="Você ainda não favoritou nenhuma receita"
        />
      </div>
    </Container>
  );
};

export default Profile; 
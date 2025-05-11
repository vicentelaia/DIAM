import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import CreateRecipe from './pages/CreateRecipe';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SimpleLoginManager from './pages/SimpleLoginManager';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SimpleLoginManager" element={<SimpleLoginManager />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

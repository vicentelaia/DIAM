import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import CreateRecipe from './pages/CreateRecipe';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeList from './pages/RecipeList';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Temporarily unprotected routes for development */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={
            <div className="App">
              <Navbar />
              <Home />
          </div>
          } />
          <Route path="/create-recipe" element={
            <div className="App">
              <Navbar />
              <CreateRecipe />
            </div>
          } />
          <Route path="/recipes" element={
            <div className="App">
              <Navbar />
              <RecipeList />
            </div>
          } />
          <Route path="/recipes/:id" element={
            <div className="App">
              <Navbar />
              <RecipeDetail />
            </div>
          } />
          <Route path="/profile" element={
            <div className="App">
              <Navbar />
              <Profile />
            </div>
          } />

          {/* Catch all route */}
          <Route path="*" element={
            <div className="App">
              <Navbar />
              <Home />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

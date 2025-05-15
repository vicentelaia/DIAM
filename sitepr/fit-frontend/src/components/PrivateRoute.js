import React from 'react';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  // Temporariamente retornando as children diretamente, sem verificação de autenticação
  return children;
};

export default PrivateRoute; 
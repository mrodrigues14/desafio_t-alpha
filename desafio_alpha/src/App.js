// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Authentication from './components/authentication';
import ProductForm from './components/productForm';
import ProductList from './components/productList';
import ProductDetail from './components/productDetail';
import ProductSearch from './components/productSearch.js';
import api from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null); // State for login errors

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao fazer o parsing da string JSON:', error);
        setUser(null);
      }
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await api.login(credentials);
      setUser(response.user);
      setIsLoggedIn(true);
      setLoginError(null);
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      setLoginError(error.message || 'Erro ao realizar login');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
      <Router>
        <div className="App">
          <header className="App-header">
            {isLoggedIn ? (
                <>
                  <p>Welcome, {user?.username}!</p>
                  <button onClick={handleLogout}>Logout</button>
                  <Routes>
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/add" element={<ProductForm />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/products/search" element={<ProductSearch />} />

                  </Routes>
                  <Navigate to="/products" />
                </>
            ) : (
                <Authentication onLogin={handleLogin} loginError={loginError} />
            )}
          </header>
        </div>
      </Router>
  );
}

export default App;

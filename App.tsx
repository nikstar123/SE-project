import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SellPage from './pages/SellPage';
import NotFoundPage from './pages/NotFoundPage';

// Context
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 5,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -5,
  },
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route 
                index 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="exit"
                    variants={pageVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <HomePage />
                  </motion.div>
                } 
              />
              <Route 
                path="browse" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="exit"
                    variants={pageVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <BrowsePage />
                  </motion.div>
                } 
              />
              <Route 
                path="product/:id" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="exit"
                    variants={pageVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductPage />
                  </motion.div>
                } 
              />
              <Route 
                path="profile" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="exit"
                    variants={pageVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <ProfilePage />
                  </motion.div>
                } 
              />
              <Route 
                path="sell" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="exit"
                    variants={pageVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <SellPage />
                  </motion.div>
                } 
              />
              <Route 
                path="login" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="exit"
                    variants={pageVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <LoginPage />
                  </motion.div>
                } 
              />
              <Route 
                path="register" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="exit"
                    variants={pageVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <RegisterPage />
                  </motion.div>
                } 
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
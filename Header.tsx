import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Menu, X, User, LogIn, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Logo from '../ui/Logo';

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-gradient-to-r from-primary-700 to-primary-800 text-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo color={isScrolled ? 'text-primary-700' : 'text-white'} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/browse" 
              className={`font-medium hover:text-secondary-200 transition-colors ${
                isScrolled ? 'text-neutral-800 hover:text-primary-700' : 'text-white'
              }`}
            >
              Browse
            </Link>
            <Link 
              to="/browse?category=electronics" 
              className={`font-medium hover:text-secondary-200 transition-colors ${
                isScrolled ? 'text-neutral-800 hover:text-primary-700' : 'text-white'
              }`}
            >
              Electronics
            </Link>
            <Link 
              to="/browse?category=books" 
              className={`font-medium hover:text-secondary-200 transition-colors ${
                isScrolled ? 'text-neutral-800 hover:text-primary-700' : 'text-white'
              }`}
            >
              Books
            </Link>
            <Link 
              to="/browse?category=sports" 
              className={`font-medium hover:text-secondary-200 transition-colors ${
                isScrolled ? 'text-neutral-800 hover:text-primary-700' : 'text-white'
              }`}
            >
              Sports
            </Link>
          </nav>

          {/* Search, Cart, and Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none ${
                  isScrolled 
                    ? 'border border-neutral-300 focus:border-primary-500' 
                    : 'bg-primary-600/50 text-white placeholder-white/70 focus:bg-primary-600/70'
                }`}
              />
              <Search 
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isScrolled ? 'text-neutral-500' : 'text-white/70'
                }`} 
              />
            </form>

            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className={`p-2 rounded-full hover:bg-opacity-10 ${
                    isScrolled 
                      ? 'hover:bg-neutral-200 text-neutral-800' 
                      : 'hover:bg-white text-white'
                  }`}
                >
                  <User size={20} />
                </Link>
                <Link 
                  to="/favorites" 
                  className={`p-2 rounded-full hover:bg-opacity-10 ${
                    isScrolled 
                      ? 'hover:bg-neutral-200 text-neutral-800' 
                      : 'hover:bg-white text-white'
                  }`}
                >
                  <Heart size={20} />
                </Link>
                <Link 
                  to="/cart" 
                  className={`p-2 rounded-full hover:bg-opacity-10 relative ${
                    isScrolled 
                      ? 'hover:bg-neutral-200 text-neutral-800' 
                      : 'hover:bg-white text-white'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <Link 
                  to="/sell" 
                  className={`btn ${
                    isScrolled ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  Sell Item
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`flex items-center ${
                    isScrolled ? 'text-neutral-800' : 'text-white'
                  }`}
                >
                  <LogIn size={18} className="mr-1" />
                  <span>Log In</span>
                </Link>
                <Link 
                  to="/register" 
                  className={`btn ${
                    isScrolled ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-2 rounded-md"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X size={24} className={isScrolled ? 'text-neutral-800' : 'text-white'} />
            ) : (
              <Menu size={24} className={isScrolled ? 'text-neutral-800' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white"
      >
        <div className="px-4 py-2 space-y-3">
          <form onSubmit={handleSearch} className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-full text-sm focus:outline-none focus:border-primary-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
          </form>
          
          <Link 
            to="/browse" 
            className="block py-2 text-neutral-800 font-medium" 
            onClick={() => setIsMenuOpen(false)}
          >
            Browse All
          </Link>
          <Link 
            to="/browse?category=electronics" 
            className="block py-2 text-neutral-800 font-medium" 
            onClick={() => setIsMenuOpen(false)}
          >
            Electronics
          </Link>
          <Link 
            to="/browse?category=books" 
            className="block py-2 text-neutral-800 font-medium" 
            onClick={() => setIsMenuOpen(false)}
          >
            Books
          </Link>
          <Link 
            to="/browse?category=sports" 
            className="block py-2 text-neutral-800 font-medium" 
            onClick={() => setIsMenuOpen(false)}
          >
            Sports
          </Link>
          
          <div className="pt-2 border-t border-neutral-200">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/profile" 
                  className="py-2 text-neutral-800 font-medium flex items-center" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} className="mr-2" />
                  Profile
                </Link>
                <Link 
                  to="/favorites" 
                  className="py-2 text-neutral-800 font-medium flex items-center" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={18} className="mr-2" />
                  Favorites
                </Link>
                <Link 
                  to="/cart" 
                  className="py-2 text-neutral-800 font-medium flex items-center" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Cart {cartItems.length > 0 && `(${cartItems.length})`}
                </Link>
                <Link 
                  to="/sell" 
                  className="btn btn-primary w-full mt-2" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sell Item
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="py-2 text-neutral-800 font-medium flex items-center" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn size={18} className="mr-2" />
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary w-full" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
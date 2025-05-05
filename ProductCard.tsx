import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Product } from '../../types/Product';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div 
      className="card group h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/3]">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isFeatured && (
          <div className="absolute top-2 left-2 badge badge-secondary flex items-center">
            <Star size={12} className="mr-1" />
            Featured
          </div>
        )}
        <button 
          className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-colors text-neutral-600 hover:text-primary-600"
          aria-label="Add to favorites"
        >
          <Heart size={18} />
        </button>
      </Link>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg text-neutral-800 line-clamp-1">
                {product.title}
              </h3>
              <p className="text-primary-700 font-semibold mt-1">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
            </div>
            <span className="badge badge-primary">
              {product.condition.replace('-', ' ')}
            </span>
          </div>
          
          <p className="mt-2 text-neutral-600 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
          <div className="flex items-center">
            <img 
              src={product.sellerAvatar} 
              alt={product.sellerName} 
              className="w-6 h-6 rounded-full mr-2"
            />
            <span>{product.sellerName}</span>
          </div>
          <span>{product.bidCount} bids</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
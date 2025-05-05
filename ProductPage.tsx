import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, Shield, Clock, MapPin, ArrowLeft, User, ChevronRight, ChevronLeft } from 'lucide-react';
import mockProducts from '../data/mockProducts';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [bidAmount, setBidAmount] = useState<string>('');
  const { addToCart } = useCart();
  
  useEffect(() => {
    if (id) {
      const foundProduct = mockProducts.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images[0]);
        
        // Find related products in the same category
        const related = mockProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);
  
  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= (product.currentBid || 0)) {
      alert('Please enter a valid amount higher than the current bid');
      return;
    }
    
    // In a real app, this would call an API
    alert(`Bid placed: $${amount}`);
    setBidAmount('');
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert('Added to cart');
    }
  };
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
          <Link to="/browse" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-neutral-500 hover:text-primary-700">Home</Link>
            <ChevronRight size={16} className="mx-2 text-neutral-400" />
            <Link to="/browse" className="text-neutral-500 hover:text-primary-700">Browse</Link>
            <ChevronRight size={16} className="mx-2 text-neutral-400" />
            <Link 
              to={`/browse?category=${product.category}`} 
              className="text-neutral-500 hover:text-primary-700 capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight size={16} className="mx-2 text-neutral-400" />
            <span className="text-primary-700 truncate">{product.title}</span>
          </nav>
        </div>
        
        {/* Back Button (Mobile) */}
        <div className="md:hidden mb-4">
          <Link to="/browse" className="inline-flex items-center text-neutral-600 hover:text-primary-700">
            <ArrowLeft size={18} className="mr-1" />
            Back to Browse
          </Link>
        </div>
        
        {/* Product Content */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Images */}
            <div className="p-6">
              <div className="aspect-square overflow-hidden rounded-lg mb-4">
                <motion.img 
                  key={selectedImage}
                  src={selectedImage} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((img, index) => (
                    <div 
                      key={index}
                      className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                        selectedImage === img ? 'border-primary-500' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-16 h-16 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="p-6 border-t md:border-t-0 md:border-l border-neutral-200">
              <div className="flex flex-col h-full">
                <div className="mb-auto">
                  {/* Title and Price */}
                  <div className="mb-4">
                    <h1 className="text-3xl font-semibold text-neutral-800">{product.title}</h1>
                    <div className="flex items-center mt-2">
                      <span className="text-2xl font-bold text-primary-700">${product.price.toFixed(2)}</span>
                      {product.bidCount && product.bidCount > 0 && (
                        <span className="ml-2 text-sm text-neutral-500">({product.bidCount} bids)</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="badge badge-primary capitalize">{product.condition.replace('-', ' ')}</span>
                    <span className="badge badge-secondary capitalize">{product.category}</span>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <h2 className="text-lg font-medium mb-2">Description</h2>
                    <p className="text-neutral-700 whitespace-pre-line">{product.description}</p>
                  </div>
                  
                  {/* Location and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <MapPin size={18} className="text-primary-700 mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-neutral-600">{product.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock size={18} className="text-primary-700 mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Listing Expires</h3>
                        <p className="text-neutral-600">
                          {new Date(product.expiresAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Seller Info */}
                  <div className="flex items-center p-4 bg-neutral-50 rounded-lg mb-6">
                    <img 
                      src={product.sellerAvatar || 'https://randomuser.me/api/portraits/men/43.jpg'} 
                      alt={product.sellerName} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{product.sellerName}</h3>
                      <p className="text-sm text-neutral-500">Seller</p>
                      <Link to={`/profile/${product.sellerId}`} className="text-sm text-primary-700 hover:underline flex items-center mt-1">
                        <User size={14} className="mr-1" />
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="mt-6 space-y-4">
                  {/* Bid Form */}
                  <form onSubmit={handlePlaceBid} className="mb-4">
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">$</span>
                        <input
                          type="number"
                          placeholder={`${(product.currentBid || product.price) + 5}`}
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          step="0.01"
                          min={(product.currentBid || product.price) + 0.01}
                          className="input w-full pl-8"
                          required
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                      >
                        Place Bid
                      </button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      Enter ${((product.currentBid || product.price) + 0.01).toFixed(2)} or more
                    </p>
                  </form>
                  
                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      className="btn btn-outline flex justify-center items-center"
                      onClick={handleAddToCart}
                    >
                      Buy Now
                    </button>
                    <button className="btn btn-secondary flex justify-center items-center">
                      <Heart size={18} className="mr-2" />
                      Watchlist
                    </button>
                  </div>
                  
                  {/* Share */}
                  <button className="flex items-center justify-center w-full p-2 text-neutral-600 hover:text-primary-700">
                    <Share2 size={18} className="mr-2" />
                    Share Listing
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Guarantee */}
          <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-center text-sm text-neutral-600">
            <Shield size={16} className="text-primary-700 mr-2" />
            University Auction Guarantees Secure Transactions and Protection from Fraud
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Similar Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Search, Archive, TrendingUp } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import CategoryCard from '../components/category/CategoryCard';
import mockProducts from '../data/mockProducts';
import mockCategories from '../data/mockCategories';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const featuredProducts = mockProducts.filter(product => product.isFeatured);
  const recentProducts = [...mockProducts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-800 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Buy, Sell, and Trade within Your University Community
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-secondary-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Find amazing deals on textbooks, electronics, furniture, and more from fellow students and faculty members.
            </motion.p>
            
            <motion.div 
              className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button 
                onClick={() => navigate('/browse')}
                className="btn bg-white text-primary-700 hover:bg-neutral-100 px-8 py-3 text-lg"
              >
                Browse Items
              </button>
              <button 
                onClick={() => navigate('/sell')}
                className="btn bg-secondary-200 text-primary-800 hover:bg-secondary-300 px-8 py-3 text-lg"
              >
                Sell Something
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#F8FAFC">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-10 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md -mt-20 relative z-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">Find Exactly What You Need</h2>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-grow">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search for items..."
                    className="input w-full pl-10 pr-4 py-3"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                </div>
              </div>
              <select className="input py-3 md:w-40">
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="books">Books</option>
                <option value="sports">Sports</option>
                <option value="furniture">Furniture</option>
              </select>
              <button className="btn btn-primary py-3">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-semibold text-neutral-800">Browse Categories</h2>
              <p className="text-neutral-500 mt-2">Find items by category to narrow your search</p>
            </div>
            <button 
              onClick={() => navigate('/browse')}
              className="flex items-center text-primary-700 font-medium hover:text-primary-800"
            >
              View All <ChevronRight size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {mockCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center">
              <TrendingUp size={24} className="text-primary-700 mr-3" />
              <div>
                <h2 className="text-3xl font-semibold text-neutral-800">Featured Items</h2>
                <p className="text-neutral-500 mt-2">Popular items you might be interested in</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/browse?featured=true')}
              className="flex items-center text-primary-700 font-medium hover:text-primary-800"
            >
              View All <ChevronRight size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center">
              <Archive size={24} className="text-primary-700 mr-3" />
              <div>
                <h2 className="text-3xl font-semibold text-neutral-800">Recently Added</h2>
                <p className="text-neutral-500 mt-2">Check out the newest items for sale</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/browse?sort=newest')}
              className="flex items-center text-primary-700 font-medium hover:text-primary-800"
            >
              View All <ChevronRight size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-800 to-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Turn Your Unused Items into Cash?</h2>
            <p className="text-xl mb-8 text-secondary-100">
              Join thousands of university members who are buying and selling every day.
            </p>
            <button 
              onClick={() => navigate('/register')}
              className="btn bg-white text-primary-700 hover:bg-neutral-100 px-8 py-3 text-lg"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
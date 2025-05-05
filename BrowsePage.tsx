import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import mockProducts from '../data/mockProducts';
import mockCategories from '../data/mockCategories';
import { Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { Category, Condition, Product } from '../types/Product';

const BrowsePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<Condition[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    // Apply filters based on URL params
    const categoryParam = searchParams.get('category') as Category | null;
    const searchParam = searchParams.get('search');
    const featuredParam = searchParams.get('featured');
    const sortParam = searchParams.get('sort');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    if (sortParam) {
      setSortBy(sortParam);
    } else if (featuredParam === 'true') {
      setSortBy('featured');
    }
    
    // Filter products
    let filteredProducts = [...mockProducts];
    
    if (categoryParam) {
      filteredProducts = filteredProducts.filter(p => p.category === categoryParam);
    }
    
    if (searchParam) {
      const search = searchParam.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.title.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search) ||
        p.category.includes(search)
      );
    }
    
    if (featuredParam === 'true') {
      filteredProducts = filteredProducts.filter(p => p.isFeatured);
    }
    
    // Sort products
    if (sortParam === 'newest') {
      filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortParam === 'price-high') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortParam === 'price-low') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortParam === 'popular') {
      filteredProducts.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else {
      // Default to featured items first
      filteredProducts.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    
    setProducts(filteredProducts);
  }, [searchParams]);

  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category);
    applyFilters({ category });
  };

  const handleConditionChange = (condition: Condition) => {
    setSelectedConditions(prev => {
      if (prev.includes(condition)) {
        return prev.filter(c => c !== condition);
      }
      return [...prev, condition];
    });
    
    // We don't apply filters immediately for conditions to allow multiple selections
  };

  const applyFilters = (overrides: Partial<{ category: Category | null; conditions: Condition[]; price: [number, number]; sort: string }> = {}) => {
    const category = overrides.category !== undefined ? overrides.category : selectedCategory;
    const conditions = overrides.conditions || selectedConditions;
    const price = overrides.price || priceRange;
    const sort = overrides.sort || sortBy;
    
    let filteredProducts = [...mockProducts];
    
    // Category filter
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Condition filter
    if (conditions.length > 0) {
      filteredProducts = filteredProducts.filter(p => conditions.includes(p.condition));
    }
    
    // Price range filter
    filteredProducts = filteredProducts.filter(p => p.price >= price[0] && p.price <= price[1]);
    
    // Sort
    if (sort === 'newest') {
      filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === 'price-high') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'price-low') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'popular') {
      filteredProducts.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else {
      // Default to featured items first
      filteredProducts.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    
    setProducts(filteredProducts);
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedConditions([]);
    setPriceRange([0, 2000]);
    setSortBy('featured');
    setProducts(mockProducts);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <button 
              className="btn btn-outline flex items-center w-full"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <SlidersHorizontal size={18} className="mr-2" />
              {filterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filter Sidebar */}
          <div className={`md:w-1/4 lg:w-1/5 ${filterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Filter size={20} className="mr-2 text-primary-700" />
                  Filters
                </h2>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-primary-700 hover:text-primary-800"
                >
                  Reset All
                </button>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  <div 
                    className={`flex items-center cursor-pointer p-2 rounded-md ${selectedCategory === null ? 'bg-primary-50 text-primary-700' : 'hover:bg-neutral-100'}`}
                    onClick={() => handleCategoryChange(null)}
                  >
                    <span>All Categories</span>
                    {selectedCategory === null && (
                      <span className="ml-auto text-primary-700">✓</span>
                    )}
                  </div>
                  {mockCategories.map(category => (
                    <div 
                      key={category.id}
                      className={`flex items-center cursor-pointer p-2 rounded-md ${selectedCategory === category.id ? 'bg-primary-50 text-primary-700' : 'hover:bg-neutral-100'}`}
                      onClick={() => handleCategoryChange(category.id as Category)}
                    >
                      <span>{category.name}</span>
                      {selectedCategory === category.id && (
                        <span className="ml-auto text-primary-700">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Condition */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Condition</h3>
                <div className="space-y-2">
                  {(['new', 'like-new', 'excellent', 'good', 'fair', 'poor'] as Condition[]).map(condition => (
                    <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedConditions.includes(condition)}
                        onChange={() => handleConditionChange(condition)}
                        className="form-checkbox h-4 w-4 text-primary-700 rounded"
                      />
                      <span className="capitalize">{condition.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Apply Filters Button (Mobile) */}
              <div className="mt-6 md:hidden">
                <button 
                  className="btn btn-primary w-full"
                  onClick={() => {
                    applyFilters();
                    setFilterOpen(false);
                  }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h1 className="text-2xl font-semibold mb-2 sm:mb-0">
                  {selectedCategory 
                    ? mockCategories.find(c => c.id === selectedCategory)?.name || 'Products'
                    : 'All Products'}
                  <span className="text-neutral-500 text-lg font-normal ml-2">
                    ({products.length})
                  </span>
                </h1>
                
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <label className="text-sm text-neutral-600 whitespace-nowrap">Sort by:</label>
                  <select 
                    value={sortBy}
                    onChange={e => {
                      setSortBy(e.target.value);
                      applyFilters({ sort: e.target.value });
                    }}
                    className="input text-sm py-2 pr-8"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Products */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-neutral-600 mb-6">Try adjusting your filters or search criteria</p>
                <button 
                  onClick={resetFilters}
                  className="btn btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
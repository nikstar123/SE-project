import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Plus, Minus, Info, AlertCircle } from 'lucide-react';
import { Category, Condition } from '../types/Product';
import mockCategories from '../data/mockCategories';
import { motion } from 'framer-motion';

const SellPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [condition, setCondition] = useState<Condition | ''>('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [duration, setDuration] = useState('7');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = [...images];
    const newImageUrls = [...imageUrls];

    for (let i = 0; i < files.length; i++) {
      if (newImages.length >= 5) break; // Limit to 5 images
      
      const file = files[i];
      if (file.type.startsWith('image/')) {
        newImages.push(file);
        newImageUrls.push(URL.createObjectURL(file));
      }
    }

    setImages(newImages);
    setImageUrls(newImageUrls);
    
    // Clear the input
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newImageUrls = [...imageUrls];
    
    // Release URL object to avoid memory leaks
    URL.revokeObjectURL(newImageUrls[index]);
    
    newImages.splice(index, 1);
    newImageUrls.splice(index, 1);
    
    setImages(newImages);
    setImageUrls(newImageUrls);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!price.trim()) newErrors.price = 'Price is required';
    else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) 
      newErrors.price = 'Please enter a valid price';
    
    if (!category) newErrors.category = 'Category is required';
    if (!condition) newErrors.condition = 'Condition is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to create the listing
      // For demo purposes, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to homepage or listing page
      navigate('/');
      alert('Your item has been listed successfully!');
    } catch (error) {
      console.error('Error creating listing:', error);
      setErrors({ submit: 'Failed to create listing. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-neutral-800">List Your Item</h1>
              <p className="text-neutral-600 mt-2">Fill out the details below to create your listing</p>
            </div>
            
            {errors.submit && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{errors.submit}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input 
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`input w-full ${errors.title ? 'border-red-500' : ''}`}
                    placeholder="e.g. MacBook Pro 2022 16-inch"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>
                
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className={`input w-full ${errors.description ? 'border-red-500' : ''}`}
                    placeholder="Describe your item in detail. Include information about condition, features, and reason for selling."
                  ></textarea>
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>
                
                {/* Price and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-neutral-700 mb-1">
                      Price ($) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">$</span>
                      <input 
                        id="price"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className={`input pl-8 w-full ${errors.price ? 'border-red-500' : ''}`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select 
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className={`input w-full ${errors.category ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select a category</option>
                      {mockCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                  </div>
                </div>
                
                {/* Condition and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-neutral-700 mb-1">
                      Condition <span className="text-red-500">*</span>
                    </label>
                    <select 
                      id="condition"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as Condition)}
                      className={`input w-full ${errors.condition ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select condition</option>
                      <option value="new">New</option>
                      <option value="like-new">Like New</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                    {errors.condition && <p className="mt-1 text-sm text-red-500">{errors.condition}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input 
                      id="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={`input w-full ${errors.location ? 'border-red-500' : ''}`}
                      placeholder="e.g. Engineering Building"
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                  </div>
                </div>
                
                {/* Duration */}
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-neutral-700 mb-1">
                    Listing Duration
                  </label>
                  <select 
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="input w-full"
                  >
                    <option value="3">3 days</option>
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30">30 days</option>
                  </select>
                </div>
                
                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Images <span className="text-red-500">*</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-4 ${errors.images ? 'border-red-500' : 'border-neutral-300'}`}>
                    <div className="flex flex-wrap gap-4">
                      {/* Existing Images */}
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative w-24 h-24 rounded-md overflow-hidden">
                          <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            className="absolute top-1 right-1 bg-neutral-800 bg-opacity-70 rounded-full p-1 text-white hover:bg-opacity-100"
                            onClick={() => removeImage(index)}
                            aria-label="Remove image"
                          >
                            <Minus size={12} />
                          </button>
                        </div>
                      ))}
                      
                      {/* Upload Button */}
                      {images.length < 5 && (
                        <label className="flex items-center justify-center w-24 h-24 bg-neutral-100 rounded-md border border-neutral-300 cursor-pointer hover:bg-neutral-200 transition-colors">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden"
                            onChange={handleImageUpload}
                            multiple
                          />
                          <div className="flex flex-col items-center text-neutral-600">
                            <Plus size={20} />
                            <span className="text-xs mt-1">Add Photo</span>
                          </div>
                        </label>
                      )}
                    </div>
                    
                    <p className="text-xs text-neutral-500 mt-2 flex items-center">
                      <Info size={12} className="mr-1" />
                      Upload up to 5 images (first image will be the main photo)
                    </p>
                  </div>
                  {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images}</p>}
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Listing...' : 'Create Listing'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SellPage;
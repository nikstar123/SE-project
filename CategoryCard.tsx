import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface CategoryProps {
  category: {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
    color: string;
    count: number;
  };
}

const CategoryCard: React.FC<CategoryProps> = ({ category }) => {
  const { id, name, icon: Icon, color, count } = category;
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link 
        to={`/browse?category=${id}`} 
        className="block h-full bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
      >
        <div className="p-6 flex flex-col items-center text-center">
          <div className={`${color} text-white p-3 rounded-full mb-4`}>
            <Icon size={24} />
          </div>
          <h3 className="font-medium text-lg text-neutral-800 mb-1">{name}</h3>
          <p className="text-neutral-500 text-sm mb-2">{count} items</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
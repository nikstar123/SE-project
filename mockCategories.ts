import { Laptop, BookOpen, Dumbbell, Sofa, ShoppingBag, Car, Wrench, Package } from 'lucide-react';

const mockCategories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Laptops, phones, tablets, cameras and more',
    icon: Laptop,
    color: 'bg-blue-500',
    count: 215
  },
  {
    id: 'books',
    name: 'Books',
    description: 'Textbooks, novels, study guides and more',
    icon: BookOpen,
    color: 'bg-green-500',
    count: 342
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Equipment, apparel, accessories and more',
    icon: Dumbbell,
    color: 'bg-orange-500',
    count: 128
  },
  {
    id: 'furniture',
    name: 'Furniture',
    description: 'Desks, chairs, beds, storage and more',
    icon: Sofa,
    color: 'bg-purple-500',
    count: 87
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Clothes, shoes, accessories and more',
    icon: ShoppingBag,
    color: 'bg-pink-500',
    count: 196
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    description: 'Cars, bikes, scooters and more',
    icon: Car,
    color: 'bg-red-500',
    count: 43
  },
  {
    id: 'services',
    name: 'Services',
    description: 'Tutoring, repairs, lessons and more',
    icon: Wrench,
    color: 'bg-yellow-500',
    count: 76
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Everything else that doesn\'t fit above',
    icon: Package,
    color: 'bg-gray-500',
    count: 92
  }
];

export default mockCategories;
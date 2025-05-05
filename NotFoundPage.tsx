import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="bg-primary-100 p-6 rounded-full">
            <Search size={48} className="text-primary-700" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-neutral-800 mb-4">Page Not Found</h1>
        <p className="text-neutral-600 mb-8">
          The page you are looking for doesn't exist or has been moved. Please check the URL or try the links below.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn btn-primary">
            Go to Homepage
          </Link>
          <Link to="/browse" className="btn btn-outline">
            Browse Items
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
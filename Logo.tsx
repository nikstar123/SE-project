import React from 'react';
import { GalleryVerticalEnd } from 'lucide-react';

interface LogoProps {
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ color = 'text-primary-700' }) => {
  return (
    <div className={`flex items-center ${color}`}>
      <GalleryVerticalEnd className="h-7 w-7 mr-2" />
      <span className="font-bold text-xl">TradeHalk</span>
    </div>
  );
};

export default Logo;
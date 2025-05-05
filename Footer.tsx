import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, Phone } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Logo color="text-white" />
            <p className="text-neutral-400 text-sm leading-relaxed">
              UniTrade is the premier auction platform for university students and faculty to buy and sell items within the campus community.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-medium text-lg mb-4">Quick Links</h5>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link to="/browse" className="hover:text-white transition-colors">
                  Browse All
                </Link>
              </li>
              <li>
                <Link to="/browse?category=electronics" className="hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/browse?category=books" className="hover:text-white transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/browse?category=sports" className="hover:text-white transition-colors">
                  Sports Equipment
                </Link>
              </li>
              <li>
                <Link to="/browse?category=furniture" className="hover:text-white transition-colors">
                  Furniture
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-medium text-lg mb-4">Support</h5>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-medium text-lg mb-4">Contact Us</h5>
            <ul className="space-y-3 text-neutral-400">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>support@unitrade.edu</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>(123) 456-7890</span>
              </li>
              <li>
                <address className="not-italic">
                  University Student Center<br />
                  123 Campus Drive<br />
                  College Town, CT 12345
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-10 pt-6 text-sm text-neutral-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} UniTrade. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
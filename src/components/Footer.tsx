import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              OutfitMatch
            </span>
          </h3>
          <p className="text-gray-400">
            AI-powered outfit suggestions to elevate your style game.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Upload
              </Link>
            </li>
            <li>
              <Link
                to="/wardrobe"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Wardrobe
              </Link>
            </li>
            <li>
              <Link
                to="/outfits"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Outfit Suggestions
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
        <p>© {new Date().getFullYear()} OutfitMatch. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

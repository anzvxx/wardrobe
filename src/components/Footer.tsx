import React from "react";
import { Shirt } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Shirt className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              OutfitMatch Pro
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Digital Wardrobe</li>
                <li>AI Suggestions</li>
                <li>Mix & Match</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Help Center</li>
                <li>Style Guide</li>
                <li>Blog</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} OutfitMatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

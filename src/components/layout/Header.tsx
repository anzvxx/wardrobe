import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shirt, User, Menu, Search, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeaderProps {
  userName?: string;
  avatarUrl?: string;
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
}

const Header = ({
  userName = "Guest User",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=outfit",
  isLoggedIn = false,
  onLogin = () => (window.location.href = "/login"),
  onSignup = () => console.log("Signup clicked"),
  onLogout = () => console.log("Logout clicked"),
  onProfileClick = () => console.log("Profile clicked"),
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center">
            <Shirt className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent tracking-tight">
              OutfitMatch Pro
            </span>
          </Link>
        </motion.div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-primary transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/upload"
            className="text-gray-700 hover:text-primary transition-colors font-medium"
          >
            Upload
          </Link>
          <Link
            to="/wardrobe"
            className="text-gray-700 hover:text-primary transition-colors font-medium"
          >
            My Wardrobe
          </Link>
          <Link
            to="/outfits"
            className="text-gray-700 hover:text-primary transition-colors font-medium"
          >
            Outfit Suggestions
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Search className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Favorites Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Heart className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Favorites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Wardrobe Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <ShoppingBag className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>My Wardrobe</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* User Profile / Auth */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full overflow-hidden"
                >
                  <img
                    src={avatarUrl}
                    alt={userName}
                    className="h-8 w-8 rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={onLogin}
                className="hidden sm:inline-flex"
              >
                Login
              </Button>
              <Button onClick={onSignup}>Sign Up</Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/upload">Upload</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/wardrobe">My Wardrobe</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/outfits">Outfit Suggestions</Link>
              </DropdownMenuItem>
              {!isLoggedIn && (
                <>
                  <DropdownMenuItem onClick={onLogin}>Login</DropdownMenuItem>
                  <DropdownMenuItem onClick={onSignup}>
                    Sign Up
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useWardrobe } from "@/context/WardrobeContext";

// Import components
import Header from "./layout/Header";
import HeroSection from "./landing/HeroSection";
import FeatureShowcase from "./landing/FeatureShowcase";
import UploadInterface from "./upload/UploadInterface";
import WardrobeView from "./wardrobe/WardrobeView";
import OutfitSuggestionPanel from "./outfits/OutfitSuggestionPanel";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();
  const { addClothingItem, clothingItems, generateOutfitSuggestions, outfits } =
    useWardrobe();
  const [activeSection, setActiveSection] = React.useState<
    "hero" | "upload" | "wardrobe" | "outfits"
  >("hero");

  const handleGetStarted = () => {
    setActiveSection("upload");
    // Smooth scroll to upload section
    document
      .getElementById("upload-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUploadComplete = (item: {
    id: string;
    image: File;
    category: string;
    name?: string;
  }) => {
    console.log("Uploaded item:", item);

    // Create a URL for the image file
    const imageUrl = URL.createObjectURL(item.image);

    // Add the item to the wardrobe context
    addClothingItem({
      name: item.name || item.image.name,
      category: item.category as any,
      imageUrl,
      color: "",
      brand: "",
      favorite: false,
    });

    setActiveSection("wardrobe");
    // Smooth scroll to wardrobe section
    document
      .getElementById("wardrobe-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRequestOutfitSuggestions = (selectedItems: string[]) => {
    console.log("Generating outfit suggestions for items:", selectedItems);
    // Generate new outfit suggestions
    generateOutfitSuggestions();
    setActiveSection("outfits");
    // Smooth scroll to outfits section
    document
      .getElementById("outfits-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigateToUpload = () => {
    navigate("/upload");
  };

  const handleNavigateToWardrobe = () => {
    navigate("/wardrobe");
  };

  const handleNavigateToOutfits = () => {
    navigate("/outfits");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main content with padding for fixed header */}
      <main className="pt-20">
        {/* Hero Section */}
        <HeroSection onGetStarted={handleGetStarted} />

        {/* Feature Showcase */}
        <FeatureShowcase />

        {/* Upload Section */}
        <motion.section
          id="upload-section"
          className="py-16 px-4 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Upload Your Clothing
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Start building your digital wardrobe by uploading your favorite
                clothing items
              </p>
            </div>
            <UploadInterface
              onUploadComplete={handleUploadComplete}
              onCancel={() => setActiveSection("hero")}
            />
            <div className="mt-8 text-center">
              <Button
                onClick={handleNavigateToUpload}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Go to Upload Page
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Wardrobe Section */}
        <motion.section
          id="wardrobe-section"
          className="py-16 px-4 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Digital Wardrobe
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Browse and manage your clothing collection in one place
              </p>
            </div>
            <WardrobeView
              items={clothingItems}
              onRequestOutfitSuggestions={handleRequestOutfitSuggestions}
              onAddItem={handleNavigateToUpload}
            />
            <div className="mt-8 text-center">
              <Button
                onClick={handleNavigateToWardrobe}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Go to Wardrobe Page
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Outfit Suggestions Section */}
        <motion.section
          id="outfits-section"
          className="py-16 px-4 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                AI-Powered Outfit Suggestions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover perfect outfit combinations tailored to your style and
                preferences
              </p>
            </div>
            <OutfitSuggestionPanel
              outfits={outfits}
              onGenerateOutfits={generateOutfitSuggestions}
            />
            <div className="mt-8 text-center">
              <Button
                onClick={handleNavigateToOutfits}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Go to Outfits Page
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

const Button = ({ children, onClick, className = "" }) => {
  return (
    <button onClick={onClick} className={`${className}`}>
      {children}
    </button>
  );
};

export default Home;

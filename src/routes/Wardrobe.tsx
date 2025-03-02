import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import WardrobeView from "@/components/wardrobe/WardrobeView";
import { useNavigate } from "react-router-dom";
import { useWardrobe } from "@/context/WardrobeContext";

const Wardrobe = () => {
  const navigate = useNavigate();
  const {
    clothingItems,
    removeClothingItem,
    toggleFavorite,
    generateOutfitSuggestions,
  } = useWardrobe();

  const handleAddItem = () => {
    navigate("/upload");
  };

  const handleRequestOutfitSuggestions = (selectedItems: string[]) => {
    console.log("Generating outfit suggestions for items:", selectedItems);
    // Generate new outfit suggestions
    generateOutfitSuggestions();
    // Navigate to the outfits page
    navigate("/outfits");
  };

  const handleEditItem = (id: string) => {
    // In a real app, you would open an edit modal or navigate to an edit page
    console.log("Edit item:", id);
  };

  const handleDeleteItem = (id: string) => {
    removeClothingItem(id);
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="pt-32 pb-16 px-4 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Your Digital Wardrobe
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse and manage your clothing collection in one place
            </p>
          </div>
          <WardrobeView
            items={clothingItems}
            onAddItem={handleAddItem}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            onToggleFavorite={handleToggleFavorite}
            onRequestOutfitSuggestions={handleRequestOutfitSuggestions}
          />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Wardrobe;

import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import OutfitSuggestionPanel from "@/components/outfits/OutfitSuggestionPanel";
import { useWardrobe } from "@/context/WardrobeContext";

const Outfits = () => {
  const {
    outfits,
    generateOutfitSuggestions,
    addOutfit,
    removeOutfit,
    updateOutfit,
  } = useWardrobe();

  const handleGenerateOutfits = () => {
    generateOutfitSuggestions();
  };

  const handleSaveOutfit = (outfit: any) => {
    addOutfit(outfit);
  };

  const handleEditOutfit = (outfit: any) => {
    updateOutfit(outfit.id, outfit);
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
              AI-Powered Outfit Suggestions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover perfect outfit combinations tailored to your style and
              preferences
            </p>
          </div>
          <OutfitSuggestionPanel
            outfits={outfits}
            onGenerateOutfits={handleGenerateOutfits}
            onSaveOutfit={handleSaveOutfit}
            onEditOutfit={handleEditOutfit}
          />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Outfits;

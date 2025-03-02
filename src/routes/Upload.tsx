import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import UploadInterface from "@/components/upload/UploadInterface";
import { useNavigate } from "react-router-dom";
import { useWardrobe } from "@/context/WardrobeContext";

const Upload = () => {
  const navigate = useNavigate();
  const { addClothingItem } = useWardrobe();

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

    // Navigate to the wardrobe page
    navigate("/wardrobe");
  };

  const handleCancel = () => {
    navigate(-1);
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
              Upload Your Clothing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start building your digital wardrobe by uploading your favorite
              clothing items
            </p>
          </div>
          <UploadInterface
            onUploadComplete={handleUploadComplete}
            onCancel={handleCancel}
          />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Upload;

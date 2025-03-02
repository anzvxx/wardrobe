import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Tally4 } from "lucide-react";
import { motion } from "framer-motion";

import ClothingGrid from "./ClothingGrid";
import ClothingItem from "./ClothingItem";

interface ClothingItem {
  id: string;
  name: string;
  category: "tops" | "bottoms" | "shoes" | "accessories";
  imageUrl: string;
  color?: string;
  brand?: string;
  favorite?: boolean;
}

interface WardrobeViewProps {
  items?: ClothingItem[];
  onAddItem?: () => void;
  onEditItem?: (id: string) => void;
  onDeleteItem?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onRequestOutfitSuggestions?: (selectedItems: string[]) => void;
}

const WardrobeView = ({
  items = [
    {
      id: "1",
      name: "Blue T-Shirt",
      category: "tops",
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      color: "blue",
      brand: "Gap",
      favorite: true,
    },
    {
      id: "2",
      name: "Black Jeans",
      category: "bottoms",
      imageUrl:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      color: "black",
      brand: "Levi's",
    },
    {
      id: "3",
      name: "White Sneakers",
      category: "shoes",
      imageUrl:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      color: "white",
      brand: "Nike",
    },
    {
      id: "4",
      name: "Silver Watch",
      category: "accessories",
      imageUrl:
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      color: "silver",
      brand: "Fossil",
    },
    {
      id: "5",
      name: "Red Sweater",
      category: "tops",
      imageUrl:
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      color: "red",
      brand: "H&M",
    },
    {
      id: "6",
      name: "Khaki Shorts",
      category: "bottoms",
      imageUrl:
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      color: "khaki",
      brand: "Uniqlo",
    },
  ],
  onAddItem = () => {},
  onEditItem = () => {},
  onDeleteItem = () => {},
  onToggleFavorite = () => {},
  onRequestOutfitSuggestions = () => {},
}: WardrobeViewProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const handleItemClick = (item: ClothingItem) => {
    if (isSelectionMode) {
      setSelectedItems((prev) =>
        prev.includes(item.id)
          ? prev.filter((id) => id !== item.id)
          : [...prev, item.id],
      );
    }
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    if (isSelectionMode) {
      setSelectedItems([]);
    }
  };

  const handleRequestSuggestions = () => {
    onRequestOutfitSuggestions(selectedItems);
    setIsSelectionMode(false);
    setSelectedItems([]);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6 rounded-lg">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Wardrobe</h1>
            <p className="text-gray-500 mt-1">
              {items.length} items in your collection
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant={isSelectionMode ? "default" : "outline"}
              onClick={toggleSelectionMode}
              className="flex items-center gap-2"
            >
              <Tally4 size={16} />
              {isSelectionMode ? "Cancel Selection" : "Select Items"}
            </Button>
            <Button onClick={onAddItem} className="flex items-center gap-2">
              <Plus size={16} />
              Add Item
            </Button>
          </div>
        </div>

        {/* Selection mode info bar */}
        {isSelectionMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-blue-700">
                {selectedItems.length} items selected
              </span>
              <span className="text-sm text-blue-600">
                Select items to get outfit suggestions
              </span>
            </div>
            <Button
              onClick={handleRequestSuggestions}
              disabled={selectedItems.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Get Outfit Suggestions
            </Button>
          </motion.div>
        )}

        {/* View mode tabs */}
        <div className="flex justify-between items-center">
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "grid" | "list")}
            className="w-full max-w-xs"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {viewMode === "grid" ? (
            <ClothingGrid
              items={items}
              onItemClick={handleItemClick}
              onAddItem={onAddItem}
            />
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`relative ${isSelectionMode ? "cursor-pointer" : ""}`}
                  >
                    {isSelectionMode && (
                      <div
                        className={`absolute top-2 left-2 z-10 w-6 h-6 rounded-full border-2 ${selectedItems.includes(item.id) ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"} flex items-center justify-center transition-colors duration-200`}
                      >
                        {selectedItems.includes(item.id) && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        )}
                      </div>
                    )}
                    <ClothingItem
                      id={item.id}
                      name={item.name}
                      category={item.category}
                      image={item.imageUrl}
                      favorite={item.favorite}
                      onEdit={onEditItem}
                      onDelete={onDeleteItem}
                      onToggleFavorite={onToggleFavorite}
                    />
                  </div>
                ))}
              </div>

              {/* Empty state */}
              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <Upload size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Your wardrobe is empty
                  </h3>
                  <p className="text-gray-500 mb-4 max-w-md">
                    Start by adding your clothing items to build your digital
                    wardrobe
                  </p>
                  <Button onClick={onAddItem}>
                    <Plus size={18} className="mr-2" />
                    Add Your First Item
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WardrobeView;

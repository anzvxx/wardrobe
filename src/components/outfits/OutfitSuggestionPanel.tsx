import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, Wand2, Heart, Filter, Settings } from "lucide-react";

// Import sub-components
import OutfitGrid from "./OutfitGrid";
import OutfitCard from "./OutfitCard";
import MixMatchInterface from "./MixMatchInterface";

interface ClothingItem {
  id: string;
  imageUrl: string;
  category: "tops" | "bottoms" | "shoes" | "accessories";
  name: string;
}

interface Outfit {
  id: string;
  name: string;
  items: {
    top?: ClothingItem;
    bottom?: ClothingItem;
    shoes?: ClothingItem;
    accessories?: ClothingItem[];
  };
  rating?: number;
}

interface OutfitSuggestionPanelProps {
  outfits?: Outfit[];
  isLoading?: boolean;
  onGenerateOutfits?: () => void;
  onSaveOutfit?: (outfit: Outfit) => void;
  onEditOutfit?: (outfit: Outfit) => void;
}

const OutfitSuggestionPanel = ({
  outfits = [
    {
      id: "1",
      name: "Casual Summer Look",
      items: {
        top: {
          id: "t1",
          imageUrl:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format",
          category: "tops",
          name: "White T-Shirt",
        },
        bottom: {
          id: "b1",
          imageUrl:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format",
          category: "bottoms",
          name: "Blue Jeans",
        },
        shoes: {
          id: "s1",
          imageUrl:
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format",
          category: "shoes",
          name: "White Sneakers",
        },
        accessories: [
          {
            id: "a1",
            imageUrl:
              "https://images.unsplash.com/photo-1590736969596-8a5d8f3fa2f6?w=500&auto=format",
            category: "accessories",
            name: "Silver Watch",
          },
        ],
      },
      rating: 4.5,
    },
    {
      id: "2",
      name: "Business Casual",
      items: {
        top: {
          id: "t2",
          imageUrl:
            "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&auto=format",
          category: "tops",
          name: "Blue Button-up Shirt",
        },
        bottom: {
          id: "b2",
          imageUrl:
            "https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=500&auto=format",
          category: "bottoms",
          name: "Khaki Chinos",
        },
        shoes: {
          id: "s2",
          imageUrl:
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&auto=format",
          category: "shoes",
          name: "Brown Loafers",
        },
        accessories: [
          {
            id: "a2",
            imageUrl:
              "https://images.unsplash.com/photo-1559563458-527698bf5295?w=500&auto=format",
            category: "accessories",
            name: "Leather Watch",
          },
        ],
      },
      rating: 4.8,
    },
    {
      id: "3",
      name: "Weekend Brunch",
      items: {
        top: {
          id: "t3",
          imageUrl:
            "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=500&auto=format",
          category: "tops",
          name: "Striped Blouse",
        },
        bottom: {
          id: "b3",
          imageUrl:
            "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&auto=format",
          category: "bottoms",
          name: "White Skirt",
        },
        shoes: {
          id: "s3",
          imageUrl:
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format",
          category: "shoes",
          name: "Sandals",
        },
        accessories: [
          {
            id: "a3",
            imageUrl:
              "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=500&auto=format",
            category: "accessories",
            name: "Straw Hat",
          },
        ],
      },
      rating: 4.2,
    },
  ],
  isLoading = false,
  onGenerateOutfits = () => console.log("Generating new outfits..."),
  onSaveOutfit = (outfit) => console.log("Saving outfit:", outfit),
  onEditOutfit = (outfit) => console.log("Editing outfit:", outfit),
}: OutfitSuggestionPanelProps) => {
  const [activeView, setActiveView] = useState<"grid" | "mix">("grid");
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [favoriteOutfits, setFavoriteOutfits] = useState<string[]>([]);

  const handleOutfitSelect = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    setActiveView("mix");
  };

  const handleToggleFavorite = (outfitId: string) => {
    setFavoriteOutfits((prev) =>
      prev.includes(outfitId)
        ? prev.filter((id) => id !== outfitId)
        : [...prev, outfitId],
    );
  };

  const handleSaveCustomOutfit = (outfit: Outfit) => {
    onSaveOutfit(outfit);
    setActiveView("grid");
    setSelectedOutfit(null);
  };

  const handleCancelCustomization = () => {
    setActiveView("grid");
    setSelectedOutfit(null);
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Outfit Suggestions
            </h1>
            <p className="text-gray-500 mt-1">
              AI-powered outfit combinations from your wardrobe
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => onGenerateOutfits()}
              disabled={isLoading}
            >
              <RefreshCw size={16} />
              Refresh
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={() => onGenerateOutfits()}
              disabled={isLoading}
            >
              <Wand2 size={16} />
              Generate New
            </Button>
          </div>
        </div>
      </div>

      {activeView === "grid" ? (
        <div className="flex-grow overflow-auto p-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Outfits</TabsTrigger>
                <TabsTrigger value="favorites">
                  <Heart size={14} className="mr-1" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="casual">Casual</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="weekend">Weekend</TabsTrigger>
              </TabsList>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Filter size={18} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings size={18} />
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <OutfitGrid
                outfits={outfits}
                isLoading={isLoading}
                onOutfitSelect={handleOutfitSelect}
                onRefresh={onGenerateOutfits}
              />
            </TabsContent>

            <TabsContent value="favorites" className="mt-0">
              <OutfitGrid
                outfits={outfits.filter((outfit) =>
                  favoriteOutfits.includes(outfit.id),
                )}
                isLoading={isLoading}
                onOutfitSelect={handleOutfitSelect}
                onRefresh={onGenerateOutfits}
              />

              {favoriteOutfits.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <Heart size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No favorite outfits yet
                  </h3>
                  <p className="text-gray-500 mb-4 max-w-md">
                    Like your favorite outfit combinations to save them here for
                    quick access
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="casual" className="mt-0">
              <OutfitGrid
                outfits={outfits.filter((outfit) =>
                  outfit.name.toLowerCase().includes("casual"),
                )}
                isLoading={isLoading}
                onOutfitSelect={handleOutfitSelect}
                onRefresh={onGenerateOutfits}
              />
            </TabsContent>

            <TabsContent value="business" className="mt-0">
              <OutfitGrid
                outfits={outfits.filter((outfit) =>
                  outfit.name.toLowerCase().includes("business"),
                )}
                isLoading={isLoading}
                onOutfitSelect={handleOutfitSelect}
                onRefresh={onGenerateOutfits}
              />
            </TabsContent>

            <TabsContent value="weekend" className="mt-0">
              <OutfitGrid
                outfits={outfits.filter((outfit) =>
                  outfit.name.toLowerCase().includes("weekend"),
                )}
                isLoading={isLoading}
                onOutfitSelect={handleOutfitSelect}
                onRefresh={onGenerateOutfits}
              />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="flex-grow overflow-auto p-6">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={handleCancelCustomization}
            >
              ← Back to Suggestions
            </Button>
            <h2 className="text-xl font-semibold">
              {selectedOutfit
                ? `Customize "${selectedOutfit.name}"`
                : "Create Custom Outfit"}
            </h2>
          </div>

          <MixMatchInterface
            outfit={selectedOutfit || undefined}
            onSave={handleSaveCustomOutfit}
            onCancel={handleCancelCustomization}
          />
        </div>
      )}
    </div>
  );
};

export default OutfitSuggestionPanel;

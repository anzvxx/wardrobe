import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import ClothingGrid from "./ClothingGrid";

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
  items = [],
  onAddItem = () => {},
  onEditItem = () => {},
  onDeleteItem = () => {},
  onToggleFavorite = () => {},
  onRequestOutfitSuggestions = () => {},
}: WardrobeViewProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  const handleItemClick = (item: ClothingItem) => {
    // Toggle selection
    if (selectedItems.includes(item.id)) {
      setSelectedItems(selectedItems.filter((id) => id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item.id]);
    }
  };

  const handleGenerateOutfits = () => {
    onRequestOutfitSuggestions(selectedItems);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Wardrobe</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleGenerateOutfits}
            disabled={selectedItems.length === 0}
            className="flex items-center gap-2"
          >
            <Sparkles size={16} />
            Generate Outfits
          </Button>
          <Button onClick={onAddItem} className="flex items-center gap-2">
            <Plus size={16} />
            Add Item
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-2xl mb-6">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="tops">Tops</TabsTrigger>
          <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
          <TabsTrigger value="shoes">Shoes</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <ClothingGrid
            items={items}
            onItemClick={handleItemClick}
            onAddItem={onAddItem}
          />
        </TabsContent>

        <TabsContent value="tops" className="mt-0">
          <ClothingGrid
            items={items.filter((item) => item.category === "tops")}
            onItemClick={handleItemClick}
            onAddItem={onAddItem}
          />
        </TabsContent>

        <TabsContent value="bottoms" className="mt-0">
          <ClothingGrid
            items={items.filter((item) => item.category === "bottoms")}
            onItemClick={handleItemClick}
            onAddItem={onAddItem}
          />
        </TabsContent>

        <TabsContent value="shoes" className="mt-0">
          <ClothingGrid
            items={items.filter((item) => item.category === "shoes")}
            onItemClick={handleItemClick}
            onAddItem={onAddItem}
          />
        </TabsContent>

        <TabsContent value="accessories" className="mt-0">
          <ClothingGrid
            items={items.filter((item) => item.category === "accessories")}
            onItemClick={handleItemClick}
            onAddItem={onAddItem}
          />
        </TabsContent>
      </Tabs>

      {selectedItems.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-blue-700">
              <span className="font-medium">{selectedItems.length}</span> items
              selected
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedItems([])}
              >
                Clear Selection
              </Button>
              <Button
                size="sm"
                onClick={handleGenerateOutfits}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Sparkles size={14} className="mr-2" />
                Generate Outfit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WardrobeView;

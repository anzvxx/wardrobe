import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeftRight, Check, Undo2, Save, RefreshCw } from "lucide-react";

interface ClothingItem {
  id: string;
  name: string;
  category: "tops" | "bottoms" | "shoes" | "accessories";
  imageUrl: string;
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
}

interface MixMatchInterfaceProps {
  outfit?: Outfit;
  wardrobeItems?: {
    tops: ClothingItem[];
    bottoms: ClothingItem[];
    shoes: ClothingItem[];
    accessories: ClothingItem[];
  };
  onSave?: (outfit: Outfit) => void;
  onCancel?: () => void;
}

const MixMatchInterface = ({
  outfit = {
    id: "1",
    name: "Casual Summer Outfit",
    items: {
      top: {
        id: "t1",
        name: "White T-Shirt",
        category: "tops",
        imageUrl:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format",
      },
      bottom: {
        id: "b1",
        name: "Blue Jeans",
        category: "bottoms",
        imageUrl:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format",
      },
      shoes: {
        id: "s1",
        name: "White Sneakers",
        category: "shoes",
        imageUrl:
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format",
      },
      accessories: [
        {
          id: "a1",
          name: "Watch",
          category: "accessories",
          imageUrl:
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format",
        },
      ],
    },
  },
  wardrobeItems = {
    tops: [
      {
        id: "t1",
        name: "White T-Shirt",
        category: "tops",
        imageUrl:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format",
      },
      {
        id: "t2",
        name: "Black Polo",
        category: "tops",
        imageUrl:
          "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=500&auto=format",
      },
      {
        id: "t3",
        name: "Blue Shirt",
        category: "tops",
        imageUrl:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format",
      },
    ],
    bottoms: [
      {
        id: "b1",
        name: "Blue Jeans",
        category: "bottoms",
        imageUrl:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format",
      },
      {
        id: "b2",
        name: "Black Pants",
        category: "bottoms",
        imageUrl:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format",
      },
      {
        id: "b3",
        name: "Khaki Shorts",
        category: "bottoms",
        imageUrl:
          "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format",
      },
    ],
    shoes: [
      {
        id: "s1",
        name: "White Sneakers",
        category: "shoes",
        imageUrl:
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format",
      },
      {
        id: "s2",
        name: "Brown Loafers",
        category: "shoes",
        imageUrl:
          "https://images.unsplash.com/photo-1614253429340-98120bd6d753?w=500&auto=format",
      },
      {
        id: "s3",
        name: "Black Boots",
        category: "shoes",
        imageUrl:
          "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500&auto=format",
      },
    ],
    accessories: [
      {
        id: "a1",
        name: "Watch",
        category: "accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format",
      },
      {
        id: "a2",
        name: "Sunglasses",
        category: "accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&auto=format",
      },
      {
        id: "a3",
        name: "Beanie",
        category: "accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&auto=format",
      },
    ],
  },
  onSave = () => {},
  onCancel = () => {},
}: MixMatchInterfaceProps) => {
  const [currentOutfit, setCurrentOutfit] = useState<Outfit>({ ...outfit });
  const [activeCategory, setActiveCategory] = useState<
    "tops" | "bottoms" | "shoes" | "accessories"
  >("tops");
  const [history, setHistory] = useState<Outfit[]>([{ ...outfit }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleItemSelect = (item: ClothingItem) => {
    const newOutfit = { ...currentOutfit };

    if (activeCategory === "accessories") {
      // For accessories, we maintain an array
      const currentAccessories = newOutfit.items.accessories || [];
      // Check if this accessory is already selected
      const existingIndex = currentAccessories.findIndex(
        (acc) => acc.id === item.id,
      );

      if (existingIndex >= 0) {
        // Remove if already selected
        newOutfit.items.accessories = currentAccessories.filter(
          (acc) => acc.id !== item.id,
        );
      } else {
        // Add if not already selected
        newOutfit.items.accessories = [...currentAccessories, item];
      }
    } else {
      // For other categories, we replace the item
      newOutfit.items[activeCategory] = item;
    }

    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ ...newOutfit });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentOutfit(newOutfit);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentOutfit({ ...history[historyIndex - 1] });
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentOutfit({ ...history[historyIndex + 1] });
    }
  };

  const handleReset = () => {
    setCurrentOutfit({ ...outfit });
    setHistory([{ ...outfit }]);
    setHistoryIndex(0);
  };

  const handleSave = () => {
    onSave(currentOutfit);
  };

  const isItemSelected = (item: ClothingItem) => {
    if (activeCategory === "accessories") {
      return (
        currentOutfit.items.accessories?.some((acc) => acc.id === item.id) ||
        false
      );
    }
    return currentOutfit.items[activeCategory]?.id === item.id;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Mix & Match</h2>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleUndo}
                    disabled={historyIndex === 0}
                  >
                    <Undo2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Undo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRedo}
                    disabled={historyIndex === history.length - 1}
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Redo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleReset}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Outfit Preview */}
          <Card className="p-4 bg-gray-50">
            <h3 className="text-lg font-medium mb-4">Current Outfit</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Top</p>
                {currentOutfit.items.top ? (
                  <div className="relative aspect-square rounded-md overflow-hidden border">
                    <img
                      src={currentOutfit.items.top.imageUrl}
                      alt={currentOutfit.items.top.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="aspect-square rounded-md bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">No top selected</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Bottom</p>
                {currentOutfit.items.bottom ? (
                  <div className="relative aspect-square rounded-md overflow-hidden border">
                    <img
                      src={currentOutfit.items.bottom.imageUrl}
                      alt={currentOutfit.items.bottom.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="aspect-square rounded-md bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">No bottom selected</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Shoes</p>
                {currentOutfit.items.shoes ? (
                  <div className="relative aspect-square rounded-md overflow-hidden border">
                    <img
                      src={currentOutfit.items.shoes.imageUrl}
                      alt={currentOutfit.items.shoes.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="aspect-square rounded-md bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">No shoes selected</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Accessories</p>
                {currentOutfit.items.accessories &&
                currentOutfit.items.accessories.length > 0 ? (
                  <div className="relative aspect-square rounded-md overflow-hidden border grid grid-cols-2 gap-1 p-1">
                    {currentOutfit.items.accessories
                      .slice(0, 4)
                      .map((accessory) => (
                        <div
                          key={accessory.id}
                          className="overflow-hidden rounded"
                        >
                          <img
                            src={accessory.imageUrl}
                            alt={accessory.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    {Array(
                      Math.max(
                        0,
                        4 - (currentOutfit.items.accessories?.length || 0),
                      ),
                    )
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={`empty-${i}`}
                          className="bg-gray-100 rounded"
                        ></div>
                      ))}
                  </div>
                ) : (
                  <div className="aspect-square rounded-md bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">No accessories</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Item Selection */}
          <Card className="p-4">
            <Tabs
              defaultValue="tops"
              onValueChange={(value) => setActiveCategory(value as any)}
            >
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="tops">Tops</TabsTrigger>
                <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
                <TabsTrigger value="shoes">Shoes</TabsTrigger>
                <TabsTrigger value="accessories">Accessories</TabsTrigger>
              </TabsList>

              {(["tops", "bottoms", "shoes", "accessories"] as const).map(
                (category) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="grid grid-cols-2 gap-3">
                        {wardrobeItems[category].map((item) => (
                          <div
                            key={item.id}
                            className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all ${isItemSelected(item) ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent hover:border-gray-300"}`}
                            onClick={() => handleItemSelect(item)}
                          >
                            <div className="aspect-square">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all">
                              {isItemSelected(item) && (
                                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                                  <Check className="h-3 w-3" />
                                </div>
                              )}
                            </div>
                            <div className="p-2 text-xs font-medium truncate bg-white">
                              {item.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                ),
              )}
            </Tabs>
          </Card>
        </div>

        <Separator />

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Outfit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MixMatchInterface;

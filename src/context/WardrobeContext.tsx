import React, { createContext, useContext, useState, useEffect } from "react";

interface ClothingItem {
  id: string;
  name: string;
  category: "tops" | "bottoms" | "shoes" | "accessories";
  imageUrl: string;
  color?: string;
  brand?: string;
  favorite?: boolean;
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

interface WardrobeContextType {
  clothingItems: ClothingItem[];
  outfits: Outfit[];
  addClothingItem: (item: Omit<ClothingItem, "id">) => void;
  removeClothingItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
  updateClothingItem: (id: string, updates: Partial<ClothingItem>) => void;
  addOutfit: (outfit: Omit<Outfit, "id">) => void;
  removeOutfit: (id: string) => void;
  updateOutfit: (id: string, updates: Partial<Outfit>) => void;
  generateOutfitSuggestions: () => void;
}

const WardrobeContext = createContext<WardrobeContextType | undefined>(
  undefined,
);

// Sample data for initial state
const sampleClothingItems: ClothingItem[] = [
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
];

const sampleOutfits: Outfit[] = [
  {
    id: "1",
    name: "Casual Summer Look",
    items: {
      top: sampleClothingItems[0],
      bottom: sampleClothingItems[1],
      shoes: sampleClothingItems[2],
      accessories: [sampleClothingItems[3]],
    },
    rating: 4.5,
  },
  {
    id: "2",
    name: "Business Casual",
    items: {
      top: sampleClothingItems[4],
      bottom: sampleClothingItems[1],
      shoes: sampleClothingItems[2],
    },
    rating: 4.2,
  },
];

export const WardrobeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize state with sample data or from localStorage if available
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>(() => {
    const savedItems = localStorage.getItem("wardrobeItems");
    return savedItems ? JSON.parse(savedItems) : sampleClothingItems;
  });

  const [outfits, setOutfits] = useState<Outfit[]>(() => {
    const savedOutfits = localStorage.getItem("wardrobeOutfits");
    return savedOutfits ? JSON.parse(savedOutfits) : sampleOutfits;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("wardrobeItems", JSON.stringify(clothingItems));
  }, [clothingItems]);

  useEffect(() => {
    localStorage.setItem("wardrobeOutfits", JSON.stringify(outfits));
  }, [outfits]);

  // Add a new clothing item
  const addClothingItem = (item: Omit<ClothingItem, "id">) => {
    const newItem = {
      ...item,
      id: `item-${Date.now()}`,
    };
    setClothingItems([...clothingItems, newItem as ClothingItem]);
  };

  // Remove a clothing item
  const removeClothingItem = (id: string) => {
    setClothingItems(clothingItems.filter((item) => item.id !== id));

    // Also remove this item from any outfits that use it
    setOutfits(
      outfits.map((outfit) => {
        const newOutfit = { ...outfit };

        // Check if this item is used in the outfit
        if (outfit.items.top?.id === id) {
          newOutfit.items = { ...newOutfit.items, top: undefined };
        }
        if (outfit.items.bottom?.id === id) {
          newOutfit.items = { ...newOutfit.items, bottom: undefined };
        }
        if (outfit.items.shoes?.id === id) {
          newOutfit.items = { ...newOutfit.items, shoes: undefined };
        }
        if (outfit.items.accessories) {
          newOutfit.items = {
            ...newOutfit.items,
            accessories: outfit.items.accessories.filter(
              (acc) => acc.id !== id,
            ),
          };
        }

        return newOutfit;
      }),
    );
  };

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setClothingItems(
      clothingItems.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item,
      ),
    );
  };

  // Update a clothing item
  const updateClothingItem = (id: string, updates: Partial<ClothingItem>) => {
    setClothingItems(
      clothingItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    );

    // Also update this item in any outfits that use it
    setOutfits(
      outfits.map((outfit) => {
        const newOutfit = { ...outfit };

        // Check if this item is used in the outfit and update it
        if (outfit.items.top?.id === id) {
          newOutfit.items = {
            ...newOutfit.items,
            top: { ...outfit.items.top, ...updates } as ClothingItem,
          };
        }
        if (outfit.items.bottom?.id === id) {
          newOutfit.items = {
            ...newOutfit.items,
            bottom: { ...outfit.items.bottom, ...updates } as ClothingItem,
          };
        }
        if (outfit.items.shoes?.id === id) {
          newOutfit.items = {
            ...newOutfit.items,
            shoes: { ...outfit.items.shoes, ...updates } as ClothingItem,
          };
        }
        if (outfit.items.accessories) {
          newOutfit.items = {
            ...newOutfit.items,
            accessories: outfit.items.accessories.map((acc) =>
              acc.id === id ? ({ ...acc, ...updates } as ClothingItem) : acc,
            ),
          };
        }

        return newOutfit;
      }),
    );
  };

  // Add a new outfit
  const addOutfit = (outfit: Omit<Outfit, "id">) => {
    const newOutfit = {
      ...outfit,
      id: `outfit-${Date.now()}`,
    };
    setOutfits([...outfits, newOutfit as Outfit]);
  };

  // Remove an outfit
  const removeOutfit = (id: string) => {
    setOutfits(outfits.filter((outfit) => outfit.id !== id));
  };

  // Update an outfit
  const updateOutfit = (id: string, updates: Partial<Outfit>) => {
    setOutfits(
      outfits.map((outfit) =>
        outfit.id === id ? { ...outfit, ...updates } : outfit,
      ),
    );
  };

  // Generate outfit suggestions based on available clothing items
  const generateOutfitSuggestions = () => {
    // Filter items by category
    const tops = clothingItems.filter((item) => item.category === "tops");
    const bottoms = clothingItems.filter((item) => item.category === "bottoms");
    const shoes = clothingItems.filter((item) => item.category === "shoes");
    const accessories = clothingItems.filter(
      (item) => item.category === "accessories",
    );

    // Generate 3 random outfits if we have enough items
    const newOutfits: Outfit[] = [];

    if (tops.length > 0 && bottoms.length > 0 && shoes.length > 0) {
      // Generate outfit names
      const outfitStyles = [
        "Casual",
        "Business",
        "Weekend",
        "Summer",
        "Winter",
        "Fall",
        "Spring",
      ];
      const outfitTypes = ["Look", "Style", "Outfit", "Ensemble", "Attire"];

      for (let i = 0; i < 3; i++) {
        // Randomly select items
        const top = tops[Math.floor(Math.random() * tops.length)];
        const bottom = bottoms[Math.floor(Math.random() * bottoms.length)];
        const shoe = shoes[Math.floor(Math.random() * shoes.length)];

        // Randomly decide if we should include accessories
        let outfitAccessories: ClothingItem[] | undefined = undefined;
        if (accessories.length > 0 && Math.random() > 0.3) {
          // Include 1-2 accessories
          const numAccessories = Math.min(
            accessories.length,
            Math.floor(Math.random() * 2) + 1,
          );
          outfitAccessories = [];

          // Create a copy of accessories array to avoid duplicates
          const availableAccessories = [...accessories];

          for (let j = 0; j < numAccessories; j++) {
            const index = Math.floor(
              Math.random() * availableAccessories.length,
            );
            outfitAccessories.push(availableAccessories[index]);
            availableAccessories.splice(index, 1);
          }
        }

        // Generate a random outfit name
        const style =
          outfitStyles[Math.floor(Math.random() * outfitStyles.length)];
        const type =
          outfitTypes[Math.floor(Math.random() * outfitTypes.length)];
        const name = `${style} ${type}`;

        // Generate a random rating between 3.5 and 5.0
        const rating = Math.round((3.5 + Math.random() * 1.5) * 10) / 10;

        newOutfits.push({
          id: `outfit-${Date.now()}-${i}`,
          name,
          items: {
            top,
            bottom,
            shoes: shoe,
            accessories: outfitAccessories,
          },
          rating,
        });
      }

      // Add the new outfits to the existing ones
      setOutfits([...outfits, ...newOutfits]);
    }
  };

  const value = {
    clothingItems,
    outfits,
    addClothingItem,
    removeClothingItem,
    toggleFavorite,
    updateClothingItem,
    addOutfit,
    removeOutfit,
    updateOutfit,
    generateOutfitSuggestions,
  };

  return (
    <WardrobeContext.Provider value={value}>
      {children}
    </WardrobeContext.Provider>
  );
};

export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (context === undefined) {
    throw new Error("useWardrobe must be used within a WardrobeProvider");
  }
  return context;
};

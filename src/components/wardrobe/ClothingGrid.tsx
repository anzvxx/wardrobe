import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";

// Since ClothingItem is a dummy component in the current codebase, we'll create a simple version here
const ClothingItemCard = ({
  item = {
    id: "1",
    name: "Clothing Item",
    category: "tops",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "blue",
    brand: "Brand",
  },
  onClick = () => {},
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="aspect-square relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm">{item.name}</h3>
        <p className="text-xs text-gray-500">{item.brand}</p>
      </div>
    </div>
  );
};

interface ClothingItem {
  id: string;
  name: string;
  category: "tops" | "bottoms" | "shoes" | "accessories";
  imageUrl: string;
  color?: string;
  brand?: string;
  favorite?: boolean;
}

interface ClothingGridProps {
  items?: ClothingItem[];
  onItemClick?: (item: ClothingItem) => void;
  onAddItem?: () => void;
}

const ClothingGrid = ({
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
  onItemClick = () => {},
  onAddItem = () => {},
}: ClothingGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter items based on search query and active category
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.brand &&
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-6">
        {/* Search and filter bar */}
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search your wardrobe..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
            <Button onClick={onAddItem}>
              <Plus size={18} className="mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Category tabs */}
        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={setActiveCategory}
        >
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="tops">Tops</TabsTrigger>
            <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
            <TabsTrigger value="shoes">Shoes</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredItems.map((item) => (
                <ClothingItemCard
                  key={item.id}
                  item={item}
                  onClick={() => onItemClick(item)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tops" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredItems.map((item) => (
                <ClothingItemCard
                  key={item.id}
                  item={item}
                  onClick={() => onItemClick(item)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bottoms" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredItems.map((item) => (
                <ClothingItemCard
                  key={item.id}
                  item={item}
                  onClick={() => onItemClick(item)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shoes" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredItems.map((item) => (
                <ClothingItemCard
                  key={item.id}
                  item={item}
                  onClick={() => onItemClick(item)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="accessories" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredItems.map((item) => (
                <ClothingItemCard
                  key={item.id}
                  item={item}
                  onClick={() => onItemClick(item)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No items found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters
            </p>
            <Button onClick={onAddItem}>
              <Plus size={18} className="mr-2" />
              Add New Item
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothingGrid;

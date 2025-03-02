import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, RefreshCw, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";

interface Outfit {
  id: string;
  name: string;
  items: {
    top: {
      id: string;
      imageUrl: string;
      name: string;
    };
    bottom: {
      id: string;
      imageUrl: string;
      name: string;
    };
    shoes: {
      id: string;
      imageUrl: string;
      name: string;
    };
    accessory?: {
      id: string;
      imageUrl: string;
      name: string;
    };
  };
  rating: number;
}

// Internal OutfitCard component since the external one isn't available
const OutfitCard = ({ outfit }: { outfit: Outfit }) => {
  return (
    <Card className="overflow-hidden h-full bg-white hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="grid grid-cols-2 gap-1 p-2">
          <div className="aspect-square rounded-md overflow-hidden">
            <img
              src={outfit.items.top.imageUrl}
              alt={outfit.items.top.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square rounded-md overflow-hidden">
            <img
              src={outfit.items.bottom.imageUrl}
              alt={outfit.items.bottom.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square rounded-md overflow-hidden">
            <img
              src={outfit.items.shoes.imageUrl}
              alt={outfit.items.shoes.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square rounded-md overflow-hidden">
            {outfit.items.accessory ? (
              <img
                src={outfit.items.accessory.imageUrl}
                alt={outfit.items.accessory.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                No accessory
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 pt-2">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-medium text-lg">{outfit.name}</h3>
          <Badge variant="outline" className="flex items-center gap-1">
            <Heart size={12} className="fill-rose-500 text-rose-500" />
            {outfit.rating}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {outfit.items.top.name}, {outfit.items.bottom.name},{" "}
          {outfit.items.shoes.name}
          {outfit.items.accessory && `, ${outfit.items.accessory.name}`}
        </p>
      </CardFooter>
    </Card>
  );
};

interface OutfitGridProps {
  outfits?: Outfit[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onOutfitSelect?: (outfit: Outfit) => void;
}

const OutfitGrid = ({
  outfits = [
    {
      id: "1",
      name: "Casual Summer Look",
      items: {
        top: {
          id: "t1",
          imageUrl:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          name: "White T-shirt",
        },
        bottom: {
          id: "b1",
          imageUrl:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          name: "Blue Jeans",
        },
        shoes: {
          id: "s1",
          imageUrl:
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          name: "White Sneakers",
        },
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
            "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          name: "Blue Button-up Shirt",
        },
        bottom: {
          id: "b2",
          imageUrl:
            "https://images.unsplash.com/photo-1598522325074-042db73aa4e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          name: "Khaki Chinos",
        },
        shoes: {
          id: "s2",
          imageUrl:
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          name: "Brown Loafers",
        },
        accessory: {
          id: "a1",
          imageUrl:
            "https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          name: "Leather Watch",
        },
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
            "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          name: "Striped Blouse",
        },
        bottom: {
          id: "b3",
          imageUrl:
            "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          name: "White Skirt",
        },
        shoes: {
          id: "s3",
          imageUrl:
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          name: "Sandals",
        },
        accessory: {
          id: "a2",
          imageUrl:
            "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          name: "Straw Hat",
        },
      },
      rating: 4.2,
    },
  ],
  isLoading = false,
  onRefresh = () => console.log("Refreshing outfits..."),
  onOutfitSelect = (outfit) => console.log("Selected outfit:", outfit),
}: OutfitGridProps) => {
  const [filteredOutfits, setFilteredOutfits] = useState<Outfit[]>(outfits);
  const [activeFilter, setActiveFilter] = useState("all");
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setFilteredOutfits(outfits);
  }, [outfits]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setAnimateCards(true);

    // Apply filtering logic based on the selected filter
    if (filter === "all") {
      setFilteredOutfits(outfits);
    } else if (filter === "casual") {
      setFilteredOutfits(
        outfits.filter((outfit) =>
          outfit.name.toLowerCase().includes("casual"),
        ),
      );
    } else if (filter === "business") {
      setFilteredOutfits(
        outfits.filter((outfit) =>
          outfit.name.toLowerCase().includes("business"),
        ),
      );
    } else if (filter === "weekend") {
      setFilteredOutfits(
        outfits.filter((outfit) =>
          outfit.name.toLowerCase().includes("weekend"),
        ),
      );
    }

    setTimeout(() => setAnimateCards(false), 500);
  };

  const handleRefresh = () => {
    setAnimateCards(true);
    onRefresh();
    setTimeout(() => setAnimateCards(false), 500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Outfit Suggestions</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all" onClick={() => handleFilterChange("all")}>
            All Outfits
          </TabsTrigger>
          <TabsTrigger
            value="casual"
            onClick={() => handleFilterChange("casual")}
          >
            Casual
          </TabsTrigger>
          <TabsTrigger
            value="business"
            onClick={() => handleFilterChange("business")}
          >
            Business
          </TabsTrigger>
          <TabsTrigger
            value="weekend"
            onClick={() => handleFilterChange("weekend")}
          >
            Weekend
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial={animateCards ? "hidden" : "visible"}
              animate="visible"
            >
              {filteredOutfits.map((outfit) => (
                <motion.div
                  key={outfit.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onClick={() => onOutfitSelect(outfit)}
                >
                  <OutfitCard outfit={outfit} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="casual" className="mt-0">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial={animateCards ? "hidden" : "visible"}
            animate="visible"
          >
            {filteredOutfits.map((outfit) => (
              <motion.div
                key={outfit.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onClick={() => onOutfitSelect(outfit)}
              >
                <OutfitCard outfit={outfit} />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="business" className="mt-0">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial={animateCards ? "hidden" : "visible"}
            animate="visible"
          >
            {filteredOutfits.map((outfit) => (
              <motion.div
                key={outfit.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onClick={() => onOutfitSelect(outfit)}
              >
                <OutfitCard outfit={outfit} />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="weekend" className="mt-0">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial={animateCards ? "hidden" : "visible"}
            animate="visible"
          >
            {filteredOutfits.map((outfit) => (
              <motion.div
                key={outfit.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onClick={() => onOutfitSelect(outfit)}
              >
                <OutfitCard outfit={outfit} />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      {filteredOutfits.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <p className="mb-4">No outfits found matching your criteria</p>
          <Button onClick={() => handleFilterChange("all")}>
            View All Outfits
          </Button>
        </div>
      )}
    </div>
  );
};

export default OutfitGrid;

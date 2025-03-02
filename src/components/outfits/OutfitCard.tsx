import React, { useState } from "react";
import { Heart, Share2, Expand, RotateCw } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ClothingItem {
  id: string;
  imageUrl: string;
  category: "tops" | "bottoms" | "shoes" | "accessories";
  name: string;
}

interface OutfitCardProps {
  id?: string;
  title?: string;
  items?: ClothingItem[];
  onLike?: () => void;
  onShare?: () => void;
  onExpand?: () => void;
  isLiked?: boolean;
}

const OutfitCard = ({
  id = "outfit-1",
  title = "Casual Summer Look",
  items = [
    {
      id: "top-1",
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format",
      category: "tops",
      name: "White T-Shirt",
    },
    {
      id: "bottom-1",
      imageUrl:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format",
      category: "bottoms",
      name: "Blue Jeans",
    },
    {
      id: "shoe-1",
      imageUrl:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format",
      category: "shoes",
      name: "White Sneakers",
    },
    {
      id: "acc-1",
      imageUrl:
        "https://images.unsplash.com/photo-1590736969596-8a5d8f3fa2f6?w=500&auto=format",
      category: "accessories",
      name: "Silver Watch",
    },
  ],
  onLike = () => {},
  onShare = () => {},
  onExpand = () => {},
  isLiked = false,
}: OutfitCardProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full bg-white flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow p-3">
          <div className="grid grid-cols-2 gap-2 h-full">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-md bg-gray-100"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover aspect-square"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                  {item.name}
                </div>
              </div>
            ))}
          </div>

          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/30 flex items-center justify-center"
            >
              <Button
                variant="secondary"
                size="lg"
                className="bg-white/90 hover:bg-white"
                onClick={onExpand}
              >
                <Expand className="mr-2" size={16} />
                View Details
              </Button>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="border-t bg-gray-50 p-3">
          <div className="flex justify-between w-full">
            <Button variant="ghost" size="sm" onClick={handleLike}>
              <Heart
                className={`${liked ? "fill-red-500 text-red-500" : ""} mr-1`}
                size={18}
              />
              {liked ? "Liked" : "Like"}
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={onShare}>
                <Share2 size={18} />
              </Button>
              <Button variant="ghost" size="icon">
                <RotateCw size={18} />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default OutfitCard;

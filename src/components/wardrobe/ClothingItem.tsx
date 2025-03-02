import React from "react";
import { motion } from "framer-motion";
import { Heart, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ClothingItemProps {
  id?: string;
  image?: string;
  category?: "tops" | "bottoms" | "shoes" | "accessories";
  name?: string;
  favorite?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

const ClothingItem = ({
  id = "1",
  image = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  category = "tops",
  name = "Classic White T-Shirt",
  favorite = false,
  onEdit = () => {},
  onDelete = () => {},
  onToggleFavorite = () => {},
}: ClothingItemProps) => {
  const handleEdit = () => {
    onEdit(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(id);
  };

  const getCategoryColor = () => {
    switch (category) {
      case "tops":
        return "bg-blue-100 text-blue-800";
      case "bottoms":
        return "bg-green-100 text-green-800";
      case "shoes":
        return "bg-purple-100 text-purple-800";
      case "accessories":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative">
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="absolute top-2 right-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={handleToggleFavorite}
                  >
                    <Heart
                      className={`h-5 w-5 ${favorite ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {favorite ? "Remove from favorites" : "Add to favorites"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="absolute top-2 left-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor()}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-900 truncate">{name}</h3>
          <div className="flex justify-end space-x-2 mt-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-gray-100"
                    onClick={handleEdit}
                  >
                    <Edit className="h-4 w-4 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit item</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-red-50"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete item</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ClothingItem;

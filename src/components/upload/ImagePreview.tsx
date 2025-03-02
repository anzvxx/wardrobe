import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Trash2, Edit, Crop, RotateCw, ZoomIn, Tag } from "lucide-react";

interface ImagePreviewProps {
  imageUrl?: string;
  category?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onCrop?: () => void;
  onRotate?: () => void;
  onZoom?: () => void;
  onCategoryChange?: () => void;
}

const ImagePreview = ({
  imageUrl = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  category = "Tops",
  onEdit = () => console.log("Edit clicked"),
  onDelete = () => console.log("Delete clicked"),
  onCrop = () => console.log("Crop clicked"),
  onRotate = () => console.log("Rotate clicked"),
  onZoom = () => console.log("Zoom clicked"),
  onCategoryChange = () => console.log("Category change clicked"),
}: ImagePreviewProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Card
      className="w-[300px] h-[300px] overflow-hidden bg-white transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center">
          <span>Image Preview</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-red-500 hover:bg-red-50"
                  onClick={onDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 relative">
        <div className="relative w-full h-[200px] rounded-md overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt="Clothing item preview"
            className="w-full h-full object-cover"
          />

          {/* Overlay with edit tools that appear on hover */}
          <div
            className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={onEdit}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Image editing toolbar */}
        <div className="flex justify-between mt-2">
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={onCrop}
                  >
                    <Crop className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Crop image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={onRotate}
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Rotate image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={onZoom}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={onCategoryChange}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {category}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change category</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagePreview;

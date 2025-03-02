import React, { useState } from "react";
import { Shirt, ShoppingBag, Footprints, Watch } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";

export interface CategorySelectorProps {
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
  isDisabled?: boolean;
}

const CategorySelector = ({
  onCategorySelect = () => {},
  selectedCategory = "",
  isDisabled = false,
}: CategorySelectorProps) => {
  const [category, setCategory] = useState(selectedCategory);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onCategorySelect(value);
  };

  const categories = [
    { id: "tops", label: "Tops", icon: <Shirt className="h-5 w-5 mr-2" /> },
    {
      id: "bottoms",
      label: "Bottoms",
      icon: <ShoppingBag className="h-5 w-5 mr-2" />,
    },
    {
      id: "shoes",
      label: "Shoes",
      icon: <Footprints className="h-5 w-5 mr-2" />,
    },
    {
      id: "accessories",
      label: "Accessories",
      icon: <Watch className="h-5 w-5 mr-2" />,
    },
  ];

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          Categorize Your Item
        </CardTitle>
        <CardDescription className="text-center">
          Select the appropriate category for your clothing item
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={category}
          onValueChange={handleCategoryChange}
          className="space-y-3"
          disabled={isDisabled}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`flex items-center p-3 rounded-lg border transition-all ${category === cat.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"}`}
            >
              <RadioGroupItem value={cat.id} id={cat.id} className="mr-3" />
              <label
                htmlFor={cat.id}
                className="flex items-center flex-1 cursor-pointer"
              >
                {cat.icon}
                <span className="font-medium">{cat.label}</span>
              </label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setCategory("")}>
          Clear
        </Button>
        <Button
          disabled={!category || isDisabled}
          onClick={() => onCategorySelect(category)}
        >
          Confirm Category
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategorySelector;

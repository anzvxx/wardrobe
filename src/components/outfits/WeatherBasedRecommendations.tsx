import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Cloud, Sun, CloudRain, Snowflake, Search, Wind } from "lucide-react";

interface WeatherCondition {
  type: "sunny" | "cloudy" | "rainy" | "snowy" | "windy";
  temperature: number;
  description: string;
}

interface OutfitRecommendation {
  id: string;
  name: string;
  description: string;
  imageUrls: string[];
  suitable: boolean;
}

interface WeatherBasedRecommendationsProps {
  location?: string;
  onLocationChange?: (location: string) => void;
  onRefresh?: () => void;
}

const WeatherBasedRecommendations = ({
  location = "New York, NY",
  onLocationChange = () => {},
  onRefresh = () => {},
}: WeatherBasedRecommendationsProps) => {
  const [currentLocation, setCurrentLocation] = useState(location);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"today" | "week">("today");

  // Mock weather data
  const [weather, setWeather] = useState<WeatherCondition>({
    type: "sunny",
    temperature: 72,
    description: "Clear skies with light breeze",
  });

  // Mock outfit recommendations
  const [recommendations, setRecommendations] = useState<
    OutfitRecommendation[]
  >([
    {
      id: "1",
      name: "Light Summer Casual",
      description: "Perfect for warm sunny days",
      imageUrls: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80",
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&q=80",
      ],
      suitable: true,
    },
    {
      id: "2",
      name: "Breezy Afternoon",
      description: "Comfortable and stylish for warm weather",
      imageUrls: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&q=80",
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&q=80",
      ],
      suitable: true,
    },
    {
      id: "3",
      name: "Rainy Day Outfit",
      description: "Stay dry and stylish",
      imageUrls: [
        "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=300&q=80",
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&q=80",
        "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=300&q=80",
      ],
      suitable: false,
    },
  ]);

  const handleSearch = () => {
    if (!searchInput) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setCurrentLocation(searchInput);
      onLocationChange(searchInput);
      setIsLoading(false);
      setSearchInput("");

      // For demo purposes, change the weather based on input
      if (searchInput.toLowerCase().includes("rain")) {
        setWeather({
          type: "rainy",
          temperature: 58,
          description: "Light rain throughout the day",
        });
      } else if (searchInput.toLowerCase().includes("snow")) {
        setWeather({
          type: "snowy",
          temperature: 28,
          description: "Light snowfall expected",
        });
      } else if (searchInput.toLowerCase().includes("cloud")) {
        setWeather({
          type: "cloudy",
          temperature: 65,
          description: "Overcast with occasional breaks",
        });
      } else if (searchInput.toLowerCase().includes("wind")) {
        setWeather({
          type: "windy",
          temperature: 62,
          description: "Strong winds with gusts up to 25mph",
        });
      } else {
        setWeather({
          type: "sunny",
          temperature: 72,
          description: "Clear skies with light breeze",
        });
      }
    }, 1000);
  };

  const getWeatherIcon = (type: string) => {
    switch (type) {
      case "sunny":
        return <Sun className="h-10 w-10 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-10 w-10 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-10 w-10 text-blue-500" />;
      case "snowy":
        return <Snowflake className="h-10 w-10 text-blue-300" />;
      case "windy":
        return <Wind className="h-10 w-10 text-teal-500" />;
      default:
        return <Sun className="h-10 w-10 text-yellow-500" />;
    }
  };

  return (
    <Card className="w-full bg-white shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            Weather-Based Outfits
          </CardTitle>
          <div className="flex items-center gap-2">
            {getWeatherIcon(weather.type)}
            <div>
              <div className="text-2xl font-bold">{weather.temperature}°F</div>
              <div className="text-sm opacity-90">{weather.description}</div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search location..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              variant="secondary"
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              {isLoading ? "Searching..." : <Search className="h-4 w-4" />}
            </Button>
          </div>
          <div className="text-sm mt-2">
            Current location: {currentLocation}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "today" | "week")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="today">Today's Recommendations</TabsTrigger>
            <TabsTrigger value="week">Weekly Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((outfit) => (
                <motion.div
                  key={outfit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-lg overflow-hidden border ${outfit.suitable ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50 opacity-70"}`}
                >
                  <div className="grid grid-cols-3 gap-1 p-2">
                    {outfit.imageUrls.map((url, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded overflow-hidden"
                      >
                        <img
                          src={url}
                          alt="Clothing item"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{outfit.name}</h3>
                        <p className="text-sm text-gray-600">
                          {outfit.description}
                        </p>
                      </div>
                      {outfit.suitable && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Perfect Match
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm" className="text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="week">
            <div className="space-y-4">
              <p className="text-center text-gray-500">
                Weekly forecast and outfit planning coming soon!
              </p>
              <div className="flex justify-center">
                <Button onClick={onRefresh} variant="outline">
                  Check Back Later
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeatherBasedRecommendations;

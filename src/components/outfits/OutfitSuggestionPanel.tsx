import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, RefreshCw, Plus } from "lucide-react";
import OutfitGrid from "./OutfitGrid";
import MixMatchInterface from "./MixMatchInterface";

interface Outfit {
  id: string;
  name: string;
  items: any;
  rating?: number;
}

interface OutfitSuggestionPanelProps {
  outfits?: Outfit[];
  onGenerateOutfits?: () => void;
  onSaveOutfit?: (outfit: Outfit) => void;
  onEditOutfit?: (outfit: Outfit) => void;
}

export const OutfitSuggestionPanel = ({
  outfits = [],
  onGenerateOutfits = () => {},
  onSaveOutfit = () => {},
  onEditOutfit = () => {},
}: OutfitSuggestionPanelProps) => {
  const [activeTab, setActiveTab] = useState<"suggestions" | "create">(
    "suggestions",
  );
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateOutfits = () => {
    setIsGenerating(true);
    onGenerateOutfits();
    setTimeout(() => setIsGenerating(false), 1500);
  };

  const handleOutfitSelect = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    setActiveTab("create");
  };

  const handleSaveOutfit = (outfit: Outfit) => {
    onSaveOutfit(outfit);
    setSelectedOutfit(null);
    setActiveTab("suggestions");
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            Outfit Suggestions
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setActiveTab("create")}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Create New
            </Button>
            <Button
              onClick={handleGenerateOutfits}
              className="flex items-center gap-2"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Suggestions
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
            <TabsTrigger value="create">Mix & Match</TabsTrigger>
          </TabsList>

          <TabsContent value="suggestions" className="mt-0">
            <OutfitGrid
              outfits={outfits}
              onOutfitSelect={handleOutfitSelect}
              onRefresh={handleGenerateOutfits}
              isLoading={isGenerating}
            />
          </TabsContent>

          <TabsContent value="create" className="mt-0">
            <MixMatchInterface
              outfit={selectedOutfit || undefined}
              onSave={handleSaveOutfit}
              onCancel={() => {
                setSelectedOutfit(null);
                setActiveTab("suggestions");
              }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OutfitSuggestionPanel;

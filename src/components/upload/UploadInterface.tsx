import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ArrowRight, Save, X } from "lucide-react";
import DragDropZone from "./DragDropZone";
import CategorySelector from "./CategorySelector";
import ImagePreview from "./ImagePreview";

interface UploadInterfaceProps {
  onUploadComplete?: (item: {
    id: string;
    image: File;
    category: string;
    name?: string;
  }) => void;
  onCancel?: () => void;
}

const UploadInterface = ({
  onUploadComplete = () => {},
  onCancel = () => {},
}: UploadInterfaceProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>("");

  const handleFileAccepted = (file: File) => {
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    // Move to next step after a short delay
    setTimeout(() => setCurrentStep(2), 500);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Move to next step after a short delay
    setTimeout(() => setCurrentStep(3), 500);
  };

  const handleSubmit = () => {
    if (!uploadedFile || !selectedCategory) return;

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      onUploadComplete({
        id: `item-${Date.now()}`,
        image: uploadedFile,
        category: selectedCategory,
        name: itemName || uploadedFile.name,
      });
      setIsUploading(false);
      resetForm();
    }, 1500);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setUploadedFile(null);
    setImagePreviewUrl("");
    setSelectedCategory("");
    setItemName("");
  };

  return (
    <Card className="w-full max-w-5xl mx-auto bg-white shadow-lg">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-bold flex justify-between items-center">
          <span>Upload Clothing Item</span>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <Tabs value={`step-${currentStep}`} className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger
                value="step-1"
                disabled={currentStep !== 1}
                onClick={() => setCurrentStep(1)}
                className={currentStep >= 1 ? "text-primary" : ""}
              >
                1. Upload Image
              </TabsTrigger>
              <TabsTrigger
                value="step-2"
                disabled={currentStep < 2}
                onClick={() => uploadedFile && setCurrentStep(2)}
                className={currentStep >= 2 ? "text-primary" : ""}
              >
                2. Select Category
              </TabsTrigger>
              <TabsTrigger
                value="step-3"
                disabled={currentStep < 3}
                onClick={() =>
                  uploadedFile && selectedCategory && setCurrentStep(3)
                }
                className={currentStep >= 3 ? "text-primary" : ""}
              >
                3. Review & Save
              </TabsTrigger>
            </TabsList>

            <TabsContent value="step-1" className="mt-6">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-medium mb-4">
                  Upload Your Clothing Item
                </h3>
                <p className="text-gray-500 mb-6 text-center max-w-md">
                  Drag and drop an image of your clothing item or click to
                  browse your files. We support JPG, PNG and WebP formats.
                </p>
                <div className="w-full max-w-xl">
                  <DragDropZone
                    onFileAccepted={handleFileAccepted}
                    isUploading={isUploading}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="step-2" className="mt-6">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-medium mb-4">
                  Categorize Your Item
                </h3>
                <p className="text-gray-500 mb-6 text-center max-w-md">
                  Select the appropriate category for your clothing item to help
                  us organize your wardrobe and create better outfit
                  suggestions.
                </p>
                <div className="w-full max-w-xl">
                  <CategorySelector
                    onCategorySelect={handleCategorySelect}
                    selectedCategory={selectedCategory}
                    isDisabled={isUploading}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="step-3" className="mt-6">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-medium mb-4">Review & Save</h3>
                <p className="text-gray-500 mb-6 text-center max-w-md">
                  Review your clothing item details and make any final
                  adjustments before saving it to your wardrobe.
                </p>
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <ImagePreview
                    imageUrl={imagePreviewUrl}
                    category={selectedCategory}
                    onCategoryChange={() => setCurrentStep(2)}
                    onDelete={resetForm}
                  />

                  <div className="w-full max-w-md space-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="item-name"
                        className="block text-sm font-medium"
                      >
                        Item Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="item-name"
                        placeholder="E.g., Blue Cotton T-Shirt"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        disabled={isUploading}
                      />
                    </div>

                    <div className="pt-4 flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                        disabled={isUploading}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={isUploading}
                        className="gap-2"
                      >
                        {isUploading ? "Saving..." : "Save to Wardrobe"}
                        {!isUploading && <Save className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {currentStep < 3 && (
          <div className="flex justify-end mt-6">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="mr-2"
                disabled={isUploading}
              >
                Back
              </Button>
            )}
            {currentStep === 1 && uploadedFile && (
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={isUploading}
                className="gap-2"
              >
                Next Step <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            {currentStep === 2 && selectedCategory && (
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={isUploading}
                className="gap-2"
              >
                Next Step <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UploadInterface;

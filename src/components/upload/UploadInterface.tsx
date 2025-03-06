import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Check } from "lucide-react";
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

export const UploadInterface = ({
  onUploadComplete = () => {},
  onCancel = () => {},
}: UploadInterfaceProps) => {
  const [activeStep, setActiveStep] = useState<
    "upload" | "categorize" | "preview"
  >("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [itemName, setItemName] = useState<string>("");

  const handleFileAccepted = (file: File) => {
    setUploadedFile(file);
    setItemName(file.name.split(".")[0].replace(/[-_]/g, " "));
    setActiveStep("categorize");
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setActiveStep("preview");
  };

  const handleUploadComplete = () => {
    if (!uploadedFile || !category) return;

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      onUploadComplete({
        id: `item-${Date.now()}`,
        image: uploadedFile,
        category,
        name: itemName,
      });
      setIsUploading(false);
    }, 1500);
  };

  const handleReset = () => {
    setUploadedFile(null);
    setCategory("");
    setItemName("");
    setActiveStep("upload");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardContent className="p-6">
        <Tabs value={activeStep} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="upload"
              onClick={() => uploadedFile && setActiveStep("upload")}
              disabled={!uploadedFile && activeStep !== "upload"}
            >
              1. Upload
            </TabsTrigger>
            <TabsTrigger
              value="categorize"
              onClick={() => uploadedFile && setActiveStep("categorize")}
              disabled={!uploadedFile || activeStep === "upload"}
            >
              2. Categorize
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              onClick={() => category && setActiveStep("preview")}
              disabled={
                !category ||
                activeStep === "upload" ||
                activeStep === "categorize"
              }
            >
              3. Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-0">
            <div className="flex flex-col items-center">
              <DragDropZone
                onFileAccepted={handleFileAccepted}
                isUploading={isUploading}
              />

              <div className="mt-6 flex justify-end w-full">
                <Button variant="outline" onClick={onCancel} className="mr-2">
                  Cancel
                </Button>
                <Button
                  onClick={() => uploadedFile && setActiveStep("categorize")}
                  disabled={!uploadedFile}
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categorize" className="mt-0">
            <div className="flex flex-col items-center">
              <CategorySelector
                onCategorySelect={handleCategorySelect}
                selectedCategory={category}
                isDisabled={isUploading}
              />

              <div className="mt-6 flex justify-between w-full">
                <Button
                  variant="outline"
                  onClick={() => setActiveStep("upload")}
                >
                  Back
                </Button>
                <Button
                  onClick={() => category && setActiveStep("preview")}
                  disabled={!category}
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <div className="flex flex-col items-center">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
                {uploadedFile && (
                  <ImagePreview
                    imageUrl={URL.createObjectURL(uploadedFile)}
                    category={category}
                    onCategoryChange={() => setActiveStep("categorize")}
                  />
                )}

                <div className="bg-gray-50 p-6 rounded-lg w-full max-w-md">
                  <h3 className="text-lg font-medium mb-4">Item Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Item Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder="Enter item name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <div className="flex items-center">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm font-medium">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveStep("categorize")}
                          className="ml-2 text-xs"
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between w-full">
                <Button
                  variant="outline"
                  onClick={() => setActiveStep("categorize")}
                >
                  Back
                </Button>
                <Button
                  onClick={handleUploadComplete}
                  disabled={isUploading || !uploadedFile || !category}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Complete Upload
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UploadInterface;

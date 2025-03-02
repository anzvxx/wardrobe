import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DragDropZoneProps {
  onFileAccepted?: (file: File) => void;
  maxSize?: number;
  acceptedFileTypes?: string[];
  isUploading?: boolean;
}

const DragDropZone = ({
  onFileAccepted = () => {},
  maxSize = 5242880, // 5MB default
  acceptedFileTypes = ["image/jpeg", "image/png", "image/webp"],
  isUploading = false,
}: DragDropZoneProps) => {
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        setErrorMessage(error.message);
        setUploadStatus("error");
        return;
      }

      if (acceptedFiles.length > 0) {
        setUploadStatus("success");
        onFileAccepted(acceptedFiles[0]);
      }
    },
    [onFileAccepted],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce(
      (acc, type) => ({ ...acc, [type]: [] }),
      {},
    ),
    maxSize,
    multiple: false,
  });

  const resetStatus = () => {
    setUploadStatus("idle");
    setErrorMessage("");
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardContent className="p-6 h-full">
        <div
          {...getRootProps()}
          className={`
            relative flex flex-col items-center justify-center w-full h-full min-h-[300px] 
            rounded-lg border-2 border-dashed transition-all duration-300 cursor-pointer
            ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50"}
            ${isDragAccept ? "border-green-500 bg-green-50" : ""}
            ${isDragReject || uploadStatus === "error" ? "border-red-500 bg-red-50" : ""}
            ${uploadStatus === "success" ? "border-green-500 bg-green-50" : ""}
          `}
        >
          <input {...getInputProps()} />

          <AnimatePresence mode="wait">
            {uploadStatus === "idle" && (
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 p-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="idle"
              >
                <motion.div
                  className="p-4 rounded-full bg-primary/10 text-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Upload size={32} />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    Drag & Drop your clothing item
                  </h3>
                  <p className="text-sm text-gray-500">
                    {isDragActive
                      ? "Drop the file here"
                      : "or click to browse files"}
                  </p>
                  <p className="text-xs text-gray-400">
                    Supported formats: JPG, PNG, WebP (max{" "}
                    {Math.round(maxSize / 1048576)}MB)
                  </p>
                </div>
              </motion.div>
            )}

            {uploadStatus === "success" && (
              <motion.div
                className="flex flex-col items-center justify-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="success"
              >
                <div className="p-4 rounded-full bg-green-100 text-green-600">
                  <Check size={32} />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-green-600">
                    Upload Successful!
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Your clothing item has been uploaded
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetStatus();
                  }}
                  className="mt-2"
                >
                  Upload Another
                </Button>
              </motion.div>
            )}

            {uploadStatus === "error" && (
              <motion.div
                className="flex flex-col items-center justify-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="error"
              >
                <div className="p-4 rounded-full bg-red-100 text-red-600">
                  <X size={32} />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-red-600">
                    Upload Failed
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {errorMessage || "Something went wrong"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetStatus();
                  }}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Uploading...
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DragDropZone;

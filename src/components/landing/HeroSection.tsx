import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Upload, Sparkles, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted?: () => void;
}

const HeroSection = ({ onGetStarted = () => {} }: HeroSectionProps) => {
  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Text content */}
        <motion.div
          className="text-white max-w-xl pt-16 md:pt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Discover Your Perfect Style
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Upload your clothing items and let our AI create stunning outfit
            combinations tailored just for you.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" onClick={onGetStarted} className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/20 hover:bg-white/20"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Now
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap gap-6 mt-12">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-full mr-3">
                <Sparkles className="h-5 w-5" />
              </div>
              <span>AI-Powered Suggestions</span>
            </div>
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-full mr-3">
                <Shirt className="h-5 w-5" />
              </div>
              <span>Mix & Match Interface</span>
            </div>
          </div>
        </motion.div>

        {/* Image/illustration */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            {/* Main outfit image */}
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-lg p-2 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Outfit example"
                className="rounded-lg w-[350px] h-[450px] object-cover"
              />

              {/* Floating clothing items */}
              <motion.div
                className="absolute -left-16 top-20 bg-white rounded-lg shadow-lg p-1 w-24 h-24"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="Clothing item"
                  className="w-full h-full object-cover rounded"
                />
              </motion.div>

              <motion.div
                className="absolute -right-12 top-32 bg-white rounded-lg shadow-lg p-1 w-20 h-20"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="Clothing item"
                  className="w-full h-full object-cover rounded"
                />
              </motion.div>

              <motion.div
                className="absolute -bottom-10 -left-10 bg-white rounded-lg shadow-lg p-1 w-28 h-28"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="Clothing item"
                  className="w-full h-full object-cover rounded"
                />
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl -z-10"></div>
          </div>
        </motion.div>
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="w-full"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

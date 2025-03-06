import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 shadow-xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center text-white">
        <div className="text-center md:text-left md:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Your AI-Powered
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Wardrobe Assistant
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl text-blue-100"
          >
            Upload your clothing items and get AI-powered outfit suggestions
            tailored to your style and preferences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-blue-50"
              onClick={() => (window.location.href = "/upload")}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
              onClick={() => (window.location.href = "/outfits")}
            >
              View Demo
            </Button>
          </motion.div>
        </div>

        {/* Outfit Image with Animation */}
        <motion.div
          className="hidden md:block md:w-1/2 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="relative mx-auto w-[350px] h-[350px]">
            {/* Floating outfit items */}
            <motion.div
              className="absolute top-0 left-0 w-40 h-40 rounded-lg overflow-hidden shadow-xl z-10"
              animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <img
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80"
                alt="Outfit Top"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-10 w-40 h-40 rounded-lg overflow-hidden shadow-xl z-20"
              animate={{ y: [0, 10, 0], rotate: [2, -2, 2] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80"
                alt="Outfit Bottom"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute top-20 right-0 w-40 h-40 rounded-lg overflow-hidden shadow-xl z-30"
              animate={{ y: [0, 8, 0], rotate: [1, -1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80"
                alt="Outfit Shoes"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Glowing circle behind the outfit */}
            <div className="absolute inset-0 rounded-full bg-white/20 filter blur-xl z-0"></div>
          </div>
        </motion.div>
      </div>

      {/* Wave Shape Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

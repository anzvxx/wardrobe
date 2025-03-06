import React from "react";
import { motion } from "framer-motion";
import Header from "./layout/Header";
import Footer from "./Footer";
import HeroSection from "./landing/HeroSection";
import FeatureShowcase from "./landing/FeatureShowcase";

export const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="pt-20 flex-grow">
        <HeroSection />
        <FeatureShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

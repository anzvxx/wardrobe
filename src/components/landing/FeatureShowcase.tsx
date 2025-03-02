import React from "react";
import { motion } from "framer-motion";
import { Upload, Wand2, Palette, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const Feature = ({ icon, title, description, delay = 0 }: FeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface FeatureShowcaseProps {
  features?: FeatureProps[];
}

const FeatureShowcase = ({
  features = [
    {
      icon: <Upload className="w-8 h-8 text-primary" />,
      title: "Easy Upload",
      description:
        "Quickly add your clothing items with our intuitive drag-and-drop interface",
      delay: 0.1,
    },
    {
      icon: <Wand2 className="w-8 h-8 text-primary" />,
      title: "AI Matching",
      description:
        "Our smart algorithm suggests perfect outfit combinations based on your style",
      delay: 0.2,
    },
    {
      icon: <Palette className="w-8 h-8 text-primary" />,
      title: "Mix & Match",
      description:
        "Customize suggested outfits by swapping individual pieces to create your perfect look",
      delay: 0.3,
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Style Evolution",
      description:
        "The more you use it, the better it gets at understanding your personal style preferences",
      delay: 0.4,
    },
  ],
}: FeatureShowcaseProps) => {
  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Amazing Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our outfit matching app combines powerful technology with a seamless
            user experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingAnimationProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "white";
  text?: string;
  className?: string;
  variant?: "spinner" | "dots" | "pulse";
}

const LoadingAnimation = ({
  size = "md",
  color = "primary",
  text = "Loading...",
  className = "",
  variant = "spinner",
}: LoadingAnimationProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    primary: "text-primary border-primary",
    secondary: "text-gray-400 border-gray-400",
    white: "text-white border-white",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const renderSpinner = () => (
    <div className={cn("relative", sizeClasses[size])}>
      <div
        className={cn(
          "absolute inset-0 rounded-full border-2 border-t-transparent animate-spin",
          colorClasses[color].split(" ")[1],
        )}
      ></div>
    </div>
  );

  const renderDots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            "rounded-full",
            sizeClasses[size].split(" ")[0].replace("w-", "w-2 "),
            sizeClasses[size].split(" ")[1].replace("h-", "h-2 "),
            colorClasses[color].split(" ")[0],
          )}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.5,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <motion.div
      className={cn(
        "rounded-full",
        sizeClasses[size],
        colorClasses[color].split(" ")[0],
      )}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.8, 0.6],
      }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
      }}
    />
  );

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-3 bg-white p-4",
        className,
      )}
    >
      {variant === "spinner" && renderSpinner()}
      {variant === "dots" && renderDots()}
      {variant === "pulse" && renderPulse()}
      {text && (
        <p
          className={cn(
            textSizeClasses[size],
            colorClasses[color].split(" ")[0],
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingAnimation;

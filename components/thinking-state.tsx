"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Coffee } from "@/app/page";
import Image from "next/image";
import ShinyText from "./shiny-text";

interface ThinkingStateProps {
  coffee: Coffee;
  onComplete: () => void;
}

const thinkingSteps = [
  "Analyzing roast profile...",
  "Mapping flavor compounds...",
  "Checking pastry inventory...",
  "Calculating optimal pairing...",
];

export function ThinkingState({ coffee, onComplete }: ThinkingStateProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepDuration = 2400;
    const totalDuration = thinkingSteps.length * stepDuration + 400;

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < thinkingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stepDuration);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, totalDuration);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-8">
      {/* Pulsing Coffee Image */}
      <motion.div
        className="relative w-32 h-32 md:w-40 md:h-40 mb-10"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div
          className="absolute inset-0 rounded-full bg-primary/10 animate-ping"
          style={{ animationDuration: "2s" }}
        />
        <div className="absolute inset-2 rounded-full bg-primary/5" />
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/20">
          <Image
            src={coffee.image_placeholder || "/placeholder.svg"}
            alt={coffee.name}
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Coffee Name */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-2xl md:text-3xl text-foreground mb-2"
      >
        {coffee.name}
      </motion.p>

      {/* Thinking Steps */}
      <div className="h-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="text-sm md:text-base text-muted-foreground text-center"
          >
            <ShinyText
              text={thinkingSteps[currentStep]}
              disabled={false}
              speed={3}
              className="custom-class"
            />
            {/* {thinkingSteps[currentStep]} */}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="flex gap-2 mt-8">
        {thinkingSteps.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index <= currentStep ? "bg-primary" : "bg-muted"
            }`}
            animate={index === currentStep ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}

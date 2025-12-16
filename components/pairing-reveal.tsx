"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Coffee, Pairing } from "@/app/page";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { AlternativeCard } from "./alternative-card";
import { ArrowLeft, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PairingRevealProps {
  coffee: Coffee;
  pairing: Pairing;
  onReset: () => void;
}

export function PairingReveal({
  coffee,
  pairing,
  onReset,
}: PairingRevealProps) {
  const [mode, setMode] = useState<"believer" | "explorer">("believer");

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-5 py-4 border-b border-border/50"
      >
        <button
          onClick={onReset}
          className="cursor-pointer flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <ModeToggle mode={mode} onModeChange={setMode} />
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-10">
        {/* Pairing Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          {/* Images */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src={coffee.image_placeholder || "/placeholder.svg"}
                alt={coffee.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>

            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src={
                  pairing.believer_match.image_placeholder || "/placeholder.svg"
                }
                alt={pairing.believer_match.pastry_name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>

          {/* Pairing Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3">
              Perfect Pairing
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
              {coffee.name}
            </h2>
            <p className="text-muted-foreground text-lg mb-1">pairs with</p>
            <h3 className="font-serif text-2xl md:text-3xl text-secondary-foreground">
              {pairing.believer_match.pastry_name}
            </h3>
          </motion.div>

          {/* The Why */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-card border border-border/50 rounded-2xl p-5 md:p-6 mb-6"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">
              The Science
            </p>
            <p className="text-foreground leading-relaxed text-base md:text-lg">
              "{pairing.believer_match.reason}"
            </p>
          </motion.div>

          {/* Price & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-center justify-between bg-primary/5 rounded-2xl p-5"
          >
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Bundle Price
              </p>
              <p className="font-serif text-2xl text-foreground">
                {pairing.believer_match.price_bundle}
              </p>
            </div>
            <Button
              size="lg"
              className="gap-2 rounded-full px-6 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Order Pair
            </Button>
          </motion.div>
        </motion.div>

        {/* Explorer Alternatives */}
        <AnimatePresence>
          {mode === "explorer" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto mt-8 overflow-hidden"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">
                Explore Alternatives
              </p>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide">
                {pairing.explorer_alternatives.map((alt, index) => (
                  <AlternativeCard
                    key={alt.name}
                    alternative={alt}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

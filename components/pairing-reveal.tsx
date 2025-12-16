"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Coffee, Pairing } from "@/app/page";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { AlternativeCard } from "./alternative-card";
import { ArrowLeft, ShoppingBag, Sparkles, X } from "lucide-react";
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
          className="max-w-xl mx-auto"
        >
          {/* Images */}
          <div className="relative flex items-center justify-center mb-8 aspect-video rounded-2xl overflow-hidden">
            <motion.div
              initial={{
                // x: -40,
                opacity: 0,
              }}
              animate={{
                //  x: 0,

                opacity: 1,
              }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative w-full h-full  overflow-hidden shadow-xl"
            >
              <Image
                src={coffee.image_placeholder || "/placeholder.svg"}
                alt={coffee.name}
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{
                // x: 40,
                opacity: 0,
              }}
              animate={{
                // x: 0,
                opacity: 1,
              }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative w-full h-full overflow-hidden object-fill"
            >
              <Image
                src={
                  pairing.believer_match.image_placeholder || "/placeholder.svg"
                }
                alt={pairing.believer_match.pastry_name}
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 h-1/3 to-transparent" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
              className="absolute z-10 top-2 right-2 size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg"
            >
              <Sparkles className="size-4 animate-pulse" />
            </motion.div>
            {/* Bottom label overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
              <p className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium mb-1">
                Perfect Pairing
              </p>
              <p className="text-white font-serif text-xl md:text-3xl">
                {coffee.name} + {pairing.believer_match.pastry_name}
              </p>
            </div>
          </div>

          <div className="max-w-lg mx-auto">
            {/* Pairing Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                {coffee.name}
              </h2>
              <p className="text-muted-foreground text-lg mb-1">
                pairs beautifully with
              </p>
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
              className="flex flex-col gap-4 bg-primary/5 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
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
              </div>

              <div className="h-px w-full bg-border/50" />

              {/* Exit Strategy, If user just want to go with slection not paired one */}
              <Button
                variant="link"
                className="cursor-pointer mx-auto text-center"
                onClick={onReset}
              >
                No thanks, just the {coffee.name}
              </Button>
            </motion.div>
          </div>
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

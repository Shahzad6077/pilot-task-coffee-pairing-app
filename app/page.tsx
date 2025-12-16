"use client";

import { useState } from "react";
import { CoffeeSelection } from "@/components/coffee-selection";
import { ThinkingState } from "@/components/thinking-state";
import { PairingReveal } from "@/components/pairing-reveal";
import { AnimatePresence, motion } from "motion/react";

export type AppState = "selection" | "thinking" | "reveal";

export interface Coffee {
  id: string;
  name: string;
  roast: string;
  image_placeholder: string;
}

export interface PairingMatch {
  pastry_name: string;
  reason: string;
  price_bundle: string;
  image_placeholder: string;
}

export interface Alternative {
  name: string;
  tag: string;
  reason: string;
}

export interface Pairing {
  believer_match: PairingMatch;
  explorer_alternatives: Alternative[];
}

const coffees: Coffee[] = [
  {
    id: "c1",
    name: "Flat White",
    roast: "Sweet Standard",
    image_placeholder: "/flat-white-coffee-in-ceramic-cup-overhead-view.jpg",
  },
  {
    id: "c2",
    name: "Hand Filter",
    roast: "Ethiopia Honey",
    image_placeholder: "/pour-over-hand-filter-coffee-brewing.jpg",
  },
  {
    id: "c3",
    name: "Espresso",
    roast: "Dark Roast",
    image_placeholder: "/espresso-shot-in-white-cup-crema.jpg",
  },
];

const pairings: Record<string, Pairing> = {
  c1: {
    believer_match: {
      pastry_name: "Franzbrötchen",
      reason:
        "The caramelized cinnamon perfectly bridges the nutty sweetness of the espresso.",
      price_bundle: "8.50 €",
      image_placeholder: "/franzbr-tchen-german-cinnamon-pastry.jpg",
    },
    explorer_alternatives: [
      {
        name: "Lemon Tart",
        tag: "Contrast",
        reason: "Citrus acidity cuts through the milk foam.",
      },
      {
        name: "Banana Bread",
        tag: "Comfort",
        reason: "Warm texture matches the creamy mouthfeel.",
      },
    ],
  },
  c2: {
    believer_match: {
      pastry_name: "Almond Croissant",
      reason: "Floral honey notes harmonize with toasted almond butter.",
      price_bundle: "9.00 €",
      image_placeholder: "/almond-croissant-pastry-golden-flaky.jpg",
    },
    explorer_alternatives: [
      {
        name: "Berry Danish",
        tag: "Bright",
        reason: "Berry tartness complements the fruity coffee notes.",
      },
      {
        name: "Oat Cookie",
        tag: "Earthy",
        reason: "Wholesome oats echo the natural sweetness.",
      },
    ],
  },
  c3: {
    believer_match: {
      pastry_name: "Dark Chocolate Brownie",
      reason: "Intense cocoa amplifies the bold espresso character.",
      price_bundle: "7.50 €",
      image_placeholder: "/dark-chocolate-brownie-fudgy.jpg",
    },
    explorer_alternatives: [
      {
        name: "Pistachio Biscotti",
        tag: "Classic",
        reason: "Crunchy texture perfect for dipping.",
      },
      {
        name: "Hazelnut Praline",
        tag: "Indulgent",
        reason: "Nutty richness mirrors roasted coffee notes.",
      },
    ],
  },
};

export default function Home() {
  const [appState, setAppState] = useState<AppState>("selection");
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);

  const handleCoffeeSelect = (coffee: Coffee) => {
    setSelectedCoffee(coffee);
    setAppState("thinking");
  };

  const handleThinkingComplete = () => {
    setAppState("reveal");
  };

  const handleReset = () => {
    setAppState("selection");
    setSelectedCoffee(null);
  };

  const currentPairing = selectedCoffee ? pairings[selectedCoffee.id] : null;

  return (
    <main className="min-h-[100dvh] bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {appState === "selection" && (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <CoffeeSelection coffees={coffees} onSelect={handleCoffeeSelect} />
          </motion.div>
        )}

        {appState === "thinking" && selectedCoffee && (
          <motion.div
            key="thinking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <ThinkingState
              coffee={selectedCoffee}
              onComplete={handleThinkingComplete}
            />
          </motion.div>
        )}

        {appState === "reveal" && selectedCoffee && currentPairing && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <PairingReveal
              coffee={selectedCoffee}
              pairing={currentPairing}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

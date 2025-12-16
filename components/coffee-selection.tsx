"use client";

import { motion } from "motion/react";
import type { Coffee } from "@/app/page";
import Image from "next/image";
import { ChevronRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import BorderedLayout from "./bordered-layout";
import UnderlineToBackground from "./underline-to-background";

interface CoffeeSelectionProps {
  coffees: Coffee[];
  onSelect: (coffee: Coffee) => void;
}

export function CoffeeSelection({ coffees, onSelect }: CoffeeSelectionProps) {
  return (
    <div className="min-h-[100dvh]   px-6 py-8 md:px-12 md:py-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 md:mb-12"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center outline outline-primary/50 outline-offset-1 rounded-full">
              <div className="size-2 rounded-full bg-primary animate-pulse" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Sweetspot Coffee
            </span>
          </div>
          <UnderlineToBackground
            targetTextColor="#fff"
            className="cursor-pointer"
            as="div"
          >
            <a
              href="https://github.com/Shahzad6077/pilot-task-coffee-pairing-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center  gap-1.5 text-xs  transition-colors"
            >
              <span className="uppercase tracking-[0.1em]">GitHub</span>
              <Github className="w-3.5 h-3.5" />
            </a>
          </UnderlineToBackground>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground">
          PAIR'D
        </h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-md">
          Select your coffee and discover the perfect pastry pairing, curated by
          AI.
        </p>
      </motion.header>

      {/* Coffee List */}
      <BorderedLayout
        className="max-w-2xl !mx-auto bg-primary outline outline-primary/10 outline-offset-4"
        innerContainerClassName="bg-background"
        innerClassName="p-0 mx-auto"
        footer={
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="my-6 text-white text-center"
          >
            <p className="text-xs">Powered by AI PAIR'D Coffee Sommelier</p>
          </motion.footer>
        }
      >
        <div className="flex-1 flex flex-col justify-center max-w-2xl w-full mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-6"
          >
            Choose your coffee
          </motion.p>

          <div className="space-y-4">
            {coffees.map((coffee, index) => (
              <motion.button
                key={coffee.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                onClick={() => onSelect(coffee)}
                className="w-full group cursor-pointer"
              >
                <div
                  className={cn(
                    "flex items-center gap-5 p-4 md:p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
                    // "hover:shadow-lg hover:shadow-primary/5"
                  )}
                >
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={coffee.image_placeholder || "/placeholder.svg"}
                      alt={coffee.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 text-left">
                    <h2 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {coffee.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {coffee.roast}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </BorderedLayout>
    </div>
  );
}

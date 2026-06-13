"use client";

import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [is_visible, set_is_visible] = useState(false);

  useEffect(() => {
    const hero_height = window.innerHeight * 0.5;

    const toggle_visibility = () => {
      set_is_visible(window.scrollY > hero_height);
    };

    toggle_visibility();
    window.addEventListener("scroll", toggle_visibility, { passive: true });
    return () => window.removeEventListener("scroll", toggle_visibility);
  }, []);

  const scroll_to_top = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {is_visible && (
        <motion.button
          animate={{ opacity: 1, scale: 1, y: 0 }}
          aria-label="Scroll to top"
          className="fixed right-6 bottom-6 z-50 rounded-full border border-border bg-card/80 p-3 shadow-lg backdrop-blur transition-all hover:border-brand-accent/50 hover:bg-card active:scale-95"
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scroll_to_top}
          transition={{ duration: 0.2 }}
        >
          <ArrowUpIcon className="h-5 w-5 text-foreground" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

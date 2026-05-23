"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

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
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scroll_to_top}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card/80 backdrop-blur border border-border shadow-lg hover:bg-card hover:border-brand-accent/50 transition-all active:scale-95"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="w-5 h-5 text-foreground" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

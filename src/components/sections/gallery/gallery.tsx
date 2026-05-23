"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { IconX, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const galleryImages = [
  { id: 1, title: "Vesper Dashboard", category: "Interface", src: "/gallery/og-image.png", description: "Main dashboard view showcasing the clean interface" },
];

function GalleryCard({ image, index, onClick }: { image: typeof galleryImages[0]; index: number; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="group relative aspect-video rounded-xl overflow-hidden border border-border bg-card/50 cursor-pointer"
    >
      <Image
        src={image.src}
        alt={image.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-xs font-medium text-white/60 uppercase tracking-wider">{image.category}</span>
        <h3 className="text-sm font-semibold text-white mt-1">{image.title}</h3>
      </div>
    </motion.button>
  );
}

function Lightbox({ image, onClose, onPrev, onNext }: { image: typeof galleryImages[0]; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <IconX className="size-6 text-white" />
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 p-3 rounded-full hover:bg-white/10 transition-colors"
      >
        <IconChevronLeft className="size-6 text-white" />
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 p-3 rounded-full hover:bg-white/10 transition-colors"
      >
        <IconChevronRight className="size-6 text-white" />
      </button>

      <motion.div
        key={image.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden bg-black"
      >
        <Image
          src={image.src}
          alt={image.title}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-contain"
        />
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{image.category}</span>
        <h2 className="text-lg font-semibold text-white mt-1">{image.title}</h2>
        <p className="text-sm text-white/60 mt-1">{image.description}</p>
      </div>
    </motion.div>
  );
}

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const goPrev = () => setSelectedImage((prev) => (prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length));
  const goNext = () => setSelectedImage((prev) => (prev === null ? null : (prev + 1) % galleryImages.length));

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-64 bg-brand-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-brand-accent/10 border border-brand-accent/20"
          >
            <SparklesIcon className="w-4 h-4 text-brand-accent" />
            <span className="text-sm font-medium text-brand-accent">Sneak Peek</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
            Gall<span className="text-brand-accent italic">ery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A visual journey through Vesper&apos;s design system and interfaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {galleryImages.map((image, index) => (
            <GalleryCard key={image.id} image={image} index={index} onClick={() => openLightbox(index)} />
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-center text-sm text-muted-foreground mt-12">
          More screenshots coming soon.
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {selectedImage !== null && (
          <Lightbox
            image={galleryImages[selectedImage]}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

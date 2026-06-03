"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/lib/hooks";
import { motionTokens } from "@/lib/motion";

const IMAGES = [
  "/IMG_8470.jpg",
  "/IMG_8474.jpg",
  "/IMG_8472.jpg",
  "/IMG_8475.jpg",
] as const;

// Specific rotations for each image in sequence
const ROTATIONS = [10, 5, -3, 1] as const;

const MAX_VISIBLE = 7;
const INTERVAL_MIN = 1000;
const INTERVAL_MAX = 1000;

interface Photo {
  id: number;
  src: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
}

export function ImageDropStack() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // Show static stack with latest photo
      const initialPhoto: Photo = {
        id: 0,
        src: IMAGES[0],
        rotation: ROTATIONS[0],
        offsetX: 0,
        offsetY: 0,
      };
      setPhotos([initialPhoto]);
      return;
    }

    const addPhoto = () => {
      const src = IMAGES[indexRef.current];
      const rotation = ROTATIONS[indexRef.current]; // Specific rotation per image
      const offsetX = (Math.random() - 0.5) * 12; // ±6px for more spread
      const offsetY = (Math.random() - 0.5) * 12; // ±6px for more spread

      const newPhoto: Photo = {
        id: Date.now(),
        src,
        rotation,
        offsetX,
        offsetY,
      };

      setPhotos((prev) => {
        const updated = [newPhoto, ...prev];
        return updated.slice(0, MAX_VISIBLE);
      });

      indexRef.current = (indexRef.current + 1) % IMAGES.length;
    };

    // Add first photo immediately
    addPhoto();

    // Then add subsequent photos at random intervals
    const scheduleNext = () => {
      const delay = INTERVAL_MIN + Math.random() * (INTERVAL_MAX - INTERVAL_MIN);
      timeoutRef.current = setTimeout(() => {
        addPhoto();
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative w-full h-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="absolute top-0 right-0"
            style={{
              zIndex: photos.length - index,
            }}
            initial={
              prefersReducedMotion
                ? { opacity: 1, x: photo.offsetX, y: photo.offsetY, rotate: photo.rotation }
                : { opacity: 1, scale: 0.96, x: photo.offsetX, y: photo.offsetY, rotate: photo.rotation }
            }
            animate={{ opacity: 1, scale: 1, x: photo.offsetX, y: photo.offsetY, rotate: photo.rotation }}
            exit={{ opacity: 1, scale: 0.94 }}
            transition={{
              duration: 0.8,
              ease: motionTokens.easing.out,
            }}
          >
            <div
              className="bg-white"
              style={{
                paddingTop: "clamp(0.5rem, 1vw, 1rem)",
                paddingLeft: "clamp(0.5rem, 1vw, 1rem)",
                paddingRight: "clamp(0.5rem, 1vw, 1rem)",
                paddingBottom: "clamp(0.75rem, 1.5vw, 1.5rem)",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div
                className="relative"
                style={{
                  width: "clamp(80px, 16vw, 320px)",
                  height: "clamp(80px, 16vw, 320px)",
                }}
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 200px, 400px"
                  priority={index === 0}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

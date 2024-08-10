// src/components/ui/AboutUs.tsx
"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutUs: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={cardRef}
        className="bg-white p-6 rounded-lg shadow-lg card-fade-in max-w-md card-content"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p>
          ‘Aquaregia’ just like its chemical namesake has brought together <span className="underline-animation">Shivi</span>, the singer/composer and <span className="underline-animation">Gunjan</span>, the songwriter to manifest the beauty of the universe in the form of music and poetry, which otherwise might have been a long shot for both on their own.
        </p>
        <p className="mt-2">
          Hoping to touch as many lives as possible... and maybe a few hearts too.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;

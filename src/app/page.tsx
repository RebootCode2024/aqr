"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './globals.css';
import Navbar from '../components/ui/Navbar';
import Track from '../components/ui/Track';

interface SongData {
  _id: { $oid: string };
  title: string;
  description: string;
  posterUrl: string;
  carouselDescription: string;
  firstVideoDescription: string;
  secondVideoDescription: string;
  lastVideoDescription: string;
  images: string[];
  firstVideoUrl: string;
  secondVideoUrl: string;
  lastVideoUrl: string;
}

const MyApp: React.FC = () => {
  const [songs, setSongs] = useState<SongData[]>([]);
  const [showAboutUs, setShowAboutUs] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('/api/songs');
        const data = await response.json();
        setSongs(data); // Songs are already sorted in descending order by _id
      } catch (error) {
        console.error('Error fetching songs data:', error);
      }
    };

    fetchSongs();

    const incrementVisitorCount = async () => {
      try {
        await fetch('/api/visitors', {
          method: 'POST',
        });
      } catch (error) {
        console.error('Error incrementing visitor count:', error);
      }
    };

    incrementVisitorCount();
  }, []);

  const handleAboutUsClick = () => {
    setShowAboutUs(true);
  };

  const handleCloseAboutUs = () => {
    setShowAboutUs(false);
  };

  if (songs.length === 0) return <div>Loading...</div>;

  return (
    <>
      <Navbar onAboutUsClick={handleAboutUsClick} />
      {showAboutUs && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20" onClick={handleCloseAboutUs}>
          <motion.div
            className="bg-white p-8 rounded shadow-md max-w-md text-center card-fade-in"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="mb-4 card-content">
              ‘Aquaregia’ just like its chemical namesake has brought together <span className="underline-animation">Shivi</span>, the singer/composer and <span className="underline-animation">Gunjan</span>, the songwriter to manifest the beauty of the universe in the form of music and poetry, which otherwise might have been a long shot for both on their own.
            </p>
            <p>Hoping to touch as many lives as possible... and maybe a few hearts too.</p>
          </motion.div>
        </div>
      )}
      <main className="mt-24 flex flex-col items-center px-4 md:px-8">
        <motion.h1
          className="text-3xl font-bold text-black dark:text-white mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Work
        </motion.h1>
        <div className="flex flex-col items-center mt-10 space-y-4 w-full max-w-4xl">
          {songs.map(song => (
            <Track key={song._id.$oid} {...song} />
          ))}
        </div>
      </main>
    </>
  );
};

export default MyApp;

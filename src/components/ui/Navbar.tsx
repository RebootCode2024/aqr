// src/components/ui/Navbar.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC<{ onAboutUsClick: () => void }> = ({ onAboutUsClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent py-4 absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo-tpt.png"
            alt="Logo"
            width={50}
            height={50}
            className="w-auto h-10 md:h-12 lg:h-14"
          />
        </Link>
        <div className="flex-grow flex justify-center mx-4 md:mx-8">
          <Image
            src="/assets/0.png" // Replace with the path to your image
            alt="Middle Image"
            width={500} // Adjust width as needed
            height={50} // Adjust height as needed
            objectFit="contain"
            className="w-full max-w-xs md:max-w-lg lg:max-w-xl"
          />
        </div>
        <div className="hidden md:flex space-x-6 ml-4">
          <button onClick={onAboutUsClick} className="text-black hover:text-red">
            About Us
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black hover:text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black text-white fixed inset-0 z-20">
          <div className="flex flex-col space-y-4 p-8">
            <button onClick={onAboutUsClick} className="text-white text-xl">
              About Us
            </button>
            <button onClick={() => setIsOpen(false)} className="text-white text-xl self-end">
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

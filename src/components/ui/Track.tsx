"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from './carousel'; // Adjust the import path as needed

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

const Track: React.FC<SongData> = ({
  title,
  description,
  posterUrl,
  carouselDescription,
  firstVideoDescription,
  secondVideoDescription,
  lastVideoDescription,
  images,
  firstVideoUrl,
  secondVideoUrl,
  lastVideoUrl,
}) => {
  const embedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : '';
  };

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag?.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    return () => {
      delete (window as any).onYouTubeIframeAPIReady;
    };
  }, []);

  return (
    <div className="border border-black rounded-lg p-4 bg-white shadow-lg m-4 text-center flex flex-col items-center w-full">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <h3 className="mb-4 text-center">{description}</h3>
      <div className="flex justify-center w-full max-w-2xl">
        <Image
          src={posterUrl}
          alt={`${title} poster`}
          width={1000}
          height={300}
          className="rounded-lg w-full h-auto"
        />
      </div>
      <h2 className="mt-4 mb-2 text-center">{carouselDescription}</h2>
      <div className="w-full mt-4 flex justify-center">
        <Carousel className="relative w-full max-w-2xl">
          <CarouselContent className="flex w-full">
            {images.map((img, index) => (
              <CarouselItem key={index} className="w-full">
                <Image
                  src={img}
                  alt={`Carousel image ${index + 1}`}
                  width={1000}
                  height={300}
                  className="rounded-lg w-full h-auto"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-black" />
          <CarouselNext className="text-black" />
        </Carousel>
      </div>
      <div className="w-full mt-4 flex flex-col items-center space-y-4">
        {firstVideoUrl && (
          <>
            <p className="text-center text-lg mb-2">{firstVideoDescription}</p>
            <div className="video-container">
              <iframe
                src={embedUrl(firstVideoUrl)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </>
        )}
        {secondVideoUrl && (
          <>
            <p className="text-center text-lg mb-2">{secondVideoDescription}</p>
            <div className="video-container">
              <iframe
                src={embedUrl(secondVideoUrl)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </>
        )}
        {lastVideoUrl && (
          <>
            <p className="text-center text-lg mb-2">{lastVideoDescription}</p>
            <div className="video-container">
              <iframe
                src={embedUrl(lastVideoUrl)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Track;

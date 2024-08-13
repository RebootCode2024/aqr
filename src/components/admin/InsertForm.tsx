"use client";

import React, { useState } from 'react';
import axios from 'axios';

interface InsertFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const InsertForm: React.FC<InsertFormProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [posterDescription, setPosterDescription] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [carouselDescription, setCarouselDescription] = useState('');
  const [images, setImages] = useState<string[]>(['']);
  const [firstVideoDescription, setFirstVideoDescription] = useState('');
  const [secondVideoDescription, setSecondVideoDescription] = useState('');
  const [lastVideoDescription, setLastVideoDescription] = useState('');
  const [firstVideoUrl, setFirstVideoUrl] = useState('');
  const [secondVideoUrl, setSecondVideoUrl] = useState('');
  const [lastVideoUrl, setLastVideoUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    try {
      await axios.post('/api/songs/add', {
        title,
        posterDescription,
        posterUrl,
        carouselDescription,
        images: images.filter(url => url.trim() !== ''), // Filter out empty strings
        firstVideoDescription,
        secondVideoDescription,
        lastVideoDescription,
        firstVideoUrl,
        secondVideoUrl,
        lastVideoUrl,
      });
      onSave();
    } catch (error) {
      console.error("Error saving song:", error);
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, '']);
  };

  const removeImageField = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow-md transition-all duration-500 ease-in-out transform scale-100">
      <h2 className="text-2xl font-bold mb-4">Insert New Song</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          placeholder="Poster Description"
          value={posterDescription}
          onChange={(e) => setPosterDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Poster URL"
          value={posterUrl}
          onChange={(e) => setPosterUrl(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Carousel Description"
          value={carouselDescription}
          onChange={(e) => setCarouselDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Dynamic Image Links */}
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Carousel Images</h2>
          {images.map((image, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={`Image ${index + 1} URL`}
                className="w-full p-2 rounded dark:bg-gray-700 dark:text-white"
              />
              {images.length > 1 && (
                <button
                  onClick={() => removeImageField(index)}
                  className="ml-2 bg-red-500 text-white p-2 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addImageField}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700"
          >
            Add Image Link
          </button>
        </div>

        {/* Video Descriptions and URLs */}
        <input
          type="text"
          placeholder="Trailer Description"
          value={firstVideoDescription}
          onChange={(e) => setFirstVideoDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="BTS Video Description"
          value={secondVideoDescription}
          onChange={(e) => setSecondVideoDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Official Video Description"
          value={lastVideoDescription}
          onChange={(e) => setLastVideoDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Trailer Video URL"
          value={firstVideoUrl}
          onChange={(e) => setFirstVideoUrl(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="BTS Video URL"
          value={secondVideoUrl}
          onChange={(e) => setSecondVideoUrl(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Official Video URL"
          value={lastVideoUrl}
          onChange={(e) => setLastVideoUrl(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex space-x-4">
          <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">Save</button>
          <button type="button" onClick={onCancel} className="p-2 bg-gray-500 text-white rounded w-full">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default InsertForm;

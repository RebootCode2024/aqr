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
  const [images, setImages] = useState('');
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
        images: images.split(','),
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
        <input
          type="text"
          placeholder="Images (comma separated URLs)"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="First Video Description"
          value={firstVideoDescription}
          onChange={(e) => setFirstVideoDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Second Video Description"
          value={secondVideoDescription}
          onChange={(e) => setSecondVideoDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Last Video Description"
          value={lastVideoDescription}
          onChange={(e) => setLastVideoDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="First Video URL"
          value={firstVideoUrl}
          onChange={(e) => setFirstVideoUrl(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Second Video URL"
          value={secondVideoUrl}
          onChange={(e) => setSecondVideoUrl(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Last Video URL"
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

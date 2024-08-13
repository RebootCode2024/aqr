"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UpdateFormProps {
  title: string;
  onUpdate: () => void;
  onCancel: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ title, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState<any>({});
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const { data } = await axios.get(`/api/songs?title=${encodeURIComponent(title)}`);
        setFormData(data[0]); // Assuming only one song will be found
      } catch (error) {
        console.error('Error fetching song data:', error);
      }
    };
    fetchSong();
  }, [title]);

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/songs?title=${encodeURIComponent(formData.title || '')}`, formData);
      setMessage('Song updated successfully');
      onUpdate();
    } catch (error) {
      console.error('Error updating song:', error);
      setMessage('An error occurred while updating the song');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value || '' });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-900 dark:text-white">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Update Song</h1>
        <input
          type="text"
          value={formData.title || ''}
          placeholder="Title"
          onChange={handleChange}
          name="title"
          className="w-full p-2 mb-4 rounded dark:bg-gray-700 dark:text-white"
          disabled
        />
        {Object.keys(formData).map((key) => (
          key !== 'title' && key !== '_id' && key !== 'images' && (
            <input
              key={key}
              type="text"
              name={key}
              value={formData[key] || ''}
              placeholder={
                key === 'firstVideoUrl' ? 'Trailer Video URL' :
                key === 'secondVideoUrl' ? 'BTS Video URL' :
                key === 'lastVideoUrl' ? 'Track Video URL' :
                key === 'firstVideoDescription' ? 'Trailer Description' :
                key === 'secondVideoDescription' ? 'BTS Description' :
                key === 'lastVideoDescription' ? 'Track Video Description' :
                key.replace(/([A-Z])/g, ' $1').trim()
              }
              onChange={handleChange}
              className="w-full p-2 mb-4 rounded dark:bg-gray-700 dark:text-white"
            />
          )
        ))}
        
        {/* Image Links */}
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Carousel Images</h2>
          {formData.images && formData.images.map((image: string, index: number) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={`Image ${index + 1} URL`}
                className="w-full p-2 rounded dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() => removeImageField(index)}
                className="ml-2 bg-red-500 text-white p-2 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addImageField}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700"
          >
            Add Image Link
          </button>
        </div>
        
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mb-4"
        >
          Save
        </button>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <button
          onClick={onCancel}
          className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateForm;

"use client";

import React, { useState } from 'react';
import axios from 'axios';

interface DeleteFormProps {
  onBack: () => void;
  onDeleted: () => void;
}

const DeleteForm: React.FC<DeleteFormProps> = ({ onBack, onDeleted }) => {
  const [title, setTitle] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`/api/songs?title=${encodeURIComponent(title)}`);
      setResults(data);
      setMessage(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setMessage('Song not found in the database');
        setResults([]);
      } else {
        setMessage('An error occurred while searching for the song');
      }
    }
  };

  const handleDelete = async () => {
    if (selectedSong) {
      try {
        await axios.delete(`/api/songs?title=${encodeURIComponent(selectedSong)}`);
        setMessage('Song deleted successfully');
        setResults(results.filter(song => song.title !== selectedSong));
        setShowConfirmation(false);
        onDeleted();
      } catch (error) {
        setMessage('An error occurred while deleting the song');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-900 dark:text-white">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Delete Song</h1>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full p-2 mb-4 rounded dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mb-4"
        >
          Search
        </button>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        {results.length > 0 && (
          <>
            <ul className="mb-4">
              {results.map((song) => (
                <li key={song._id} className="mb-2">
                  <label>
                    <input
                      type="radio"
                      value={song.title}
                      checked={selectedSong === song.title}
                      onChange={(e) => setSelectedSong(e.target.value)}
                    />
                    {song.title}
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowConfirmation(true)}
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-700 mb-4"
            >
              Delete
            </button>
            <button
              onClick={onBack}
              className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            {showConfirmation && (
              <div className="mt-4">
                <p className="text-center mb-4">Are you sure you want to delete the selected song?</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <button
        onClick={onBack}
        className="mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default DeleteForm;

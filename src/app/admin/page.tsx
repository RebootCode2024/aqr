"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from '../../components/admin/Login';
import Dashboard from '../../components/admin/Dashboard';
import InsertForm from '../../components/admin/InsertForm';
import DeleteForm from '../../components/admin/DeleteForm';
import UpdateForm from '../../components/admin/UpdateForm';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [titleToUpdate, setTitleToUpdate] = useState<string | null>(null);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleAction = (action: string) => {
    setCurrentAction(action);
    setTitleToUpdate(null);
    setSearchResults([]);
  };

  const handleUpdateSearch = async () => {
    try {
      const { data } = await axios.get(`/api/songs?title=${encodeURIComponent(searchTitle)}`);
      if (data.length > 0) {
        setSearchResults(data);
      } else {
        alert('Title not found in the database');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching for song:', error);
    }
  };

  const renderForm = () => {
    switch (currentAction) {
      case 'insert':
        return <InsertForm onSave={() => setCurrentAction(null)} onCancel={() => setCurrentAction(null)} />;
      case 'delete':
        return <DeleteForm onBack={() => setCurrentAction(null)} onDeleted={() => setCurrentAction(null)} />;
      case 'update':
        return titleToUpdate ? (
          <UpdateForm title={titleToUpdate} onUpdate={() => setCurrentAction(null)} onCancel={() => setCurrentAction(null)} />
        ) : (
          <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-900 dark:text-white">
            <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
              <h1 className="text-2xl font-bold mb-4">Update Song</h1>
              <input
                type="text"
                placeholder="Enter title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="w-full p-2 mb-4 rounded dark:bg-gray-700 dark:text-white"
                onKeyDown={(e) => e.key === 'Enter' && handleUpdateSearch()}
              />
              <button
                onClick={handleUpdateSearch}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mb-4"
              >
                Search
              </button>
              {searchResults.length > 0 && (
                <div className="bg-gray-700 p-4 rounded shadow-md w-full max-w-md mt-4">
                  {searchResults.map((song) => (
                    <div key={song._id} className="mb-2">
                      <label>
                        <input
                          type="radio"
                          value={song.title}
                          checked={titleToUpdate === song.title}
                          onChange={(e) => setTitleToUpdate(e.target.value)}
                        />
                        {song.title}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setCurrentAction(null)}
              className="mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
            >
              Back to Dashboard
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      {isAuthenticated ? (
        currentAction ? (
          <div className="flex flex-col items-center justify-center h-screen">
            {renderForm()}
          </div>
        ) : (
          <Dashboard onAction={handleAction} />
        )
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default AdminPage;

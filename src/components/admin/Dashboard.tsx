"use client";

import React from 'react';

interface DashboardProps {
  onAction: (action: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => onAction('insert')}
          className="p-4 bg-green-500 text-white rounded dark:bg-green-700 w-32 text-center"
        >
          Insert New
        </button>
        <button
          onClick={() => onAction('update')}
          className="p-4 bg-yellow-500 text-white rounded dark:bg-yellow-700 w-32 text-center"
        >
          Update
        </button>
        <button
          onClick={() => onAction('delete')}
          className="p-4 bg-red-500 text-white rounded dark:bg-red-700 w-32 text-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

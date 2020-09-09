import React from 'react';

export const PhotoDetailsPlaceholder = () => {
  return (
    <div className="w-full mx-auto mt-4 sm:max-w-7xl">
      <div className="px-2 sm:px-6">
        <div className="w-64 h-6 max-w-md bg-gray-200 sm:w-full"></div>
        <div className="flex justify-between mt-4">
          <div className="w-12 h-8 bg-gray-100"></div>
          <div className="w-32 h-8 bg-gray-100"></div>
        </div>
        <div className="w-full h-64 mt-4 bg-purple-100"></div>
      </div>
    </div>
  );
};

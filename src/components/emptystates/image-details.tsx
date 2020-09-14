import React from 'react';

export const PhotoDetailsPlaceholder = () => {
  return (
    <div className="w-full mx-auto mt-6 sm:max-w-7xl">
      <div className="px-2 sm:px-6">
        <div className="w-64 h-6 max-w-md bg-gray-200 sm:mx-auto sm:w-full"></div>
        <div className="h-6 max-w-4xl mt-4 bg-gray-200 w-11/2 sm:mx-auto sm:w-full"></div>
        <div className="w-full h-64 max-w-4xl mx-auto mt-8 bg-red-100" style={{ minHeight: 480 }}></div>
        <div className="flex flex-wrap items-center justify-between w-full max-w-4xl mx-auto mt-6">
          <div>
            <p className="w-4 h-4 mx-auto text-sm font-extrabold text-center bg-blue-300"></p>
            <p className="w-10 h-2 mx-auto mt-2 text-xs font-medium text-center bg-gray-300"></p>
          </div>
          <div>
            <p className="w-4 h-4 mx-auto text-sm font-extrabold text-center bg-pink-300"></p>
            <p className="w-10 h-2 mx-auto mt-2 text-xs font-medium text-center bg-gray-300"></p>
          </div>
          <div>
            <p className="w-4 h-4 mx-auto text-sm font-extrabold text-center bg-purple-300"></p>
            <p className="w-10 h-2 mx-auto mt-2 text-xs font-medium text-center bg-gray-300"></p>
          </div>
          <div className="flex items-center">
            <div className="w-32 h-8 bg-green-200 rounded"></div>
            <div className="w-20 h-8 ml-4 bg-indigo-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import Link from 'next/link';

export const MainHeader = () => {
  return (
    <header className="p-4 h-22 sm:h-40 sm:items-center sm:flex bg-gradient-to-r from-green-600 to-grape sm:px-6 lg:px-16">
      <div className="max-w-7xl">
        <Link href="/">
          <a className="flex">
            <svg
              className="text-green-400 w-14 h-14 sm:w-20 sm:h-20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h1 className="ml-1 text-xl font-semibold text-gray-50 font-display sm:text-4xl sm:leading-10">
              Infinite Gallery
              <span className="block text-green-300">using unsplash image API</span>
            </h1>
          </a>
        </Link>
      </div>
    </header>
  );
};

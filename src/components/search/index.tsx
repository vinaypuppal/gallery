import React, { useEffect, useRef } from 'react';
import tinykeys from 'tinykeys';

export const SearchInput = () => {
  const searchInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    let unsubscribe = tinykeys(window, {
      '/': (event) => {
        event.preventDefault();
        searchInputRef.current.focus();
      },
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <form className="sticky top-0 z-50 px-4 bg-white shadow sm:px-6 lg:px-16">
      <div className="flex mx-auto max-w-7xl">
        <label htmlFor="search-input" className="flex items-center flex-none pr-3">
          <span className="sr-only">Search photos</span>
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-gray-400 transition-colors duration-150 group-focus-within:text-gray-500">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </label>
        <input
          ref={searchInputRef}
          type="search"
          name="search"
          id="search-input"
          placeholder={`Search photos (Press "/" to focus)`}
          className="flex-auto py-6 text-base leading-6 text-gray-500 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400"
        />
      </div>
    </form>
  );
};

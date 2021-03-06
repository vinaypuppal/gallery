import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const BackHomeHeader = () => {
  const { query } = useRouter();
  const searchKeyword = query.search;
  const href = searchKeyword ? { pathname: '/', query: { search: searchKeyword } } : '/';
  return (
    <header className="border-b border-gray-100 border-solid">
      <Link href={href}>
        <a className="flex items-center w-full px-2 py-2 mx-auto text-sm text-gray-600 max-w-7xl">
          <span className="mr-1">
            <svg
              className="w-4 h-4 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </span>
          Back Home
        </a>
      </Link>
    </header>
  );
};

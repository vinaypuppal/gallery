import React, { useEffect, useRef } from 'react';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import { useRouter } from 'next/router';
import tinykeys from 'tinykeys';
import useSWR from 'swr';

import { unsplashAutoComplete } from '../../services/unsplash';
import { AutoCompleteResult } from '../../services/unsplash/types';

export const SearchInput = () => {
  const searchInputRef = useRef<HTMLInputElement>();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState(() => router.query.search || null);
  const { data: suggestions, isValidating } = useSWR<AutoCompleteResult>(() => [searchTerm], unsplashAutoComplete);

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

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

  useEffect(() => {
    const search = router.query.search;
    if (search && searchTerm === null) {
      setSearchTerm(search);
    }
  }, [router.query.search, searchTerm]);

  return (
    <form
      className="sticky top-0 z-50 px-4 bg-white shadow sm:px-6 lg:px-16"
      autoComplete="off"
      style={{ backdropFilter: 'blur(10px)', background: 'hsla(0,0%,100%,0.8)' }}>
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
        <Combobox
          className="w-full"
          onSelect={(value) =>
            router.replace(`/?search=${encodeURIComponent(value)}`, undefined, {
              shallow: true,
            })
          }>
          <ComboboxInput
            ref={searchInputRef}
            type="search"
            name="search"
            id="search-input"
            selectOnClick
            // @ts-ignore
            value={searchTerm}
            onChange={handleSearchTermChange}
            autoComplete="off"
            placeholder={`Search photos (Press "/" to focus)`}
            className="flex-auto w-full py-6 text-base leading-6 text-gray-500 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400"
          />
          {suggestions && suggestions.fuzzy.length !== 0 && (
            <ComboboxPopover className="shadow-popup">
              <ComboboxList persistSelection>
                {suggestions.fuzzy.map((suggestion) => (
                  <ComboboxOption key={suggestion.query} value={suggestion.query} />
                ))}
              </ComboboxList>
            </ComboboxPopover>
          )}
        </Combobox>
      </div>
    </form>
  );
};

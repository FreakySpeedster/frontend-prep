import {useState, useEffect} from 'react';

/**
 * Custom hook to debounce an input value.
 * 
 * @param {string} inputValue - The value to debounce (usually from an input).
 * @param {number} wait - The delay in milliseconds.
 * @returns {string} - The debounced value after the delay.
 */

const useDebounce = (inputValue, wait) => {
    const [debouncedValue, setDebouncedValue] = useState('');
    useEffect(() => {
        // Set up a timer to update the debounced value after the delay
        let timer = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, wait);

        // Cleanup function: clears the timer if inputValue or wait changes before timeout
        return () => clearTimeout(timer);
    }, [inputValue, wait]); // Re-run effect when either inputValue or wait changes
    return debouncedValue;
}

export default useDebounce;


/**
 * 📌 Usage Example:
 * 
 * import React, { useState, useEffect } from 'react';
 * import useDebounce from './useDebounce';
 * 
 * const SearchComponent = () => {
 *     const [searchInput, setSearchInput] = useState('');
 * 
 *     // Use debounce to delay API call until 500ms after typing stops
 *     const debouncedSearchTerm = useDebounce(searchInput, 500);
 * 
 *     useEffect(() => {
 *         if (debouncedSearchTerm) {
 *             // Trigger API or search logic here
 *             console.log('Searching for:', debouncedSearchTerm);
 *         }
 *     }, [debouncedSearchTerm]);
 * 
 *     return (
 *         <input
 *             type="text"
 *             placeholder="Search..."
 *             value={searchInput}
 *             onChange={(e) => setSearchInput(e.target.value)}
 *         />
 *     );
 * };
 */
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="flex items-center bg-secondary rounded-full p-2 w-full max-w-md">
      <FaSearch className="text-green-700 mx-2" />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent rounded-full w-full flex-grow outline-none border-none focus:outline-none focus:border-none text-green-700"
      />
    </div>
  );
};

export default SearchBar;

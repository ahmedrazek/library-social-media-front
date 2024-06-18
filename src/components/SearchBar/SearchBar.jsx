
import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ setSearchResults, searchResults }) => {
  const [input, setInput] = useState('');
  const [searchType, setSearchType] = useState('users');
  const navigate = useNavigate();

  const fetchData = (value) => {
    const endpoint =
      searchType === 'users'
        ? 'http://localhost:9000/users'
        : 'http://localhost:9000/books';

    axios
      .get(endpoint, {
        params: { query: value } // Sending query parameter to the server
      })
      .then((res) => {
        const items = res.data.Data || res.data.data; // Assuming data structure
        
        if (Array.isArray(items)) {
          const filteredData = items.map(item => ({
            id: item._id, // Assuming _id is the unique identifier for both users and books
            name: searchType === 'users' ? item.name : item.title,
            type: searchType === 'users' ? 'user' : 'book'
          }));
          setSearchResults(filteredData);
        } else {
          console.error('Unexpected data format:', res.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleItemClick = (item) => {
    if (item.type === 'user') {
      navigate(`/user/profile/${item.id}`); 
      setSearchResults([])
    } else if (item.type === 'book') {
      navigate(`/user/details/${item.id}`); 
      setSearchResults([])
    } else {
      navigate('/noresult'); 
    }
  };

  return (
    <div className='search-bar-container flex flex-col min-w-[200px] px-10 items-center justify-center'>
      <div className='flex flex-row mb-2  gap-4'>
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className='bg-secondary text-green-700 border-none rounded-sm h-[2.5rem] px-2'
        >
          <option value='users'>Users</option>
          <option value='books'>Books</option>
        </select>
        <div className='input-wrapper bg-secondary  rounded-sm h-[2.5rem] px-6 text-center my-auto flex items-center'>
          <FaSearch id='search-icon' />
          <input
            type='text'
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            placeholder='Search'
            className='bg-transparent w-full h-full text-[1.25rem] border-none focus:outline-none focus:border-none text-green-700'
          />
        </div>
      </div>
      
      <div className='results-list absolute w-full bg-secondary flex flex-col shadow-sm rounded-sm top-24 cursor-pointer max-h-64 overflow-y-scroll z-50'>
        {Array.isArray(searchResults) && searchResults.map((result, id) => (
          <div key={id} className="p-2 border-b border-gray-300 hover:bg-white" onClick={() => handleItemClick(result)}>
            {result.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;


/* eslint-disable react/prop-types */

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const SearchResultsList = ({ searchResults }) => {
//   const navigate = useNavigate();

//   const handleClick = (item) => {
//     if (item.type === 'user') {
//       navigate(`/user/profile/${item.id}`);

//     } else if (item.type === 'book') {
//       navigate(`/user/details/${item.id}`);
//     }
//   };

//   if (searchResults.length === 0) {
//     return null;
//   }

//   return (
//     <div className='results-list absolute w-full bg-secondary flex flex-col shadow-sm rounded-sm top-24 cursor-pointer max-h-64 overflow-y-scroll z-50'>
//       {searchResults.map((result, id) => (
//         <div key={id} className="p-2 border-b border-gray-300 hover:bg-white" onClick={() => handleClick(result)}>
//           {result.name ? result.name : result.title}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SearchResultsList;



import { useNavigate } from 'react-router-dom';
const SearchResultsList = ({ searchResults, setSearchResults }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.type === "user") {
      navigate(`/user/profile/${item.id}`);
    } else if (item.type === "book") {
      navigate(`/user/details/${item.id}`);
    }

    setSearchResults([]);
  };

  if (searchResults && searchResults.length === 0) {
    return null;
  }

  return (
    <div className='results-list absolute w-full bg-secondary flex flex-col shadow-sm rounded-sm top-24 cursor-pointer max-h-64 overflow-y-scroll z-50'>
      {searchResults && searchResults.map((result, id) => (
        <div key={id} className="p-2 border-b border-gray-300 hover:bg-white" onClick={() => handleClick(result)}>
          {result.name ? result.name : result.title}
        </div>
      ))}
    </div>
  );
};

export default SearchResultsList;

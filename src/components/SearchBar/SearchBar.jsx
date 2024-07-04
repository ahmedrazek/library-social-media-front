



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaSearch, FaUserCircle } from 'react-icons/fa'; // Import the user icon
// import { useNavigate } from 'react-router-dom';

// const SearchBar = ({ setSearchResults, searchResults }) => {
//   const [input, setInput] = useState('');
//   const [searchType, setSearchType] = useState('users');
//   const [allData, setAllData] = useState([]); // Store all fetched data here
//   const [showResults, setShowResults] = useState(false); // Control the visibility of the result list
//   const navigate = useNavigate();

//   const fetchData = () => {
//     const endpoint =
//       searchType === "users"
//         ? "http://localhost:9000/users"
//         : "http://localhost:9000/books";

//     axios
//       .get(endpoint)
//       .then((res) => {
//         const items = res.data.data || res.data.Data;

//         if (Array.isArray(items)) {
//           const formattedData = items.map(item => ({
//             id: item._id,
//             name: searchType === 'users' ? item.name : item.title,
//             photo: searchType === 'users' ? item.photo : null, // Add photo field for users
//             type: searchType === 'users' ? 'user' : 'book'
//           }));
//           setAllData(formattedData);
//         } else {
//           console.error("Unexpected data format:", res.data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [searchType]);

//   const handleChange = (value) => {
//     setInput(value);

//     if (value.trim() === '') {
//       setShowResults(false);
//       setSearchResults([]);
//     } else {
//       const filteredData = allData.filter(item =>
//         item.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setSearchResults(filteredData);
//       setShowResults(true);
//     }
//   };

//   const handleSearchTypeChange = (e) => {
//     setSearchType(e.target.value);
//   };

//   const handleItemClick = (item) => {
//     if (item.type === 'user') {
//       navigate(`/user/profile/${item.id}`);
//     } else if (item.type === 'book') {
//       navigate(`/user/details/${item.id}`);
//     } else {
//       navigate('/noresult');
//     }
//     setSearchResults([]);
//     setShowResults(false);
//     setInput('');
//   };

//   return (
//     <div className='search-bar-container flex flex-col min-w-[200px] px-10 items-center justify-center'>
//       <div className='flex flex-row mb-2 gap-4'>
//         <select
//           value={searchType}
//           onChange={handleSearchTypeChange}
//           className="bg-secondary text-green-700 border-none rounded-lg"
//         >
//           <option value="users">Users</option>
//           <option value="books">Books</option>
//         </select>
//         <div className='input-wrapper bg-secondary rounded-sm h-[2.5rem] px-6 text-center my-auto flex items-center'>
//           <FaSearch id='search-icon' />
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => handleChange(e.target.value)}
//             placeholder="Search"
//             className="bg-transparent w-full h-full text-[1.25rem] border-none focus:outline-none focus:border-none text-green-700"
//           />
//         </div>
//       </div>

//       {showResults && (
//         <div className='results-list absolute w-full bg-secondary flex flex-col shadow-sm rounded-sm top-24 cursor-pointer max-h-64 overflow-y-scroll z-50'>
//           {Array.isArray(searchResults) && searchResults.map((result, id) => (
//             <div key={id} className="p-2 border-b border-gray-300 hover:bg-white flex items-center" onClick={() => handleItemClick(result)}>
//               {result.type === 'user' && (
//                 <div className="flex items-center">
//                   {result.photo ? (
//                     <img
//                       src={`http://localhost:9000${result.photo}`}
//                       alt="Profile"
//                       className="h-10 w-10 rounded-full mr-2"
//                     />
//                   ) : (
//                     <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-300'>
//                       <FaUserCircle className="h-6 w-6 text-gray-500" />
//                     </div>
//                   )}
//                   <span>{result.name}</span>
//                 </div>
//               )}
//               {result.type === 'book' && (
//                 <div className="flex items-center">
//                   <span>{result.name}</span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaSearch, FaUserCircle } from 'react-icons/fa'; // Import the user icon
// import { Link } from 'react-router-dom';
// import SearchResultsList from '../SearchResultsList/SearchResultsList';

// const SearchBar = ({ setSearchResults, searchResults }) => {
//   const [input, setInput] = useState('');
//   const [searchType, setSearchType] = useState('users');
//   const [allData, setAllData] = useState([]); // Store all fetched data here
//   const [showResults, setShowResults] = useState(false); // Control the visibility of the result list

//   const fetchData = () => {
//     const endpoint =
//       searchType === "users"
//         ? "http://localhost:9000/users"
//         : "http://localhost:9000/books";

//     axios
//       .get(endpoint)
//       .then((res) => {
//         const items = res.data.data || res.data.Data;

//         if (Array.isArray(items)) {
//           const formattedData = items.map(item => ({
//             id: item._id,
//             name: searchType === 'users' ? item.name : item.title,
//             photo: searchType === 'users' ? item.photo : null, // Add photo field for users
//             type: searchType === 'users' ? 'user' : 'book'
//           }));
//           setAllData(formattedData);
//         } else {
//           console.error("Unexpected data format:", res.data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [searchType]);

//   const handleChange = (value) => {
//     setInput(value);

//     if (value.trim() === '') {
//       setShowResults(false);
//       setSearchResults([]);
//     } else {
//       const filteredData = allData.filter(item =>
//         item.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setSearchResults(filteredData);
//       setShowResults(true);
//     }
//   };

//   const handleSearchTypeChange = (e) => {
//     setSearchType(e.target.value);
//   };

//   const handleItemClick = () => {
//     setSearchResults([]);
//     setShowResults(false);
//     setInput('');
//   };

//   return (
//     <div className='search-bar-container flex flex-col min-w-[200px] px-10 items-center justify-center'>
//       <div className='flex flex-row mb-2 gap-4'>
//         <select
//           value={searchType}
//           onChange={handleSearchTypeChange}
//           className="bg-secondary text-green-700 border-none rounded-lg"
//         >
//           <option value="users">Users</option>
//           <option value="books">Books</option>
//         </select>
//         <div className='input-wrapper bg-secondary rounded-sm h-[2.5rem] px-6 text-center my-auto flex items-center'>
//           <FaSearch id='search-icon' />
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => handleChange(e.target.value)}
//             placeholder="Search"
//             className="bg-transparent w-full h-full text-[1.25rem] border-none focus:outline-none focus:border-none text-green-700"
//           />
//         </div>
//       </div>

//       {showResults && (
//         <SearchResultsList searchResults={searchResults} setSearchResults={setSearchResults} />
//       )}
//     </div>
//   );
// };

// export default SearchBar;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import SearchResultsList from '../SearchResultsList/SearchResultsList
import { useNavigate } from "react-router-dom";


const SearchBar = ({ setSearchResults, searchResults }) => {
  const [input, setInput] = useState("");
  const [searchType, setSearchType] = useState("users");
  const [allData, setAllData] = useState([]); // Store all fetched data here
  const [showResults, setShowResults] = useState(false); // Control the visibility of the result list

  const fetchData = () => {
    const endpoint =
      searchType === "users"
        ? "http://localhost:9000/users"
        : "http://localhost:9000/books";

    axios
      .get(endpoint)
      .then((res) => {
        const items = res.data.data || res.data.Data;

        if (Array.isArray(items)) {
          const formattedData = items.map((item) => ({
            id: item._id,

            name: searchType === 'users' ? item.name : item.title,
            photo: searchType === 'users' ? item.photo : null, // Add photo field for users
            type: searchType === 'users' ? 'user' : 'book'

//             name: searchType === "users" ? item.name : item.title,
//             type: searchType === "users" ? "user" : "book",

          }));
          setAllData(formattedData);
        } else {
          console.error("Unexpected data format:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [searchType]);

  const handleChange = (value) => {
    setInput(value);

    if (value.trim() === "") {
      setShowResults(false);
      setSearchResults([]);
    } else {
      const filteredData = allData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredData);
      setShowResults(true);
    }
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };


  const handleItemClick = (item) => {
    if (item.type === "user") {
      navigate(`/user/profile/${item.id}`);
    } else if (item.type === "book") {
      navigate(`/user/details/${item.id}`);
    } else {
      navigate("/noresult");
    }
    setSearchResults([]);
    setShowResults(false);
    setInput("");
  };


  return (
    <div className="search-bar-container flex flex-col min-w-[200px] px-10 items-center justify-center">
      <div className="flex  bg-secondary rounded-full divide-x divide-primary">
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className="bg-secondary text-green-700 border-none rounded-l-full"
        >
          <option value="users">Users</option>
          <option value="books">Books</option>
        </select>
        <div className="input-wrapper bg-secondary rounded-r-full h-[2.5rem] px-6 text-center my-auto flex items-center">
          <FaSearch id="search-icon" className="text-primary" />
          <input
            type="text"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search"
            className="bg-transparent w-full h-full text-[1.25rem] border-none rounded-full  focus:outline-none focus:border-none text-primary"
          />
        </div>
      </div>

      {showResults && (

        <SearchResultsList searchResults={searchResults} setSearchResults={setSearchResults} />

        <div className="results-list absolute w-full bg-secondary flex flex-col shadow-sm rounded-sm top-24 cursor-pointer max-h-64 overflow-y-scroll z-50">
          {Array.isArray(searchResults) &&
            searchResults.map((result, id) => (
              <div
                key={id}
                className="p-2 border-b border-gray-300 hover:bg-white"
                onClick={() => handleItemClick(result)}
              >
                {result.name}
              </div>
            ))}
        </div>

      )}
    </div>
  );
};

export default SearchBar;

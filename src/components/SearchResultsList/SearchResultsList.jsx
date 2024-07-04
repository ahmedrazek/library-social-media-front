

// import { useNavigate } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa'; // Import the user icon

// const SearchResultsList = ({ searchResults, setSearchResults }) => {
//   const navigate = useNavigate();

//   const handleClick = (item) => {
//     if (item.type === "user") {
//       navigate(`/user/userProfile/${item.id}`);
//     } else if (item.type === "book") {
//       navigate(`/user/details/${item.id}`);
//     }

//     setSearchResults([]);
//   };

//   if (!searchResults || searchResults.length === 0) {
//     return null;
//   }

//   return (
//     <div className='results-list absolute w-full bg-secondary flex flex-col shadow-sm rounded-sm top-24 cursor-pointer max-h-64 overflow-y-scroll z-50'>
//       {searchResults.map((result, id) => (
//         <div key={id} className="p-2 border-b border-gray-300 hover:bg-white flex items-center gap-2" onClick={() => handleClick(result)}>
//           {result.type === "user" && (
//             <>
//               {result.photo ? (
//                 <img
//                   src={`http://localhost:9000${result.photo}`}
//                   alt="Profile"
//                   className="h-10 w-10 rounded-full mr-2"
//                 />
//               ) : (
//                 <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-300'>
//                   <FaUserCircle className="h-6 w-6 text-gray-500 " />
//                 </div>
//               )}
//             </>
//           )}
//           <span className="truncate">{result.type === "user" ? result.name : result.title}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SearchResultsList;



import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const SearchResultsList = ({ searchResults, setSearchResults }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.type === "user") {
      navigate(`/user/userProfile/${item.id}`);
    } else if (item.type === "book") {
      navigate(`/user/details/${item.id}`);
    }
    setSearchResults([]);
  };

  if (!searchResults || searchResults.length === 0) {
    return null;
  }

  return (
    <div className='results-list absolute w-full bg-secondary flex flex-col shadow-sm rounded-sm top-24 cursor-pointer max-h-64 overflow-y-scroll z-50'>
      {searchResults.map((result, id) => (
        <div key={id} className="p-2 border-b border-gray-300 hover:bg-white flex items-center gap-2" onClick={() => handleClick(result)}>
          {result.type === "user" && (
            <>
              {result.photo ? (
                <img
                  src={`http://localhost:9000${result.photo}`}
                  alt="Profile"
                  className="h-10 w-10 rounded-full mr-2"
                />
              ) : (
                <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-300'>
                  <FaUserCircle className="h-6 w-6 text-gray-500" />
                </div>
              )}
              <span className="truncate">{result.name}</span>
            </>
          )}
          {result.type === "book" && (
            <span className="truncate">{result.name}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchResultsList;


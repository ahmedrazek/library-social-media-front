// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchBooks } from "../../store/bookSlice";
// import { FaSearch, FaStar } from "react-icons/fa";
// import Noresult from "../../components/NoResult/NoResult";
// import Category from "../../components/Category/Category";
// import { Link, useLocation } from "react-router-dom";
// // import Sidebar from './../../components/Sidebar/Sidebar';

// const Book = () => {
//   const dispatch = useDispatch();
//   const books = useSelector((state) => state.book.books);
//   const bookStatus = useSelector((state) => state.book.status);
//   const [searchInput, setSearchInput] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const location = useLocation();
  
//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const category = query.get("category");
//     if (category) {
//       setSelectedCategory(category);
//       dispatch(fetchBooks(category));
//     } else {
//       dispatch(fetchBooks());
//     }
//   }, [location.search, dispatch]);

//   const handleSearchChange = (e) => {
//     setSearchInput(e.target.value);
//   };

//   const resetSearch = () => {
//     setSearchInput("");
//     setSelectedCategory("");
//     dispatch(fetchBooks()); // Fetch all books
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     dispatch(fetchBooks(category)); // Fetch books based on the selected category
//   };

//   const filteredBooks = books.filter(
//     (book) =>
//       (selectedCategory ? book.category === selectedCategory : true) &&
//       book.title.toLowerCase().startsWith(searchInput.toLowerCase())
//   );

//   return (
//     <div className="grid grid-cols-4 gap-20 container mb-8 lg:ml-96 mt-20">
//       {/* <div className='bg-primary h-[40rem] ml-0'><Sidebar/></div> */}
//       <div className="col-span-2">
//         <div className="bg-transparent mt-20 relative">
//           <input
//             type="search"
//             name="search"
//             id="search"
//             placeholder="Search"
//             value={searchInput}
//             onChange={handleSearchChange}
//             className="border border-gray-200 rounded-full w-full p-3 pl-4 pr-10 bg-secondary/30"
//           />
//           <FaSearch className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" />
//         </div>
//         <div className="book-content bg-transparent border border-gray-300 rounded-md my-10 h-auto">
//           <button
//             onClick={resetSearch}
//             className="text-gray-700 text-end p-4 hover:text-primary cursor-pointer"
//           >
//             All Books
//           </button>
//           {Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
//             <div className="grid grid-cols-3">
//               {filteredBooks.map((book) => (
//                 <Link to={`/user/details/${book._id}`} key={book._id}>
//                   <div className="border border-gray-200 rounded-md p-3 m-4">
//                     <img
//                       src={`http://localhost:9000/image/${book.cover}`}
//                       alt="BookImage"
//                       className="w-full h-40 object-cover mb-3"
//                     />
//                     <h2 className="text-center font-bold text-primary">
//                       {book.title}
//                     </h2>
//                     <div className="flex">
//                       <FaStar className="text-orange-500" />
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <Noresult resetSearch={resetSearch} />
//           )}
//         </div>
//       </div>
//       <div className='bg-transparent border border-gray-300 rounded-md mt-20 h-auto'>
//         <Category handleCategoryClick={handleCategoryClick} />
//       </div>
//     </div>
//   );
// };

// export default Book;


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchBooks } from "../../store/bookSlice";
// import { FaSearch, FaStar ,FaCaretDown} from "react-icons/fa";
// import Noresult from "../../components/NoResult/NoResult";
// import Category from "../../components/Category/Category";
// import { Link, useLocation } from "react-router-dom";

// const Book = () => {
//   const dispatch = useDispatch();
//   const books = useSelector((state) => state.book.books);
//   const bookStatus = useSelector((state) => state.book.status);
//   const [searchInput, setSearchInput] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const location = useLocation();
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 9;
//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const category = query.get("category");
//     if (category) {
//       setSelectedCategory(category);
//       dispatch(fetchBooks(category));
//     } else {
//       dispatch(fetchBooks());
//     }
//   }, [location.search, dispatch]);

//   const handleSearchChange = (e) => {
//     setSearchInput(e.target.value);
//   };

//   const resetSearch = () => {
//     setSearchInput("");
//     setSelectedCategory("");
//     dispatch(fetchBooks()); // Fetch all books
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     dispatch(fetchBooks(category)); // Fetch books based on the selected category
//   };

//   const filteredBooks = books.filter(
//     (book) =>
//       (selectedCategory ? book.category === selectedCategory : true) &&
//       book.title.toLowerCase().startsWith(searchInput.toLowerCase())
//   );


//   //////////////

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);}

//      // Pagination logic
//      const handlePageChange = (direction) => {
//       if (direction === 'next' && currentPage < totalPages) {
//         setCurrentPage(currentPage + 1);
//       } else if (direction === 'prev' && currentPage > 1) {
//         setCurrentPage(currentPage - 1);
//       }
//     };
  
//     // Pagination logic
//     const indexOfLastBook = currentPage * booksPerPage;
//     const indexOfFirstBook = indexOfLastBook - booksPerPage;
//     const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
//     const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
//   return (
//     <main className="my-10">
//     <div className="px-4">
//       <div className="block md:hidden mb-4">
//         <button
//           onClick={toggleDropdown}
//           className="text-gray-700 p-4 hover:text-primary cursor-pointer flex justify-between items-center w-[80%] mx-auto border border-gray-300 rounded-md"
//         >
//           Categories <FaCaretDown />
//         </button>
//         {isDropdownOpen && (
//           <div className="border-t border-gray-300 rounded-b-md">
//             <Category handleCategoryClick={handleCategoryClick} />
//           </div>
//         )}
//       </div>
//       <div className="content grid grid-cols-1 md:grid-cols-12 gap-3 mx-auto mt-8">
//         <div className="books-content w-[80%] md:col-span-8 lg:col-span-9 mx-auto">
//           <div className="bg-transparent relative mb-4">
//             <input
//               type="search"
//               name="search"
//               id="search"
//               placeholder="Search"
//               value={searchInput}
//               onChange={handleSearchChange}
//               className="border border-gray-200 rounded-full w-full p-3 pl-4 pr-10 bg-secondary/30"
//             />
//             <FaSearch className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" />
//           </div>
//           <div className="book-content bg-transparent border border-gray-200 shadow-sm rounded-md my-10">
//             <button
//               onClick={resetSearch}
//               className="text-gray-900 text-end font-bold  hover:text-primary cursor-pointer block px-10 py-4"
//             >
//               All Books
//             </button>
//             {Array.isArray(currentBooks) && currentBooks.length > 0 ? (
//               <div className="grid sm:w-[90%]  mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-2">
//                 {currentBooks.map((book) => (
//                   <Link to={`/user/details/${book._id}`} key={book._id}>
//                     <div className="border border-gray-200 rounded-md  mx-auto">
//                       <img
//                         src={`http://localhost:9000/image/${book.cover}`}
//                         alt="BookImage"
//                         className="w-full h-40 object-cover mb-3"
//                       />
//                       <h2 className="text-center font-bold text-primary">
//                         {book.title}
//                       </h2>
//                       <div className="flex justify-center">
//                         <FaStar className="text-orange-500" />
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <Noresult resetSearch={resetSearch} />
//             )}
//           </div>
//           <div className="flex justify-center gap-4 my-4">
//             <button
//               onClick={() => handlePageChange('prev')}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white'}`}
//             >
//               Previous
//             </button>
//             <button
//               onClick={() => handlePageChange('next')}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white'}`}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//         <div className="categories-content hidden md:block md:col-span-4 lg:col-span-3 bg-transparent border border-gray-300 px-2 rounded-md mt-10 md:mt-0">
//           <Category handleCategoryClick={handleCategoryClick} />
//         </div>
//       </div>
//     </div>
//   </main>
//   //   <main className="my-10">
//   //   <div className="content grid grid-cols-1 md:grid-cols-12 gap-3 mx-auto mt-8 px-4">
//   //     <div className="books-content sm:w-[80%] md:col-span-8 lg:col-span-9 mx-auto">
//   //       <div className="bg-transparent relative mb-4">
//   //         <input
//   //           type="search"
//   //           name="search"
//   //           id="search"
//   //           placeholder="Search"
//   //           value={searchInput}
//   //           onChange={handleSearchChange}
//   //           className="border border-gray-200 rounded-full w-full p-3 pl-4 pr-10 bg-secondary/30"
//   //         />
//   //         <FaSearch className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" />
//   //       </div>
//   //       <div className="book-content bg-transparent border border-gray-300 rounded-md my-10">
//   //         <button
//   //           onClick={resetSearch}
//   //           className="text-gray-700 text-end p-4 hover:text-primary cursor-pointer block md:hidden"
//   //         >
//   //           All Books
//   //         </button>
//   //         {Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
//   //           <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//   //             {filteredBooks.map((book) => (
//   //               <Link to={`/user/details/${book._id}`} key={book._id}>
//   //                 <div className="border border-gray-200 rounded-md p-3 mx-auto">
//   //                   <img
//   //                     src={`http://localhost:9000/image/${book.cover}`}
//   //                     alt="BookImage"
//   //                     className="w-full h-40 object-cover mb-3"
//   //                   />
//   //                   <h2 className="text-center font-bold text-primary">
//   //                     {book.title}
//   //                   </h2>
//   //                   <div className="flex justify-center">
//   //                     <FaStar className="text-orange-500" />
//   //                   </div>
//   //                 </div>
//   //               </Link>
//   //             ))}
//   //           </div>
//   //         ) : (
//   //           <Noresult resetSearch={resetSearch} />
//   //         )}
//   //       </div>
//   //     </div>
//   //     <div className="categories-content sm:w-[80%] md:w-full lgLw-full mx-auto md:col-span-4 lg:col-span-3 bg-transparent border border-gray-300 px-2 rounded-md mt-10 md:mt-0">
//   //       <Category handleCategoryClick={handleCategoryClick} />
//   //     </div>
//   //   </div>
//   // </main>
  
// //   <main className="my-10">
// //   <div className="px-4">
// //     <div className="block md:hidden mb-4">
// //       <button
// //         onClick={toggleDropdown}
// //         className="text-gray-700 p-4 hover:text-primary cursor-pointer flex justify-between items-center w-[80%] mx-auto border border-gray-300 rounded-md"
// //       >
// //         Categories <FaCaretDown />
// //       </button>
// //       {isDropdownOpen && (
// //         <div className="border-t border-gray-300 rounded-b-md">
// //           <Category handleCategoryClick={handleCategoryClick} />
// //         </div>
// //       )}
// //     </div>
// //     <div className="content grid grid-cols-1 md:grid-cols-12 gap-3 mx-auto mt-8">
// //       <div className="books-content w-[80%]  md:col-span-8 lg:col-span-9 mx-auto">
// //         <div className="bg-transparent relative mb-4">
// //           <input
// //             type="search"
// //             name="search"
// //             id="search"
// //             placeholder="Search"
// //             value={searchInput}
// //             onChange={handleSearchChange}
// //             className="border border-gray-200 rounded-full w-full p-3 pl-4 pr-10 bg-secondary/30"
// //           />
// //           <FaSearch className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" />
// //         </div>
// //         <div className="book-content bg-transparent border border-gray-200 shadow-sm rounded-md my-10">
// //           <button
// //             onClick={resetSearch}
// //             className="text-gray-700 text-end p-4 hover:text-primary cursor-pointer block md:hidden"
// //           >
// //             All Books
// //           </button>
// //           {Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
// //             <div className="grid sm:w-[90%] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
// //               {filteredBooks.map((book) => (
// //                 <Link to={`/user/details/${book._id}`} key={book._id}>
// //                   <div className="  border border-gray-200 rounded-md p-3 mx-auto">
// //                     <img
// //                       src={`http://localhost:9000/image/${book.cover}`}
// //                       alt="BookImage"
// //                       className="w-full h-40 object-cover mb-3"
// //                     />
// //                     <h2 className="text-center font-bold text-primary">
// //                       {book.title}
// //                     </h2>
// //                     <div className="flex justify-center">
// //                       <FaStar className="text-orange-500" />
// //                     </div>
// //                   </div>
// //                 </Link>
// //               ))}
// //             </div>
// //           ) : (
// //             <Noresult resetSearch={resetSearch} />
// //           )}
// //         </div>
// //       </div>
// //       <div className="categories-content hidden md:block md:col-span-4 lg:col-span-3 bg-transparent border border-gray-300 px-2 rounded-md mt-10 md:mt-0">
// //         <Category handleCategoryClick={handleCategoryClick} />
// //       </div>
// //     </div>
// //   </div>
// // </main>
  
//   );
// };

// export default Book;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../store/bookSlice";
import { FaSearch, FaStar, FaCaretDown } from "react-icons/fa";
import Noresult from "../../components/NoResult/NoResult";
import Category from "../../components/Category/Category";
import { Link, useLocation } from "react-router-dom";

const Book = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);
  const bookStatus = useSelector((state) => state.book.status);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

  const booksPerPage = 9;

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get("category");
    if (category) {
      setSelectedCategory(category);
      dispatch(fetchBooks(category));
    } else {
      dispatch(fetchBooks());
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    if (bookStatus === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [bookStatus]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const resetSearch = () => {
    setSearchInput("");
    setSelectedCategory("");
    dispatch(fetchBooks());
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    dispatch(fetchBooks(category));
  };

  const filteredBooks = books.filter(
    (book) =>
      (selectedCategory ? book.category === selectedCategory : true) &&
      book.title.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <main className="my-10">
      <div className="px-4  h-[3rem]">
        <div className="block md:hidden mb-4">
          <button
            onClick={toggleDropdown}
            className="text-gray-700 p-4 hover:text-primary cursor-pointer flex justify-between items-center w-[80%] mx-auto border border-gray-300 rounded-md"
          >
            Categories <FaCaretDown />
          </button>
          {isDropdownOpen && (
            <div className="border-t border-gray-300 rounded-b-md">
              <Category handleCategoryClick={handleCategoryClick} />
            </div>
          )}
        </div>
        <div className="content  grid grid-cols-1 md:grid-cols-12 gap-3 mx-auto mt-8">
          <div className="books-content w-[80%] md:col-span-8 lg:col-span-9 mx-auto">
            <div className="bg-transparent relative mb-4">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchChange}
                className="border border-gray-200 rounded-full w-full p-3 pl-4 pr-10 bg-secondary/30"
              />
              <FaSearch className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" />
            </div>
            <div className="book-content bg-transparent border border-gray-200 shadow-sm rounded-md my-10">
              <button
                onClick={resetSearch}
                className="text-gray-900 text-end font-bold hover:text-primary cursor-pointer block px-10 py-4"
              >
                All Books
              </button>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
              ) : Array.isArray(currentBooks) && currentBooks.length > 0 ? (
                <div className="grid sm:w-[90%] mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-2">
                  {currentBooks.map((book) => (
                    <Link to={`/user/details/${book._id}`} key={book._id}>
                      <div className="border border-gray-200 rounded-md  mx-auto">
                        <img
                          src={`http://localhost:9000/image/${book.cover}`}
                          alt="BookImage"
                          className="w-full h-40 object-cover mb-3"
                        />
                        <h2 className="text-center font-bold text-primary">
                          {book.title}
                        </h2>
                        <div className="flex justify-center">
                          <FaStar className="text-orange-500" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <Noresult resetSearch={resetSearch} />
              )}
            </div>
            <div className="flex justify-center gap-4 my-4">
              <button
                onClick={() => handlePageChange('prev')}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white'}`}
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange('next')}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white'}`}
              >
                Next
              </button>
            </div>
          </div>
          <div className="categories-content h-[30rem] hidden md:block md:col-span-4 lg:col-span-3 bg-transparent border border-gray-300 px-2 rounded-md mt-10 md:mt-0">
            <Category handleCategoryClick={handleCategoryClick} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Book;


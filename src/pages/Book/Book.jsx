
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../store/bookSlice';
import { FaSearch, FaStar } from 'react-icons/fa';
import Noresult from '../../components/NoResult/NoResult';
import Category from '../../components/Category/Category';
import { Link, useLocation } from 'react-router-dom';

const Book = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);
  const bookStatus = useSelector((state) => state.book.status);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get('category');
    if (category) {
      setSelectedCategory(category);
      dispatch(fetchBooks(category));
    } else {
      dispatch(fetchBooks());
    }
  }, [location.search, dispatch]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const resetSearch = () => {
    setSearchInput('');
    setSelectedCategory('');
    dispatch(fetchBooks()); // Fetch all books
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    dispatch(fetchBooks(category)); // Fetch books based on the selected category
  };

  const filteredBooks = books.filter(book =>
    (selectedCategory ? book.category === selectedCategory : true) &&
    book.title.toLowerCase().startsWith(searchInput.toLowerCase().slice(0, 5))
  );

  return (
    <div className='grid grid-cols-4 gap-20 container mb-8'>
      <div className='bg-primary h-[40rem] ml-0'>SideLeft</div>
      <div className='col-span-2'>
        <div className='bg-transparent mt-20 relative'>
          <input
            type="search"
            name="search"
            id="search"
            placeholder='Search'
            value={searchInput}
            onChange={handleSearchChange}
            className='border border-gray-200 rounded-full w-full p-3 pl-4 pr-10 bg-secondary/30'
          />
          <FaSearch className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" />
        </div>
        <div className='book-content bg-transparent border border-gray-300 rounded-md my-10 h-auto'>
          <button onClick={resetSearch} className='text-gray-700 text-end p-4 hover:text-primary cursor-pointer'>All Books</button>
          {Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
            <div className='grid grid-cols-3'>
              {filteredBooks.map(book => (
                <Link to={`/user/details/${book._id}`} key={book._id}>
                  <div className='border border-gray-200 rounded-md p-3 m-4'>
                    <img src={`http://localhost:9000/image/${book.cover}`} alt="BookImage" className='w-full h-40 object-cover mb-3' />
                    <h2 className='text-center font-bold text-primary'>{book.title}</h2>
                    <div className='flex '>
                      <FaStar className='text-orange-500 ' />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Noresult resetSearch={resetSearch} />
          )}
        </div>
      </div>
      <div className='bg-transparent border border-gray-300 rounded-md mt-20 h-[35rem]'>
        <Category handleCategoryClick={handleCategoryClick} />
      </div>
    </div>
  );
}

export default Book;

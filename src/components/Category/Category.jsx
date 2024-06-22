

// Category.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../store/bookSlice';
import { FaBook } from 'react-icons/fa';
export default function Category({ handleCategoryClick }) {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);
  const bookStatus = useSelector((state) => state.book.status);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (bookStatus === 'idle') {
      dispatch(fetchBooks());
    }
  }, [bookStatus, dispatch]);

  useEffect(() => {
    const uniqueCategories = [...new Set(books.map(book => book.category))];
    setCategories(uniqueCategories);
  }, [books]);

  return (
    <div>
      <h2 className='text-center text-primary font-bold p-5 text-2xl'>Categories</h2>
      
      {categories.map(category => (
        <button
          key={category}
          className='border border-gray-200 rounded-md p-3 m-4 flex items-center hover:bg-secondary w-[90%] '
          onClick={() => handleCategoryClick(category)} // Pass the category to the click handler
        >
          <FaBook className="mr-2 font-medium text-dark_light" />
          <p className='font-medium text-dark_light'>{category}</p>
        </button>
      ))}
    </div>
  );
}





import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const FavoriteBooks = () => {
  const user = useSelector((state) => state.user.user); 
  const favoriteBookIds = user?.favouriteBooks;
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevFavoriteBookIdsRef = useRef();
  const cachedBooksRef = useRef({});
  // useEffect(() => {
  //   console.log(favoriteBookIds)
  //   const fetchBooks = async () => {
  //     try {
  //       const bookDetailsPromises = favoriteBookIds.map(bookId => 
  //          axios.get(`http://localhost:9000/books/${bookId}`) );
  //          const booksResponses = await Promise.all(bookDetailsPromises);
  //          const books = booksResponses.map(response => response.data);
  //       setFavoriteBooks(books);
       
  //     } catch (error) {
  //       console.error("Error fetching favorite books", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (favoriteBookIds && favoriteBookIds.length > 0) {
  //     fetchBooks();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [favoriteBookIds]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const newBooksPromises = favoriteBookIds
          .filter(bookId => !cachedBooksRef.current[bookId])
          .map(bookId => 
            axios.get(`http://localhost:9000/books/${bookId}`).then(response => {
              cachedBooksRef.current[bookId] = response.data;
              return response.data;
            })
          );

        const newBooks = await Promise.all(newBooksPromises);
        const allBooks = favoriteBookIds.map(bookId => cachedBooksRef.current[bookId]);

        setFavoriteBooks(allBooks);
      } catch (error) {
        console.error('Error fetching favorite books', error);
      } finally {
        setLoading(false);
      }
    };

    if (favoriteBookIds.length > 0) {
      setLoading(true);
      fetchBooks();
    } else {
      setLoading(false);
      setFavoriteBooks([]);
    }

    prevFavoriteBookIdsRef.current = favoriteBookIds;
  }, [favoriteBookIds]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!favoriteBookIds || favoriteBookIds.length === 0) {
    return (
      <div className='text-center'>
        <h2>Favorite Books</h2>
        <p>No favorite books found.</p>
      </div>
    );
  }

  return (
    <div className="container  mt-2 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">My Favorite Books</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-10  mx-20">
        {favoriteBookIds.map((book) => (
          <div key={book._id} className="w-[50%] md:w-full border border-gray-300 rounded-md pb-4 shadow-lg mx-auto " >
            {book.cover && (
              <img
                src={`http://localhost:9000/image/${book.cover}`}
                alt="Book Cover" 
                className="  w-full object-cover mb-2"
              />
            )}
            <h2 className="text-center font-bold text-primary">
                  {book.title}
             </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteBooks;




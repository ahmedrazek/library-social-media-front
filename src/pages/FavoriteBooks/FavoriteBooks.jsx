
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const FavoriteBooks = () => {
  const user = useSelector((state) => state.user.user); 
  const favoriteBookIds = user?.favouriteBooks;
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(favoriteBookIds)
    const fetchBooks = async () => {
      try {
        const bookDetailsPromises = favoriteBookIds.map(bookId => 
           axios.get(`http://localhost:9000/books/${bookId}`) );

           const booksResponses = await Promise.all(bookDetailsPromises);
           console.log(booksResponses);

        const books = booksResponses.map(response => response.data);
        console.log(books)
        setFavoriteBooks(books);
      } catch (error) {
        console.error("Error fetching favorite books", error);
      } finally {
        setLoading(false);
      }
    };

    if (favoriteBookIds && favoriteBookIds.length > 0) {
      fetchBooks();
    } else {
      setLoading(false);
    }
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
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">My Favorite Books</h1>
      <div className="grid grid-cols-2 gap-4">
        {favoriteBookIds.map((book, index) => (
          <div key={book._id} className="border border-gray-300 rounded-md p-4">
            <h2 className="text-xl font-semibold">Book {index + 1}</h2>

            
            {book.cover && (
              <img
                src={`http://localhost:9000/image/${book.cover}`}
                alt="Book Cover"
                className="w-full h-40 object-cover mb-2"
              />
            )}
            <h2 className="text-xl font-semibold">{book.title}</h2>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteBooks;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { removeFavBook } from "../../store/userSlice";
import { Link } from "react-router-dom";

const FavoriteBooks = () => {
  const user = useSelector((state) => state.user.user);
  const favoriteBookIds = user?.favouriteBooks;
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookDetailsPromises = favoriteBookIds.map((bookId) =>
          axios.get(`/books/${bookId}`)
        );
        const booksResponses = await Promise.all(bookDetailsPromises);
        const books = booksResponses.map((response) => response.data);
        setFavoriteBooks(books);
      } catch (error) {
        console.error("Error fetching favorite books", error);
      } finally {
        setLoading(false);
      }
    };

    if (favoriteBookIds?.length > 0) {
      setLoading(true);
      fetchBooks();
    } else {
      setLoading(false);
      setFavoriteBooks([]);
    }
  }, [favoriteBookIds]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!favoriteBookIds || favoriteBookIds?.length === 0) {
    return (
      <div className="text-center">
        <h2>Favorite Books</h2>
        <p>No favorite books found.</p>
      </div>
    );
  }
  //
  const toggleFavorite = async (bookId) => {
    try {
      setFavoriteBooks(favoriteBooks.filter((book) => book._id !== bookId));
      await axios.post(`/books/removeFavoriteBook/${user._id}/${bookId}`);
      dispatch(removeFavBook(bookId));
    } catch (error) {
      console.error("Error removing favorite book", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!favoriteBookIds?.length) {
    return (
      <div className="text-center">
        <h2>Favorite Books</h2>
        <p>No favorite books found.</p>
      </div>
    );
  }

  return (
    <div className="container  mt-2 px-4 ">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">
        My Favorite Books
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-10  mx-20">
        {favoriteBookIds.map((book) => (
          <Link
            key={book._id}
            className="w-[50%] md:w-full border border-gray-300 rounded-md pb-4 shadow-lg mx-auto relative"
            to={`/user/details/${book._id}`}
          >
            {book.cover && (
              <img
                src={`http://localhost:9000/image/${book.cover}`}
                alt="Book Cover"
                className="  w-full object-cover mb-2"
              />
            )}
            <h2 className="text-center font-bold text-primary">{book.title}</h2>
            <div className="absolute top-1 right-3">
              <FaHeart
                className="text-2xl cursor-pointer text-red-500"
                onClick={() => toggleFavorite(book._id)}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoriteBooks;

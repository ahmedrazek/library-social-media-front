import React, { useEffect, useState } from "react";
import axios from "axios";
import { getTokenUserId } from "../../utils/cookie"; // Adjust the path as necessary

const FavoriteBooks = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    fetchFavoriteBooks();
  }, []);

  const fetchFavoriteBooks = async () => {
    const userId = getTokenUserId();
    if (!userId) return;

    try {
      const response = await axios.get(`/favorites/${userId}`);
      setFavoriteBooks(response.data);
    } catch (error) {
      console.error("Error fetching favorite books", error);
    }
  };

  return (
    <div>
      <h2>Favorite Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteBooks.map(book => (
          <div key={book._id} className="border p-4 rounded">
            <h3>{book.title}</h3>
            <p>{book.category}</p>
            <img
              src={`http://localhost:9000/image/${book.cover}`}
              alt="Book Cover"
              className="w-full h-40 object-cover mb-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteBooks;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchFavoriteBooks } from '../../store/favoritesSlice';
// import { Link } from 'react-router-dom';

// const FavoriteBooks = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.user); // Retrieve user data
//   const userId = user?._id; // Extract user ID
//   const favoriteBooks = useSelector((state) => state.favorites?.books || []);
//   const favoriteStatus = useSelector((state) => state.favorites?.status || 'idle');

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchFavoriteBooks(userId));
//     }
//   }, [dispatch, userId]);

//   if (favoriteStatus === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (favoriteBooks.length === 0) {
//     return <div>You have no favorite books.</div>;
//   }

//   return (
//     <div className="container mx-auto my-8">
//       <h1 className="text-2xl font-bold mb-4">My Favorite Books</h1>
//       <div className="grid grid-cols-3 gap-4">
//         {favoriteBooks.map((book) => (
//           <div key={book._id} className="border border-gray-300 rounded-md p-4">
//             <img
//               src={`http://localhost:9000/image/${book.cover}`}
//               alt="Book Cover"
//               className="w-full h-40 object-cover mb-2"
//             />
//             <h2 className="text-xl font-semibold">{book.title}</h2>
//             <p>{book.author}</p>
//             <Link
//               to={`/books/${book._id}`}
//               className="text-blue-500 hover:underline"
//             >
//               View Details
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FavoriteBooks;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteBooks } from "../../store/favoritesSlice";

const FavoriteBooks = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Retrieve user data
  const userId = user?._id; // Extract user ID

  useEffect(() => {
    console.log(user);
    if (userId) {
      dispatch(fetchFavoriteBooks(userId));
    }
  }, []);

  const favoriteBooks = useSelector((state) => state.favorites.books);

  // Add a conditional check for favoriteBooks
  if (!favoriteBooks || favoriteBooks.length === 0) {
    return (
      <div>
        <h2>Favorite Books</h2>
        <p>No favorite books found.</p>
      </div>
    );
  }

  // Render favorite books
  return (
    <div>
      <h2>Favorite Books</h2>
      {favoriteBooks &&
        favoriteBooks.map((book) => (
          <div key={book.id}>
            <p>{book.title}</p>
          </div>
        ))}
    </div>
  );
};

export default FavoriteBooks;

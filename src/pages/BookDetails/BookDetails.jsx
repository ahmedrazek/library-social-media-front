


// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchBookById } from "../../store/bookSlice";
// import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa"; // Import FaRegHeart
// import RatingPopup from "../../components/RatingPopup";
// import axios from "axios";


// const BookDetails = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const bookDetails = useSelector((state) => state.book.bookDetails);
//   const favoriteBooks = useSelector((state) => state.book.favoriteBooks);
//   const user = useSelector((state) => state.user.user);
//   const userId = user?._id;
//   const [rating, setRating] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     // Fetch book details
//     dispatch(fetchBookById(id));

//     // Initialize favorite state from localStorage
//     const storedFavoriteState = localStorage.getItem(`favorite_${id}`);
//     if (storedFavoriteState !== null) {
//       setIsFavorite(JSON.parse(storedFavoriteState));
//     } else {
//       setIsFavorite(favoriteBooks.includes(id));
//     }

//     // Initialize rating from localStorage
   
  
//   }, [dispatch, id, favoriteBooks]);

//   const toggleFavorite = async () => {
//     if (!userId) {
//       console.error("User not logged in");
//       return;
//     }

//     try {
//       let response;
//       if (isFavorite) {
//         response = await axios.post(
//           `http://localhost:9000/books/removeFavoriteBook/${userId}/${id}`
//         );
//       } else {
//         response = await axios.post(
//           `http://localhost:9000/books/addFavoriteBook/${userId}/${id}`
//         );
//       }

//       const newFavoriteState = !isFavorite;
//       setIsFavorite(newFavoriteState);
//       localStorage.setItem(`favorite_${id}`, JSON.stringify(newFavoriteState));

//       console.log(response.data);
//     } catch (error) {
//       console.error("Error toggling favorite status:", error);
//     }
//   };

//   const handleDownload = () => {
//     const downloadLink = document.createElement("a");
//     downloadLink.href = `http://localhost:9000/image/${bookDetails.data.Pdf}`;
//     downloadLink.download = `${bookDetails.data.title}.pdf`;
//     downloadLink.click();
//   };

//   const handleRead = () => {
//     if (bookDetails.data.Pdf) {
//       window.open(
//         `http://localhost:9000/image/${bookDetails.data.Pdf}`,
//         "_blank"
//       );
//     } else {
//       console.error("PDF URL not available");
//     }
//   };

//   if (!bookDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className=" container mb-8 h-full">
     
//       <div className="mx-auto w-[90%] md:w-[60%] ">
//         <div className="book-content bg-transparent  rounded-md my-10 h-auto">
//           <div className=" flex flex-row justify-end items-end mb-3 px-6 pt-5 ">
          
//             {isFavorite ? (
//               <FaHeart
//                 className="text-2xl cursor-pointer text-red-500"
//                 onClick={toggleFavorite}
//               />
//             ) : (
//               <FaRegHeart
//                 className="text-2xl cursor-pointer text-red-500"
//                 onClick={toggleFavorite}
//               />
//             )}
//           </div>
//           <div className="flex space-x-3 m-3">
//             <div>
//               <img
//                 src={`http://localhost:9000/image/${bookDetails.data.cover}`}
//                 alt="BookImage"
//                 className="w-full h-40 object-cover mb-3"
//               />
//             </div>
//             <div>
//               <h1>{bookDetails.data.title}</h1>
//               <h1>{bookDetails.data.category}</h1>
//             </div>
//           </div>
//           <div className="flex justify-start space-x-3 m-3">
//             <div>
//               <button
//                 className="border border-green-800 rounded-md py-2 px-4 text-green-800 flex items-center gap-2 hover:bg-green-800 hover:text-white transition duration-300"
//                 onClick={() => setShowPopup(true)}
//               >
//                 Rate
//               </button>
//               {showPopup && (
//                 <RatingPopup
//                   onClose={() => setShowPopup(false)}
//                   onAddRating={(newRating) => {
//                     setRating(newRating);
//                     localStorage.setItem(`rating_${id}`, newRating);
//                   }}
//                 />
//               )}
//             </div>
//             <button
//               className="border border-green-800 rounded-md py-2 px-4 text-green-800 flex items-center gap-2 hover:bg-green-800 hover:text-white transition duration-300"
//               onClick={handleDownload}
//             >
//               Download
//             </button>
//             <button
//               className="border border-green-800 rounded-md py-2 px-4 text-green-800 flex items-center gap-2 hover:bg-green-800 hover:text-white transition duration-300"
//               onClick={handleRead}
//             >
//               Read
//             </button>
//           </div>
//           <div className="my-16 px-4">
//             <h2 className="text-primary font-extrabold py-2">Summary</h2>
//             {bookDetails.data.description}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookDetails;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../../store/bookSlice";
import { FaHeart, FaRegHeart, FaStar, FaDownload, FaBookReader } from "react-icons/fa"; // Import necessary icons
import axios from "axios";


const BookDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const bookDetails = useSelector((state) => state.book.bookDetails);
  const favoriteBooks = useSelector((state) => state.book.favoriteBooks);
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Fetch book details
    dispatch(fetchBookById(id));

    // Initialize favorite state from localStorage
    const storedFavoriteState = localStorage.getItem(`favorite_${id}`);
    if (storedFavoriteState !== null) {
      setIsFavorite(JSON.parse(storedFavoriteState));
    } else {
      setIsFavorite(favoriteBooks.includes(id));
    }
  }, [dispatch, id, favoriteBooks]);

  const toggleFavorite = async () => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    try {
      let response;
      if (isFavorite) {
        response = await axios.post(
          `http://localhost:9000/books/removeFavoriteBook/${userId}/${id}`
        );
      } else {
        response = await axios.post(
          `http://localhost:9000/books/addFavoriteBook/${userId}/${id}`
        );
      }

      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);
      localStorage.setItem(`favorite_${id}`, JSON.stringify(newFavoriteState));

      console.log(response.data);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = `http://localhost:9000/image/${bookDetails.data.Pdf}`;
    downloadLink.download = `${bookDetails.data.title}.pdf`;
    downloadLink.click();
  };

  const handleRead = () => {
    if (bookDetails.data.Pdf) {
      window.open(
        `http://localhost:9000/image/${bookDetails.data.Pdf}`,
        "_blank"
      );
    } else {
      console.error("PDF URL not available");
    }
  };

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mb-8 h-full">
      <div className="mx-auto w-[90%] md:w-[60%]">
        <div className="book-content bg-transparent rounded-md my-10 h-auto">
          <div className="flex flex-row justify-end items-end mb-3 px-6 pt-5">
            {isFavorite ? (
              <FaHeart
                className="text-2xl cursor-pointer text-red-500"
                onClick={toggleFavorite}
              />
            ) : (
              <FaRegHeart
                className="text-2xl cursor-pointer text-red-500"
                onClick={toggleFavorite}
              />
            )}
          </div>
          <div className="flex space-x-3 m-3">
            <div>
              <img
                src={`http://localhost:9000/image/${bookDetails.data.cover}`}
                alt="BookImage"
                className="w-full h-40 object-cover mb-3"
              />
            </div>
            <div>
              <h1>{bookDetails.data.title}</h1>
              <h1>{bookDetails.data.category}</h1>
            </div>
          </div>
          <div className="flex justify-start space-x-3 m-3">
            <button
              className="border border-green-800 rounded-md py-2 px-4 text-green-800 flex items-center gap-2 hover:bg-green-800 hover:text-white transition duration-300"
              onClick={() => console.log("Add Review")}
            >
              <FaStar />
              Add Review
            </button>
            <button
              className="border border-green-800 rounded-md py-2 px-4 text-green-800 flex items-center gap-2 hover:bg-green-800 hover:text-white transition duration-300"
              onClick={handleDownload}
            >
              <FaDownload />
              Download
            </button>
            <button
              className="border border-green-800 rounded-md py-2 px-4 text-green-800 flex items-center gap-2 hover:bg-green-800 hover:text-white transition duration-300"
              onClick={handleRead}
            >
              <FaBookReader />
              Read
            </button>
          </div>
          <div className="my-16 px-4">
            <h2 className="text-primary font-extrabold py-2">Summary</h2>
            {bookDetails.data.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

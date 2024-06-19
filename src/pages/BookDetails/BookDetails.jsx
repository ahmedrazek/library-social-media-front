import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById, fetchBooks } from "../../store/bookSlice";
import Category from "../../components/Category/Category";
import { FaHeart, FaSearch, FaStar } from "react-icons/fa";
import RatingPopup from "../../components/RatingPopup";
import axios from "axios";

const BookDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const bookDetails = useSelector((state) => state.book.bookDetails);
  const books = useSelector((state) => state.book.books);
  const bookStatus = useSelector((state) => state.book.status);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [rating, setRating] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const user = useSelector((state) => state.user.user); // Retrieve user data
  const userId = user?._id; // Extract user ID
  const navigate = useNavigate();
  const addToFavorites = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9000/books/addFavoriteBook/${userId}/${id}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const isFavorite = bookDetails?._id === id;
  // const handleFavoriteClick = () => {
  //   if (!isFavorite) {
  //     addToFavorites();
  //   } else {
  //     console.log('Book is already in favorites');
  //   }
  // };
  useEffect(() => {
    const storedRating = localStorage.getItem(`rating_${id}`);
    if (storedRating) {
      setRating(parseInt(storedRating));
    }
    console.log(user);
  }, [id]);
  const getTokenUserId = () => {
    const token = getCookie("token"); // Replace "token" with the name of your cookie
    if (token) {
      const decodedToken = jwt_decode(token);
      return decodedToken.userId;
    }
    return null; // Handle the case where the token is not found
  };

  useEffect(() => {
    dispatch(fetchBookById(id));
    checkIfFavorite();
  }, [dispatch, id]);

  const checkIfFavorite = async () => {
    const userId = getTokenUserId();
    if (!userId) return;

    try {
      const response = await axios.get(`/favorites/${userId}`);
      const favoriteBooks = response.data;
      setIsFavorite(favoriteBooks.some((book) => book._id === id));
    } catch (error) {
      console.error("Error checking favorite status", error);
    }
  };

  const handleFavoriteClick = async () => {
    const userId = getTokenUserId();
    if (!userId) return;

    try {
      if (isFavorite) {
        await axios.post(`/removeFavoriteBook/${userId}/${id}`);
      } else {
        await axios.post(`/addFavoriteBook/${userId}/${id}`);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorite status", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/user/books?category=${category}`);
  };

  const handleAddRating = (newRating) => {
    setRating(newRating);
    localStorage.setItem(`rating_${id}`, newRating);
  };

  const filteredBooks = books.filter(
    (book) =>
      (selectedCategory ? book.category === selectedCategory : true) &&
      book.title.toLowerCase().startsWith(searchInput.toLowerCase().slice(0, 5))
  );

  console.log("Book Details:", bookDetails);
  console.log("Filtered Books:", filteredBooks);

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = `http://localhost:9000/image/${bookDetails.data.Pdf}`;
    downloadLink.download = `${bookDetails.data.title}.pdf`;
    downloadLink.click();
  };

  const handleRead = () => {
    if (bookDetails.data.Pdf) {
      console.log("heelo pdf", bookDetails.data);
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
    <div className="grid grid-cols-4 gap-20 container mb-8 mt-20">
      <div className=" h-[40rem] ml-0">SideLeft</div>
      <div className="col-span-2">
        <div className="book-content bg-transparent border border-gray-300 rounded-md my-10 h-auto">
          <div className="rating-favorite flex flex-row justify-between items-baseline mb-3 px-6 pt-5 pb-3">
            <div>
              {rating && (
                <div className="flex items-center">
                  <p>Rating: {rating} </p>
                  <p className="px-1 text-yellow-500">
                    {" "}
                    <FaStar />
                  </p>
                </div>
              )}
            </div>
            <FaHeart
              className={`text-2xl cursor-pointer ${
                isFavorite ? "text-red-500" : "text-dark_light"
              }`}
              onClick={handleFavoriteClick}
            />
          </div>
          <div className="flex space-x-3  m-3">
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
          <div className="flex justify-start space-x-3  m-3 ">
            <div>
              <button
                className="border border-green-800 rounded-md py-2 px-4 text-green-800 flex items-center gap-2 hover:bg-green-800 hover:text-white transition duration-300"
                onClick={() => setShowPopup(true)}
              >
                Rate
              </button>
              {showPopup && (
                <RatingPopup
                  onClose={() => setShowPopup(false)}
                  onAddRating={handleAddRating}
                />
              )}
            </div>
            <button
              className="border border-green-800 rounded-md py-2 px-4 text-green-800 flex items-center gap-2 hover:bg-green-800 hover:text-white transition duration-300"
              onClick={handleDownload}
            >
              Download
            </button>
            <button
              className="border border-green-800 rounded-md py-2 px-4 text-green-800 flex items-center gap-2 hover:bg-green-800 hover:text-white transition duration-300"
              onClick={handleRead}
            >
              Read
            </button>
            <button className="border border-green-800 rounded-md py-2 px-4 text-green-800 flex items-center gap-2 hover:bg-green-800 hover:text-white transition duration-300">
              Review
            </button>
          </div>
          <div className="my-16 px-4">
            <h2 className="text-primary font-extrabold  py-2">Summary</h2>
            {bookDetails.data.description}
          </div>
        </div>
      </div>
      <div className="bg-transparent border border-gray-300 rounded-md mt-20 h-[35rem]">
        <Category handleCategoryClick={handleCategoryClick} />
      </div>
    </div>
  );
};

export default BookDetails;

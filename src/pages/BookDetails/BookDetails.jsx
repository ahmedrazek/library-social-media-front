import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById } from "../../store/bookSlice";
import { FaHeart, FaStar } from "react-icons/fa";
import RatingPopup from "../../components/RatingPopup";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const BookDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const bookDetails = useSelector((state) => state.book.bookDetails);
  const user = useSelector((state) => state.user.user); // Retrieve user data
  const userId = user?._id;
  const navigate = useNavigate();
  const [rating, setRating] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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

  const handleFavoriteClick = () => {
    addToFavorites();
  };

  useEffect(() => {
    const storedRating = localStorage.getItem(`rating_${id}`);
    if (storedRating) {
      setRating(parseInt(storedRating));
    }
    console.log(user);
  }, [id]);

  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [dispatch, id]);

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
    <div className="grid grid-cols-4 gap-20 container mb-8 h-full">
      <div className="bg-primary h-[40rem] ml-0">
        <Sidebar />
      </div>
      <div className="col-span-2 mt-30">
        <div className="book-content bg-transparent border border-gray-300 rounded-md my-10 h-auto">
          <div className="rating-favorite flex flex-row justify-between items-baseline mb-3 px-6 pt-5 pb-3">
            <div>
              {rating && (
                <div className="flex items-center">
                  <p>Rating: {rating} </p>
                  <p className="px-1 text-yellow-500">
                    <FaStar />
                  </p>
                </div>
              )}
            </div>
            <FaHeart
              className="text-2xl text-dark_light cursor-pointer"
              onClick={handleFavoriteClick}
            />
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
                  onAddRating={(newRating) => {
                    setRating(newRating);
                    localStorage.setItem(`rating_${id}`, newRating);
                  }}
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

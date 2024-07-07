import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../../store/bookSlice";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaDownload,
  FaBookReader,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";
import { Avatar } from "@chakra-ui/react";
import moment from "moment";
import { addFavBook, removeFavBook } from "../../store/userSlice";

const BookDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const bookDetails = useSelector((state) => state.book.bookDetails);
  const favoriteBooks = useSelector((state) => state.book.favoriteBooks);
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    dispatch(fetchBookById(id));

    const storedFavoriteState = localStorage.getItem(`favorite_${id}`);
    if (storedFavoriteState !== null) {
      setIsFavorite(JSON.parse(storedFavoriteState));
    } else {
      setIsFavorite(favoriteBooks.includes(id));
    }

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/ratings/${id}/reviews/first-five`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
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
          `/books/removeFavoriteBook/${userId}/${id}`
        );
        dispatch(removeFavBook(id));
      } else {
        response = await axios.post(`/books/addFavoriteBook/${userId}/${id}`);
        dispatch(addFavBook(id));
      }

      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);
      localStorage.setItem(`favorite_${id}`, JSON.stringify(newFavoriteState));

      console.log(response.data);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  // const handleDownload = () => {
  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = `http://localhost:9000/image/${bookDetails.data.Pdf}`;
  //   downloadLink.download = `${bookDetails.data.title}.pdf`;
  //   downloadLink.click();
  // };
  const handleDownload = async () => {
    try {
      const response = await axios({
        url: `/image/${bookDetails.data.Pdf}`,
        method: "GET",
        responseType: "blob", // important
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${bookDetails.data.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleRead = () => {
    if (bookDetails.data.Pdf) {
      window.open(`/image/${bookDetails.data.Pdf}`, "_blank");
    } else {
      console.error("PDF URL not available");
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/ratings/${userId}/${id}`, {
        rating,
        review: reviewText,
      });

      const newReview = {
        user: {
          name: user.name,
          photo: user.photo,
        },
        rating,
        review: reviewText,
        createdAt: new Date().toISOString(),
      };

      setReviews([...reviews, newReview]);

      setRating(0);
      setReviewText("");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/ratings/${userId}/${reviewId}`);
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleSeeAllReviews = async () => {
    try {
      const response = await axios.get(`/ratings/${id}/reviews/all`);
      setReviews(response.data.reviews);
      setShowAllReviews(true);
    } catch (error) {
      console.error("Error fetching all reviews:", error);
    }
  };

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mb-8 h-full">
      <div className="mx-auto w-[90%] md:w-[60%]">
        <div className="book-content bg-gray-50 shadow-md px-6 rounded-md my-10 h-auto">
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
                src={`/image/${bookDetails.data.cover}`}
                alt="BookImage"
                className="w-full h-50 object-cover mb-3"
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
          <div className="border-b border-gray-200"></div>
          <div className="mt-6 mb-10">
            <h2 className="text-2xl mb-4 text-primary text-center font-bold">
              Reviews
            </h2>
            <form onSubmit={handleAddReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <div className="flex">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <FaStar
                        key={index}
                        size={30}
                        className={`cursor-pointer ${
                          ratingValue <= rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onClick={() => setRating(ratingValue)}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Review
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-900 hover:bg-green-800 w-full text-white px-4 py-2 rounded-md"
                >
                  Add Review
                </button>
              </div>
            </form>
          </div>
          <div className="reviews">
            {reviews.map((review, index) =>
              (!showAllReviews && index < 5) || showAllReviews ? (
                <div
                  className="flex items-start mb-4 p-4 border-b"
                  key={review._id}
                >
                  <div className="mr-4 flex-shrink-0">
                    {review.user.photo ? (
                      <img
                        src={`${review.user.photo}`}
                        alt={review.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <Avatar name={review.user.name} />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <div className="space-x-2">
                        <span className="font-bold">{review.user.name}</span>
                        <span className="text-sm text-gray-500">
                          {moment(review.createdAt).fromNow()}
                        </span>
                      </div>
                      {review.user._id === userId && (
                        <FaTrash
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleDeleteReview(review._id)}
                        />
                      )}
                    </div>
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          size={15}
                          className={`${
                            index < review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-lg">{review.review}</p>
                  </div>
                </div>
              ) : null
            )}
            {!showAllReviews && reviews.length > 5 && (
              <button
                onClick={handleSeeAllReviews}
                className="text-green-500 mt-4"
              >
                See All Reviews
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

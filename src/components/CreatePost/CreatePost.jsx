import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUpload, FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { FaPlusCircle, FaPen } from "react-icons/fa";
const CreatePost = ({ updatePosts }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [postText, setPostText] = useState("");
  const [includeImage, setIncludeImage] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/books");
        console.log("Fetched books:", response.data.Data);
        setBooks(response.data.Data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    // console.log(books);
    fetchBooks();
  }, []);

  const handleFormSubmit = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupType("");
  };

  const handlePostFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", postText);
    formData.append("type", popupType);
    if (includeImage && imageURL) {
      formData.append("image", imageURL);
    }
    if (selectedBook) {
      formData.append("book", selectedBook);
    }
    if (reviewRating) {
      formData.append("rating", reviewRating);
    }

    try {
      await axios.post("/posts", formData);
      setPostText("");
      setImageURL("");
      setShowPopup(false);
      setPopupType("");
      setIncludeImage(false);
      setSelectedBook("");
      setReviewRating(0);
      updatePosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageURL(file);
  };

  const handleRemoveImage = () => {
    setImageURL("");
  };

  const handleStarClick = (rating) => {
    setReviewRating(rating);
  };
  const user = useSelector((state) => state.user.user);

  return (
    <div className="w-11/12 lg:w-[40rem]  pt-0 ">
      <div className=" rounded bg-gray-50 p-4 shadow-md flex items-baseline ">
        <div className="w-14 h-14 rounded-full bg-green-600 overflow-hidden m-2 border-2 border-zinc-900">
          {user?.photo ? (
            <img
              src={`https://library-social-media-one.vercel.app${user.photo}`}
              className="object-cover w-full h-full"
              alt="Profile"
            />
          ) : (
            <Avatar bg="teal.500" size="full" />
          )}
        </div>

        <form className="flex-grow">
          <textarea
            className="w-full border border-gray-200 focus:border-0 rounded p-2 mb-2 resize-none"
            name="postText"
            placeholder="Add a post"
            rows={1}
            style={{ height: "45px" }}
            value=""
            onFocus={() => handleFormSubmit("post")}
          />
          {/* <div className="flex justify-around mb-2">
            <button
              type="button"
              onClick={() => handleFormSubmit("quote")}
              className="bg-primary hover:bg-primary text-white font-semibold py-2 px-4 border-none rounded-full"
            >
              Add Quote
            </button>
            <button
              type="button"
              onClick={() => handleFormSubmit("post")}
              className="bg-primary hover:bg-primary text-white font-semibold py-2 px-4 border-none rounded-full"
            >
              Add Post
            </button>
            <button
              type="button"
              onClick={() => handleFormSubmit("review")}
              className="bg-primary hover:bg-primary text-white font-semibold py-2 px-4 border-none rounded-full"
            >
              Add Review
            </button>
          </div> */}

          <div className="flex justify-around mb-2">
            <button
              type="button"
              onClick={() => handleFormSubmit("quote")}
              className=" text-primary font-medium p-3 lg:py-2 lg:px-4 border-none rounded mb-2 md:mb-0 md:mr-2 flex items-center"
            >
              <div className=" items-center gap-2 hidden md:flex">
                <FaPlusCircle className="text-xl" />
                <span className="hidden md:inline-block font-medium">
                  Add Quote
                </span>
              </div>
              <FaPlusCircle
                className="block md:hidden text-2xl"
                title="Add Quote"
              />
            </button>
            <button
              type="button"
              onClick={() => handleFormSubmit("post")}
              className=" text-primary font-semibold p-3 lg:py-2 lg:px-4 border-none rounded-full mb-2 md:mb-0 md:mr-2 flex items-center"
            >
              <div className=" items-center gap-2 hidden md:flex">
                <FaPlusCircle className="text-xl" />
                <span className=" font-medium">Add Post</span>
              </div>
              <FaPen className="block md:hidden text-2xl" title="Add Post" />
            </button>
            <button
              type="button"
              onClick={() => handleFormSubmit("review")}
              className=" text-primary font-semibold p-3 lg:py-2 lg:px-4 border-none rounded-full mb-2 md:mb-0 flex items-center"
            >
              <div className=" items-center gap-2 hidden md:flex">
                <FaStar className="text-xl" />
                <span className="hidden md:inline-block font-medium">
                  Add Review
                </span>
              </div>

              <FaStar className="block md:hidden text-2xl" title="Add Review" />
            </button>
          </div>
        </form>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white  p-4 rounded shadow-md relative">
            <h2 className="text-lg font-bold mb-4">
              {popupType === "quote" && "Add Quote"}
              {popupType === "post" && "Add Post"}
              {popupType === "review" && "Add Review"}
            </h2>
            <form onSubmit={handlePostFormSubmit}>
              {popupType === "quote" ? (
                <div className="quote-style p-4 mb-4 border-l-4 border-gray-400">
                  <textarea
                    className="w-full border rounded p-2 mb-2 resize-none"
                    name="postText"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="Add your quote here"
                    rows={5}
                    cols={50}
                  />
                </div>
              ) : (
                <textarea
                  className="w-full border rounded p-2 mb-2 resize-none"
                  name="postText"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Add text"
                  rows={5}
                  cols={50}
                />
              )}
              {popupType === "post" && (
                <>
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={includeImage}
                      onChange={(e) => setIncludeImage(e.target.checked)}
                      className="mr-2"
                    />
                    Include Image
                  </label>
                  {includeImage && (
                    <div className="mb-2 flex items-center">
                      <label
                        htmlFor="fileInput"
                        className="cursor-pointer flex items-center text-primary"
                      >
                        <FiUpload className="mr-2" /> Upload Image
                      </label>
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                  )}
                  {imageURL && (
                    <div className="relative mb-2">
                      <img
                        src={URL.createObjectURL(imageURL)}
                        alt="Uploaded"
                        className="max-w-full mb-2 mr-2"
                        style={{ height: "auto", width: "200px" }}
                      />
                      <button
                        className="hover:text-red-500 absolute top-1 right-1 bg-primary text-white rounded-full"
                        onClick={handleRemoveImage}
                      >
                        <FiX />
                      </button>
                    </div>
                  )}
                </>
              )}
              {popupType === "quote" && (
                <div className="mb-2">
                  <label htmlFor="bookSelect" className="block mb-1">
                    Select Book
                  </label>
                  <select
                    id="bookSelect"
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Choose a book</option>
                    {Array.isArray(books) &&
                      books.map((book) => (
                        <option key={book._id} value={book.title}>
                          {book.title}
                        </option>
                      ))}
                  </select>
                </div>
              )}
              {popupType === "review" && (
                <div className="mb-2">
                  <label htmlFor="bookSelectReview" className="block mb-1">
                    Select Book
                  </label>
                  <select
                    id="bookSelectReview"
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    className="w-full border rounded p-2 mb-2"
                  >
                    <option value="">Choose a book</option>
                    {Array.isArray(books) &&
                      books.map((book) => (
                        <option key={book._id} value={book.title}>
                          {book.title}
                        </option>
                      ))}
                  </select>
                  <div className="flex items-center mb-2">
                    <label className="mr-2">Rating</label>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={24}
                          color={star <= reviewRating ? "#ffc107" : "#e4e5e9"}
                          onClick={() => handleStarClick(star)}
                          className="cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <button
                className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                {popupType === "quote" && "Add Quote"}
                {popupType === "post" && "Add Post"}
                {popupType === "review" && "Add Review"}
              </button>
            </form>
            <button
              className="absolute top-0 right-0 m-2 p-2 text-red-500 "
              onClick={handlePopupClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;

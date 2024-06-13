import React, { useState } from "react";
import axios from "axios";
import { FiUpload, FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const CreatePost = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [postText, setPostText] = useState("");
  const [includeImage, setIncludeImage] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

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
      const response = await axios.post("/posts", formData);
      console.log("Post created", response.data);
      setPostText("");
      setImageURL("");
      setShowPopup(false);
      setPopupType("");
      setIncludeImage(false);
      setSelectedBook("");
      setReviewRating(0);
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

  return (
    <div className="w-11/12 lg:w-5/12 mx-auto pt-24">
      <div className="relative rounded-xl bg-white p-4  shadow-md flex items-start">
        <img
          src="/avatar.jpg"
          alt="Profile"
          className="h-14 w-14 rounded-full border-2 border-primary mr-4"
        />
        <form className="flex-grow">
          <textarea
            className="w-full border border-gray-200 focus:border-0 rounded-full p-2 mb-2 resize-none"
            name="postText"
            placeholder="Add a post"
            rows={1}
            style={{ height: "45px" }}
            value=""
            onFocus={() => handleFormSubmit("post")}
          />
          <div className="flex justify-around mb-2">
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
          </div>
        </form>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md relative">
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
                    <option value="Book 1">Book 1</option>
                    <option value="Book 2">Book 2</option>
                    <option value="Book 3">Book 3</option>
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
                    <option value="Book 1">Book 1</option>
                    <option value="Book 2">Book 2</option>
                    <option value="Book 3">Book 3</option>
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
              className="absolute top-0 right-0 m-2 p-2 text-gray-600 hover:text-gray-800"
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

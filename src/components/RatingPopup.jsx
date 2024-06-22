
import React, { useState } from 'react';
const RatingPopup = ({ onClose, onAddRating }) => {
  const initialRatings = [1];
  const [ratings, setRatings] = useState(initialRatings);
  const handleStarClick = (rowIndex, starIndex) => {
    const newRatings = ratings.map((rating, idx) => (idx === rowIndex ? starIndex + 1 : rating));
    setRatings(newRatings);
  };
  const handleSubmitRating = () => {
    onAddRating(ratings[0]);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <button className="text-gray-500 text-2xl absolute top-2 right-2" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-left">Rate this book</h2>
        <div className="space-y-4">
          {ratings.map((rating, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-1">
              {[...Array(5)].map((_, starIndex) => (
                <svg
                  key={starIndex}
                  onClick={() => handleStarClick(rowIndex, starIndex)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={starIndex < rating ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  stroke={starIndex < rating ? 'none' : 'currentColor'}
                  className={`w-8 h-8 p-2 cursor-pointer ${starIndex < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.25 6.918a1 1 0 00.95.69h7.292c.969 0 1.372 1.24.588 1.81l-5.893 4.284a1 1 0 00-.364 1.118l2.25 6.918c.3.921-.755 1.688-1.54 1.118l-5.893-4.284a1 1 0 00-1.176 0l-5.893 4.284c-.784.57-1.838-.197-1.539-1.118l2.25-6.918a1 1 0 00-.364-1.118L2.67 12.345c-.784-.57-.38-1.81.588-1.81h7.292a1 1 0 00.95-.69l2.25-6.918z" />
                </svg>
              ))}
            </div>
          ))}
        </div>
        <button className="bg-primary text-white px-4 py-2 my-3 rounded-md" onClick={handleSubmitRating}>
          Add Rating
        </button>
      </div>
    </div>
  );
};

export default RatingPopup;


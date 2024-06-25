/* eslint-disable react/prop-types */
import axios from "axios";
import { differenceInMinutes } from "date-fns";
import { useEffect, useState } from "react";

export default function Comment({ comment, user, getPost, removeComment }) {
  const [like, setLike] = useState(false);
  const [likesNum, setLikesNum] = useState(0);

  const calculateCommentDate = (createdAt) => {
    const postDate = differenceInMinutes(
      new Date(Date.now()),
      new Date(createdAt)
    );
    if (postDate > 1440) {
      return `${Math.floor(postDate / 1440)} days`;
    } else if (postDate > 60) {
      return `${Math.floor(postDate / 60)} hours`;
    } else {
      return `${Math.floor(postDate)} minutes`;
    }
  };
  const toggleLike = () => {
    if (!like) {
      axios.post(`/comment/like/${comment._id}`, { userId: user._id });
      setLike(true);
      setLikesNum(likesNum + 1);
      getPost();
    }
    if (like) {
      axios.post(`/comment/unlike/${comment._id}`, { userId: user._id });
      setLike(false);
      setLikesNum(likesNum - 1);
      getPost();
    }
  };
  useEffect(() => {
    setLike(comment.likes.some((like) => like === user._id));
    setLikesNum(comment.likes.length);
  }, []);
  return (
    <div
      className="bg-secondary px-4 py-4 rounded-xl mx-4 my-2"
      key={comment?._id}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className=" w-8 h-8 rounded-full bg-black"></div>

          <div>
            <h4 className=" font-semibold text-sm">{comment?.userId?.name}</h4>
            <p className=" text-xs text-gray-500">
              {calculateCommentDate(comment.createdAt)}
            </p>
          </div>
        </div>
        {user._id == comment.userId._id ? (
          <button
            className="text-primary"
            onClick={() => removeComment(comment._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : null}
      </div>

      <div className="flex justify-between">
        <p className=" text-xs mt-2">{comment.description}</p>
        <div className="flex items-center gap-2">
          <button onClick={toggleLike}>
            {like && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-red-600"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            )}
            {!like && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            )}
          </button>
          <p>{likesNum}</p>
        </div>
      </div>
    </div>
  );
}

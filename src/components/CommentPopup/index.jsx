/* eslint-disable react/prop-types */

import axios from "axios";
import AddComment from "../AddComment";
import Comment from "../Comment";
import { useEffect } from "react";

export default function CommentPopup({
  setShowComments,
  post,
  comment,
  addComment,
  user,
  setComment,
  getPost,
}) {
  const removeComment = (id) => {
    axios.delete(`/comment/${id}`);
    getPost();
  };

  return (
    <div className="absolute inset-0 min-h-full  ">
      <div className="fixed top-0 right-0 left-0 flex justify-center items-center h-full bg-gray-700 bg-opacity-50">
        <div className="bg-white rounded-lg h-4/6 w-10/12 md:w-4/12 flex flex-col ">
          <div className="flex justify-between border-b items-center px-8 py-4">
            <h1 className=" text-2xl text-primary ">Comments</h1>
            <button onClick={() => setShowComments(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className=" overflow-y-scroll h-5/6 border-b">
            {post.comments &&
              post.comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  user={user}
                  getPost={getPost}
                  removeComment={removeComment}
                />
              ))}
          </div>
          <div className="px-2">
            <AddComment
              comment={comment}
              addComment={addComment}
              setComment={setComment}
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

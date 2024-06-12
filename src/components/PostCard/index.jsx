/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { differenceInMinutes } from "date-fns";
import axios from "axios";
const PostCard = ({ postId }) => {
  const [showPhotos, setShowPhoto] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [like, setLike] = useState(false);
  const [date, setDate] = useState("");
  const [post, setPost] = useState(null);
  const [likesNum, setLikesNum] = useState(0);
  const user = useSelector((state) => state.user.user);
  const calculateDate = (createdAt) => {
    const postDate = differenceInMinutes(
      new Date(Date.now()),
      new Date(createdAt)
    );
    if (postDate > 1440) {
      setDate(`${Math.floor(postDate / 1440)} days`);
    } else if (postDate > 60) {
      setDate(`${Math.floor(postDate / 60)} hours`);
    } else {
      setDate(`${Math.floor(postDate)} minutes`);
    }
  };
  const getPost = async () => {
    try {
      const res = await axios.get(`/posts/single/${postId}`);
      setPost(res.data);
      calculateDate(res.data.createdAt);
      setLike(res.data.likes.some((like) => like._id === user._id));
      setLikesNum(res.data.likes.length);
    } catch (error) {
      console.error(error);
    }
  };
  const toggleLike = () => {
    if (!like) {
      axios.post(`/posts/like/${user._id}/${post._id}`);
      setLike(true);
      setLikesNum(likesNum + 1);
    }
    if (like) {
      axios.post(`/posts/dislike/${user._id}/${post._id}`);
      setLike(false);
      setLikesNum(likesNum - 1);
    }
  };
  useEffect(() => {
    getPost();
    console.log(user);
  }, []);
  if (!post) return null;
  if (showPhotos) {
    return (
      <>
        <div className="absolute inset-0 text-white min-h-screen">
          <div className="bg-black w-full h-full">
            <div>
              <img src={post.photo} alt="" />
            </div>
            <button className="absolute left-10 top-1/2 text-5xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="absolute right-10 top-1/2 text-5xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              className="absolute top-10 right-10"
              onClick={() => setShowPhoto(false)}
            >
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
        </div>
      </>
    );
  }
  return (
    <>
      {/* // CARD */}
      <div className="flex flex-col p-4 rounded-xl gap-4  w-[22rem] md:w-[38rem] shadow-lg bg-slate-50">
        {/* USER INFO  */}
        <div className="flex gap-2">
          {/* USER PHOTO  */}
          <div className=" w-12 h-12 rounded-full bg-black">
            {/* <img src={post.userId.photo} alt="" /> */}
          </div>
          {/* USER NAME&INFO  */}
          <div>
            <div className="flex gap-2 items-center">
              <h2 className="font-semibold">{post.userId?.name}</h2>
              <p className=" text-xs text-gray-500">posted an update</p>
            </div>
            <p className=" text-xs text-gray-500">{date} ago</p>
          </div>
        </div>
        {/* POST DESC  */}
        <div>
          <p>{post.description}</p>
        </div>
        {/* POST GALLERY  */}
        {post.photo && (
          <div className="h-24 w-24">
            <img src={post.photo} alt="" className=" object-contain" />
          </div>
        )}
        <div className="  ">
          <img
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
            alt=""
            className=" object-contain rounded-lg"
          />
        </div>
        {/* <div className="grid grid-cols-2 gap-2">
          <div className="max-h-[14rem]">
            <img
              className="h-full max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
              alt=""
            />
          </div>
          <div className="max-h-[14rem]">
            <img
              className="h-full max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
              alt=""
            />
          </div>
          <div className="max-h-[14rem]">
            <img
              className="h-full max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
              alt=""
            />
          </div>
          <div className="max-h-[14rem]">
            <img
              className="h-full max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
              alt=""
            />
          </div>
        </div> */}

        {/* COMMENT SECTION  */}
        <div className="flex justify-between">
          <div className="flex gap-2">
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
          <div
            onClick={() => setShowComments(true)}
            className=" cursor-pointer"
          >
            <span>{post.comments.length}</span> comments
          </div>
        </div>
        <div className="flex justify-between">
          <input
            type="text"
            name=""
            id=""
            className="rounded-full border-gray-400 w-9/12 gap-2"
          />
          <button className="bg-primary px-4 py-2 rounded-full text-white text-sm">
            Add Comment
          </button>
        </div>
      </div>
      {showComments && (
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
                <div className="bg-secondary px-4 py-4 rounded-xl mx-4 my-2">
                  <div className="flex gap-2 items-center">
                    <div className=" w-8 h-8 rounded-full bg-black"></div>

                    <div>
                      <h4 className=" font-semibold text-sm">
                        Ahmed Abdelrazek
                      </h4>
                      <p className=" text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className=" text-xs mt-2">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Aspernatur explicabo quos provident in.
                    </p>
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
                  </div>
                </div>
              </div>
              <div className="flex justify-between px-4 py-2">
                <input
                  type="text"
                  name=""
                  id=""
                  className="rounded-full border-gray-400 w-9/12 text-sm gap-2"
                />
                <button className="bg-primary px-4 py-2 rounded-full text-white text-sm">
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;

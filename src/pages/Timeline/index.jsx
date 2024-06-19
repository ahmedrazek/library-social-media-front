import PostCard from "../../components/PostCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CreatePost from "../../components/CreatePost/CreatePost";

function Timeline() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const getPosts = async () => {
    const res = await axios.get("/posts");
    console.log(res.data);
    setPosts(res.data);
    setLoading(false);
  };

  const removePost = (id) => {
    axios.delete(`/posts/${id}`);
    getPosts();
  };
  useEffect(() => {
    getPosts();
    console.log(user, status);
  }, []);
  // if (loading) {
  //   return (

  //   );
  // }
  if (!user && status == "failed") {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <div className="bg-secondary h-screen lg:ml-18 ">
        <CreatePost />
        <div className="flex flex-col gap-6 items-center pt-20 bg-secondary">
          {posts &&
            posts.map((post) => (
              <PostCard
                postId={post._id}
                key={post._id}
                removePost={removePost}
              />
            ))}
        </div>
        <div className=" hidden lg:block w-72 bg-primary fixed right-4 top-28 z-30 h-[44rem] pt-6 px-4 rounded-2xl shadow-lg">
          <h1 className="text-xl text-white font-bold mb-8 text-center">
            Who to follow
          </h1>
          <div className="flex text-white justify-between items-center mb-10">
            <div className="h-10 w-10 rounded-full bg-black"></div>
            <div>
              <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
            </div>
            <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
              Follow
            </button>
          </div>
          <div className="flex text-white justify-between items-center mb-10">
            <div className="h-10 w-10 rounded-full bg-black"></div>
            <div>
              <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
            </div>
            <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
              Follow
            </button>
          </div>
          <div className="flex text-white justify-between items-center mb-10">
            <div className="h-10 w-10 rounded-full bg-black"></div>
            <div>
              <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
            </div>
            <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
              Follow
            </button>
          </div>
          <div className="flex text-white justify-between items-center mb-10">
            <div className="h-10 w-10 rounded-full bg-black"></div>
            <div>
              <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
            </div>
            <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
              Follow
            </button>
          </div>
          <div className="flex text-white justify-between items-center mb-10">
            <div className="h-10 w-10 rounded-full bg-black"></div>
            <div>
              <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
            </div>
            <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
              Follow
            </button>
          </div>
          <div className="flex text-white justify-between items-center mb-10">
            <div className="h-10 w-10 rounded-full bg-black"></div>
            <div>
              <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
            </div>
            <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
              Follow
            </button>
          </div>
          <div className="flex text-white justify-between items-center mb-10">
            <div className="h-10 w-10 rounded-full bg-black"></div>
            <div>
              <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
            </div>
            <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
              Follow
            </button>
          </div>
          <div className="flex text-white justify-between items-center mb-10">
            <div className="h-10 w-10 rounded-full bg-black"></div>
            <div>
              <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
            </div>
            <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
              Follow
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="bg-secondary h-screen flex justify-center items-center">
          <div
            role="status"
            className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700 "
          >
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="flex items-center mt-4">
              <svg
                className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Timeline;

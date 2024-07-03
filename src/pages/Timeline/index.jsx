// import PostCard from "../../components/PostCard";
// import axios from "axios";
// import { useCallback, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import CreatePost from "../../components/CreatePost/CreatePost";
// import QuoteCard from "../../components/QouteCard";
// import ReviewCard from "../../components/ReviewCard";
// import RightSideBar from "../../components/RightSideBar/RightSideBar";

// function Timeline() {
//   const [posts, setPosts] = useState();
//   const [showPhotos, setShowPhoto] = useState(false);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const user = useSelector((state) => state.user.user);
//   const getPosts = async () => {
//     const res = await axios.get("/posts");
//     setPosts(res.data);
//     setLoading(false);
//     console.log(res.data);
//   };
//   const removePost = (id) => {
//     axios.delete(`/posts/${id}`);
//     getPosts();
//   };
//   const updatePosts = useCallback(() => {
//     getPosts();
//   }, []);
//   useEffect(() => {
//     getPosts();
//   }, []);
//   // if (loading) {
//   //   return (

//   //   );
//   // }
//   if (!user && status == "failed") {
//     return <Navigate to="/login" />;
//   }
//   // return (
//   //   <>
//   //     <div className="bg-secondary h-screen lg:ml ">
//   //       <CreatePost updatePosts={updatePosts} />
//   //       <div className="flex flex-col gap-6 items-center pt-20 bg-secondary">
//   //         {posts &&
//   //           posts.map((post) => {
//   //             if (post.type === "post") {
//   //               return (
//   //                 <PostCard
//   //                   postId={post._id}
//   //                   key={post._id}
//   //                   removePost={removePost}
//   //                 />
//   //               );
//   //             } else if (post.type === "review") {
//   //               return (
//   //                 <ReviewCard
//   //                   postId={post._id}
//   //                   key={post._id}
//   //                   removePost={removePost}
//   //                 />
//   //               );
//   //             } else {
//   //               return (
//   //                 <QuoteCard
//   //                   postId={post._id}
//   //                   key={post._id}
//   //                   removePost={removePost}
//   //                 />
//   //               );
//   //             }
//   //           })}
//   //       </div>
//   //       <div className=" hidden lg:block w-72 bg-primary fixed right-4 top-28 z-30 h-[44rem] pt-6 px-4 rounded-2xl shadow-lg">
//   //         <h1 className="text-xl text-white font-bold mb-8 text-center">
//   //           Who to follow
//   //         </h1>
//   //         <div className="flex text-white justify-between items-center mb-10">
//   //           <div className="h-10 w-10 rounded-full bg-black"></div>
//   //           <div>
//   //             <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
//   //           </div>
//   //           <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
//   //             Follow
//   //           </button>
//   //         </div>
//   //         <div className="flex text-white justify-between items-center mb-10">
//   //           <div className="h-10 w-10 rounded-full bg-black"></div>
//   //           <div>
//   //             <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
//   //           </div>
//   //           <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
//   //             Follow
//   //           </button>
//   //         </div>
//   //         <div className="flex text-white justify-between items-center mb-10">
//   //           <div className="h-10 w-10 rounded-full bg-black"></div>
//   //           <div>
//   //             <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
//   //           </div>
//   //           <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
//   //             Follow
//   //           </button>
//   //         </div>
//   //         <div className="flex text-white justify-between items-center mb-10">
//   //           <div className="h-10 w-10 rounded-full bg-black"></div>
//   //           <div>
//   //             <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
//   //           </div>
//   //           <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
//   //             Follow
//   //           </button>
//   //         </div>
//   //         <div className="flex text-white justify-between items-center mb-10">
//   //           <div className="h-10 w-10 rounded-full bg-black"></div>
//   //           <div>
//   //             <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
//   //           </div>
//   //           <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
//   //             Follow
//   //           </button>
//   //         </div>
//   //         <div className="flex text-white justify-between items-center mb-10">
//   //           <div className="h-10 w-10 rounded-full bg-black"></div>
//   //           <div>
//   //             <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
//   //           </div>
//   //           <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
//   //             Follow
//   //           </button>
//   //         </div>
//   //         <div className="flex text-white justify-between items-center mb-10">
//   //           <div className="h-10 w-10 rounded-full bg-black"></div>
//   //           <div>
//   //             <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
//   //           </div>
//   //           <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
//   //             Follow
//   //           </button>
//   //         </div>
//   //         <div className="flex text-white justify-between items-center mb-10">
//   //           <div className="h-10 w-10 rounded-full bg-black"></div>
//   //           <div>
//   //             <h1 className="text-sm font-semibold">Ahmed Abdelrazek</h1>
//   //           </div>
//   //           <button className="bg-secondary text-primary text-center rounded-full text-sm py-2 px-4 ">
//   //             Follow
//   //           </button>
//   //         </div>
//   //       </div>
//   //     </div>
//   //     {loading && (
//   //       <div className="bg-secondary h-screen flex justify-center items-center">
//   //         <div
//   //           role="status"
//   //           className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700 "
//   //         >
//   //           <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
//   //             <svg
//   //               className="w-10 h-10 text-gray-200 dark:text-gray-600"
//   //               aria-hidden="true"
//   //               xmlns="http://www.w3.org/2000/svg"
//   //               fill="currentColor"
//   //               viewBox="0 0 16 20"
//   //             >
//   //               <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
//   //               <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
//   //             </svg>
//   //           </div>
//   //           <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
//   //           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
//   //           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
//   //           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
//   //           <div className="flex items-center mt-4">
//   //             <svg
//   //               className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
//   //               aria-hidden="true"
//   //               xmlns="http://www.w3.org/2000/svg"
//   //               fill="currentColor"
//   //               viewBox="0 0 20 20"
//   //             >
//   //               <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
//   //             </svg>
//   //             <div>
//   //               <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
//   //               <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
//   //             </div>
//   //           </div>
//   //           <span className="sr-only">Loading...</span>
//   //         </div>
//   //       </div>
//   //     )}
//   //   </>
//   // );

//   return (
//     <>
//       <div className=" min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-4  lg:gap-20   px-10">
//         <div className="col-span-12 lg:col-span-7 mx-auto">
//           <div className="flex flex-col gap-20">
//             <CreatePost updatePosts={updatePosts} className="" />
//             <div className="  flex flex-col gap-4 ">
//               {posts &&
//                 posts.map((post) => {
//                   if (post.type === "post") {
//                     return (
//                       <PostCard
//                         postId={post._id}
//                         key={post._id}
//                         removePost={removePost}
//                       />
//                     );
//                   } else if (post.type === "review") {
//                     return (
//                       <ReviewCard
//                         postId={post._id}
//                         key={post._id}
//                         removePost={removePost}
//                       />
//                     );
//                   } else {
//                     return (
//                       <QuoteCard
//                         postId={post._id}
//                         key={post._id}
//                         removePost={removePost}
//                       />
//                     );
//                   }
//                 })}
//             </div>
//           </div>
//         </div>
//         <div className="col-span-12 lg:col-span-3">
//           <RightSideBar
//             user={user}
//           />
//         </div>
//         <div className="lg:col-span-2"></div>
//       </div>
//       {loading && (
//         <div className="bg-secondary min-h-screen flex justify-center items-center">
//           <div
//             role="status"
//             className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
//           >
//             <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
//               <svg
//                 className="w-10 h-10 text-gray-200 dark:text-gray-600"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 16 20"
//               >
//                 <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
//                 <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
//               </svg>
//             </div>
//             <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
//             <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
//             <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
//             <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
//             <div className="flex items-center mt-4">
//               <svg
//                 className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
//               </svg>
//               <div>
//                 <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
//                 <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
//               </div>
//             </div>
//             <span className="sr-only">Loading...</span>
//           </div>
//         </div>
//       )}
//     </>
//   );
  
// }

// export default Timeline;

import PostCard from "../../components/PostCard";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/CreatePost/CreatePost";
import QuoteCard from "../../components/QouteCard";
import ReviewCard from "../../components/ReviewCard";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import Swal from 'sweetalert';


function Timeline() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);

  const getPosts = async () => {
    const res = await axios.get("/posts");
    setPosts(res.data);
    setLoading(false);
    console.log(res.data);
  };



const removePost = async (postId) => {
  try {
    // Ask for confirmation before deleting
    const confirmed = await Swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this post!',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    });

    if (confirmed) {
      // User confirmed deletion, proceed with API call
      const res = await axios.delete(`/posts/${postId}`);

      if (res.status === 200) {
        Swal({
          title: 'Deleted!',
          text: 'Your post has been deleted successfully.',
          icon: 'success',
          button: 'OK',
        });
        // Optionally, you can also handle state updates or re-fetching posts here
      }
    } else {
      // User clicked Cancel, do nothing or show a message
      Swal({
        title: 'Cancelled',
        text: 'Your post is safe :)',
        icon: 'info',
        button: 'OK',
      });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    Swal({
      title: 'Error',
      text: 'Error deleting post',
      icon: 'error',
      button: 'OK',
    });
  }
};

  

  const updatePosts = useCallback(() => {
    getPosts();
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    return post.type === filter;
  });

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-20 px-10">
        <div className="col-span-12 lg:col-span-8 mx-auto">
          <div className="flex flex-col gap-20">
          <div className="flex  items-center mx-auto gap-4 mb-4">
              <button
                className={`py-2 px-auto rounded w-20 text-center font-medium ${filter === "all" ? "bg-primary text-white" : "bg-secondary text-black"}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`py-2 px-auto rounded w-20 text-center font-medium ${filter === "post" ? "bg-primary text-white" : "bg-secondary text-black"}`}
                onClick={() => setFilter("post")}
              >
                Posts
              </button>
              <button
                className={`py-2 px-auto w-20 rounded  font-medium text-center ${filter === "review" ? "bg-primary text-white" : "bg-secondary text-black"}`}
                onClick={() => setFilter("review")}
              >
                Reviews
              </button>
              <button
                className={`py-2 px-auto w-20 rounded  text-center  font-medium ${filter === "quote" ? "bg-primary text-white" : "bg-secondary text-black"}`}
                onClick={() => setFilter("quote")}
              >
                Quotes
              </button>
            </div>
            <CreatePost updatePosts={updatePosts} className="" />
           
            <div className="flex flex-col gap-4">
              {filteredPosts.map((post) => {
                if (post.type === "post") {
                  return (
                    <PostCard
                      postId={post._id}
                      key={post._id}
                      removePost={removePost}
                    />
                  );
                } else if (post.type === "review") {
                  return (
                    <ReviewCard
                      postId={post._id}
                      key={post._id}
                      removePost={removePost}
                    />
                  );
                } else {
                  return (
                    <QuoteCard
                      postId={post._id}
                      key={post._id}
                      removePost={removePost}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <RightSideBar user={user} />
        </div>
        <div className="lg:col-span-1"></div>
      </div>
      {loading && (
        <div className="bg-secondary min-h-screen flex justify-center items-center">
          <div
            role="status"
            className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
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



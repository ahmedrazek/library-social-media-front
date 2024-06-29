// // import React, { useEffect, useState } from 'react';
// // import { useSelector } from 'react-redux';
// // import axios from 'axios';
// // const SavedPosts = () => {
// //   const user = useSelector((state) => state.user.user);
// //   const savePosts = user?.savedPosts || []; 
// //   const [savedPosts, setSavedPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         const postIds = savePosts.map(post => post._id || post); 

// //         const postDetailsPromises = postIds.map(postId => 
// //           axios.get(`http://localhost:9000/posts/single/${postId}`)
// //         );

// //         const postsResponses = await Promise.all(postDetailsPromises);
// //         const posts = postsResponses.map(response => response.data);
// //         setSavedPosts(posts);
// //       } catch (error) {
// //         console.error("Error fetching saved posts", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (savePosts.length > 0) {
// //       fetchPosts();
// //     } else {
// //       setLoading(false);
// //     }
// //   }, [savePosts]);

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }
// //   if (!savePosts.length) {
// //     return (
// //       <div className='text-center'>
// //         <h2>Saved Posts</h2>
// //         <p>No saved posts found.</p>
// //       </div>
// //     );
// //   }
// //   return (
// //     <div className="container mx-auto my-8">
// //       <h1 className="text-2xl font-bold mb-4 text-center text-primary">My Saved Posts</h1>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //         {savedPosts.map((post) => (
// //           <div key={post._id} className="border border-gray-300 rounded-md p-4 shadow-lg">
// //             <div className="flex justify-between items-center">
// //               <div className="flex gap-2 items-center">
// //                 {post.userId?.photo && (
// //                   <img src={post.userId.photo} alt="" className="w-12 h-12 rounded-full" />
// //                 )}
// //                 <div>
// //                   <div className="flex gap-2 items-center">
// //                     <h2 className="font-semibold">{post.userId?.name}</h2>
// //                     <p className="text-xs text-gray-500">posted an update</p>
// //                   </div>
// //                   <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
// //                 </div>
// //               </div>
// //               <button className="text-primary" onClick={() =>removePost(post._id)}>
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   viewBox="0 0 24 24"
// //                   fill="currentColor"
// //                   className="w-5 h-5"
// //                 >
// //                   <path
// //                     fillRule="evenodd"
// //                     d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
// //                     clipRule="evenodd"
// //                   />
// //                 </svg>
// //               </button>
// //             </div>
// //             <div className="mt-4">
// //               <p>{post.description}</p>
// //             </div>
// //             {post.imageURL && (
// //               <div className="mt-4">
// //                 <img
// //                   src={`http://localhost:9000/postcard/${post.imageURL}`}
// //                   alt="Post"
// //                   className="object-contain rounded-2xl w-full h-40"
// //                 />
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default SavedPosts;

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// const SavedPosts = () => {
//   const user = useSelector((state) => state.user.user);
//   const savePosts = user?.savedPosts || [];
//   const [savedPosts, setSavedPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const postIds = savePosts.map(post => post._id || post);
//         const postDetailsPromises = postIds.map(postId => 
//           axios.get(`http://localhost:9000/posts/single/${postId}`)
//         );
//         const postsResponses = await Promise.all(postDetailsPromises);
//         const posts = postsResponses.map(response => response.data);
//         setSavedPosts(posts);
//       } catch (error) {
//         console.error("Error fetching saved posts", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (savePosts.length > 0) {
//       fetchPosts();
//     } else {
//       setLoading(false);
//     }
//   }, [savePosts]);
//   const removePost = async (postId) => {
//     try {
//       await axios.post(`http://localhost:9000/posts/unsave/${user._id}/${postId}`);
//       setSavedPosts(savedPosts.filter(post => post._id !== postId));
//     } catch (error) {
//       console.error("Error removing post", error);
//     }
//   };
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!savePosts.length) {
//     return (
//       <div className='text-center'>
//         <h2>Saved Posts</h2>
//         <p>No saved posts found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto my-8">
//       <h1 className="text-2xl font-bold mb-4 text-center text-primary">My Saved Posts</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {savedPosts.map((post) => (
//           <div key={post._id} className="w-full  h-auto border border-gray-300 rounded-md p-4 shadow-lg">
//             <div className="flex justify-between items-center">
//               <div className="flex gap-2 items-center">
//                 {post.userId?.photo && (
//                   <img src={post.userId.photo} alt="" className="w-12 h-12 rounded-full" />
//                 )}
//                 <div>
//                   <div className="flex gap-2 items-center">
//                     <h2 className="font-semibold">{post.userId?.name}</h2>
//                     <p className="text-xs text-gray-500">posted an update</p>
//                   </div>
//                   <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
//                 </div>
//               </div>
//               <button className="text-red-500" onClick={() => removePost(post._id)}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   className="w-5 h-5"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div className="mt-4">
//               <p>{post.description}</p>
//             </div>
//             {post.imageURL && (
//               <div className="mt-4">
//                 <img
//                   src={`http://localhost:9000/postcard/${post.imageURL}`}
//                   alt="Post"
//                   className="object-contain rounded-2xl w-full h-40"
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SavedPosts;


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PostCard from "../../components/PostCard"; // Assuming PostCard is used to render posts

const SavedPosts = () => {
  const user = useSelector((state) => state.user.user);
  const savePosts = user?.savedPosts || []; 
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postIds = savePosts.map(post => post._id || post); 

        const postDetailsPromises = postIds.map(postId => 
          axios.get(`/posts/single/${postId}`)
        );

        const postsResponses = await Promise.all(postDetailsPromises);
        const posts = postsResponses.map(response => response.data);
        setSavedPosts(posts);
      } catch (error) {
        console.error("Error fetching saved posts", error);
      } finally {
        setLoading(false);
      }
    };

    if (savePosts.length > 0) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [savePosts]);

  const removePost = (postId) => {
    // Assuming you have an API endpoint to remove a saved post
    axios.delete(`/posts/${postId}`)
      .then(() => {
        setSavedPosts(savedPosts.filter(post => post._id !== postId));
      })
      .catch((error) => {
        console.error("Error removing post", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!savePosts.length) {
    return (
      <div className='text-center'>
        <h2>Saved Posts</h2>
        <p>No saved posts found.</p>
      </div>
    );
  }

  return (
    <div className="  my-8">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">My Saved Posts</h1>
      <div className="grid   lg:grid-cols-2 gap-4">
        {savedPosts.map((post) => (
          <PostCard
            key={post._id}
            postId={post._id}
            removePost={removePost}
            className='min-h-screen'
          />
        ))}
      </div>
    </div>
  );
};

export default SavedPosts;

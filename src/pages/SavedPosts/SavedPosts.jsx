// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { Avatar } from '@chakra-ui/react';

// const SavedPosts = () => {
//   const user = useSelector((state) => state.user.user);
//   const savePosts = user?.savedPosts || []; // Ensure savePosts is an array
//   const [savedPosts, setSavedPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         // Extract post IDs if savePosts contains objects
//         const postIds = savePosts.map(post => post._id || post); // Adjust this if savePosts is a list of IDs directly

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

//   const removePost = (postId) => {
//     // Function to remove a post from saved posts
//     setSavedPosts(savedPosts.filter(post => post._id !== postId));
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
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {savedPosts.map((post) => (
//           <div key={post._id} className="border border-gray-300 rounded-md p-6 shadow-lg">
//             <div className="flex justify-between items-center">
//               <div className="flex gap-2 items-center">
//                 <div className="w-14 h-14 rounded-full bg-green-600 overflow-hidden border-2 border-zinc-900">
//                   {post.userId?.photo ? (
//                     <img
//                       src={`http://localhost:9000${post.userId.photo}`}
//                       className="object-cover w-full h-full"
//                     />
//                   ) : (
//                     <Avatar bg="teal.500" size="full" />
//                   )}
//                 </div>
//                 <div>
//                   <div className="flex gap-2 items-center">
//                     <h2 className="font-semibold">{post.userId?.name}</h2>
//                     <p className="text-xs text-gray-500">posted an update</p>
//                   </div>
//                   <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
//                 </div>
//               </div>
//               <button className="text-primary" onClick={() => removePost(post._id)}>
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
//                   className="object-contain rounded-2xl w-full h-48"
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


// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { Avatar } from '@chakra-ui/react';
// import PostCard from '../../components/PostCard/index'; // Adjust path as per your project structure

// const SavedPosts = () => {
//   const user = useSelector((state) => state.user.user);
//   const savePosts = user?.savedPosts || []; // Ensure savePosts is an array
//   const [savedPosts, setSavedPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         // Extract post IDs if savePosts contains objects
//         const postIds = savePosts.map(post => post._id || post); // Adjust this if savePosts is a list of IDs directly

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
//       const res = await axios.post(`/posts/remove/${user._id}/${postId}`);
//       console.log("Post removed:", res.data);
//       setSavedPosts(savedPosts.filter(post => post._id !== postId));
//     } catch (error) {
//       console.error("Error removing post:", error);
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
//     <h1 className="text-2xl font-bold mb-4 text-center text-primary">My Saved Posts</h1>
//     <div className="grid grid-cols-1   justify-items-center">
//       {savedPosts.map((post) => (
//         <PostCard
//           key={post._id}
//           postId={post._id}
//           removePost={removePost}
//           setImageUrl={() => {}}
//           setShowPhoto={() => {}}
//         />
//       ))}
//     </div>
//   </div>
//   );
// };

// export default SavedPosts;

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Avatar } from '@chakra-ui/react';
import PostCard from '../../components/PostCard/index'; // Assuming you have a PostCard component
import QuoteCard from '../../components/QouteCard/index'; // Assuming you have a ReviewCard component
import ReviewCard  from '../../components/ReviewCard/index'; // Assuming you have a QuoteCard component

const SavedPosts = () => {
  const user = useSelector((state) => state.user.user);
  const savePosts = user?.savedPosts || []; // Ensure savePosts is an array
  const saveReviews = user?.savedReviews || []; // Assuming savedReviews is an array in user object
  const saveQuotes = user?.savedQuotes || []; // Assuming savedQuotes is an array in user object

  const [savedPosts, setSavedPosts] = useState([]);
  const [savedReviews, setSavedReviews] = useState([]);
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        // Fetch saved posts
        const postIds = savePosts.map(post => post._id || post); // Adjust this if savePosts is a list of IDs directly
        const postDetailsPromises = postIds.map(postId => axios.get(`http://localhost:9000/posts/single/${postId}`));
        const postsResponses = await Promise.all(postDetailsPromises);
        const posts = postsResponses.map(response => response.data);
        setSavedPosts(posts);

        // Fetch saved reviews (assuming savedReviews structure and API endpoint)
        const reviewIds = saveReviews.map(review => review._id || review); // Adjust as per savedReviews structure
        const reviewDetailsPromises = reviewIds.map(reviewId => axios.get(`http://localhost:9000/reviews/single/${reviewId}`));
        const reviewsResponses = await Promise.all(reviewDetailsPromises);
        const reviews = reviewsResponses.map(response => response.data);
        setSavedReviews(reviews);

        // Fetch saved quotes (assuming savedQuotes structure and API endpoint)
        const quoteIds = saveQuotes.map(quote => quote._id || quote); // Adjust as per savedQuotes structure
        const quoteDetailsPromises = quoteIds.map(quoteId => axios.get(`http://localhost:9000/quotes/single/${quoteId}`));
        const quotesResponses = await Promise.all(quoteDetailsPromises);
        const quotes = quotesResponses.map(response => response.data);
        setSavedQuotes(quotes);
      } catch (error) {
        console.error("Error fetching saved items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (savePosts.length > 0 || saveReviews.length > 0 || saveQuotes.length > 0) {
      fetchSavedItems();
    } else {
      setLoading(false);
    }
  }, [savePosts, saveReviews, saveQuotes]);

  const removePost = async (postId) => {
    try {
      const res = await axios.post(`/posts/remove/${user._id}/${postId}`);
      console.log("Post removed:", res.data);
      setSavedPosts(savedPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Error removing post:", error);
    }
  };

  // Add similar remove functions for reviews and quotes as per your backend endpoints

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!savePosts.length && !saveReviews.length && !saveQuotes.length) {
    return (
      <div className='text-center'>
        <h2>Saved Items</h2>
        <p>No saved items found.</p>
      </div>
    );
  }

  // return (
  //   <div className="container mx-auto my-8">
  //     <h1 className="flex flex-col gap-4 text-2xl font-bold mb-4 text-center text-primary">My Saved Items</h1>
  //     <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 justify-items-center">
  //       {savedPosts.length > 0 && (
  //         <div className="saved-section">
  //           <h2 className="text-xl font-semibold my-2">Saved Posts</h2>
  //           {savedPosts.map(post => (
  //             <PostCard
  //               key={post._id}
  //               postId={post._id}
  //               removePost={removePost}
  //               setImageUrl={() => {}} // Adjust if needed
  //               setShowPhoto={() => {}} // Adjust if needed
  //             />
  //           ))}
  //         </div>
  //       )}
      
  //     </div>
  //     <div>
  //     {savedReviews.length > 0 && (
  //         <div className="saved-section">
  //           <h2 className="text-xl font-semibold mb-2">Saved Reviews</h2>
  //           {savedReviews.map(review => (
  //             <ReviewCard
  //               key={review._id}
  //               reviewId={review._id}
  //               removeReview={removeReview}
  //             />
  //           ))}
  //         </div>
    
  //       )}
  //     </div>
  //     <div>
  //        {savedQuotes.length > 0 && (
  //         <div className="saved-section">
  //           <h2 className="text-xl font-semibold my-2">Saved Quotes</h2>
  //           {savedQuotes.map(quote => (
  //             <QuoteCard
  //               key={quote._id}
  //               quoteId={quote._id}
  //               removeQuote={removeQuote}
  //             />
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center text-primary">My Saved Items</h1>
  
      <div className="mb-12">
        {savedPosts.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">Saved Posts</h2>
            <div className="flex flex-col items-center justify-center">
              {savedPosts.map(post => (
                <div key={post._id} className="w-full md:w-3/4 lg:w-1/2 mb-4">
                  <PostCard
                    postId={post._id}
                    removePost={removePost}
                    setImageUrl={() => {}} // Adjust if needed
                    setShowPhoto={() => {}} // Adjust if needed
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
  
      <div className="mb-12">
        {savedReviews.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">Saved Reviews</h2>
            <div className="flex flex-col items-center justify-center">
              {savedReviews.map(review => (
                <div key={review._id} className="w-full md:w-3/4 lg:w-1/2 mb-4">
                  <ReviewCard
                    reviewId={review._id}
                    removeReview={removeReview}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
  
      <div className="mb-12">
        {savedQuotes.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">Saved Quotes</h2>
            <div className="flex flex-col items-center justify-center">
              {savedQuotes.map(quote => (
                <div key={quote._id} className="w-full md:w-3/4 lg:w-1/2 mb-4">
                  <QuoteCard
                    quoteId={quote._id}
                    removeQuote={removeQuote}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
  
};

export default SavedPosts;




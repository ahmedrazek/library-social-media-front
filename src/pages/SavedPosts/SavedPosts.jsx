// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { Avatar } from '@chakra-ui/react';
// import PostCard from '../../components/PostCard/index'; // Assuming you have a PostCard component
// import QuoteCard from '../../components/QouteCard/index'; // Assuming you have a ReviewCard component
// import ReviewCard  from '../../components/ReviewCard/index'; // Assuming you have a QuoteCard component

// const SavedPosts = () => {
//   const user = useSelector((state) => state.user.user);
//   const savePosts = user?.savedPosts || []; // Ensure savePosts is an array
//   const saveReviews = user?.savedReviews || []; // Assuming savedReviews is an array in user object
//   const saveQuotes = user?.savedQuotes || []; // Assuming savedQuotes is an array in user object

//   const [savedPosts, setSavedPosts] = useState([]);
//   const [savedReviews, setSavedReviews] = useState([]);
//   const [savedQuotes, setSavedQuotes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSavedItems = async () => {
//       try {
//         // Fetch saved posts
//         const postIds = savePosts.map(post => post._id || post); // Adjust this if savePosts is a list of IDs directly
//         const postDetailsPromises = postIds.map(postId => axios.get(`http://localhost:9000/posts/single/${postId}`));
//         const postsResponses = await Promise.all(postDetailsPromises);
//         const posts = postsResponses.map(response => response.data);
//         setSavedPosts(posts);

//         // Fetch saved reviews (assuming savedReviews structure and API endpoint)
//         const reviewIds = saveReviews.map(review => review._id || review); // Adjust as per savedReviews structure
//         const reviewDetailsPromises = reviewIds.map(reviewId => axios.get(`http://localhost:9000/reviews/single/${reviewId}`));
//         const reviewsResponses = await Promise.all(reviewDetailsPromises);
//         const reviews = reviewsResponses.map(response => response.data);
//         setSavedReviews(reviews);

//         // Fetch saved quotes (assuming savedQuotes structure and API endpoint)
//         const quoteIds = saveQuotes.map(quote => quote._id || quote); // Adjust as per savedQuotes structure
//         const quoteDetailsPromises = quoteIds.map(quoteId => axios.get(`http://localhost:9000/quotes/single/${quoteId}`));
//         const quotesResponses = await Promise.all(quoteDetailsPromises);
//         const quotes = quotesResponses.map(response => response.data);
//         setSavedQuotes(quotes);
//       } catch (error) {
//         console.error("Error fetching saved items:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (savePosts.length > 0 || saveReviews.length > 0 || saveQuotes.length > 0) {
//       fetchSavedItems();
//     } else {
//       setLoading(false);
//     }
//   }, [savePosts, saveReviews, saveQuotes]);

//   const removePost = async (postId) => {
//     try {
//       const res = await axios.post(`/posts/remove/${user._id}/${postId}`);
//       console.log("Post removed:", res.data);
//       setSavedPosts(savedPosts.filter(post => post._id !== postId));
//     } catch (error) {
//       console.error("Error removing post:", error);
//     }
//   };

//   // Add similar remove functions for reviews and quotes as per your backend endpoints

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!savePosts.length && !saveReviews.length && !saveQuotes.length) {
//     return (
//       <div className='text-center'>
//         <h2>Saved Items</h2>
//         <p>No saved items found.</p>
//       </div>
//     );
//   }

//   // return (
//   //   <div className="container mx-auto my-8">
//   //     <h1 className="flex flex-col gap-4 text-2xl font-bold mb-4 text-center text-primary">My Saved Items</h1>
//   //     <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 justify-items-center">
//   //       {savedPosts.length > 0 && (
//   //         <div className="saved-section">
//   //           <h2 className="text-xl font-semibold my-2">Saved Posts</h2>
//   //           {savedPosts.map(post => (
//   //             <PostCard
//   //               key={post._id}
//   //               postId={post._id}
//   //               removePost={removePost}
//   //               setImageUrl={() => {}} // Adjust if needed
//   //               setShowPhoto={() => {}} // Adjust if needed
//   //             />
//   //           ))}
//   //         </div>
//   //       )}

//   //     </div>
//   //     <div>
//   //     {savedReviews.length > 0 && (
//   //         <div className="saved-section">
//   //           <h2 className="text-xl font-semibold mb-2">Saved Reviews</h2>
//   //           {savedReviews.map(review => (
//   //             <ReviewCard
//   //               key={review._id}
//   //               reviewId={review._id}
//   //               removeReview={removeReview}
//   //             />
//   //           ))}
//   //         </div>

//   //       )}
//   //     </div>
//   //     <div>
//   //        {savedQuotes.length > 0 && (
//   //         <div className="saved-section">
//   //           <h2 className="text-xl font-semibold my-2">Saved Quotes</h2>
//   //           {savedQuotes.map(quote => (
//   //             <QuoteCard
//   //               key={quote._id}
//   //               quoteId={quote._id}
//   //               removeQuote={removeQuote}
//   //             />
//   //           ))}
//   //         </div>
//   //       )}
//   //     </div>
//   //   </div>
//   // );
//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-2xl font-bold mb-8 text-center text-primary">My Saved Items</h1>

//       <div className="mb-12">
//         {savedPosts.length > 0 && (
//           <>
//             <h2 className="text-xl font-semibold mb-4 text-center">Saved Posts</h2>
//             <div className="flex flex-col items-center justify-center">
//               {savedPosts.map(post => (
//                 <div key={post._id} className="w-full md:w-3/4 lg:w-1/2 mb-4">
//                   <PostCard
//                     postId={post._id}
//                     removePost={removePost}
//                     setImageUrl={() => {}} // Adjust if needed
//                     setShowPhoto={() => {}} // Adjust if needed
//                   />
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       <div className="mb-12">
//         {savedReviews.length > 0 && (
//           <>
//             <h2 className="text-xl font-semibold mb-4 text-center">Saved Reviews</h2>
//             <div className="flex flex-col items-center justify-center">
//               {savedReviews.map(review => (
//                 <div key={review._id} className="w-full md:w-3/4 lg:w-1/2 mb-4">
//                   <ReviewCard
//                     reviewId={review._id}
//                     removeReview={removeReview}
//                   />
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       <div className="mb-12">
//         {savedQuotes.length > 0 && (
//           <>
//             <h2 className="text-xl font-semibold mb-4 text-center">Saved Quotes</h2>
//             <div className="flex flex-col items-center justify-center">
//               {savedQuotes.map(quote => (
//                 <div key={quote._id} className="w-full md:w-3/4 lg:w-1/2 mb-4">
//                   <QuoteCard
//                     quoteId={quote._id}
//                     removeQuote={removeQuote}
//                   />
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );

// };

// export default SavedPosts;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PostCard from "../../components/PostCard";
import QuoteCard from "../../components/QouteCard"; // Assuming you have a QuoteCard component
import ReviewCard from "../../components/ReviewCard"; // Assuming you have a ReviewCard component

const SavedPosts = () => {
  const user = useSelector((state) => state.user.user);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPosts = () => {
    setLoading(true);

    setSavedPosts(user?.savedPosts);
    console.log(
      savedPosts.map((post) => console.log(post._id)),
      savedPosts
    );
    setLoading(false);
  };
  useEffect(() => {
    getPosts();
  }, []);

  const removePost = async (postId) => {
    try {
      const res = await axios.post(`/posts/remove/${user._id}/${postId}`);
      console.log("Post removed:", res.data);
      setSavedPosts(savedPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error removing post:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!savedPosts.length) {
    return (
      <div className="text-center">
        <h2>Saved Items</h2>
        <p>No saved items found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center text-primary">
        My Saved Items
      </h1>

      {savedPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Saved Posts
          </h2>
          <div className="flex flex-col gap-6 items-center justify-center">
            {savedPosts.map((post) => {
              if (post.type === "post") {
                return (
                  <PostCard
                    // setImageUrl={setImageUrl}
                    // setShowPhoto={setShowPhoto}
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
      )}
    </div>
  );
};

export default SavedPosts;

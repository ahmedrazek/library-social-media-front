

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PostCard from '../../components/PostCard';
import QuoteCard from '../../components/QouteCard'; // Assuming you have a QuoteCard component
import ReviewCard from '../../components/ReviewCard'; // Assuming you have a ReviewCard component

const SavedPosts = () => {
  const user = useSelector((state) => state.user.user);
  const savePosts = user?.savedPosts || [];
  const saveReviews = user?.savedReviews || [];
  const saveQuotes = user?.savedQuotes || [];

  const [savedPosts, setSavedPosts] = useState([]);
  const [savedReviews, setSavedReviews] = useState([]);
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        // Fetch saved posts
        const postIds = savePosts.map(post => post._id || post);
        const postDetailsPromises = postIds.map(postId => axios.get(`http://localhost:9000/posts/single/${postId}`));
        const postsResponses = await Promise.all(postDetailsPromises);
        const posts = postsResponses.map(response => response.data);
        setSavedPosts(posts);

        // Fetch saved reviews
        const reviewIds = saveReviews.map(review => review._id || review);
        const reviewDetailsPromises = reviewIds.map(reviewId => axios.get(`http://localhost:9000/reviews/single/${reviewId}`));
        const reviewsResponses = await Promise.all(reviewDetailsPromises);
        const reviews = reviewsResponses.map(response => response.data);
        setSavedReviews(reviews);

        // Fetch saved quotes
        const quoteIds = saveQuotes.map(quote => quote._id || quote);
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

  const removeReview = async (reviewId) => {
    try {
      const res = await axios.delete(`/reviews/${reviewId}`);
      console.log("Review removed:", res.data);
      setSavedReviews(savedReviews.filter(review => review._id !== reviewId));
    } catch (error) {
      console.error("Error removing review:", error);
    }
  };

  const removeQuote = async (quoteId) => {
    try {
      const res = await axios.delete(`/quotes/${quoteId}`);
      console.log("Quote removed:", res.data);
      setSavedQuotes(savedQuotes.filter(quote => quote._id !== quoteId));
    } catch (error) {
      console.error("Error removing quote:", error);
    }
  };

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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center text-primary">My Saved Items</h1>

      {savedPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-center">Saved Posts</h2>
          <div className="flex flex-col items-center justify-center">
            {savedPosts.map(post => (
              <div key={post._id} className="w-full md:w-3/4 lg:w-1/2 mb-4">
                <PostCard
                  postId={post._id}
                  removePost={() => removePost(post._id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {savedReviews.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-center">Saved Reviews</h2>
          <div className="flex flex-col items-center justify-center">
            {savedReviews.map(post => (
              <div key={post._id} className="w-full md:w-3/4 lg:w-1/2 mb-4">
                <ReviewCard
                  reviewId={post._id}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {savedQuotes.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-center">Saved Quotes</h2>
          <div className="flex flex-col items-center justify-center">
            {savedQuotes.map(post => (
              <div key={post._id} className="w-full md:w-3/4 lg:w-1/2 mb-4">
                <QuoteCard
                  quoteId={post._id}
                  
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPosts;

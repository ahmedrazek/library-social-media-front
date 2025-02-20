// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { differenceInMinutes } from "date-fns";
// import axios from "axios";
// import AddComment from "../AddComment";
// import CommentPopup from "../CommentPopup";
// import { FaBookmark, FaRegBookmark } from "react-icons/fa";
// import { Link } from "react-router-dom";

// // eslint-disable-next-line react/prop-types
// const PostCard = ({ postId, removePost, setImageUrl, setShowPhoto }) => {
//   // const [showPhotos, setShowPhoto] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [like, setLike] = useState(false);
//   const [date, setDate] = useState("");
//   const [post, setPost] = useState(null);
//   const [likesNum, setLikesNum] = useState(0);
//   const [comment, setComment] = useState("");
//   const [saved, setSaved] = useState(false);
//   const user = useSelector((state) => state.user.user);

//   const calculateDate = (createdAt) => {
//     const postDate = differenceInMinutes(
//       new Date(Date.now()),
//       new Date(createdAt)
//     );
//     if (postDate > 1440) {
//       setDate(`${Math.floor(postDate / 1440)} days`);
//     } else if (postDate > 60) {
//       setDate(`${Math.floor(postDate / 60)} hours`);
//     } else {
//       setDate(`${Math.floor(postDate)} minutes`);
//     }
//   };

//   const getPost = async () => {
//     try {
//       const res = await axios.get(`/posts/single/${postId}`);
//       setPost(res.data);
//       calculateDate(res.data.createdAt);
//       setLike(res.data.likes.some((like) => like._id === user._id));
//       setLikesNum(res.data.likes.length);

//       const savedState = localStorage.getItem(`saved-${postId}`);
//       if (savedState !== null) {
//         setSaved(JSON.parse(savedState));
//       } else {
//         setSaved(res.data.savedPosts?.includes(postId));
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const addComment = async () => {
//     try {
//       const commentBody = { userId: user._id, postId, description: comment };
//       const res = await axios.post("/comments", commentBody);
//       console.log(res);
//       getPost();
//       setComment("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const toggleLike = async () => {
//     try {
//       if (!like) {
//         setLike(true);
//         await axios.post(`/posts/like/${user?._id}/${post._id}`);
//         setLikesNum(likesNum + 1);
//       } else {
//         setLike(false);
//         const res = await axios.post(`/posts/dislike/${user?._id}/${post._id}`);
//         setLikesNum(likesNum - 1);
//         console.log("dislike", res);
//       }
//     } catch (error) {
//       setLike(!like);
//       console.error(error);
//     }
//   };

//   const savePost = async () => {
//     try {
//       if (saved) {
//         const res = await axios.post(`/posts/unsave/${user._id}/${postId}`);
//         setSaved(false);
//         localStorage.setItem(`saved-${postId}`, JSON.stringify(false));
//         console.log("Post unsaved:", res.data);
//       } else {
//         const res = await axios.post(`/posts/save/${user._id}/${postId}`);
//         setSaved(true);
//         localStorage.setItem(`saved-${postId}`, JSON.stringify(true));
//         console.log("Post saved:", res.data);
//       }
//     } catch (error) {
//       console.error("Error saving or unsaving the post", error);
//     }
//   };

//   useEffect(() => {
//     getPost();
//   }, []);

//   if (!post) return null;
//   if (showPhotos) {
//     return (
//       <>
//         <div className=" w-11/12 lg:w-8/12 mx-auto absolute inset-0 text-white min-h-screen">
//           <div className="bg-black w-full h-full">
//             <div>
//               <img src={post.photo} alt="" />
//             </div>
//             <button className="absolute left-10 top-1/2 text-5xl">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="size-6"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
//                   clipRule="evenodd"
//                 />
//                 <path
//                   fillRule="evenodd"
//                   d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L11.69 12l-6.97-6.97a.75.75 0 0 0-1.06-1.06l7.5 7.5Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//             <button className="absolute right-10 top-1/2 text-5xl">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="size-6"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12l-6.97-6.97a.75.75 0 1 1 1.06-1.06l7.5 7.5Z"
//                   clipRule="evenodd"
//                 />
//                 <path
//                   fillRule="evenodd"
//                   d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 1 1 1.06-1.06l7.5 7.5Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//             <button
//               className="absolute top-10 right-10"
//               onClick={() => setShowPhoto(false)}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="size-6"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }
//   return (
//     <>
//       <div className="flex flex-col p-4 rounded-xl gap-3 w-11/12 lg:w-5/12 bg-white">
//         <div className="flex justify-between  items-center">
//           <div className="flex gap-2">
//             <div className=" w-12 h-12 rounded-full bg-black">
//               {post.userId?.photo && <img src={post.userId.photo} alt="" />}
//             </div>
//             <div>
//               <div className="flex gap-2 items-center">
//                 <Link
//                   to={`/user/userProfile/${post.userId?._id}/posts`}
//                   className="font-semibold"
//                 >
//                   {post.userId?.name}
//                 </Link>
//                 <p className=" text-xs text-gray-500">posted an update</p>
//               </div>
//               <p className=" text-xs text-gray-500">{date} ago</p>
//             </div>
//           </div>
//           <div className="flex justify-between gap-8">
//             {user?._id == post.userId?._id ? (
//               <button
//                 className="text-primary"
//                 onClick={() => removePost(post._id)}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   className="size-5"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//             ) : null}
//             <button
//               onClick={savePost}
//               className="text-primary flex items-center gap-1"
//             >
//               {saved ? (
//                 <>
//                   <FaBookmark className="w-5 h-5" />
//                   <span>Saved</span>
//                 </>
//               ) : (
//                 <>
//                   <FaRegBookmark className="w-5 h-5" />
//                   <span>Save</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//         {/* POST DESC  */}
//         <div className="px-2">
//           <p>{post.description}</p>
//         </div>
//         {/* POST GALLERY  */}
//         {post.imageURL && (
//           <div className="h-[28rem]  w-full">
//             <img
//               src={`http://localhost:9000/postcard/${post.imageURL}`}
//               alt="Post"
//               className=" object-contain rounded-2xl h-full w-full cursor-pointer"
//               onClick={() => {
//                 setShowPhoto(true);
//                 setImageUrl(post.imageURL);
//               }}
//             />
//           </div>
//         )}
//         {/* COMMENT SECTION  */}
//         <div className="flex justify-between">
//           <div className="flex gap-2">
//             <button onClick={toggleLike}>
//               {like && (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   className="size-5 text-red-600"
//                 >
//                   <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
//                 </svg>
//               )}
//               {!like && (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="size-5 text-red-600"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
//                   />
//                 </svg>
//               )}
//             </button>
//             <p>{likesNum}</p>
//           </div>
//           <div
//             onClick={() => setShowComments(true)}
//             className=" cursor-pointer"
//           >
//             <span>{post.comments.length}</span> comments
//           </div>
//         </div>
//         <AddComment
//           comment={comment}
//           addComment={addComment}
//           setComment={setComment}
//           user={user}
//         />
//       </div>
//       {showComments && (
//         <CommentPopup
//           setComment={setComment}
//           post={post}
//           comment={comment}
//           addComment={addComment}
//           user={user}
//           setShowComments={setShowComments}
//           getPost={getPost}
//         />
//       )}
//     </>
//   );
// };

// export default PostCard;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { differenceInMinutes } from "date-fns";
import axios from "axios";
import AddComment from "../AddComment";
import CommentPopup from "../CommentPopup";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Avatar } from "@chakra-ui/react";
import { MdOutlineInsertComment } from "react-icons/md";
import { addSavePost, removeSavedPost } from "../../store/userSlice";
const PostCard = ({ postId, removePost, setImageUrl, setShowPhoto }) => {
  const [showComments, setShowComments] = useState(false);
  const [like, setLike] = useState(false);
  const [date, setDate] = useState("");
  const [post, setPost] = useState(null);
  const [likesNum, setLikesNum] = useState(0);
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
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
      console.error("Error fetching post data:", error);
    }
  };

  const addComment = async () => {
    try {
      const commentBody = { userId: user._id, postId, description: comment };
      const res = await axios.post("/comments", commentBody);
      console.log(res);
      getPost();
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const toggleLike = async () => {
    try {
      if (!like) {
        setLike(true);
        setLikesNum(likesNum + 1);
        await axios.post(`/posts/like/${user?._id}/${post._id}`);
      } else {
        setLike(false);
        setLikesNum(likesNum - 1);
        await axios.post(`/posts/dislike/${user?._id}/${post._id}`);
      }
    } catch (error) {
      setLike(!like);
      console.error("Error toggling like:", error);
    }
  };

  const savePost = async () => {
    try {
      if (saved) {
        setSaved(false);
        const res = await axios.post(`/posts/unsave/${user._id}/${postId}`);
        localStorage.setItem(`saved-${postId}`, JSON.stringify(false));
        console.log("Post unsaved:", res.data);
        dispatch(removeSavedPost(postId));
      } else {
        setSaved(true);
        const res = await axios.post(`/posts/save/${user._id}/${postId}`);
        localStorage.setItem(`saved-${postId}`, JSON.stringify(true));
        console.log("Post saved:", res.data);
        dispatch(addSavePost(post));
      }
    } catch (error) {
      console.error("Error saving or unsaving the post:", error);
    }
  };

  useEffect(() => {
    getPost();
    if (user?.savedPosts.find((post) => post._id == postId)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, []);

  if (!post) return null;

  return (
    <>
      <div className="flex flex-col p-4 rounded gap-4 w-11/12 lg:w-[40rem] shadow-md bg-gray-50">
        <div className="flex justify-between  items-center">
          <div className="flex gap-2">
            <div className="w-14 h-14 rounded-full bg-green-600 overflow-hidden border-2 border-zinc-900">
              {post.userId?.photo ? (
                <img
                  src={`http://localhost:9000${post.userId.photo}`}
                  className="object-cover  w-full h-full"
                />
              ) : (
                <Avatar bg="teal.500" size="full" />
              )}
            </div>
            <div>
              <div className="flex gap-2 items-center">
                <Link
                  to={`/user/userprofile/${post.userId?._id}`}
                  className="font-bold text-primary cursor-pointer"
                >
                  {post.userId?.name || "Username"}
                </Link>
              </div>
              <p className="text-sm text-zinc-500">{date} ago</p>
            </div>
          </div>
          <div className="flex justify-between gap-8">
            {user?._id === post.userId?._id ? (
              <button
                className="text-red-500"
                onClick={() => removePost(post._id)}
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
        </div>
        {/* POST DESC  */}
        <div className="px-2">
          <p>{post.description}</p>
        </div>
        {/* POST IMAGE */}
        {post.imageURL ? (
          <div
            className="w-full cursor-pointer"
            onClick={() => {
              setImageUrl(`/postcard/${post.imageURL}`);
              setShowPhoto(true);
            }}
          >
            <img
              src={`http://localhost:9000/postcard/${post.imageURL}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ) : null}
        {/* LIKES & COMMENTS */}
        <div className="flex gap-4 px-2">
          <div className="flex gap-1">
            <button
              onClick={toggleLike}
              className="text-red-500 flex items-center gap-1"
            >
              {like ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span>{likesNum}</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.6 16.57L12 19.35l-1.9-1.72C5.4 14.1 3 11.36 3 8.5 3 6.42 4.42 5 6.5 5c1.54 0 3.04.8 3.91 2.09h.18C13.96 5.8 15.46 5 17 5c2.08 0 3.5 1.42 3.5 3.5 0 2.86-2.4 5.6-6.1 8.57z" />
                  </svg>
                  <span>{likesNum}</span>
                </>
              )}
            </button>
          </div>
          <div className="flex gap-1">
            <button
              className="text-primary flex items-center gap-1"
              onClick={() => setShowComments(true)}
            >
              <MdOutlineInsertComment className="w-5 h-5" />

              <span>{post.comments.length}</span>
            </button>
          </div>
          <div>
            <button
              onClick={savePost}
              className="text-primary flex items-center gap-1"
            >
              {saved ? (
                <>
                  <FaBookmark className="w-5 h-5" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <FaRegBookmark className="w-5 h-5" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        </div>
        {/* ADD COMMENT  */}
        <div className="p-2">
          <AddComment
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            user={user}
          />
        </div>
      </div>
      {showComments && (
        <CommentPopup
          setComment={setComment}
          post={post}
          comment={comment}
          addComment={addComment}
          user={user}
          setShowComments={setShowComments}
          getPost={getPost}
        />
      )}
    </>
  );
};

export default PostCard;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../PostCard";

export const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user.user);
  const getUserPosts = async () => {
    const res = await axios.get(`/posts/${user._id}`);
    setPosts(res.data);
    console.log(res.data);
  };
  const removePost = (id) => {
    axios.delete(`/posts/${id}`);
    getUserPosts();
  };
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 items-center pt-20">
        {posts &&
          posts.map((post) => (
            <PostCard
              postId={post._id}
              key={post._id}
              removePost={removePost}
            />
          ))}
      </div>
    </div>
  );
};

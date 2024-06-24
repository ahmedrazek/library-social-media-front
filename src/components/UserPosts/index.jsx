import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../PostCard";
import { useParams } from "react-router-dom";

export const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const getUserPosts = async () => {
    const res = await axios.get(`/posts/${userId}`);
    setPosts(res.data);
    console.log(res.data);
  };
  const removePost = (id) => {
    axios.delete(`/posts/${id}`);
    getUserPosts();
  };
  useEffect(() => {
    if (id) {
      setUserId(id);
    } else if (user && user._id) {
      setUserId(user._id);
    }
    getUserPosts();
  }, [userId]);

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

import PostCard from "../../components/PostCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../store/userSlice";

export default function Timeline() {
  const [posts, setPosts] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const getPosts = async () => {
    const res = await axios.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    getPosts();
    if (!user && status === "idle") {
      dispatch(fetchUserProfile());
    }
  }, [user, status, dispatch]);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
<<<<<<< HEAD
    <>
      <div className="flex flex-col gap-12 items-center pt-20 bg-secondary">
        {posts &&
          posts.map((post) => <PostCard postId={post._id} key={post._id} />)}
      </div>
      ;
    </>
=======
    <div>
      {/* <h1>User name : {user.name}</h1>
      <h2>USer email : {user.email}</h2>
       */}
    </div>
>>>>>>> e8abc6248d1aa433d765782f0f82415555affc17
  );
}

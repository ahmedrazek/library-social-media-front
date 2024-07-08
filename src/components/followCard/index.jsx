/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setNewFollowing, setUnFollow } from "../../store/userSlice";

export const FollowCard = ({ follow, user }) => {
  const [userFollow, setUserFollow] = useState(false);
  const dispatch = useDispatch();
  const followUser = async () => {
    try {
      setUserFollow(true);
      await axios.post(`/users/follow/${user?._id}/${follow?._id}`);
      dispatch(setNewFollowing(follow));
    } catch (error) {
      console.log("followCard Error:", error);
    }
  };

  const unFollow = async () => {
    try {
      setUserFollow(false);
      await axios.post(`/users/unfollow/${user?._id}/${follow?._id}`);
      dispatch(setUnFollow(follow));
    } catch (error) {
      console.log("followCard Error:", error);
    }
  };

  useEffect(() => {
    if (user?.following.find((follower) => follower._id === follow?._id)) {
      setUserFollow(true);
    }
  }, [user, follow]);

  return (
    <div className="py-6">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <div className="h-10 w-10 rounded-full bg-black">
            {follow?.photo ? (
              <img
                src={`http://localhost:9000${follow?.photo}`}
                alt={follow?.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-black"></div>
            )}
          </div>
          <Link to={`/user/userProfile/${follow?._id}`}>{follow?.name}</Link>
        </div>
        {userFollow ? (
          <button
            className="bg-primary text-white px-4 py-2 rounded-full"
            onClick={unFollow}
          >
            Following
          </button>
        ) : (
          <button
            className="bg-white text-primary border border-primary px-4 py-2 rounded-full"
            onClick={followUser}
          >
            Follow
          </button>
        )}
      </div>
      <div className="ml-10">
        {follow?.quote ? <q>{follow.quote}</q> : null}
      </div>
    </div>
  );
};

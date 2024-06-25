/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const FollowCard = ({ follow, user, curUser }) => {
  const [userFollow, setUserFollow] = useState(false);
  const followUser = async () => {
    const res = await axios.post(`/users/follow/${user?._id}/${follow?._id}`);
    console.log(res);

    setUserFollow(true);
  };
  const unFollow = async () => {
    const res = await axios.post(`/users/unfollow/${user?._id}/${follow?._id}`);
    console.log(res);
    setUserFollow(false);
  };
  useEffect(() => {
    if (user?.following.find((follower) => follower._id == follow?._id)) {
      setUserFollow(true);
    }
    console.log(
      user?.following.find((follower) => follower._id == follow?._id)
    );
  }, []);
  return (
    <div className="py-6">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <div className="h-10 w-10 rounded-full bg-black"></div>
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
        {follow?.quote ? `<q>${follow.quote}</q>` : null}
      </div>
    </div>
  );
};

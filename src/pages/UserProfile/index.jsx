import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Navigate, Outlet, useParams } from "react-router-dom";
import {
  fetchUserProfile,
  setNewFollowing,
  setUnFollow,
} from "../../store/userSlice";

export const UserProfile = () => {
  const [curUser, setCurUser] = useState(null);
  const [following, setFollow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const getUser = async (userId) => {
    try {
      setLoading(true);
      const res = await axios.get(`/users/${userId}`);
      setCurUser(res.data);
      setFollowersCount(res.data.followers.length);
      // Check if the current user is following the fetched user
      if (user?.following.find((follow) => follow._id === res.data._id)) {
        setFollow(true);
      } else {
        setFollow(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const follow = async () => {
    try {
      setFollow(true);
      setFollowersCount(followersCount + 1);
      await axios.post(`/users/follow/${user._id}/${id}`);
      dispatch(setNewFollowing(curUser));
      // fetchUser();
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const unFollow = async () => {
    setFollow(false);
    setFollowersCount(followersCount - 1);
    const res = await axios.post(`/users/unfollow/${user._id}/${id}`);
    // fetchUser();
    dispatch(setUnFollow(curUser));
    console.log(res);
  };
  const fetchUser = useCallback(() => {
    dispatch(fetchUserProfile());
  }, []);
  useEffect(() => {
    getUser(id);
  }, [id]);

  if (id === user?._id) {
    return <Navigate to={"/user/profile"} />;
  }

  if (loading || !curUser) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-32  mx-10">
      <div
        className="h-80 mx-2 lg:mx-20  rounded-3xl bg-black flex items-end justify-between px-8 py-4 text-white relative"
        style={{
          backgroundImage: `url(${curUser?.cover ? curUser.cover : ""})`,
        }}
      >
        <div className="flex flex-col items-center gap-4 absolute -bottom-28">
          <div className="h-40 w-40 rounded-full bg-green-600">
            {curUser.photo ? (
              <img
                src={`${curUser.photo}`}
                alt="Profile Avatar"
                className="h-40 w-40 rounded-full object-cover"
              />
            ) : null}
          </div>
          <h1 className="text-2xl font-semibold text-black">
            {curUser && curUser.name}
          </h1>
        </div>
        <div className="absolute right-10 -bottom-28">
          {following ? (
            <button
              className="text-white bg-primary px-4 py-2 text-md rounded-full border hover:border-2 border-primary font-semibold"
              onClick={unFollow}
            >
              Following
            </button>
          ) : (
            <button
              className="text-primary bg-white px-4 py-2 text-md rounded-full border hover:border-2 border-primary font-semibold"
              onClick={follow}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="text-center mt-20 border-b-2 pb-10">
        <q className="italic font-semibold text-xl">
          {curUser.bio ? curUser.bio : "NO BIO"}
        </q>
      </div>
      <div className="mx-auto flex justify-center text-xl divide-x divide-gray-500 mt-10 text-primary border-b pb-4 border-gray-400 w-[30rem]">
        <NavLink
          className={({ isActive }) =>
            isActive ? "px-12 font-semibold text-red-500" : "px-12"
          }
          to={"posts"}
        >
          Posts
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "px-12 text-red-500 flex gap-2" : "px-12 flex gap-2"
          }
          to={"following"}
        >
          <span className="text-xl italic font-bold">
            {curUser?.following.length}
          </span>{" "}
          Following
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "px-12 text-red-500 flex gap-2" : "px-12 flex gap-2"
          }
          to={"followers"}
        >
          <span className="text-xl italic font-bold">{followersCount}</span>{" "}
          Followers
        </NavLink>
      </div>
      <Outlet context={[fetchUser]} />
    </div>
  );
};

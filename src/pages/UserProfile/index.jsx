import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet, useParams } from "react-router-dom";

export const UserProfile = () => {
  const [curUser, setCurUser] = useState(null);
  const [following, setFollow] = useState(false);
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const getUser = async () => {
    const res = await axios.get(`/users/${id}`);
    setCurUser(res.data);
    if (user?.following.find((follow) => follow._id == curUser._id)) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  };
  const follow = async () => {
    const res = await axios.post(`/users/follow/${user._id}/${id}`);
    console.log(res);
    setFollow(true);
  };
  const unFollow = async () => {
    const res = await axios.post(`/users/unfollow/${user._id}/${id}`);
    console.log(res);
    setFollow(false);
  };
  useEffect(() => {
    getUser();
    console.log(
      user?.following.find((follow) => follow._id == curUser._id),
      curUser,
      user
    );
  }, []);
  if (id == user?._id) {
    return <Navigate to={"/user/profile"} />;
  }
  return (
    <div className="mt-32   ml-72 mr-10">
      <div
        className="h-80 rounded-3xl bg-black flex items-end justify-between px-8 py-4 text-white relative "
        style={{
          backgroundImage: `url(${curUser?.cover ? curUser.cover : ""})`,
        }}
      >
        <div className="flex flex-col items-center gap-4 absolute -bottom-28 ">
          <div className="h-40 w-40 rounded-full bg-red-500">
            {curUser?.photo ? (
              <img
                src={curUser.photo}
                alt="profile"
                className="h-40 w-40 rounded-full object-cover"
              />
            ) : null}
          </div>
          <h1 className="text-2xl font-semibold text-black">
            {curUser && curUser.name}
          </h1>
        </div>
        <div className=" absolute right-10 -bottom-28">
          {following ? (
            <button
              className="text-white bg-primary px-4 py-2 text-md rounded-full  border hover:border-2 border-primary font-semibold"
              onClick={unFollow}
            >
              Following
            </button>
          ) : (
            <button
              className="text-primary bg-white px-4 py-2 text-md rounded-full  border hover:border-2 border-primary font-semibold"
              onClick={follow}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="text-center mt-20 border-b-2 pb-10 ">
        <q className=" italic font-semibold text-xl">
          One day you leave this life behind so live a life you will remember
        </q>
      </div>
      <div className="mx-auto flex justify-center text-xl divide-x divide-gray-500 mt-10 text-black border-b pb-4 border-gray-400 w-[30rem]">
        <Link className="px-12" to={"posts"}>
          Posts
        </Link>
        <Link className="px-12 flex gap-4" to={"following"}>
          <span className="font-bold italic text-xl ">
            {curUser?.following.length}
          </span>{" "}
          Following
        </Link>
        <Link className="px-12 flex gap-4" to={"followers"}>
          <span className="font-bold italic text-xl ">
            {curUser?.followers.length}
          </span>{" "}
          Followers{" "}
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

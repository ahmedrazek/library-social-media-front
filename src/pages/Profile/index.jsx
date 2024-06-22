import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="mt-32   ml-60 mr-10">
      <div className="h-80 rounded-3xl bg-black flex items-end justify-between px-8 py-4 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-40 w-40 rounded-full bg-white"></div>
          <h1 className="text-2xl font-semibold">
            {user && user.name} Abdelrazek
          </h1>
        </div>
        <div>
          <button className="text-primary bg-white px-4 py-2 text-lg font-semibold rounded-sm">
            Edit Profile
          </button>
        </div>
      </div>
      <div className="mx-auto flex justify-center text-xl divide-x divide-gray-500 mt-10 text-primary font-semibold">
        <Link className="px-12" to={"posts"}>
          Posts
        </Link>
        <Link className="px-12" to={"following"}>
          Following
        </Link>
        <Link className="px-12" to={"followers"}>
          Followers{" "}
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;

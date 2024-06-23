import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  if (!user && status == "failed") {
    return <Navigate to="/login" />;
  }
  return (
    <div className="mt-32   ml-72 mr-10">
      <div
        className="h-80 rounded-3xl bg-black flex items-end justify-between px-8 py-4 text-white relative "
        style={{ backgroundImage: `url(${user.cover ? user.cover : ""})` }}
      >
        <div className="flex flex-col items-center gap-4 absolute -bottom-28 ">
          <div className="h-40 w-40 rounded-full bg-red-500">
            {user.photo ? (
              <img
                src={user.photo}
                alt="profile"
                className="h-40 w-40 rounded-full object-cover"
              />
            ) : null}
          </div>
          <h1 className="text-2xl font-semibold text-black">
            {user && user.name} Abdelrazek
          </h1>
        </div>
        <div>
          <button className="text-primary bg-white px-4 py-2 text-md rounded-full absolute right-10 -bottom-28 border hover:border-2 border-primary font-semibold">
            Edit Profile
          </button>
        </div>
      </div>
      <div className="text-center mt-20 border-b-2 pb-10 ">
        <q className=" italic font-semibold text-xl">
          One day you leave this life behind so live a life you will remember
        </q>
      </div>
      <div className="mx-auto flex justify-center text-xl divide-x divide-gray-500 mt-10 text-primary font-semibold border-b pb-4 border-gray-400 w-[30rem]">
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

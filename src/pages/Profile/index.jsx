import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import EditProfilePopup from "../../components/EditProfilePopup/EditProfilePopup";
import axios from "axios";
import { Avatar } from "@chakra-ui/react";
import { fetchUserProfile } from "../../store/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const [showEditProfilePopup, setShowEditProfilePopup] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [cover, setCover] = useState(null);
  const [bio, setBio] = useState("");

  const handleEditProfile = async (formData) => {
    try {
      console.log("Sending update profile request...");

      const response = await axios.put("/users/updateProfile", formData);
      console.log("Update profile response:", response.data);
      updateProfile();
      setShowEditProfilePopup(false);
      dispatch(fetchUserProfile());
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const updateProfile = useCallback(async () => {
    try {
      const response = await axios.get(`/users/${user._id}`);
      console.log("Updated user data:", response.data);
      setAvatar(response.data.photo);
      setCover(response.data.cover);
      setBio(response.data.bio);
    } catch (error) {
      console.error("Error fetching updated user data:", error);
    }
  }, [user?._id]);

  useEffect(() => {
    if (user) {
      setAvatar(user.photo);
      setCover(user.cover);
      setBio(user.bio || "");
    }
  }, []);

  if (!user && status === "failed") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="mt-32">
      <div
        className="h-80 mx-2 lg:mx-20 rounded-3xl bg-primary flex items-end justify-between px-8 py-4 text-white relative"
        style={{
          backgroundImage: `url(http://localhost:9000${cover})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="flex flex-col items-center gap-4 absolute -bottom-28">
          <div className="h-40 w-40 border border-green-900 rounded-full overflow-hidden ">
            {avatar ? (
              <img
                src={`http://localhost:9000${avatar}`}
                alt="Profile Avatar"
                className="h-40 w-40 object-cover rounded-full"
              />
            ) : (
              <Avatar className=" bg-primary" />
            )}
          </div>
          <h1 className="text-2xl font-semibold text-black">
            {user && user.name}
          </h1>
        </div>

        <div>
          <button
            className="text-primary bg-white px-4 py-2 text-md rounded hover:bg-primary hover:text-secondary absolute right-10 -bottom-28 border hover:border-2 border-primary font-semibold"
            onClick={() => setShowEditProfilePopup(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="text-center mt-20 border-b-2 pb-10">
        <q className="italic font-semibold text-xl">{bio}</q>
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
            {user?.following.length}
          </span>{" "}
          Following
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "px-12 text-red-500 flex gap-2" : "px-12 flex gap-2"
          }
          to={"followers"}
        >
          <span className="text-xl italic font-bold">
            {user?.followers.length}
          </span>{" "}
          Followers
        </NavLink>
      </div>
      <Outlet />
      {showEditProfilePopup && (
        <EditProfilePopup
          user={user}
          onClose={() => setShowEditProfilePopup(false)}
          onSave={handleEditProfile}
        />
      )}
    </div>
  );
};

export default Profile;

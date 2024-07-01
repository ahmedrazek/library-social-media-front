import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
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

      const response = await axios.put(
        "http://localhost:9000/users/updateProfile",
        formData
      );
      console.log("Update profile response:", response.data);
      updateProfile();
      setShowEditProfilePopup(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const updateProfile = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/users/${user._id}`
      );
      console.log("Updated user data:", response.data);
      setAvatar(response.data.photo);
      setCover(response.data.cover);
      setBio(response.data.bio);
    } catch (error) {
      console.error("Error fetching updated user data:", error);
    }
  }, [user._id]);

  const fetchUser = useCallback(() => {
    dispatch(fetchUserProfile());
  }, []);
  useEffect(() => {
    if (user) {
      setAvatar(user.photo);
      setCover(user.cover);
      setBio(user.bio || "");
    }
  }, [user]);
  if (!user && status == "failed") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="mt-32 mx-10">
      <div
        className="h-80 rounded-3xl bg-black flex items-end justify-between px-8 py-4 text-white relative"
        style={{
          backgroundImage: `url(http://localhost:9000${cover})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="flex flex-col items-center gap-4 absolute -bottom-28">
          <div className="h-40 w-40 rounded-full bg-green-600">
            {avatar ? (
              <img
                src={`http://localhost:9000${avatar}`}
                alt="Profile Avatar"
                className="h-40 w-40 rounded-full object-cover"
              />
            ) : (
              <Avatar bg="teal.500" />
            )}
          </div>
          <h1 className="text-2xl font-semibold text-black">
            {user && user.name}
          </h1>
        </div>
        <div>
          <button
            className="text-primary bg-white px-4 py-2 text-md rounded-full absolute right-10 -bottom-28 border hover:border-2 border-primary font-semibold"
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
        <Link className="px-12" to={"posts"}>
          Posts
        </Link>
        <Link className="px-12 flex gap-2" to={"following"}>
          <span className="text-xl italic font-bold">
            {user?.following.length}
          </span>{" "}
          Following
        </Link>
        <Link className="px-12 flex gap-2" to={"followers"}>
          <span className="text-xl italic font-bold">
            {user?.followers.length}
          </span>{" "}
          Followers
        </Link>
      </div>
      <Outlet context={[fetchUser]} />
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

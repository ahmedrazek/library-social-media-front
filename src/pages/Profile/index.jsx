import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../store/userSlice";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile())
      .then((userProfile) => {
        dispatch(setUserId(userProfile.userId)); // Assuming userId is part of userProfile
      })
      .catch((error) => {
        console.error("Failed to fetch user profile:", error);
      });
  }, [dispatch]);
  return (
    <div>Profile</div>
  )
}

export default Profile
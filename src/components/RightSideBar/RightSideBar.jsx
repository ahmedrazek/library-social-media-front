import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setNewFollowing, setUnFollow } from "../../store/userSlice";

const RightSideBar = () => {
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "/users/random/user/whoToFollow/timeline"
        );
        // Initialize follow status for each user
        const usersWithFollowStatus = response.data.data.map((user) => ({
          ...user,
          isFollowing: false, // Assuming initially they are not followed
        }));
        setUsers(usersWithFollowStatus);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const toggleFollow = async (curUser, isCurrentlyFollowing) => {
    try {
      if (isCurrentlyFollowing) {
        await axios.post(`/users/unfollow/${user._id}/${curUser._id}`);
        dispatch(setUnFollow(curUser));
      } else {
        await axios.post(`/users/follow/${user._id}/${curUser._id}`);
        dispatch(setNewFollowing(curUser));
      }

      // Update the follow status for the specific user
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === curUser._id
            ? { ...u, isFollowing: !isCurrentlyFollowing }
            : u
        )
      );
    } catch (error) {
      console.error(
        `Error ${isCurrentlyFollowing ? "unfollowing" : "following"} user:`,
        error
      );
    }
  };

  return (
    <div className="hidden lg:block w-80 bg-gray-50 px-4   fixed  top-28 z-30 h-[34rem]  rounded-2xl shadow-lg">
      <h1 className="text-xl text-primary font-bold mb-8 py-6 text-center">
        Who to follow
      </h1>
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user._id}
            className="flex px-4 text-gray-800 justify-between items-start mb-6"
          >
            <div className="info  flex w-full gap-4 items-center">
              <div className=" h-10 w-10 rounded-full bg-black">
                {user?.photo ? (
                  <img
                    src={`http://localhost:9000${user?.photo}`}
                    alt={user?.name}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-black"></div>
                )}
              </div>
              <div>
                <Link to={`/user/userProfile/${user._id}`}>
                  <h1 className="text-md font-semibold">{user.name}</h1>
                </Link>
              </div>
            </div>

            <button
              className={`px-4 py-2 rounded font-medium hover:bg-primary w-20 hover:text-secondary  ${
                user.isFollowing
                  ? "bg-primary w-24 px-auto text-white "
                  : "bg-white text-primary border border-primary"

                //               className={`px-4 py-2 rounded-full ${
                //                 user.isFollowing
                //                   ? "bg-primary text-white"
                //                   : "bg-white text-primary border border-primary"
              }`}
              onClick={() => toggleFollow(user, user.isFollowing)}
            >
              {user.isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        ))
      ) : (
        <p className="text-white text-center">No users to follow</p>
      )}
    </div>
  );
};

export default RightSideBar;

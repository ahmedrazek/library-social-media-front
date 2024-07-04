// /* eslint-disable react/prop-types */
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export const FollowCard = ({ follow, user, curUser, fetchUser }) => {
//   const [userFollow, setUserFollow] = useState(false);

//   const followUser = async () => {
//     await axios.post(`/users/follow/${user?._id}/${follow?._id}`);

//     fetchUser();
//     setUserFollow(true);
//   };
//   const unFollow = async () => {
//     await axios.post(`/users/unfollow/${user?._id}/${follow?._id}`);
//     setUserFollow(false);
//     fetchUser();
//   };
//   useEffect(() => {
//     if (user?.following.find((follower) => follower._id == follow?._id)) {
//       setUserFollow(true);
//     }
//     console.log(
//       user?.following.find((follower) => follower._id == follow?._id)
//     );
//     console.log(follow);
//   }, []);

  

//   return (
//     <div className="py-6">
//       <div className="flex justify-between">
//         <div className="flex gap-4 items-center">
//           <div className="h-10 w-10 rounded-full bg-black"></div>
          
//           <Link to={`/user/userProfile/${follow?._id}`}>{follow?.name}</Link>
//         </div>
//         {userFollow ? (
//           <button
//             className="bg-primary text-white px-4 py-2 rounded-full"
//             onClick={unFollow}
//           >
//             Following
//           </button>
//         ) : (
//           <button
//             className="bg-white text-primary border border-primary px-4 py-2 rounded-full"
//             onClick={followUser}
//           >
//             Follow
//           </button>
//         )}
//       </div>
//       <div className="ml-10">
//         {follow?.quote ? `<q>${follow.quote}</q>` : null}
//       </div>
//     </div>
//   );
// };




/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const FollowCard = ({ follow, user, curUser, fetchUser }) => {
  const [userFollow, setUserFollow] = useState(false);
  //angelo
  const [users, setUsers] = useState([]);
  //const user = useSelector((state) => state.user.user);

  const followUser = async () => {
    await axios.post(`/users/follow/${user?._id}/${follow?._id}`);
    fetchUser();
    setUserFollow(true);
  };

  const unFollow = async () => {
    await axios.post(`/users/unfollow/${user?._id}/${follow?._id}`);
    setUserFollow(false);
    fetchUser();
  };

  useEffect(() => {
    if (user?.following.find((follower) => follower._id === follow?._id)) {
      setUserFollow(true);
    }
    console.log(user?.following.find((follower) => follower._id === follow?._id));
    console.log(follow);
  }, [user, follow]);

  //angelo

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users/random/user/whoToFollow/timeline");
        console.log("fetching users carddd:", response.data.data);
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
      <div className="ml-10">{follow?.quote ? <q>{follow.quote}</q> : null}</div>
    </div>
  );
};

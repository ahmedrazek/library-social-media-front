// // import React from "react";

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const RightSideBar = () => {
//     const [users, setUsers] = useState([]);
//     const [userFollow, setUserFollow] = useState(false);
//     const user = useSelector((state) => state.user.user);
//     useEffect(() => {
//       const fetchUsers = async () => {
//         try {
//           const response = await axios.get("users/random/user/whoToFollow/timeline");
//           console.log('fetching users',response.data.data)
//           setUsers(response.data.data);
//         } catch (error) {
//           console.error("Error fetching users:", error);
//         }
//       };
//       fetchUsers();
//     }, []);

//     const followUser = async (followUser) => {
//         await axios.post(`/users/follow/${user?._id}/${followUser}`);
//         setUserFollow(true);
//       };
//       const unFollow = async (unfollowUser) => {
//         await axios.post(`/users/unfollow/${user?._id}/${unfollowUser}`);
//         setUserFollow(false);
//       };

//   return (
//     <div className="hidden lg:block w-72 bg-primary fixed right-4 top-28 z-30 h-[44rem] pt-6 px-4 rounded-2xl shadow-lg">
//       <h1 className="text-xl text-white font-bold mb-8 text-center">Who to follow</h1>
//       {users.length > 0 ? (
//         users.map((user) => (
//           <div key={user._id} className="flex text-white justify-between items-center mb-10">
//             <div className="h-10 w-10 rounded-full bg-black">
//               {user.photo ? (
//                 <img src={user.photo} alt={user.name} className="h-10 w-10 rounded-full" />
//               ) : (
//                 <div className="h-10 w-10 rounded-full bg-black"></div>
//               )}
//             </div>
//             <div>
//               <h1 className="text-sm font-semibold">{user.name}</h1>
//             </div>
//             {userFollow ? (
//           <button
//             className="bg-primary text-white px-4 py-2 rounded-full"
//              onClick={()=>{unFollow(user._id)}}
//           >
//             Following
//           </button>
//         ) : (
//           <button
//             className="bg-white text-primary border border-primary px-4 py-2 rounded-full"
//              onClick={()=>{followUser(user._id)}}
//           >
//             Follow
//           </button>
//         )}
//           </div>
//         ))
//       ) : (
//         <p className="text-white text-center">No users to follow</p>
//       )}
//     </div>
//   );
// };

// export default RightSideBar;
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RightSideBar = () => {
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("users/random/user/whoToFollow/timeline");
        console.log('fetching users', response.data.data);
        // Initialize follow status for each user
        const usersWithFollowStatus = response.data.data.map(user => ({
          ...user,
          isFollowing: false // Assuming initially they are not followed
        }));
        setUsers(usersWithFollowStatus);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const toggleFollow = async (toggleUserId, isCurrentlyFollowing) => {
    try {
      if (isCurrentlyFollowing) {
        await axios.post(`/users/unfollow/${user._id}/${toggleUserId}`);
      } else {
        await axios.post(`/users/follow/${user._id}/${toggleUserId}`);
      }

      // Update the follow status for the specific user
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u._id === toggleUserId ? { ...u, isFollowing: !isCurrentlyFollowing } : u
        )
      );
    } catch (error) {
      console.error(`Error ${isCurrentlyFollowing ? 'unfollowing' : 'following'} user:`, error);
    }
  };

  return (
    <div className="hidden lg:block w-80 bg-transparent   fixed right-4 top-28 z-30 h-[34rem] pt-6 px-4 rounded-2xl shadow-lg">
      <h1 className="text-xl text-primary font-bold mb-8 text-center">Who to follow</h1>
      {users.length > 0 ? (
        users.map(user => (
          <div key={user._id} className="flex text-gray-800 justify-between items-start mb-6">
            <div className="h-10 w-10 rounded-full bg-black">
              {user?.photo ? (
                <img src={`http://localhost:9000${user?.photo}`}  alt={user?.name} className="h-10 w-10 rounded-full" />
              ) : (
                <div className="h-10 w-10 rounded-full bg-black"></div>
              )}
            </div>
            <div>
              <h1 className="text-sm font-semibold">{user.name}</h1>
            </div>
            <button
              className={`px-4 py-2 rounded-full ${
                user.isFollowing ? 'bg-primary text-white' : 'bg-white text-primary border border-primary'
              }`}
              onClick={() => toggleFollow(user._id, user.isFollowing)}
            >
              {user.isFollowing ? 'Following' : 'Follow'}
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

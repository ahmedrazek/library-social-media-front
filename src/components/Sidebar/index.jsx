// import { NavLink } from "react-router-dom";
// import { FaHome, FaUser, FaBook, FaBookmark, FaCog, FaEnvelope } from "react-icons/fa";

// const Sidebar = () => {
//   return (
//     <aside className="hidden lg:block w-64 bg-gray-100 fixed left-0 top-16 z-30 h-screen pt-20">
//       <div>
//         <ul className="text-primary pr-4 font-semibold flex flex-col justify-center items-start gap-4 text-[1.4rem]">
//           <NavLink
//             to="/user/timeline"
//             className={({ isActive }) =>
//               isActive ? "active-link w-full" : "hover:w-full"
//             }
//           >
//             {({ isActive }) => (
//               <li
//                 className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-primary hover:text-secondary hover:rounded-r-full hover:transition-all w-full ${
//                   isActive ? "bg-primary text-secondary rounded-r-full " : ""
//                 }`}
//               >
//                 <FaHome />
//                 <span className={isActive ? "text-secondary" : ""}>Home</span>
//               </li>
//             )}
//           </NavLink>
//           <NavLink
//             to="/user/profile/posts"
//             className={({ isActive }) =>
//               isActive ? "active-link w-full" : "hover:w-full"
//             }
//           >
//             {({ isActive }) => (
//               <li
//                 className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-primary hover:text-secondary hover:rounded-r-full hover:transition-all w-full ${
//                   isActive ? "bg-primary text-secondary rounded-r-full " : ""
//                 }`}
//               >
//                 <FaUser />
//                 <span className={isActive ? "text-secondary" : ""}>Profile</span>
//               </li>
//             )}
//           </NavLink>
//           <NavLink
//             to="/user/books"
//             className={({ isActive }) =>
//               isActive ? "active-link w-full" : "hover:w-full"
//             }
//           >
//             {({ isActive }) => (
//               <li
//                 className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-primary hover:text-secondary hover:rounded-r-full hover:transition-all w-full ${
//                   isActive ? "bg-primary text-secondary rounded-r-full " : ""
//                 }`}
//               >
//                 <FaBook />
//                 <span className={isActive ? "text-secondary" : ""}>Books</span>
//               </li>
//             )}
//           </NavLink>
//           <NavLink
//             to="/user/favorite"
//             className={({ isActive }) =>
//               isActive ? "active-link w-full" : "hover:w-full"
//             }
//           >
//             {({ isActive }) => (
//               <li
//                 className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-primary hover:text-secondary hover:rounded-r-full hover:transition-all w-full ${
//                   isActive ? "bg-primary text-secondary rounded-r-full " : ""
//                 }`}
//               >
//                 <FaBookmark />
//                 <span className={isActive ? "text-secondary" : ""}>
//                   My Favorites
//                 </span>
//               </li>
//             )}
//           </NavLink>
//           <NavLink
//             to="/settings"
//             className={({ isActive }) =>
//               isActive ? "active-link w-full" : "hover:w-full"
//             }
//           >
//             {({ isActive }) => (
//               <li
//                 className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-primary hover:text-secondary hover:rounded-r-full hover:transition-all w-full ${
//                   isActive ? "bg-primary text-secondary rounded-r-full " : ""
//                 }`}
//               >
//                 <FaCog />
//                 <span className={isActive ? "text-secondary" : ""}>Settings</span>
//               </li>
//             )}
//           </NavLink>

//         </ul>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
import { NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineStar,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineMenuBook } from "react-icons/md";

// import { NavLink } from "react-router-dom";
// import { FaRegBookmark } from "react-icons/fa";
// import { CiHome } from "react-icons/ci";
// import { IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
// import { BsBook } from "react-icons/bs";

const Sidebar = () => {
  return (
    <aside className="hidden lg:block w-64 bg-gray-50 fixed left-0 top-16 z-30 h-screen pt-20">
      <div>
        <ul className="text-primary pr-4 font-semibold flex flex-col justify-center items-start gap-4 text-[1.4rem]">
          <NavLink
            to="/user/timeline"
            className={({ isActive }) =>
              isActive ? "active-link w-full" : "hover:w-full"
            }
          >
            {({ isActive }) => (
              <li
                className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-primary hover:text-secondary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-primary text-secondary rounded-r-full " : ""
                }`}
              >
                <AiOutlineHome />
                <span className={isActive ? "text-secondary" : ""}>Home</span>
              </li>
            )}
          </NavLink>
          <NavLink
            to="/user/profile/posts"
            className={({ isActive }) =>
              isActive ? "active-link w-full" : "hover:w-full"
            }
          >
            {({ isActive }) => (
              <li
                className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-primary hover:text-secondary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-primary text-secondary rounded-r-full " : ""
                }`}
              >
                <AiOutlineUser />
                <span className={isActive ? "text-secondary" : ""}>
                  Profile
                </span>

                {/* //                 className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-white hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
//                   isActive ? "bg-white text-primary rounded-r-full" : ""
//                 }`}
//               >
//                 <IoPersonOutline />
//                 <span className={isActive ? "text-primary" : ""}>Profile</span> */}
              </li>
            )}
          </NavLink>
          <NavLink
            to="/user/books"
            className={({ isActive }) =>
              isActive ? "active-link w-full" : "hover:w-full"
            }
          >
            {({ isActive }) => (
              <li
                className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-primary hover:text-secondary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-primary text-secondary rounded-r-full " : ""
                }`}
              >
                <MdOutlineMenuBook />
                <span className={isActive ? "text-secondary" : ""}>Books</span>

                {/* //                 className={`flex items-center gap-4 py-4 pl-3 active:rounded-r-full hover:bg-white hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
//                   isActive ? "bg-white text-primary rounded-r-full" : ""
//                 }`}
//               >
//                 <BsBook />
//                 <span className={isActive ? "text-primary" : ""}>Books</span> */}
              </li>
            )}
          </NavLink>
          <NavLink
            to="/user/favorite"
            className={({ isActive }) =>
              isActive ? "active-link w-full" : "hover:w-full"
            }
          >
            {({ isActive }) => (
              <li
                className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-primary hover:text-secondary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-primary text-secondary rounded-r-full " : ""

                  //                 className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-white hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
                  //                   isActive ? "bg-white text-primary rounded-r-full" : ""
                }`}
              >
                <AiOutlineStar />
                <span className={isActive ? "text-secondary" : ""}>
                  My Favorites
                </span>
              </li>
            )}
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "active-link w-full" : "hover:w-full"
            }
          >
            {({ isActive }) => (
              <li
                className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-primary hover:text-secondary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-primary text-secondary rounded-r-full " : ""
                }`}
              >
                <AiOutlineSetting />
                <span className={isActive ? "text-secondary" : ""}>
                  Settings
                </span>
              </li>
            )}
          </NavLink>

          {/* //                 className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-white hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
//                   isActive ? "bg-white  text-primary rounded-r-full" : ""
//                 }`}
//               >
//                 <IoSettingsOutline />
//                 <span className={isActive ? "text-primary" : ""}>Settings</span>
//               </li>
//             )}
//           </NavLink>
//           {/* <NavLink
//             to="/user/message"
//             className={({ isActive }) =>
//               isActive ? "active-link w-full" : "hover:w-full"
//             }
//           >
//             {({ isActive }) => (
//               <li
//                 className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-secondary hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
//                   isActive ? "bg-secondary text-primary rounded-r-full" : ""
//                 }`}
//               >
//                 <IoSettingsOutline />
//                 <span className={isActive ? "text-primary" : ""}>Messages</span>
//               </li>
//             )}
//           </NavLink> */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

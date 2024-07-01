import { NavLink } from "react-router-dom";
import { FaRegBookmark, FaUserCircle, FaBookOpen } from "react-icons/fa";
import { IoMdHome, IoIosSettings } from "react-icons/io";
import { CiHome } from "react-icons/ci";
import { IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { BsBook } from "react-icons/bs";

 const Sidebar = () => {
  return (
    <aside className="hidden lg:block w-64 bg-primary fixed left-0 top-16 z-30 h-screen pt-20">
      <div>
        <ul className="text-secondary font-semibold flex flex-col justify-center items-start gap-4 text-[1.8rem]">
          <NavLink
            to="/user/timeline"
            className={({ isActive }) =>
              isActive ? "active-link w-full" : "hover:w-full"
            }
          >
            {({ isActive }) => (
              <li
                className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-secondary hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary rounded-r-full" : ""
                }`}
              >
                <IoMdHome />
                <span className={isActive ? "text-primary" : ""}>Home</span>
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
                className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-secondary hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary rounded-r-full" : ""
                }`}
              >
                <FaUserCircle />
                <span className={isActive ? "text-primary" : ""}>Profile</span>
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
                className={`flex items-center gap-4 py-4 pl-3 active:rounded-r-full hover:bg-secondary hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary rounded-r-full" : ""
                }`}
              >
                <FaBookOpen />
                <span className={isActive ? "text-primary" : ""}>Books</span>
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
                className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-secondary hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary rounded-r-full" : ""
                }`}
              >
                <FaRegBookmark />
                <span className={isActive ? "text-primary" : ""}>
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
                className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-secondary hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary rounded-r-full" : ""
                }`}
              >
                <IoIosSettings />
                <span className={isActive ? "text-primary" : ""}>Settings</span>
              </li>
            )}
          </NavLink>
          <NavLink
            to="/user/message"
            className={({ isActive }) =>
              isActive ? "active-link w-full" : "hover:w-full"
            }
          >
            {({ isActive }) => (
              <li
                className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-secondary hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary rounded-r-full" : ""
                }`}
              >
                <IoIosSettings />
                <span className={isActive ? "text-primary" : ""}>Messages</span>
              </li>
            )}
          </NavLink>
        </ul>
      </div>
    </aside>
  );
};


export default Sidebar;

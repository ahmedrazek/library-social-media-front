import { NavLink } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import { IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { BsBook } from "react-icons/bs";

const Sidebar = () => {
  return (
    <aside className="hidden lg:block w-64 bg-primary fixed left-0 top-16 z-30 h-screen pt-20">
      <div>
        <ul className="text-secondary flex flex-col justify-center items-start gap-2 text-2xl">
          <NavLink
            to="/user/timeline"
            className={({ isActive }) =>
              isActive ? "active-link w-full" : "hover:w-full"
            }
          >
            {({ isActive }) => (
              <li
                className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-white hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-white text-primary rounded-r-full" : ""
                }`}
              >
                <CiHome />
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
                className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-white hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-white text-primary rounded-r-full" : ""
                }`}
              >
                <IoPersonOutline />
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
                className={`flex items-center gap-4 py-4 pl-3 active:rounded-r-full hover:bg-white hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-white text-primary rounded-r-full" : ""
                }`}
              >
                <BsBook />
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
                className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-white hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-white text-primary rounded-r-full" : ""
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
                className={`flex items-center gap-4 py-3 pl-4 active:rounded-r-full hover:bg-white hover:text-primary hover:rounded-r-full hover:transition-all w-full ${
                  isActive ? "bg-white  text-primary rounded-r-full" : ""
                }`}
              >
                <IoSettingsOutline />
                <span className={isActive ? "text-primary" : ""}>Settings</span>
              </li>
            )}
          </NavLink>
          {/* <NavLink
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
                <IoSettingsOutline />
                <span className={isActive ? "text-primary" : ""}>Messages</span>
              </li>
            )}
          </NavLink> */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

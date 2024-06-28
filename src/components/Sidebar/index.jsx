import { NavLink } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import { IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { BsBook } from "react-icons/bs";
const Sidebar = () => {
  return (
    <aside className="hidden lg:block w-64 bg-white fixed left-0 border-r-2 top-16 z-30 h-screen pt-20 ps-2">
      <div className="">
        <ul className="text-black flex flex-col justify-center items-start gap-10 text-2xl px-6">
          <NavLink
            to="/user/timeline"
            className={({ isActive }) =>
              isActive ? "active-link w-full" : "hover:w-full"
            }
          >
            {({ isActive }) => (
              <li
                className={`flex flex-row items-center justify-start gap-4 py-1 px-2 rounded-full hover:bg-secondary hover:text-primary hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary w-full" : ""
                }`}
              >
                <CiHome />

                <span className={isActive ? "text-primary " : ""}>Home</span>
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
                className={`flex flex-row items-center justify-start gap-4 py-1 px-2 rounded-full hover:bg-secondary hover:text-primary hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary w-full" : ""
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
                className={`flex flex-row items-center justify-start gap-4 py-1 px-2 rounded-full hover:bg-secondary hover:text-primary hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary w-full" : ""
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
                className={`flex flex-row items-center justify-start gap-4 py-1 px-2 rounded-full hover:bg-secondary hover:text-primary hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary w-full" : ""
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
                className={`flex flex-row items-center justify-start gap-4 py-1 px-2 rounded-full hover:bg-secondary hover:text-primary hover:w-full hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary w-full" : ""
                }`}
              >
                <IoSettingsOutline />
                <span className={isActive ? "text-primary" : ""}>Settings</span>
              </li>
            )}
          </NavLink>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

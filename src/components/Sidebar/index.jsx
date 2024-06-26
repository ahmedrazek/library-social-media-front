import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdHome, IoIosSettings } from "react-icons/io";
import { FaUserCircle, FaBookOpen, FaBookmark } from "react-icons/fa";
const Sidebar = () => {
  return (
    <aside className="hidden lg:block w-64 bg-primary fixed left-0 top-16 z-30 h-screen pt-20 ps-2">
      <div className="">
        <ul className="text-secondary flex flex-col justify-center items-start gap-4 text-2xl font-semibold px-6">
         
        <NavLink
            to="/user/timeline"
            className={({ isActive }) =>
              isActive ? "active-link w-full" : "hover:w-full"
            }
          >
            {({ isActive }) => (
              <li
                className={`flex flex-row items-center justify-start gap-2 py-1 px-2 rounded-md hover:bg-secondary hover:text-primary hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary w-full" : ""
                }`}
              >
                <IoMdHome className="text-3xl" />
                <span className={isActive ? "text-primary " : ""}>Home</span>
              </li>
            )}
          </NavLink>
          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              isActive ? "active-link w-full" : "hover:w-full"
            }
          >
            {({ isActive }) => (
              <li
                className={`flex flex-row items-center justify-start gap-2 py-1 px-2 rounded-md hover:bg-secondary hover:text-primary hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary w-full" : ""
                }`}
              >
                <FaUserCircle className="text-2xl" />
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
                className={`flex flex-row items-center justify-start gap-2 py-1 px-2 rounded-md hover:bg-secondary hover:text-primary hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary w-full" : ""
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
                className={`flex flex-row items-center justify-start gap-2 py-1 px-2 rounded-md hover:bg-secondary hover:text-primary hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary w-full" : ""
                }`}
              >
                <FaBookmark />
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
                className={`flex flex-row items-center justify-start gap-2 py-1 px-2 rounded-md hover:bg-secondary hover:text-primary hover:w-full hover:transition-all w-full ${
                  isActive ? "bg-secondary text-primary w-full" : ""
                }`}
              >
                <IoIosSettings className="text-3xl" />
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

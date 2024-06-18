
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../../store/userSlice";
import { FaBell } from "react-icons/fa";

export default function Navbar() {
  const [showUser, setShowUser] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [redirect, setRedirect] = useState("");
  const [openedNotifications, setOpenedNotifications] = useState({});
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const fetchNotifications = async () => {
    if (user && user._id) {
      try {
        const response = await axios.get(`http://localhost:9000/notification/${user._id}`);
        console.log(response.data);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
  };

  const handleNotificationClick = (id) => {
    setOpenedNotifications((prev) => ({ ...prev, [id]: true }));
  };

  const setLogout = async () => {
    try {
      await axios.post("/users/logout");
      dispatch(logout());
      console.log("logout");
      setRedirect("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showNotifications) {
      fetchNotifications();
    }
  }, [showNotifications]);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (

    <>
      <nav className="bg-white border-gray-200 shadow-lg z-50 fixed top-0 start-0 w-full">
        <div className="flex items-center flex-wrap justify-between mx-auto p-4">
          <Link to="/">
            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
              BookNet
            </span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 relative"
              id="user-menu-button"
              onClick={() => setShowUser(!showUser)}
            >
              <div className="w-8 h-8 rounded-full bg-black"></div>
              <span className="sr-only">Open user menu</span>
            </button>


            <button
              type="button"
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FaBell className="text-2xl text-yellow-400" />
              <span className="sr-only">View notifications</span>
            </button>

            <div
              className={
                showUser
                  ? "z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-10 right-4"
                  : "z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              }
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user && user.name}
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  {user && user.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <button
                    onClick={setLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setShowMenu(!showMenu)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className={
              showMenu
                ? "items-center justify-between w-full md:flex md:w-auto md:order-1"
                : "items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            }
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <Link
                  to="/user/books"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Books
                </Link>
              </li>
            </ul>
            <div className="search-bar-container relative flex flex-col min-w-[200px] px-10 items-center justify-center">
              <SearchBar setSearchResults={setSearchResults} searchResults={searchResults} />
              <SearchResultsList searchResults={searchResults} setSearchResults={setSearchResults} />
            </div>
          </div>
        </div>

        {showNotifications && (
          <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-14 right-10 w-72">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">Notifications</span>
            </div>
            <ul className="py-2" aria-labelledby="notification-button">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <li
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification._id)}
                    className={`block px-4 py-2 text-sm ${
                      openedNotifications[notification._id]
                        ? "text-gray-700 bg-gray-100 dark:text-gray-200 dark:bg-gray-600"
                        : "text-gray-700 dark:text-gray-200 bg-blue-100 dark:bg-blue-600"
                    }`}
                  >
                    {notification.message}
                  </li>
                ))
              ) : (
                <li className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                  No notifications
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

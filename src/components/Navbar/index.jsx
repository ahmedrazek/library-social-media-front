
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, Navigate } from "react-router-dom";
// import axios from "axios";
// import { logout } from "../../store/userSlice";
// import { FaBell } from "react-icons/fa";
// import { formatDistanceToNow } from 'date-fns';
// import SearchBar from "../SearchBar/SearchBar";
// import SearchResultsList from "../SearchResultsList/SearchResultsList";

// export default function Navbar() {
//   const [showUser, setShowUser] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [redirect, setRedirect] = useState("");

//   const [openedNotifications, setOpenedNotifications] = useState({});
//   const user = useSelector((state) => state.user.user);
//   const dispatch = useDispatch();
//   const [searchResults, setSearchResults] = useState([]);
//   const fetchNotifications = async () => {
//     if (user && user._id) {
//       try {
//         const response = await axios.get(
//           `http://localhost:9000/notification/${user._id}`
//         );
//         console.log(response.data);
//         setNotifications(response.data);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     }
//   };

//   const handleNotificationClick = (id) => {
//     setOpenedNotifications((prev) => ({ ...prev, [id]: true }));
//   };


//   const handleDeleteNotification = async (notificationId) => {
//     try {
//       await axios.delete(`http://localhost:9000/notification/${user._id}/${notificationId}`);
//       setNotifications((prev) => prev.filter((notification) => notification._id !== notificationId));
//     } catch (error) {
//       console.error("Error deleting notification:", error);
//     }
//   };
//   const setLogout = async () => {
//     try {
//       await axios.post("/users/logout");
//       dispatch(logout());
//       console.log("logout");
//       setRedirect("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (showNotifications) {
//       fetchNotifications();
//     }
//   }, [showNotifications]);

//   if (redirect) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <>
//       <nav className="bg-white border-gray-200 shadow-md z-50 fixed top-0 start-0 w-full">
//         <div className="flex items-center flex-wrap justify-between mx-auto p-4">
//           <Link to="/">
//             <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
//               BookNet
//             </span>
//           </Link>
//           <div className="flex items-center lg:order-2 space-x-3 lg:space-x- rtl:space-x-reverse">
//             <button
//               type="button"
//               className="relative ml-4"
//               onClick={() => setShowNotifications(!showNotifications)}
//             >
//               <FaBell className="text-2xl text-primary" />
//               <span className="sr-only">View notifications</span>
//             </button>
//             <button
//               type="button"
//               className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 relative"
//               id="user-menu-button"
//               onClick={() => setShowUser(!showUser)}
//             >
//               <div className="w-8 h-8 rounded-full bg-black"></div>
//               <span className="sr-only">Open user menu</span>
//             </button>

//             <div
//               className={
//                 showUser
//                   ? "z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-10 right-4"
//                   : "z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
//               }
//               id="user-dropdown"
//             >
//               <div className="px-4 py-3">
//                 <span className="block text-sm text-gray-900 dark:text-white">
//                   {user && user.name}
//                 </span>
//                 <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
//                   {user && user.email}
//                 </span>
//               </div>
//               <ul className="py-2" aria-labelledby="user-menu-button">
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Profile
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Settings
//                   </a>
//                 </li>
//                 <li>
//                   <button
//                     onClick={setLogout}
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Sign out
//                   </button>
//                 </li>
//               </ul>
//             </div>

//             <button
//               onClick={() => setShowMenu(!showMenu)}
//               type="button"
//               className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="w-5 h-5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 17 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M1 1h15M1 7h15M1 13h15"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div
//             className={
//               showMenu
//                 ? "items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
//                 : "items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
//             }
//             id="navbar-user"
//           >
//             <ul className="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
//               <li>
//                 <Link
//                   to="/"
//                   className="block lg:hidden py-2 px-3 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 lg:dark:text-blue-500"
//                   aria-current="page"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/user/profile"
//                   className=" lg:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
//                 >
//                   Profile
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/user/books"
//                   className="lg:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                 >
//                   Books
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/user/favorite"
//                   className="lg:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                 >
//                   My Favorites
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/user/settings"
//                   className="lg:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                 >
//                   Settings
//                 </Link>
//               </li>
//             </ul>
//             <div className="search-bar-container relative flex flex-col min-w-[200px] px-10 items-center justify-center">
//               <SearchBar
//                 setSearchResults={setSearchResults}
//                 searchResults={searchResults}
//               />
//               <SearchResultsList
//                 searchResults={searchResults}
//                 setSearchResults={setSearchResults}
//               />
//             </div>
//           </div>
//         </div>

//         {showNotifications && (
//           <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-14 right-10 w-72">
//             <div className="px-4 py-3">
//               <span className="block text-sm text-gray-900 dark:text-white">
//                 Notifications
//               </span>
//             </div>
//             <ul className="py-2" aria-labelledby="notification-button">
//               {notifications.length > 0 ? (
//                 notifications.map((notification) => (
//                   <li
//                     key={notification._id}
//                     onClick={() => handleNotificationClick(notification._id)}
//                     className={`block px-4 py-2 text-sm ${
//                       openedNotifications[notification._id]
//                         ? "text-gray-700 bg-gray-100 dark:text-gray-200 dark:bg-gray-600"
//                         : "text-gray-700 dark:text-gray-200 bg-blue-100 dark:bg-blue-600"
//                     }`}
//                   >
//                     <div className="flex justify-between">
//                       <div>
//                         <div>{notification.message}</div>
//                         <div>
//                           <span className="text-sm text-gray-500 dark:text-gray-400">
//                           {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
//                           </span>
//                         </div>
//                       </div>
//                       <div>
//                         <button className="text-primary">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             fill="currentColor"
//                             className="size-5"
//                             onClick={() => handleDeleteNotification(notification._id)}
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                   </li>
//                 ))
//               ) : (
//                 <li className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
//                   No notifications
//                 </li>
//               )}
//             </ul>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////


// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, Navigate } from "react-router-dom";
// import axios from "axios";
// import { logout } from "../../store/userSlice";
// import { FaBell } from "react-icons/fa";
// import { formatDistanceToNow } from 'date-fns';
// import SearchBar from "../SearchBar/SearchBar";
// import SearchResultsList from "../SearchResultsList/SearchResultsList";

// export default function Navbar() {
//   const [showUser, setShowUser] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [redirect, setRedirect] = useState("");
//   const [newNotification, setNewNotification] = useState(false);

//   const [openedNotifications, setOpenedNotifications] = useState({});
//   const user = useSelector((state) => state.user.user);
//   const dispatch = useDispatch();
//   const [searchResults, setSearchResults] = useState([]);
  
//   const fetchNotifications = async () => {
//     if (user && user._id) {
//       try {
//         const response = await axios.get(
//           `http://localhost:9000/notifications/${user._id}`
//         );
//         console.log(response.data);
//         setNotifications(response.data);
//         if (response.data.length > 0) {
//           setNewNotification(true);
//         }
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     }
//   };

//   const handleNotificationClick = (id) => {
//     setOpenedNotifications((prev) => ({ ...prev, [id]: true }));
//   };

//   const handleDeleteNotification = async (notificationId) => {
//     try {
//       await axios.delete(`http://localhost:9000/notifications/${user._id}/${notificationId}`);
//       setNotifications((prev) => prev.filter((notification) => notification._id !== notificationId));
//     } catch (error) {
//       console.error("Error deleting notification:", error);
//     }
//   };

//   const setLogout = async () => {
//     try {
//       await axios.post("/users/logout");
//       dispatch(logout());
//       console.log("logout");
//       setRedirect("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   useEffect(() => {
//     if (showNotifications) {
//       setNewNotification(false);
//     }
//   }, [showNotifications]);

//   if (redirect) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <>
//       <nav className="bg-white border-gray-200 shadow-md z-50 fixed top-0 start-0 w-full">
//         <div className="flex items-center flex-wrap justify-between mx-auto p-4">
//           <Link to="/">
//             <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
//               BookNet
//             </span>
//           </Link>
//           <div className="flex items-center lg:order-2 space-x-3 rtl:space-x-reverse">
//             <button
//               type="button"
//               className="relative ml-4"
//               onClick={() => setShowNotifications(!showNotifications)}
//             >
//               <FaBell className="text-2xl text-primary" />
//               {newNotification && (
//                 <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 bg-red-500 text-white rounded-full text-xs">
//                   •
//                 </span>
//               )}
//               <span className="sr-only">View notifications</span>
//             </button>
//             <button
//               type="button"
//               className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 relative"
//               id="user-menu-button"
//               onClick={() => setShowUser(!showUser)}
//             >
//               <div className="w-8 h-8 rounded-full bg-black"></div>
//               <span className="sr-only">Open user menu</span>
//             </button>

//             <div
//               className={
//                 showUser
//                   ? "z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-10 right-4"
//                   : "z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
//               }
//               id="user-dropdown"
//             >
//               <div className="px-4 py-3">
//                 <span className="block text-sm text-gray-900 dark:text-white">
//                   {user && user.name}
//                 </span>
//                 <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
//                   {user && user.email}
//                 </span>
//               </div>
//               <ul className="py-2" aria-labelledby="user-menu-button">
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Profile
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Settings
//                   </a>
//                 </li>
//                 <li>
//                   <button
//                     onClick={setLogout}
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Sign out
//                   </button>
//                 </li>
//               </ul>
//             </div>

//             <button
//               onClick={() => setShowMenu(!showMenu)}
//               type="button"
//               className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="w-5 h-5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 17 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M1 1h15M1 7h15M1 13h15"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div
//             className={
//               showMenu
//                 ? "items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
//                 : "items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
//             }
//             id="navbar-user"
//           >
//             <ul className="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
//               <li>
//                 <Link
//                   to="/"
//                   className="block lg:hidden py-2 px-3 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 lg:dark:text-blue-500"
//                   aria-current="page"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/user/profile"
//                   className="lg:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
//                 >
//                   Profile
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/user/books"
//                   className="lg:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                 >
//                   Books
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/user/favorite"
//                   className="lg:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                 >
//                   My Favorites
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/user/settings"
//                   className="lg:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                 >
//                   Settings
//                 </Link>
//               </li>
//             </ul>
//             <div className="search-bar-container relative flex flex-col min-w-[200px] px-10 items-center justify-center">
//               <SearchBar
//                 setSearchResults={setSearchResults}
//                 searchResults={searchResults}
//               />
//               <SearchResultsList
//                 searchResults={searchResults}
//                 setSearchResults={setSearchResults}
//               />
//             </div>
//           </div>
//         </div>

//         {showNotifications && (
//           <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-14 right-10 w-72">
//             <div className="px-4 py-3">
//               <span className="block text-sm text-gray-900 dark:text-white">
//                 Notifications
//               </span>
//             </div>
//             <ul className="py-2" aria-labelledby="notification-button">
//               {notifications.length > 0 ? (
//                 notifications.map((notification) => (
//                   <li
//                     key={notification._id}
//                     onClick={() => handleNotificationClick(notification._id)}
//                     className={`block px-4 py-2 text-sm ${
//                       openedNotifications[notification._id]
//                         ? "text-gray-700 bg-gray-100 dark:text-gray-200 dark:bg-gray-600"
//                         : "text-gray-700 dark:text-gray-200 bg-blue-100 dark:bg-blue-600"
//                     }`}
//                   >
//                     <div className="flex justify-between">
//                       <div>
//                         <div>{notification.message}</div>
//                         <div>
//                           <span className="text-sm text-gray-500 dark:text-gray-400">
//                             {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
//                           </span>
//                         </div>
//                       </div>
//                       <div>
//                         <button className="text-primary">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             fill="currentColor"
//                             className="size-5"
//                             onClick={() => handleDeleteNotification(notification._id)}
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                   </li>
//                 ))
//               ) : (
//                 <li className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
//                   No notifications
//                 </li>
//               )}
//             </ul>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }

/////////////////////////////////////////////////////////////////////////////





import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../../store/userSlice";
import { FaBell } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';
import SearchBar from "../SearchBar/SearchBar";
import SearchResultsList from "../SearchResultsList/SearchResultsList";
import io from "socket.io-client";
export default function Navbar() {
  const [showUser, setShowUser] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [redirect, setRedirect] = useState("");
  const [newNotification, setNewNotification] = useState(false);

  const [openedNotifications, setOpenedNotifications] = useState({});
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    const socket = io('http://localhost:9000'); // Ensure this matches your server URL

    socket.on('connect', () => {
      console.log('Connected to socket server');
      if (user && user._id) {
        socket.emit('join', user._id);
      }
    });

    socket.on('newNotification', (notification) => {
      console.log('New notification received:', notification);
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
      setNewNotification(true);
    });

    return () => {
      socket.disconnect();
      console.log('disconnected from socket server');
    };
  }, [user]); // Ensure user is a dependency if it changes

  const fetchNotifications = async () => {
    if (user && user._id) {
      try {
        const response = await axios.get(`http://localhost:9000/notifications/${user._id}`);
        setNotifications(response.data);
        if (response.data.length > 0) {
          setNewNotification(true);
        }
      } catch (error) {
        console.error("error fetching notifications:", error);
      }
    }
  };

  const handleNotificationClick = (id) => {
    setOpenedNotifications((prev) => ({ ...prev, [id]: true }));
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await axios.delete(`http://localhost:9000/notifications/${user._id}/${notificationId}`);
      setNotifications((prev) => prev.filter((notification) => notification._id !== notificationId));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const setLogout = async () => {
    try {
      await axios.post("/users/logout");
      dispatch(logout());
      setRedirect("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (showNotifications) {
      setNewNotification(false);
    }
  }, [showNotifications]);


  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <nav className="bg-white border-gray-200 shadow-md z-50 fixed top-0 start-0 w-full">
        <div className="flex items-center flex-wrap justify-between mx-auto p-4">
          <Link to="/">
            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
              BookNet
            </span>
          </Link>
          <div className="flex items-center lg:order-2 space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              className="relative ml-4"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FaBell className="text-2xl text-primary" />
              {newNotification && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 bg-red-500 text-white rounded-full text-xs">
                  •
                </span>
              )}
              <span className="sr-only">View notifications</span>
            </button>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 relative"
              id="user-menu-button"
              onClick={() => setShowUser(!showUser)}
            >
              <div className="w-8 h-8 rounded-full bg-black"></div>
              <span className="sr-only">Open user menu</span>
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
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                ? "items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
                : "items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
            }
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block lg:hidden py-2 px-3 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 lg:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/user/profile"
                  className="lg:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/user/books"
                  className="lg:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  to="/user/favorite"
                  className="lg:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  My Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/user/settings"
                  className="lg:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Settings
                </Link>
              </li>
            </ul>
            <div className="search-bar-container relative flex flex-col min-w-[200px] px-10 items-center justify-center">
              <SearchBar
                setSearchResults={setSearchResults}
                searchResults={searchResults}
              />
              <SearchResultsList
                searchResults={searchResults}
                setSearchResults={setSearchResults}
              />
            </div>
          </div>
        </div>

        {showNotifications && (
          <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-14 right-10 w-72">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                Notifications
              </span>
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
                    <div className="flex justify-between">
                      <div>
                        <div>{notification.message}</div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                      <div>
                        <button className="text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-5"
                            onClick={() => handleDeleteNotification(notification._id)}
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
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
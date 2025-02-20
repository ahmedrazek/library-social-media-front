import "./App.css";
import axios from "axios";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import PageLayout from "./pages/PageLayout/index";
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Signup from "./pages/Signup/index";
import NotFound from "./pages/NotFound/index";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import Timeline from "./pages/Timeline";
import Book from "./pages/Book/Book";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserProfile } from "./store/userSlice";
import Profile from "./pages/Profile";
import FavoriteBooks from "./pages/FavoriteBooks/FavoriteBooks";
import Noresult from "./components/NoResult/NoResult";
import BookDetails from "./pages/BookDetails/BookDetails";
import MyFavorites from "./pages/MyFavorites/MyFavorites";
import SavedPosts from "./pages/SavedPosts/SavedPosts";
import Settings from "./pages/Settings/Settings";
import AccountDeleted from "./pages/AccountDeleted/AccountDeleted";

import { UserPosts } from "./components/UserPosts";
import { Following } from "./components/Following";
import { Followers } from "./components/Followers";
import { UserProfile } from "./pages/UserProfile";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  axios.defaults.baseURL = "http://localhost:9000/";
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
      path: "user",
      element: <PageLayout />,
      children: [
        { path: "timeline", element: <Timeline /> },
        { path: "books", element: <Book /> },

        {
          path: "favorite",
          element: <MyFavorites />,
          children: [
            { path: "books", element: <FavoriteBooks /> },
            { path: "posts", element: <SavedPosts /> },
          ],
        },
        { path: "details/:id", element: <BookDetails /> },
        {
          path: "profile",
          element: <Profile />,
          children: [
            { path: "posts", element: <UserPosts />, index: true },
            { path: "following", element: <Following /> },
            { path: "followers", element: <Followers /> },
          ],
        },
        {
          path: "userProfile/:id",
          element: <UserProfile />,
          children: [
            { path: "posts", element: <UserPosts />, index: true },
            { path: "following", element: <Following /> },
            { path: "followers", element: <Followers /> },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <PageLayout />,
      children: [{ path: "settings", element: <Settings /> }],
    },
    { path: "account-deleted", element: <AccountDeleted /> },
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
    { path: "forgotPassword", element: <ForgotPassword /> },
    { path: "resetPassword/:token", element: <ResetPassword /> },
    { path: "noresult", element: <Noresult /> },
    { path: "*", element: <NotFound /> },
  ]);

  useEffect(() => {
    if (!user && status === "idle") {
      dispatch(fetchUserProfile());
    }
    if (!user && status == "failed") {
      redirect("/login");
    }
  }, []);
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer theme="colored" />
      <RouterProvider router={router} />|
    </>
  );
}

export default App;

import "./App.css";
import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PageLayout from "./pages/PageLayout/index";
import Home from "./pages/Home/index";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/index";
import Signup from "./pages/Signup/index";
import NotFound from "./pages/NotFound/index";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import Timeline from "./pages/Timeline";
import Book from "./pages/Book/Book";


function App() {
  axios.defaults.baseURL = "http://localhost:9000/";
  axios.defaults.withCredentials = true;
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
      path: "user",
      element: <PageLayout />,
      children: 
      [
        { path: "timeline", element: <Timeline /> },
        { path: "books", element: <Book /> }
      ],
    },
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
    { path: "forgotPassword", element: <ForgotPassword /> },
    { path: "resetPassword", element: <ResetPassword /> },
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

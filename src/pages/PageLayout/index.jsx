import axios from "axios";
import Navbar from "../../components/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";

const PageLayout = () => {
  const [redirect, setRedirect] = useState("");
  const dispatch = useDispatch();
  const setLogout = async () => {
    try {
      await axios.post("/users/logout");
      dispatch(logout());
      setRedirect("/login");
    } catch (error) {
      console.log(error);
    }
  };
  if (redirect) {
    <Navigate to="/" />;
  }
  return (
    <div>
      <Navbar />
      <div>
        <aside className=" hidden md:block w-80 bg-primary fixed left-0 top-0 z-30 h-screen pt-20 ps-2">
          <button className="bg-secondary p-2 rounded-3xl" onClick={setLogout}>
            Logout
          </button>
        </aside>
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;

<<<<<<< .merge_file_ig0Ivz
import Navbar from "../../components/Navbar";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar/index";
const PageLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="">
        <Sidebar />

        <Sidebar />

        <div className="mt-20">
          <Outlet className="space-y-20 " />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
=======
import Navbar from "../../components/Navbar";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar/index";
const PageLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="">
        <Sidebar />



        <div className="mt-20">
          <Outlet className="space-y-20 " />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
>>>>>>> .merge_file_dDw52y

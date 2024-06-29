import Navbar from "../../components/Navbar";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const PageLayout = () => {
  return (
    <div className="bg-white">
      <Navbar />
      {/* <div className="">
        <Sidebar />

        <div className="mt-20">
          <Outlet className="space-y-20 " />
        </div>
      </div> */}
<div className="grid lg:grid-cols-12 ">
  <div className=" col-span-3 lg:block hidden w-74">
    <Sidebar />
  </div>
  <div className=" col-span-9 ">
    <div className="mt-40">
      <Outlet />
    </div>
  </div>
</div>

    </div>
  );
};

export default PageLayout;

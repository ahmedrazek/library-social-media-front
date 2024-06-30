import Navbar from "../../components/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";

const PageLayout = () => {
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  if (!user && status == "failed") {
    return <Navigate to="/login" />;
  }
  return (
    <div className="bg-white">
      <Navbar />
      {/* <div className="">
        <Sidebar />

        <div className="mt-20">
          <Outlet />
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

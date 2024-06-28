import Navbar from "../../components/Navbar";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
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

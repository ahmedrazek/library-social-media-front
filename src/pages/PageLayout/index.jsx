import Navbar from "../../components/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../store/userSlice";

const PageLayout = () => {
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const dispatch = useDispatch();
  if (!user && status === "idle") {
    dispatch(fetchUserProfile());
  }
  if (!user && status == "failed") {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Navbar />

      <div className="grid lg:grid-cols-12 ">
        <div className=" col-span-2 lg:block hidden w-74">
          <Sidebar />
        </div>
        <div className=" col-span-10 ">
          <div className="mt-40">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;

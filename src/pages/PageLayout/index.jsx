import Navbar from "../../components/Navbar";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import styles from "./PageLayout.module.css";
import Sidebar from "../../components/Sidebar";

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

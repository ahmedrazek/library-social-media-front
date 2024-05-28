import React from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  console.log(location);
  if (location.pathname == "/login" || location.pathname == "/signup")
    return null;
  return <div>index</div>;
}

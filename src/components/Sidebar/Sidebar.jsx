
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faBook, faHeart, faCloud } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="bg-green-800 text-white w-64 min-h-screen flex flex-col space-y-4 p-8 pl-12">
      <div className="flex items-center space-x-3">
        <FontAwesomeIcon icon={faHome} size="lg" />
        <span className="text-lg">Home</span>
      </div>
      <div className="flex items-center space-x-3">
        <FontAwesomeIcon icon={faUser} size="lg" className="text-green-400" />
        <span className="text-lg text-green-400">Profile</span>
      </div>
      <div className="flex items-center space-x-3">
        <FontAwesomeIcon icon={faBook} size="lg" />
        <span className="text-lg">Explore Books</span>
      </div>
      <div className="flex items-center space-x-3">
        <FontAwesomeIcon icon={faHeart} size="lg" />
        <span className="text-lg">Favorite Books</span>
      </div>
      <div className="flex items-center space-x-3">
        <FontAwesomeIcon icon={faCloud} size="lg" />
        <span className="text-lg">Saved Posts</span>
      </div>
    </div>
  );
};

export default Sidebar;



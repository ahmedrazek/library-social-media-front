import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faBook, faHeart, faCloud } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <FontAwesomeIcon icon={faHome} /> Home
        </li>
        <li>
          <FontAwesomeIcon icon={faUser} /> Profile
        </li>
        <li>
          <FontAwesomeIcon icon={faBook} /> Books
        </li>
        <li>
          <FontAwesomeIcon icon={faHeart} /> Favorites
        </li>
        <li>
          <FontAwesomeIcon icon={faCloud} /> Cloud
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

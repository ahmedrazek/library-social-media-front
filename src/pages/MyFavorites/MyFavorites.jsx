import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './MyFavorites.css';

const MyFavorites = () => {
  return (
    <div className="favorites-container">
      <div id="nav" className="nav-container">
        <ul className="nav-menu clearfix unstyled">
          <li>
            <NavLink
              to="/user/favorite/books"
              className={({ isActive }) =>
                `three-d ${isActive ? 'active' : ''}`
              }
            >
              Books
              <span className="three-d-box">
                <span className="front">Books</span>
                <span className="back">Books</span>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/favorite/posts"
              className={({ isActive }) =>
                `three-d ${isActive ? 'active' : ''}`
              }
            >
              Posts
              <span className="three-d-box">
                <span className="front">Posts</span>
                <span className="back">Posts</span>
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MyFavorites;

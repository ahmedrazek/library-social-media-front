import React from 'react';
import { NavLink, Outlet, useLocation , Navigate} from 'react-router-dom';
import './MyFavorites.css'; 
const MyFavorites = () => {
  const location = useLocation();

  if (location.pathname === '/user/favorite') {
    
    return <Navigate to="/user/favorite/books" replace />;
  }

  return (
    <div className="flex h-screen sm:ml-0 md:ml-0 lg:ml-64 xl:ml-64">
      <div className="flex-1 p-6">
        <div className="mb-6 flex justify-center">
          <ul className="flex space-x-8">
            <li>
              <NavLink
                to="/user/favorite/books"
                className="nav-link" 
              >
                Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/favorite/posts"
                className="nav-link" 
              >
                Posts
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="border-b mb-4"></div>
        <Outlet />
      </div>
    </div>
  );
};

export default MyFavorites;

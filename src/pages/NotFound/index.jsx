import React from 'react';
import NFImg from '../../assets/Error Alien Spaceship.png';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <img src={NFImg} alt="Error Alien Spaceship" className="mb-6" />
      <h2 className="text-2xl font-bold mb-4">Oh No! Error 404</h2>
      <p className="text-center mb-6">Oops! That page seems to have taken a detour. Let us guide you back to your destination.</p>
     <Link to='./user/timeline'>
     <button className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-primary border border-primary transition-colors">
     Back to Homepage
   </button>
     </Link>
    </div>
  );
}

export default NotFound;
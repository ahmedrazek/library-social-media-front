import React from 'react';
import { Link } from 'react-router-dom';

const AccountDeleted = () => {
  return (
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-3xl font-bold mb-6">Account Deleted</h1>
      <p className="text-lg mb-6">Thank you for using our service. Your account has been successfully deleted.</p>
      <Link to="/login" className="inline-block bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-lg transition duration-300">
        Return to Login
      </Link>
    </div>
  );
};

export default AccountDeleted;

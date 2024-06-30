import React, { useState ,navigate } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
const Settings = () => {
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
    

  const user = useSelector((state) => state.user.user);
  const handleNameChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/users/updatename', { name });
        alert('Name updated successfully');
        setName('');
    } catch (error) {
      alert('Failed to update name');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.put('/users/changepassword', { currentPassword, newPassword });
        alert('Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('')
    } catch (error) {
      alert('Failed to update password');
      }
    //   console.log(newPassword ,currentPassword );
  };

  const handleAccountDeletion = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/users/${user._id.toString()}`);
      alert('Account deleted successfully');
        // navigate('/account-deleted');
        window.location.href = '/account-deleted';
    } catch (error) {
      alert('Failed to delete account');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>

      <form onSubmit={handleNameChange} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Change Name</h2>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">New Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-600"
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition duration-300">Update Name</button>
      </form>

      <form onSubmit={handlePasswordChange} className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Change Password</h2>
      <div className="mb-4 relative">
        <label className="block text-gray-600 mb-2">Current Password</label>
        <input
          type={showCurrentPassword ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          required
        />
        <button
          type="button"
          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          className="absolute right-3 top-3"
        >
          {showCurrentPassword ? "Hide" : "Show"}
        </button>
      </div>
      <div className="mb-4 relative">
        <label className="block text-gray-600 mb-2">New Password</label>
        <input
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          required
        />
        <button
          type="button"
          onClick={() => setShowNewPassword(!showNewPassword)}
          className="absolute right-3 top-3"
        >
          {showNewPassword ? "Hide" : "Show"}
        </button>
      </div>
      <div className="mb-4 relative">
        <label className="block text-gray-600 mb-2">Confirm New Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-3"
        >
          {showConfirmPassword ? "Hide" : "Show"}
        </button>
      </div>
      <button type="submit" className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition duration-300">Update Password</button>
    </form>

      <form onSubmit={handleAccountDeletion} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Delete Account</h2>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.checked)}
            className="mr-2 h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <span className="text-gray-600">Yes, delete my account</span>
        </div>
        <button type="submit" className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600 transition duration-300" disabled={!deleteConfirm}>
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default Settings;

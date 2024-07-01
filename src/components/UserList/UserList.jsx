import React from 'react';

const UserList = ({ users, setSelectedUser }) => {
  return (
    <div className="w-1/4 border-r h-auto  border-gray-300 p-4 bg-slate-100">
      <h2 className="text-lg font-bold mb-4">Users</h2>
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className="flex items-center p-2 mb-2 cursor-pointer hover:bg-gray-200 rounded-md"
        >
          <img src={`http://localhost:9000${user.photo}`} alt={user.name} className="w-10 h-10 rounded-full mr-2" />
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;

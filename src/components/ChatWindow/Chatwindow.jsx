import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const ChatWindow = ({ selectedUser, messages, newMessage, setNewMessage, sendMessage }) => {
  if (!selectedUser) {
    return <div className="flex-1 p-4">Select a user to start chatting</div>;
  }

  return (
    <div className="bg-secondary h-[36rem] flex flex-col flex-1 p-4 border-l border-gray-300">
      {/* User Info */}
      <div className="flex items-center p-2 border-b border-gray-300">
        <img src={`http://localhost:9000${selectedUser?.photo}`} alt={selectedUser.name} className="w-12 h-12 rounded-full mr-4" />
        <h2 className="text-lg font-bold">{selectedUser.name}</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col flex-1 overflow-y-auto p-4">
        {messages && messages.map((msg, index) => (
          <div key={index} className={`flex flex-col p-2 mb-2 rounded-md ${msg.sender === 'me' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'}`}>
            <div className="text-sm">{msg.text}</div>
            <div className="text-xs text-gray-500 mt-1 self-end">{formatTime(msg.timestamp)}</div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex items-center p-2 border-t border-gray-300">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md"
          placeholder="Type a message"
        />
        <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

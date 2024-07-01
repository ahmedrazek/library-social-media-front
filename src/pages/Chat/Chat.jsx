import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from '../../components/UserList/UserList';
import ChatWindow from '../../components/ChatWindow/Chatwindow';

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:9000/users');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser) {
        try {
          const response = await axios.get(`http://localhost:9000/messages/${selectedUser._id}`);
          setMessages(response.data.messages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [selectedUser]);

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      const newMsg = { text: newMessage, sender: 'me' };
      setMessages([...messages, newMsg]);
      setNewMessage('');

      try {
        await axios.post(`http://localhost:9000/messages/${selectedUser._id}`, newMsg);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="flex h-full">
      <UserList users={users} setSelectedUser={setSelectedUser} />
      <ChatWindow
        selectedUser={selectedUser}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;

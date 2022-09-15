import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';
import ChatScreen from './components/ChatScreen';
import CreateChatRoom from './components/CreateChatRoom';
import ChatRooms from './components/ChatRooms';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mychats/:id" element={<ChatScreen />} />
        <Route path="/newchat" element={<CreateChatRoom />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mychats" element={<ChatRooms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

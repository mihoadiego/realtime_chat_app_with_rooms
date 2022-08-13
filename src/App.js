import React, { useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';

/**
 * =====================================================================================================================================
 * CONNECTION TO BACKEND (WEBSERVICE) SOCKETIO
 *    dependancies:   GitHub REPOSITORY  named realtime_chat_app_with_rooms_back/index.js
 *                    below connection INDEED linked to a webservice backEnd listener :
 *                    realtime_chat_app_with_rooms_back REPOSITORY, file index.js directly executes a listener through io.on('connection', (socket) => {})    ) 
 * =====================================================================================================================================  
 */ 

const socket = io.connect(`${process.env.REACT_APP_SOCKETIO_LOCAL_URL}`) // espana io.connect('http://localhost:4000') 



const App = () => {
  const [username, setUsername] = useState(''); 
  const [room, setRoom] = useState(''); 
  
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route 
            path='/' 
            element={<Home username={username} setUsername={setUsername} room={room} setRoom={setRoom} socket={socket} />} 
          />
          <Route
            path='/chat'
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
)
};

export default App;

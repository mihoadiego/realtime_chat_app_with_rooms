import React, { useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';

const socket = io.connect(`'${process.env.REACT_SOCKETIO_LOCAL_URL}'`) //  io.connect('http://localhost:4000');


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
        </Routes>
      </div>
    </Router>
)
};

export default App;

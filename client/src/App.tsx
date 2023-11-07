import * as React from "react";
// import { createRoot } from 'react-dom/client';
import Home from './features/Home/Home';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000');


function App() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }

export default App;


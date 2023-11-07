import * as React from "react";
import { createRoot } from 'react-dom/client';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000');


const App: React.FC = () => {
    return (
        <>
            <h1>Kart and Code!</h1>
        </>
    );
};

export default App;
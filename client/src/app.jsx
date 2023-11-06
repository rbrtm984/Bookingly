import * as React from "react";
import { createRoot } from 'react-dom/client';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000')

const App = () => {


    return (
        <>
         <h1>Kart and Code</h1>
        </>
       
    )
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
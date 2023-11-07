import * as React from "react";
import { createRoot } from 'react-dom/client';
import './style.css'
import SignIn from "./signin.jsx";


const App = () => {
    return (
        <SignIn />
    )
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
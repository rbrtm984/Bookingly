import * as React from "react";
import { createRoot } from 'react-dom/client';
import './style.css'
import SignIn from "./signin.jsx";
import SignUp from "./signup.jsx";


const App = () => {
    return (
        <SignUp />
    )
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
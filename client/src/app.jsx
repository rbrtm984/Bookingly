import * as React from "react";
import { createRoot } from 'react-dom/client';
import './style.css'

const App = () => {
    return (
        <>
         <h1 class="text-3xl font-bold underline">
            Hello world!
        </h1>
        
      </>
      
        
       
    )
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
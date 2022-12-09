import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.css'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import { UserProvider } from './component/UserContext' 
import { ModelProvider } from './component/ModelContext' 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ModelProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModelProvider>
    </UserProvider>
  </React.StrictMode>
);
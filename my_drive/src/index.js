import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './App.jsx';
import CreateAccount from '../src/CreateAccount.jsx';
import ForgotPassword from "../src/ForgotPassword.jsx"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<App/>}/>
    <Route path = "CreateAccount" element = {<CreateAccount/>}/>
    <Route path = "ForgotPassword" element = {<ForgotPassword/>}/>
    </Routes>
  </BrowserRouter>
 
);




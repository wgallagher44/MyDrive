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
import DriveLoader from "../src/DriveLoader.jsx"
import "./index.css"
import Test from "../src/test.jsx"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<App/>}/>
    <Route path = "CreateAccount" element = {<CreateAccount/>}/>
    <Route path = "ForgotPassword" element = {<ForgotPassword/>}/>
    <Route path = "Drive" element = {<DriveLoader/>}/>
    <Route path = "test" element = {<Test/>}/>
    </Routes>
  </BrowserRouter>
 
);




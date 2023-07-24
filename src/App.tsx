import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/login/Login";
//import Orders from './pages/Orders';

import Profile from './pages/customer/profile/Profile';
import MyService from './pages/customer/myservice/MyService';
import MyVoucher from './pages/customer/myvoucher/MyVoucher';
import History from './pages/customer/history/History';
import Customers from './pages/user/customers/Customers';
import Services from './pages/user/services/Services';
import Vouchers from './pages/user/vouchers/Vouchers';
import Employees from './pages/user/employee/Employee';

//Importing Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import PopupScreen from './component/popupscreeninformation/PopupScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes >
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<div></div>} />
          {/* <Route path="profile" element={< Profile />} /> */}
          <Route path="myservice" element={<MyService />} />
          <Route path="myvoucher" element={<MyVoucher />} />
          <Route path="history" element={< History />} />
          <Route path="customers" element={<Customers />} />
          <Route path="services" element={<Services />} />
          <Route path="vouchers" element={<Vouchers />} />
          <Route path="employee" element={<Employees />} />
          <Route path="profile" element={<PopupScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

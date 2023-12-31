import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, redirect, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import Login from "./pages/login/Login";
import PreLogin from "./pages/login/preLogin";
//import Orders from './pages/Orders';
import Customers from './pages/user/customers/Customers';
import Services from './pages/user/servicepackages/ServicePackage';
import Vouchers from './pages/user/vouchers/Vouchers';
import Employees from './pages/user/employee/Employee';
//import BookDetail from './pages/Productdetail/product-detail';
//import CustomerDetail from './pages/user/customers/detail/customer-detail';

//Importing Bootstrap 5
import PopupScreen from './component/popupscreeninformation/PopupScreen';
import NewService from './pages/user/servicepackages/NewServicePackage';
import UpdateService from './pages/user/servicepackages/UpdateServicePackage';
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          {
            cookies.get("token")?.token !== undefined ?
              <Route path="/*" element={<Navigate replace to="dashboard/" />} />
              : <Route path="/*" element={<Navigate replace to="/" />} />
          }
          {/*<Route path="/" element={<PreLogin />} />*/}
          <Route path="login/nhanvien" element={<Login />} />
          <Route path="login/khachhang" element={<Login />} />
          <Route path="login/*" element={<PreLogin />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="managerdashboard/*" element={<ManagerDashboard />} />
        </Routes>
      </div >
    </BrowserRouter >
  );
}

export default App;

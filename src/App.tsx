import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import Login from "./pages/login/Login";
import PreLogin from "./pages/login/preLogin";
//import Orders from './pages/Orders';

import Profile from './pages/customer/profile/Profile';
import MyService from './pages/customer/myservice/MyService';
import MyVoucher from './pages/customer/myvoucher/MyVoucher';
import History from './pages/customer/history/History';
import Customers from './pages/user/customers/Customers';
import Services from './pages/user/services/Services';
import Vouchers from './pages/user/vouchers/Vouchers';
import Employees from './pages/user/employee/Employee';
//import BookDetail from './pages/Productdetail/product-detail';
import CustomerDetail from './pages/user/customers/detail/customer-detail';

//Importing Bootstrap 5
import PopupScreen from './component/popupscreeninformation/PopupScreen';
import NewService from './pages/user/services/NewService';
import UpdateService from './pages/user/services/UpdateService';
import BookDetail from './pages/Productdetail/product-detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<PreLogin />} />
          <Route path="login/nhanvien" element={<Login />} />
          <Route path="login/khachhang" element={<Login />} />
          <Route path="login/*" element={<PreLogin />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<div></div>} />
          {/*<Route path="profile" element={< Profile />} />*/}
          <Route path="myservice" element={<MyService />} />
          <Route path="myvoucher" element={<MyVoucher />} />
          <Route path="history" element={< History />} />
          <Route path="customers" element={<Customers />} />
          <Route path="detail/:id" element={<CustomerDetail />} />
          <Route path="services" element={<Services />} />
          <Route path="vouchers" element={<Vouchers />} />
          <Route path="employee" element={<Employees />} />
          <Route path="profile" element={<PopupScreen />} />
          {/* <Route path="testing" element={<UpdateService />} /> */}
          <Route path="/detail/:id" element={<BookDetail />} />
          <Route path="managerdashboard/*" element={<ManagerDashboard />} />
        </Routes>
      </div >
    </BrowserRouter >
  );
}

export default App;

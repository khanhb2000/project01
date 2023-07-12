import React from 'react';
import './dashboard.css'
import { Navigate, Link, Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectOpenMenu, setMenuRole } from '../component/header/headerSlice';
import { selectRole } from './login/loginSlice';

import SideBar from '../component/sidebar';
import sidebar_menu_customer from '../app/constants/sidebar-menu-customer';
import sidebar_menu_user from '../app/constants/sidebar-menu-user';
import Header from '../component/header/Header';

import Profile from './customer/profile/Profile';
import MyService from './customer/myservice/MyService';
import MyVoucher from './customer/myvoucher/MyVoucher';
import History from './customer/history/History';
import Customers from './user/customers/Customers';
import Services from './user/services/Services';
import Vouchers from './user/vouchers/Vouchers';
import Employees from './user/employee/Employee';

export default function Dashboard() {
  const isMenu = useSelector(selectOpenMenu);
  const dispatch = useDispatch();

  const r = useSelector(selectRole);
  const sidebar_menu=(r.id=="0")? sidebar_menu_customer:sidebar_menu_user;

  return (
    <div className='dashboard-container'>
      <Header />
      <div className='dashboard-body'>
        {isMenu && <SideBar menu={sidebar_menu} /> // theem user role}
        }
        <Routes>
          <Route path="*" element={<div></div>} />
          <Route path="profile" element={< Profile />} />
          <Route path="myservice" element={<MyService />} />
          <Route path="myvoucher" element={<MyVoucher />} />
          <Route path="history" element={< History />} />
          <Route path="customers" element={<Customers />} />
          <Route path="services" element={<Services />} />
          <Route path="vouchers" element={<Vouchers />} />
          <Route path="employee" element={<Employees />} />
        </Routes>
      </div>
    </div>
  );
}

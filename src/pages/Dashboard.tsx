import React, { useEffect } from 'react';
import './dashboard.css'
import { Navigate, Link, Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectOpenMenu, setMenuRole } from '../component/header/headerSlice';
import { selectRole, selectToken } from './login/loginSlice';

import SideBar from '../component/sidebar';
import sidebar_menu_customer from '../app/constants/sidebar-menu-customer';
import sidebar_menu_user from '../app/constants/sidebar-menu-user';
import Header from '../component/header/Header';
import Cookies from 'universal-cookie';
import Profile from './customer/profile/Profile';
import MyService from './customer/myservice/MyService';
import MyVoucher from './customer/myvoucher/MyVoucher';
import History from './customer/history/History';
import Customers from './user/customers/Customers';
import Services from './user/services/Services';
import Vouchers from './user/vouchers/Vouchers';
import Employees from './user/employee/Employee';
import CustomerDetail from './user/customers/detail/customer-detail';
import EmployeeDetail from './user/employee/detail/employee-detail';
import BookDetail from './Productdetail/product-detail';
import UMenuNew from '../component/newsider/indexUMenu';
import CMenuNew from '../component/newsider/indexCMenu';
import Role from './user/employee/Role';

export default function Dashboard() {

  //useSelector, useNavigate
  const isMenu = useSelector(selectOpenMenu);
  const nagivate = useNavigate();
  const token = useSelector(selectToken)
  const r = useSelector(selectRole);
  const cookies = new Cookies();
  //const sidebar_menu = (cookies.get("token")?.role.id == "0") ? sidebar_menu_customer : sidebar_menu_user;

  if (cookies.get("token")?.token == undefined) {
    return (<Navigate replace to="/login" />)
  }

  return (
    <div className='dashboard-container'>
      <Header />
      <div className='dashboard-body'>
        {isMenu &&
          ((cookies.get("token")?.role.id == "0") ? <CMenuNew /> : <UMenuNew />)}
        <Routes>
          <Route path="*" element={<div></div>} />
          <Route path="profile" element={< Profile />} />
          <Route path="myservice" element={<MyService />} />
          <Route path="myvoucher" element={<MyVoucher />} />
          <Route path="history" element={< History />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/detail/:id" element={<CustomerDetail />} />
          <Route path="goidichvu" element={<Services />} />
          <Route path="loaidichvu" element={<Services />} />
          <Route path="vouchers" element={<Vouchers />} />
          <Route path="employee" element={<Employees />} />
          <Route path="employee/role" element={<Role />} />
          <Route path="employee/detail/:id" element={<EmployeeDetail />} />
          <Route path="detail/:id" element={<BookDetail />} />

        </Routes>
      </div>
    </div>
  );

}

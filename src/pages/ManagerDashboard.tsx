import React, { useEffect } from 'react';
import './dashboard.css'
import { Navigate, Link, Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectOpenMenu, setMenuRole } from '../component/header/headerSlice';
import { selectRole, selectToken } from './login/loginSlice';

import Header from '../component/header/Header';
import Cookies from 'universal-cookie';
import AllCustomers from './manager/allcustomers/Customers';
import AllServices from './manager/allservices/Services';
import AllServicePackages from './manager/allservices/ServicesPackages';
import AllVouchers from './manager/allvouchers/Vouchers';
import AllEmployees from './manager/allemployee/Employee';
import AllBooking from './manager/allbookings/Booking';
//import CustomerDetail from './user/customers/detail/customer-detail';
import CustomerDetail from './manager/allcustomers/detail/customer-detail';
import EmployeeDetail from './user/employee/detail/employee-detail';
import BookDetail from './Productdetail/product-detail';
import UMenuNew from '../component/newsider/indexUMenu';
import Role from './manager/allemployee/Role';

export default function ManagerDashboard() {

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
        {isMenu && <UMenuNew />}
        <Routes>
          <Route path="*" element={<div></div>} />
          <Route path="customers" element={<AllCustomers />} />
          <Route path="customers/detail/:id" element={<CustomerDetail />} />
          <Route path="goidichvu" element={<AllServicePackages />} />
          <Route path="loaidichvu" element={<AllServices />} />
          <Route path="vouchers" element={<AllVouchers />} />
          <Route path="employee" element={<AllEmployees />} />
          <Route path="employee/role" element={<Role />} />
          <Route path="employee/detail/:id" element={<EmployeeDetail />} />
          <Route path="detail/:id" element={<BookDetail />} />
          <Route path="booking" element={<AllBooking />} />

        </Routes>
      </div>
    </div>
  );

}

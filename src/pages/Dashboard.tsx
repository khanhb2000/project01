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
import Services from './user/servicepackages/ServicePackage';
import Vouchers from './user/vouchers/Vouchers';
import Employees from './user/employee/Employee';
import Booking from './user/bookings/Booking';
//import CustomerDetail from './user/customers/detail/customer-detail';
//import EmployeeDetail from './user/employee/detail/employee-detail';
import NewService from './user/services/NewService';
import UMenuNew from '../component/newsider/indexUMenu';
import CMenuNew from '../component/newsider/indexCMenu';
import Role from './manager/allemployee/Role';
import UpdateService from './user/servicepackages/UpdateServicePackage';
import Newvoucher from './user/vouchers/NewVoucher';
import UpdateVoucher from './user/vouchers/UpdateVoucher';
import Service from './user/services/Service';
import NewServicePackage from './user/servicepackages/NewServicePackage';
import UpdateServicePackage from './user/servicepackages/UpdateServicePackage';
import ServicePackage from './user/servicepackages/ServicePackage';
import NewBooking from './user/bookings/NewBooking';
import NewVoucherCustomer from './user/vouchers/NewVoucherCustomer';
import UpdateBooking from './user/bookings/UpdateBooking';
import CustomerDetail from './manager/allcustomers/customer-detail';
import EmployeeDetail from './manager/allemployee/employee-detail';

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
          <Route path="khach-hang" element={<Customers />} />
          <Route path="goi-dich-vu" element={<ServicePackage />} />
          <Route path="goi-dich-vu/createservicepackage" element={<NewServicePackage />} />
          <Route path="goi-dich-vu/updateservicepackage" element={<UpdateServicePackage />} />
          <Route path="loai-dich-vu" element={<Service />} />
          <Route path="loai-dich-vu/createservice" element={<NewService />} />
          <Route path="khach-hang/detail/:id" element={<CustomerDetail />} />
          {/* <Route path="goidichvu" element={<Services />} /> */}
          {/* <Route path="loaidichvu" element={<Services />} /> */}
          <Route path="vouchers" element={<Vouchers />} />
          <Route path="vouchers/createvoucher" element={<Newvoucher />} />
          <Route path="vouchers/createvouchercustomer" element={<NewVoucherCustomer />} />
          <Route path="vouchers/updatevoucher" element={<UpdateVoucher />} />
          <Route path="nhan-vien" element={<Employees />} />
          <Route path="nhan-vien/role" element={<Role />} />
          <Route path="nhan-vien/detail/:id" element={<EmployeeDetail />} />
          <Route path="giao-dich" element={<Booking />} />
          {/*<Route path="employee" element={<Employees />} />
          <Route path="employee/role" element={<Role />} />
          <Route path="employee/detail/:id" element={<EmployeeDetail />} />*/}
          <Route path="giao-dich" element={<Booking />} />
          <Route path="giao-dich/updatebooking" element={<UpdateBooking />} />
          <Route path="giao-dich/createbooking" element={<NewBooking />} />

        </Routes>
      </div>
    </div>
  );

}

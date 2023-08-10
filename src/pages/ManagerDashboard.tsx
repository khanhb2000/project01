import React, { useEffect } from 'react';
import './dashboard.css'
import { Navigate, Link, Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectOpenMenu, setMenuRole } from '../component/header/headerSlice';
import { selectRole, selectToken } from './login/loginSlice';

import Header from '../component/header/Header';
import Cookies from 'universal-cookie';
import AllCustomers from './manager/allcustomers/Customers';
import AllServices from './manager/allservices/services/Service';
import AllServicePackages from './manager/allservices/servicepackages/ServicePackage';
import AllVouchers from './manager/allvouchers/Vouchers';
import AllEmployees from './manager/allemployee/Employee';
import AllBooking from './manager/allbookings/Booking';
import CustomerDetail from './manager/allcustomers/customer-detail';
import EmployeeDetail from './manager/allemployee/employee-detail';
import UMenuNew from '../component/newsider/indexUMenu';
import Role from './manager/allemployee/Role';
import NewServicePackage from './manager/allservices/servicepackages/NewServicePackage';
import UpdateServicePackage from './manager/allservices/servicepackages/UpdateServicePackage';
import NewService from './manager/allservices/services/NewService';
import Newvoucher from './manager/allvouchers/NewVoucher';
import UpdateVoucher from './manager/allvouchers/UpdateVoucher';

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
          <Route path="khach-hang" element={<AllCustomers />} />
          <Route path="khach-hang/detail/:id" element={<CustomerDetail />} />
          <Route path="goi-dich-vu" element={<AllServicePackages />} />
          <Route path="goi-dich-vu/tao-moi" element={<NewServicePackage />} />
          <Route path="goi-dich-vu/cap-nhat" element={<UpdateServicePackage />} />
          <Route path="loai-dich-vu" element={<AllServices />} />
          <Route path="loai-dich-vu/tao-moi" element={<NewService />} />
          <Route path="vouchers" element={<AllVouchers />} />
          <Route path="vouchers/tao-moi" element={<Newvoucher />} />
          <Route path="vouchers/cap-nhat" element={<UpdateVoucher />} />
          <Route path="nhan-vien" element={<AllEmployees />} />
          <Route path="nhan-vien/role" element={<Role />} />
          <Route path="nhan-vien/detail/:id" element={<EmployeeDetail />} />
          <Route path="giao-dich" element={<AllBooking />} />

        </Routes>
      </div>
    </div>
  );

}

import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import './login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  login,
  selectSuccess,
  selectMessage,
  selectError,
  selectToken,
  selectRole,
  selectInformation

} from './loginSlice';
import api_links from '../../utils/api_links';
import Cookies from 'universal-cookie';
import { log } from 'console';
import { unescapeLeadingUnderscores } from 'typescript';
//import PulseLoader from "react-spinners/PulseLoader";

export default function Login() {

  // Select data from store
  //not using const isLoading = useAppSelector(selectLoading);  
  //not using const errorMessage = useAppSelector(selectErrorMessage);  const isSuccess = useAppSelector(selectSuccess);
  const errorMessage1 = useAppSelector(selectMessage);
  const errorMessage2 = useAppSelector(selectError);
  const token = useAppSelector(selectToken);
  const information = useSelector(selectInformation);
  const role = useSelector(selectRole);

  //useState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //variable
  const cookies = new Cookies();
  const dispatch = useAppDispatch();
  const storeCookieData = {
    token: token,
    information: information,
    role: role
  }

  //api_link
  const userLoginAPI = api_links.user.superAdmin.login;
  const customerLoginAPI = api_links.user.customer.login;
  const loginLink = checked ? userLoginAPI : customerLoginAPI;



  const errorMessage = () => {
    if (errorMessage2) {
      if (typeof Object.values(errorMessage2)[0] == "string") {
        return Object.values(errorMessage2)[0];
    }
      return Object.values(errorMessage2)[0][0];
    }
    if (errorMessage1)
      return errorMessage1;
  };


  const handleLogin = async () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(login({ "AccountInformation": email, "UserName": email, "Password": password, "link": loginLink }));
      setIsLoading(false);
    }, 1000)

  };

  const checkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  //check token existed 
  if (token != "") {
    cookies.set("token", storeCookieData, { path: '/', maxAge: 4000 })  // set cookies for 30 minutes
  }

  // Navigate to dashboard page if login successful
  if (cookies.get("token")?.token !== undefined) {
    return <Navigate to='/dashboard' />;
  }


  return (
    <div className="login">
      <div className="box-form">
        <h1>Đăng nhập</h1>      <br />
        <label style={{ display: "inline-block" }} className={checked ? 'switch2 checked' : 'switch2'}>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            hidden
          />
          <span className={checked ? '' : 'active'}>Khách hàng</span>
          <span className={checked ? 'active' : ''}>Nhân viên</span>
        </label>
        <br />
        {//errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        }
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onKeyDown={(e) => checkKeyDown(e)}
        />
        <br />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(e) => checkKeyDown(e)}
        />
        <br />

        <div className='submitBtn'>
          <button onClick={handleLogin}>
            Login
          </button>
          {isLoading && <FontAwesomeIcon className='circle-loading' icon={faSpinner} />}
        </div>
        {(errorMessage()) &&
          <span style={{
            color: "red",
            textAlign: "center",
            fontSize: "13px"
          }}><br /> {errorMessage()}</span>
        }
      </div>
    </div>
  );
}


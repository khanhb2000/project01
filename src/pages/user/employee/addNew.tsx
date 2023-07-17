import React, { useState } from 'react';
import { selectToken } from '../../login/loginSlice';
import { useSelector } from 'react-redux';
import { LoginState } from '../../../app/type.d';

//Importing Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Add() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [ID, setID] = useState("");

    const [jsonData, setjsonData] = useState<LoginState>();
    const token = useSelector(selectToken);

    const newCustomer = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const response = fetch(
            'http://bevm.e-biz.com.vn/api/Register/Customer',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(
                    {
                        "UserName": userName,
                        "NormalizedUserName": "",
                        "CitizenId": "",
                        "Email": "",
                        "NormalizedEmail": "",
                        "PhoneNumber": "",
                        "Password": password,
                        "ConfirmPassword": confirmPassword,
                        "SalesEmployeeIds": [
                            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                        ]
                    }

                ),
            }
        ).then(response => {
            return response.json()
        })
            .then(data => {
                setjsonData(data);
            }).catch(error => {
                switch (error.status) {
                    case 401: {
                        //throw new Error("Invalid login credentials");
                        break;
                    }
                    case 400: {
                        setjsonData({
                            "message": "",
                            "isSuccess": false,
                            "errors": error.errors,
                            "token": "",
                            "role":{
                                "id": "0",
                                "normalizedName": "Customer",
                                "isManager": false,
                                "users": [],
                              },
                        });
                        break;
                    }
                    /* ... */
                    default:
                        setjsonData({ "message": `Unknown server error occured: ${error.status}`, "isSuccess": false, "errors": [], "token": "", 
                        "role":{
                            "id": "0",
                            "normalizedName": "Customer",
                            "isManager": false,
                            "users": [],
                          },
                        });
                }
                setjsonData({ "message": `Unknown server error occured: ${error.status}`, "isSuccess": false, "errors": [], "token": "",                     "role":{
                    "id": "0",
                    "normalizedName": "Customer",
                    "isManager": false,
                    "users": [],
                  },});
                //console.log(jsonData);
                //throw new Error(`Something went wrong: ${error.message || error}`);
            })


        /*
            if (response.status < 200 || response.status >= 300) {
              return rejectWithValue(jsonData);
            }*/

        return jsonData;

    };
    const errorMessage = () => {
        if (jsonData?.errors) {
          return Object.values(jsonData?.errors)[0][0]; }
        if (jsonData?.message)
          return jsonData?.message;
      };

    return (
        <div>
        <div className='dashboard-content-header'>
        <h2>Nhân viên mới</h2></div>
        <form>
        <div className="form-group row">
            <label htmlFor="inputUsername3"
                className="col-sm-4 col-form-label">
                Tên đăng nhập</label>
            <div className="col-sm-6">
                <input type="text"
                    className="form-control"
                    id="inputUsername3"
                    onChange={(event) => setUserName(event.target.value)}
                />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputPassword3"
                className="col-sm-4 col-form-label">
                Mật khẩu</label>
            <div className="col-sm-6">
                <input type="password"
                    className="form-control"
                    id="inputPassword3"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputConfirmPassword3"
                className="col-sm-4 col-form-label">
                Nhập lại mật khẩu</label>
            <div className="col-sm-6">
                <input type="password"
                    className="form-control"
                    id="inputConfirmPassword3"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputEmail3"
                className="col-sm-4 col-form-label">
                Email</label>
            <div className="col-sm-6">
                <input type="email"
                    className="form-control"
                    id="inputEmail3"
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputPhone3"
                className="col-sm-4 col-form-label">
                Số điện thoại</label>
            <div className="col-sm-6">
                <input type="text"
                    className="form-control"
                    id="inputPhone3"
                    onChange={(event) => setPhone(event.target.value)}
                />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputID3"
                className="col-sm-4 col-form-label">
                CCCD/CMND</label>
            <div className="col-sm-6">
                <input type="text"
                    className="form-control"
                    id="inputID3"
                    onChange={(event) => setID(event.target.value)}
                />
            </div>
        </div>
        <div className="form-group row">
   Chức vụ sử dụng choose drop down
        </div>

        <div className="form-group row">
            <div className="col-sm-10">
                <button type="submit" className="btn btn-primary"
                    onClick={newCustomer}>Tạo mới</button>
            </div>
        </div>
    </form>
    {(errorMessage()) &&
          <span style={{
            color: "red",
            textAlign: "center",
            fontSize: "13px"
          }}><br /> {errorMessage()}</span>
        }
    </div>
    );
}
export default Add;
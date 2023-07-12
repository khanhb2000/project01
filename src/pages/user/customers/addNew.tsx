import React, { useState } from 'react';
import { selectToken } from '../../login/loginSlice';
import { useSelector } from 'react-redux';
import { LoginState } from '../../../app/type.d';

//Importing Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Add() {
    const [fullName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [citizenID, setcitizenID] = useState("");

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
                        "Name": fullName,
                        "CitizenId": citizenID,
                        "Email": email,
                        "PhoneNumber": phone,
                        "EmailConfirmed": true,
                        "PhoneNumberConfirmed": true,
                        "TwoFactorEnabled": true,
                        "LockoutEnabled": true,
                        "LockoutEnd": "2023-07-07T01:59:03.598Z",
                        "Password": password,
                        "ConfirmPassword": confirmPassword,
                        "SalesEmployeeIds": [
                            "5ca87050-7758-49cd-7932-08db791a0b05"
                        ]
                    }

                ),
            }
        ).then(response => {
            return response.json()
        })
            .then(data => {
                setjsonData(data);
                console.log(data);
            }).catch(error => {
                setjsonData({
                    "message": `Unknown server error occured: ${error.status}`,
                    "isSuccess": false,
                    "errors": [],
                    "token": "",
                    "customerInformation": null,
                    "userInformation": null,
                    "role":{
                        "id": "0",
                        "normalizedName": "Customer",
                        "isManager": false,
                        "users": [],
                      },
                });
                console.log(jsonData);
                //throw new Error(`Something went wrong: ${error.message || error}`);
            })


        /*
            if (response.status < 200 || response.status >= 300) {
              return rejectWithValue(jsonData);
            }*/

        return jsonData;

    };
    const errorMessage = () => {
        if (jsonData?.errors != null) {
            if (typeof Object.values(jsonData?.errors)[0] == "string") {
                return Object.values(jsonData?.errors)[0];}
            else return Object.values(jsonData?.errors)[0][0];
        }
        if (jsonData?.message)
            return jsonData?.message;
    };

    return (
        <div>
            <div className='dashboard-content-header'>
                <h2>Khách hàng mới</h2></div>
            <form>
                <div className="form-group row">
                    <label htmlFor="inputUsername3"
                        className="col-sm-4 col-form-label">
                        Tên khách hàng</label>
                    <div className="col-sm-6">
                        <input type="text"
                            className="form-control"
                            id="inputUsername3"
                            onChange={(event) => setUserName(event.target.value)}
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
                            onChange={(event) => setcitizenID(event.target.value)}
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
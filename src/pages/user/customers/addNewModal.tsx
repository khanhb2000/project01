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
                        "NormalizedUserName": "string",
                        "CitizenId": "string",
                        "Email": "string",
                        "NormalizedEmail": "string",
                        "PhoneNumber": "string",
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
                console.log(data);
            }).catch(error => {
               
                console.log(jsonData);
                //throw new Error(`Something went wrong: ${error.message || error}`);
            })


        /*
            if (response.status < 200 || response.status >= 300) {
              return rejectWithValue(jsonData);
            }*/

        return jsonData;

    };

    return (
       /* <div className="container">


            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-danger" id="exampleModalLabel">Khách hàng mới</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">*/
                            <form>
                                {/*<div className="form-group row">
                                        <label htmlFor="inputEmail3"
                                            className="col-sm-2 col-form-label">
                                            Email</label>
                                        <div className="col-sm-10">
                                            <input type="email"
                                                className="form-control"
                                                id="inputEmail3"
                                                />
    </div>
                                    </div>*/}
                                <div className="form-group row">
                                    <label htmlFor="inputUsername3"
                                        className="col-sm-2 col-form-label">
                                        Tên đăng nhập</label>
                                    <div className="col-sm-10">
                                        <input type="text"
                                            className="form-control"
                                            id="inputUsername3"
                                            onChange={(event) => setUserName(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputPassword3"
                                        className="col-sm-2 col-form-label">
                                        Mật khẩu</label>
                                    <div className="col-sm-10">
                                        <input type="password"
                                            className="form-control"
                                            id="inputPassword3"
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputConfirmPassword3"
                                        className="col-sm-2 col-form-label">
                                        Nhập lại mật khẩu</label>
                                    <div className="col-sm-10">
                                        <input type="password"
                                            className="form-control"
                                            id="inputConfirmPassword3"
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                        />
                                    </div>
                                </div>
                                {/*
                                    <fieldset className="form-group">
                                        <div className="row">
                                            <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
                                            <div className="col-sm-10">
                                                <div className="form-check">
                                                    <input className="form-check-input"
                                                        type="radio"
                                                        name="gridRadios"
                                                        id="gridRadios1"
                                                        value="option1"
                                                        checked />
                                                    <label className="form-check-label"
                                                        htmlFor="gridRadios1">
                                                        First radio
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input"
                                                        type="radio"
                                                        name="gridRadios"
                                                        id="gridRadios2"
                                                        value="option2" />
                                                    <label className="form-check-label"
                                                        htmlFor="gridRadios2">
                                                        Second radio
                                                    </label>
                                                </div>
                                                <div className="form-check disabled">
                                                    <input className="form-check-input"
                                                        type="radio"
                                                        name="gridRadios"
                                                        id="gridRadios3"
                                                        value="option3"
                                                        disabled />
                                                    <label className="form-check-label"
                                                        htmlFor="gridRadios3">
                                                        Third disabled radio
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div className="form-group row">
                                        <div className="col-sm-2">Checkbox</div>
                                        <div className="col-sm-10">
                                            <div className="form-check">
                                                <input className="form-check-input"
                                                    type="checkbox"
                                                    id="gridCheck1" />
                                                <label className="form-check-label"
                                                    htmlFor="gridCheck1">
                                                    Example checkbox
                                                </label>
                                            </div>
                                        </div>
                                </div>*/}
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary"
                                            onClick={newCustomer}>Tạo mới</button>
                                    </div>
                                </div>
                            </form>
                            /*{jsonData?.errors ? JSON.stringify(jsonData.errors) : jsonData?.message}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Hủy</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>*/
    );
}
export default Add;
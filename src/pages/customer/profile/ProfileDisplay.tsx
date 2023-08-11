import React from 'react';
import './stylesProfile.css';
import Cookies from 'universal-cookie';


const ProfileDisplay: React.FC = () => {
    var cookies = new Cookies();
    var token = cookies.get("token")?.token;
    console.log(cookies.get("token").information.filePath)
    const file = cookies.get("token").information.filePath
    let getFilePath = () => {
        let a = " "
        if (file == null) {
            return a = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
        }
        else {
            return file
        }
    }

    return (
        <div className='center'>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-5 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="150px" src={getFilePath()} />
                            <span className="font-weight-bold">{cookies.get("token").information?.name}</span>
                            <span className="text-black-50">{cookies.get("token").information.email}</span>
                            <span> </span></div>
                    </div>
                    <div className="col-md-7 border-right text-left">
                        <div className="p-3 py-5">
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Tên đăng nhập</label>
                                    <input type="text" className="form-control" value={cookies.get("token").information?.name} readOnly /></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Số điện thoại</label>
                                    <input type="text" className="form-control" value={cookies.get("token").information.phoneNumber} readOnly /></div>
                                <div className="col-md-12">
                                    <label className="labels">Email</label>
                                    <input type="text" className="form-control" value={cookies.get("token").information.email} readOnly />
                                </div>

                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">CCCD</label>
                                    <input type="text" className="form-control" value={cookies.get("token").information.citizenId} readOnly /></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDisplay
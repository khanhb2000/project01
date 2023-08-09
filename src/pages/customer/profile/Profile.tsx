import React, { useState, useEffect } from 'react';
import './stylesProfile.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ProfileDisplay from './ProfileDisplay';


export default function Profile() {

    const [user, setUser] = useState();
    var cookies = new Cookies();
    var token = cookies.get("token")?.token;
    useEffect(() => {
        // const getCus = () => {
        //     cookies = new Cookies()
        //     token = cookies.get("token")?.token;
        //     axios.get(`http://bevm.e-biz.com.vn/api/Customers/${id}`, {
        //         headers: {
        //             'Authorization': `Bearer ${token}`
        //         }
        //     })
        //         .then((res) => {
        //             setUser(res.data)
        //             console.log(user)
        //         })
        //         .catch((error) => {
        //             console.error(error)
        //         })
        // }
        // getCus();
    }, []);
    return (
        <div className='customer-profile'>
            <div className='dashboard-content-header'>
                <h2>Thông tin cá nhân</h2>

                <ProfileDisplay />

            </div>
        </div>
    )
};
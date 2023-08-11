import React, { useState, useEffect } from 'react';
import './stylesVoucher.css';
import DisplayVoucher from './components/DisplayVoucher';
import axios from 'axios';
import Cookies from 'universal-cookie';





export default function MyVoucher() {
    const [voucher, setVoucher] = useState<[]>([]);
    var cookies = new Cookies();
    var token = cookies.get("token")?.token;
    useEffect(() => {
        const getCus = () => {
            cookies = new Cookies()
            token = cookies.get("token")?.token;
            axios.get(`http://bevm.e-biz.com.vn/api/Voucher/Customer`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    setVoucher(res.data)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        getCus();
    }, []);
    console.log(voucher)
    return (
        <div className='customer-voucher'>
            <div className='dashboard-content-header'>
                <h2>Voucher của tôi</h2>
                <DisplayVoucher voucher={voucher} />
            </div>
        </div>
    )
};
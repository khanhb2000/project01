import React, { useState, useEffect } from 'react';
import './stylesHistory.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import HistoryDisplay from './components/HistoryDisplay';

export default function History() {
    var [book, setBook] = useState<[]>([]);
    var cookies = new Cookies();
    var token = cookies.get("token")?.token;
    useEffect(() => {
        const getBooking = () => {
            cookies = new Cookies()
            token = cookies.get("token")?.token;
            axios.get(`http://bevm.e-biz.com.vn/api/Bookings/Customer`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    setBook(res.data);
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        getBooking();
    }, []);
    return (
        <div className='customer-history'>
            <div className='dashboard-content-header'>
                <h2>Lịch sử giao dịch</h2>
                <HistoryDisplay b={book} />

            </div>
        </div>
    )
};
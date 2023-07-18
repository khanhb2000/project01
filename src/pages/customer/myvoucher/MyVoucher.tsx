import React, {useState, useEffect} from 'react';
import './stylesVoucher.css';

export default function MyVoucher () {

    useEffect(() => {

    }, []);

    return(
        <div className='customer-voucher'>
            <div className='dashboard-content-header'>
                    <h2>Voucher của tôi</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            autoFocus
                            placeholder='Search..'
                            className='dashboard-content-input'
                             />
                    </div>
                </div>
        </div>
    )
};
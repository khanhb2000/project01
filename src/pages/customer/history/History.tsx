import React, { useState, useEffect } from 'react';
import './stylesHistory.css';

export default function History() {

    useEffect(() => {

    }, []);

    return (
        <div className='customer-history'>
            <div className='dashboard-content-header'>
                <h2>Lịch sử giao dịch</h2>
                <div className='dashboard-content-search'>
                    <input
                        type='text'

                        placeholder='Search..'
                        className='dashboard-content-input'
                    />
                </div>
            </div>
        </div>
    )
};
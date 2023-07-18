import React, {useState, useEffect} from 'react';
import './stylesProfile.css';

export default function Profile () {

    useEffect(() => {

    }, []);

    return(
        <div className='customer-profile'>
            <div className='dashboard-content-header'>
                    <h2>Thông tin cá nhân</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            placeholder='Search..'
                            className='dashboard-content-input'
                            autoFocus
                             />
                    </div>
                </div>
        </div>
    )
};
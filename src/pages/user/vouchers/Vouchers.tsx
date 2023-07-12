import React, { useState, useEffect } from 'react';
import './stylesVouchers.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const optionArrange = [
    'Tên', 'Ngày', 'Số lượng'
  ];
  
export default function Vouchers() {
    const [search, setSearch] = useState('');
    const [arrangeBy, setArrange] = useState(optionArrange[0]);
    const [ascending, setAscending] = useState(true);

    useEffect(() => {

    }, []);

    return (
        <div className='user-vouchers'>
            <div className='dashboard-content-header1'>
                <h2>Danh sách voucher</h2>
            
            <hr
                style={{
                    borderTop: '1px solid black',
                    width: '100%',
                    opacity: '.25',
                }}
            />
            </div>
            <div className='dashboard-content-header2'>
            <div className='dashboard-content-header2-left'>
            <button type="button" className="btn btn-primary" >
                Thêm
            </button>
            <button type="button" className="btn btn-danger" >
                Xóa
            </button></div>

            <div className='dashboard-content-header2-right'>
            <div className='dashboard-content-search'>
            <input
                    type='text'

                    placeholder='Search..'
                    className='dashboard-content-input'
                />
            </div>
            <button type="button" className="btn btn-warning" >
                Lọc
            </button>
            </div>

            </div>

            <div className='dashboard-content-header3'>
            <span>Sắp xếp theo </span>
             <button type="button" className="btn" onClick={()=>setAscending(!ascending)}>
                {ascending? "Tăng dần": "Giảm dần"}
            </button>
            <Dropdown 
            options={optionArrange} 
            onChange={(e)=>setArrange(e.value)} 
            value={arrangeBy} 
            placeholder="Select an option" />
           
            </div>
        </div>
    )
};
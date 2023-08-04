import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesBookings.css';
//import Add from './addNew';
import { BookingListState, BookingState } from '../../../app/type.d';
import { Button, Table, Space, Divider, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import api_links from '../../../utils/api_links';
import fetch_Api from '../../../utils/api_function';
import Cookies from 'universal-cookie';

interface DataType {
    key: React.Key;
    id: string;
    vouchers: [],
    servicePackage: null,
    bookingTitle: string,
    bookingDate: string,
    bookingStatus: string,
    totalPrice: any,
    priceDetails: string,
    note: string,
    descriptions: string,
    startDateTime: string,
    endDateTime: string,
    customer: null,
    salesEmployee: null
}

export default function Booking() {
    const [addForm, setAddForm] = useState(false);
    const [all_data, setAllData] = useState<BookingListState>();
    const [search, setSearch] = useState('');
    const [data, setData] = useState(all_data);

    const [sortType, setSortType] = useState('name');
    const [ascending, setAscending] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState(0);

    const dataListShow: DataType[] = [];
    const navigate = useNavigate();

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên',
            dataIndex: 'bookingTitle',
            render: (text, record) => <a onClick={() => navigate("detail/" + record.id)}>{text}</a>,
        },
        {
            title: 'Ngày thực hiện',
            dataIndex: 'bookingDate',
        },

        /*{
            title: 'Chức vụ',
            dataIndex: 'level',
            filters: [
                {
                    text: 'Super Admin',
                    value: 'SUPER ADMIN',
                },
                {
                    text: 'Sales Admin',
                    value: 'SALES ADMIN',
                },
                {
                    text: 'Sales',
                    value: 'SALES',
                },
            ],
            onFilter: (value: any, record) => record.level.indexOf(value) === 0,
        },*/
        {
            title: 'Tình trạng',
            dataIndex: 'bookingStatus',
            width: '150px',
            filters: [
                {
                    text: 'Đã thanh toán',
                    value: 'Confirmed',
                },
                {
                    text: 'Đang xử lí',
                    value: 'Pending',
                },
                {
                    text: 'Đã hủy',
                    value: 'Cancelled',
                },
            ],
            onFilter: (value: any, record) => record.bookingStatus.indexOf(value) === 0,

        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalPrice',
        },
        {
            title: 'Action',
            key: 'action',
            width: '112px',
            render: (_, record) => (
                <Space size="small">
                    <Button size={"middle"} onClick={() => navigate("detail/" + record.id)}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                    <Button size={"middle"} ><FontAwesomeIcon icon={faTrashCan} /></Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        setLoading(true);
        fetch_Api({
            url: api_links.user.saleAdmin.getUserBooking,
            method: 'GET',
        }).then(data => {
            setAllData(data.data);
            setData(data.data);
            console.log(typeof data.data);
            console.log(data.data);
        })
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    }, []);

    data?.map((dataTemp) => {
        const date = new Date(dataTemp.bookingDate);
        dataListShow.push({
            key: dataTemp.id,//index
            id: String(dataTemp.id),
            vouchers: [],
            servicePackage: null,
            bookingTitle: dataTemp.bookingTitle,
            bookingDate: date.toLocaleString(),
            bookingStatus: dataTemp.bookingStatus,
            totalPrice: dataTemp.totalPrice.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              }),
            priceDetails: dataTemp.priceDetails,
            note: dataTemp.note,
            descriptions: dataTemp.descriptions,
            startDateTime: dataTemp.startDateTime,
            endDateTime: dataTemp.endDateTime,
            customer: null,
            salesEmployee: null
        });
    });

    const __handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = all_data?.filter((item) =>
                String(item.id).toLowerCase().includes(search.toLowerCase()) ||
                item.id.toLowerCase().includes(search.toLowerCase()) ||
                item.startDateTime.toLowerCase().includes(search.toLowerCase()) ||
                item.endDateTime.toLowerCase().includes(search.toLowerCase())
            );
            setData(search_results);
        }
        else {
            setData(all_data);
        }
    };

    function sortList(tang_dan: boolean, sorttype: string) {
        if (tang_dan) {
            switch (sorttype) {
                case "name":
                    data?.sort((a, b) => (a.bookingTitle > b.bookingTitle) ? 1 : -1);
                    break;
                case "dateCreate":
                    data?.sort((a, b) => (a.bookingDate > b.bookingDate) ? 1 : -1);
                    break;
                case "value":
                    data?.sort((a, b) => (a.totalPrice > b.totalPrice) ? 1 : -1);
                    break;
                default:
                    break;
            }
        }
        else {
            switch (sorttype) {
                case "name":
                    data?.sort((a, b) => (a.bookingTitle < b.bookingTitle) ? 1 : -1);
                    break;
                case "dateCreate":
                    data?.sort((a, b) => (a.bookingDate < b.bookingDate) ? 1 : -1);
                    break;
                case "value":
                    data?.sort((a, b) => (a.totalPrice < b.totalPrice) ? 1 : -1);
                    break;
                default:
                    break;
            }
        }
    }

    /*function filterList(filtype: number) {
        switch (filtype) {
            case 0:
                setData(all_data);
                sortList(ascending, sortType);
                break;
            case 1:
                setData(data?.filter((a) => (a.lockoutEnabled == true)));
                break;
            case 2:
                setData(data?.filter((a) => (a.lockoutEnabled == false)));
                break;
            default:
                break;
        }
    }*/

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div className='user-bookinglist'>

            {!addForm && <>
                <div className='dashboard-content-header1'>
                    <h2>Danh sách giao dịch</h2>

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
                        </button>
                    </div>

                    <div className='dashboard-content-header2-right'>
                        <div className='dashboard-content-search'>
                            <input
                                type='text'
                                onChange={e => __handleSearch(e)}
                                placeholder='Search..'
                                className='dashboard-content-input'
                            />
                        </div>
                    </div>
                </div>

                <div className='dashboard-content-header3'>
                    <span>Sắp xếp theo </span>
                    <button type="button" className="btn" onClick={() => {
                        sortList(!ascending, sortType);
                        setAscending(!ascending)
                    }}>
                        {ascending ? "Tăng dần" : "Giảm dần"}
                    </button>
                    <Select
                        defaultValue="name"
                        style={{ width: 120 }}
                        onChange={(e) => {
                            sortList(ascending, e);
                            setSortType(e)
                        }}
                        options={[
                            { value: 'name', label: 'Tên' },
                            { value: 'dateCreate', label: 'Ngày tạo' },
                            { value: 'value', label: 'Giá trị đơn hàng' },
                        ]}
                    />
                </div>

                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>

                <Table rowSelection={rowSelection} columns={columns} dataSource={dataListShow} />
            </>
            }

            {/*addForm && <><div className='dashboard-content-header2'>
                <h2>Thông tin nhân viên</h2>
                <button type="submit" className="btn btn-primary"
                    onClick={() => setAddForm(!addForm)}>Cancel</button></div>
                <Add />
        </>*/}
        </div>
    )
};

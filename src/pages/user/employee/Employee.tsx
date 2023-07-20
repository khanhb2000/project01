import React, { useState, useEffect } from 'react';
import './stylesEmployee.css';
import Add from './addNew';
import { UserListState } from '../../../app/type.d';
import { Button, Table, Space, Divider, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import Cookies from 'universal-cookie';
const cookies = new Cookies()
const token = cookies.get("token")?.token;

interface DataType {
    key: React.Key;
    id:string;
    name: string;
    contact: string;
    status: string;
    level: string
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Tên Nhân Viên',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Thông tin liên hệ',
        dataIndex: 'contact',
    },
    {
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
    },
    {
        title: 'Tình trạng',
        dataIndex: 'status',
        width:'150px',
        filters: [
            {
                text: 'Đang hoạt động',
                value: 'Đang hoạt động',
            },
            {
                text: 'Đã khóa',
                value: 'Đã khóa',
            },
        ],
        onFilter: (value: any, record) => record.status.indexOf(value) === 0,

    },
    {
        title: 'Action',
        key: 'action',
        width:'112px',
        render: (_, record) => (
            <Space size="small">
                <Button size={"middle"} ><FontAwesomeIcon icon={faPenToSquare} /></Button>
                <Button size={"middle"} ><FontAwesomeIcon icon={faTrashCan} /></Button>
            </Space>
        ),
    },
];

export default function Employees() {
    const [addForm, setAddForm] = useState(false);
    const [all_data, setAllData] = useState<UserListState>();
    const [search, setSearch] = useState('');
    const [data, setData] = useState(all_data);

    const [sortType, setSortType] = useState('name');
    const [ascending, setAscending] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState(0);


    useEffect(() => {
        setLoading(true);
        const response = fetch(
            'http://bevm.e-biz.com.vn/api/Users/All-Users',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            }
        ).then(response => {
            return response.json()
        })
            .then(data => {
                setAllData(data);
                setData(data);
            })
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    }, []);

    const dataListShow: DataType[] = [];
    data?.map((dataTemp, index) => dataListShow.push({
        key: index,
        id:dataTemp.id,
        name: dataTemp.name,
        contact: dataTemp.phoneNumber ? dataTemp.phoneNumber : (dataTemp.email ? dataTemp.email : ""),
        status: dataTemp.lockoutEnabled ? "Đang hoạt động" : "Đã khóa",
        level: dataTemp.roles.map((d)=>d.normalizedName).join(" / "),
    }));

    const __handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = all_data?.filter((item) =>
                String(item.id).toLowerCase().includes(search.toLowerCase()) ||
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.email?.toLowerCase().includes(search.toLowerCase()) ||
                item.phoneNumber?.toLowerCase().includes(search.toLowerCase()) ||
                item.citizenId?.toLowerCase().includes(search.toLowerCase())
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
                    data?.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    break;
                default:
                    break;
            }
        }
        else {
            switch (sorttype) {
                case "name":
                    data?.sort((a, b) => (a.name < b.name) ? 1 : -1);
                    break;
                default:
                    break;
            }
        }
    }

    function filterList(filtype: number) {
            switch (filtype) {
                case 0:
                    setData(all_data);
                    sortList(ascending, sortType);
                    break;
                case 1:
                    setData(data?.filter((a)=>(a.lockoutEnabled==true)));
                    break;
                case 2:
                    setData(data?.filter((a)=>(a.lockoutEnabled==false)));
                    break;
                default:
                    break;
            }
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div className='user-employlist'>

            {!addForm && <>
                <div className='dashboard-content-header1'>
                    <h2>Danh sách nhân viên</h2>

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
                        <button type="button" className="btn btn-primary" onClick={() => setAddForm(!addForm)}>
                            Thêm
                        </button>
                        <button type="button" className="btn btn-danger" >
                            Xóa
                        </button></div>

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
                        ]}
                    />
                </div>

                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>

                <Table rowSelection={rowSelection} columns={columns} dataSource={dataListShow} />
            </>
            }

            {addForm && <><div className='dashboard-content-header2'>
                <h2>Thông tin nhân viên</h2>
                <button type="submit" className="btn btn-primary"
                    onClick={() => setAddForm(!addForm)}>Cancel</button></div>
                    <Add />        
            </>}
        </div>
    )
};

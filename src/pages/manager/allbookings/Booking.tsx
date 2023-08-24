import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesBookings.css';
//import Add from './addNew';
import { BookingListState, BookingState } from '../../../app/type.d';
import { Button, Table, Space, Divider, Select, message, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import api_links from '../../../utils/api_links';
import fetch_Api from '../../../utils/api_function';
import { havePermission } from '../../../utils/permission_proccess';

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
    const [addFormRecover, setAddFormRecover] = useState(false);
    const [dataRecover, setDataRecover] = useState<DataType[]>([])

    const dataListShow: DataType[] = [];
    const navigate = useNavigate();

    const addPermission = havePermission("Booking", "write");
    const deletePermission = havePermission("Booking", "delete");
    const restorePermission = havePermission("Booking", "restore");

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (text, record) => <a onClick={() => navigate("detail/" + record.id)}>{text}</a>,
        },
        {
            title: 'Tên',
            dataIndex: 'bookingTitle',
            render: (text, record) => <a onClick={() => navigate("detail/" + record.id)}>{text}</a>,
        },
        {
            title: 'Ngày thực hiện',
            dataIndex: 'bookingDate',
        },
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
            align: 'right',
        },
        {
            title: 'Action',
            key: 'action',
            width: '112px',

            render: (_, record) => (
                <Space size="small">
                    <Button size={"middle"} onClick={() => navigate("detail/" + record.id)}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                    {deletePermission && <Button size={"middle"} onClick={() => handleDelete1(record.id, record.bookingTitle)}><FontAwesomeIcon icon={faTrashCan} /></Button>}
                </Space>
            ),
        },
    ];
    const columnsRecover: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Tên',
            dataIndex: 'bookingTitle',
        },
        {
            title: 'Ngày thực hiện',
            dataIndex: 'bookingDate',
            render: (text) => {
                const date = new Date(text);
                return date.toLocaleString().split(' ')[1];
            }
        },
        {
            title: 'Tình trạng',
            dataIndex: 'bookingStatus',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalPrice',
            align: 'right',
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            render: (text, record) =>
                <div className="item-content-recover">
                    <Button type='primary' onClick={() => handleRecover(record.id)} style={{ backgroundColor: "#465d65" }}>Khôi phục</Button>
                </div>
        },
    ];

    var api_link = api_links.user.superAdmin.getAllBooking + "/User";
    useEffect(() => {
        api_link = api_links.user.superAdmin.getAllBooking;
        setLoading(true);
        fetch_Api({
            url: api_link,
            method: 'GET',
            data: undefined
        }).then(data => {
            setAllData(data.data);
            setData(data.data);
        })

        fetch_Api({
            url: "http://bevm.e-biz.com.vn/api/Bookings/all-delete",
            method: 'GET',
        })
            .then(data => {
                setDataRecover(data.data);
            })
    }, [data, dataRecover]);

    data?.map((dataTemp, index) => {
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

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    function handleDelete1(itemId: string, itemName: string) {
        message.loading({
            key: 'openloading',
            type: 'loading',
            content: 'Đang xóa... ',
        }, 0);
        fetch_Api({
            url: api_links.user.superAdmin.createNewBooking + '/' + itemId,
            method: 'delete',
        })
            .then(data => {
                console.log(data.data);
            })
        console.log(itemId);
        console.log(itemName);
        message.destroy('openloading');
        message.success({
            type: 'success',
            content: 'Xóa thành công giao dịch ' + itemName + '!'
        }, 1.5)
    }

    function handleDeleteMulti() {
        message.loading({
            key: 'openloading',
            type: 'loading',
            content: 'Đang xóa ' + String(selectedRowKeys.length) + ' giao dịch...',
        }, 0);
        selectedRowKeys.map((key) => {
            fetch_Api({
                url: api_links.user.superAdmin.createNewBooking + '/' + key,
                method: 'delete',
            })
                .then(data => {
                    console.log(data.data);
                })
        })
        message.destroy('openloading');
        message.success({
            type: 'success',
            content: 'Đã xóa ' + String(selectedRowKeys.length) + ' giao dịch!'
        }, 1.5)
    }

    const handleRecover = (recordId: string) => {
        fetch_Api({
            url: "http://bevm.e-biz.com.vn/api/Bookings/restore-booking/" + recordId,
            method: "PATCH",
        })
            .then((res_re) => {
                if (res_re.status === 200) {
                    message.success(res_re.data.message)
                }
            })
            .catch((error) => {
                message.error(error.message)
            })
    }

    return (
        <React.Fragment>
            <Modal
                width="fit-content"
                style={{ top: "5vh" }}
                open={addFormRecover}
                title="Khôi phục"
                onCancel={() => {
                    setAddFormRecover(!addFormRecover)
                }}
                footer={[]}>
                <Table className='recover-table' columns={columnsRecover} dataSource={dataRecover} />
            </Modal>

            <div className='user-bookinglist'>

                {!addForm && <>
                    <div className='dashboard-content-header1'>
                        <div className='dashboard-content-header2-left'>
                            <h2>Danh sách giao dịch</h2>
                            <Button type="primary" className="btnAdd" onClick={() => navigate("/dashboard/giao-dich")}>
                                Trở về
                            </Button></div>
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
                            {addPermission && <Button type="primary" className="btnAdd" onClick={() => setAddForm(!addForm)}>
                                Thêm
                            </Button>}
                            {deletePermission && <Button
                                disabled={!hasSelected}
                                type="primary"
                                style={!hasSelected ?
                                    { backgroundColor: "rgba(0,0,0,0.45)" }
                                    : { backgroundColor: "red" }}
                                onClick={() => //openNotification(placement)
                                { handleDeleteMulti(); setSelectedRowKeys([]) }}
                            >
                                Xóa
                            </Button>}
                            {restorePermission && <Button type='primary' onClick={() => setAddFormRecover(true)} style={{ background: "#465d65" }}>Khôi phục</Button>}

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
                        <span style={{ textAlign: 'left', fontSize: 'initial', alignSelf: 'center', width: '100%' }}>
                            {hasSelected ? `Đã chọn ${selectedRowKeys.length}` : ''}
                        </span>
                        <Button
                            size='large'
                            type="default"
                            onClick={() => {
                                sortList(!ascending, sortType);
                                setAscending(!ascending)
                            }}
                            style={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                            {ascending ? "Tăng dần" : "Giảm dần"}
                        </Button>
                        <Select
                            className="text-bold"
                            size='large'
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

                    {deletePermission ? <Table rowSelection={rowSelection} columns={columns} dataSource={dataListShow} />
                        : <Table columns={columns} dataSource={dataListShow} />}
                </>
                }

                {/*addForm && <><div className='dashboard-content-header2'>
                <h2>Thông tin nhân viên</h2>
                     <Button className="btn btn-primary"
                        onClick={() => setAddForm(!addForm)}>Cancel</Button></div>
                    <Add />
        </>*/}
            </div>
        </React.Fragment>
    )
};

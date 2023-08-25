import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './booking.scss';
//import Add from './addNew';
import { BookingListState, BookingState } from '../../../app/type.d';
import { Button, Table, Space, Divider, Select, message, Modal, Popconfirm, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import api_links from '../../../utils/api_links';
import fetch_Api from '../../../utils/api_function';
import Cookies from 'universal-cookie';
import Notification from '../../../component/notification/Notification';
import { havePermission } from '../../../utils/permission_proccess';

interface DataType {
    key: React.Key;
    id: number;
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
    customer: string,
    salesEmployee: string | undefined,
}

export default function Booking() {
    const [addForm, setAddForm] = useState(false)
    const [all_data, setAllData] = useState<BookingListState>([]);
    const [data, setData] = useState<BookingListState>(all_data);
    const [dataRecover, setDataRecover] = useState<BookingListState>([])
    const [sortType, setSortType] = useState('price');
    const [ascending, setAscending] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [addFormRecover, setAddFormRecover] = useState(false);

    const dataListShow: DataType[] = [];
    const navigate = useNavigate();

    const addPermission = havePermission("Booking", "write");
    const deletePermission = havePermission("Booking", "delete");
    const editPermission = havePermission("Booking", "update");
    const restorePermission = havePermission("Booking", "restore");

    useEffect(() => {
        getAllBooking()
            .then(res => {
                setAllData(res.data);
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);

            })
    }, []);

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (text, record) => <a onClick={() => navigate("detail/" + record.id)}>{text}</a>,
        },
        {
            title: 'Tên',
            dataIndex: 'bookingTitle',
            render: (text, record) => <a>{text}</a>,
        },
        {
            title: 'Ngày thực hiện',
            dataIndex: 'bookingDate',
            render: (_, record) => {
                return (
                    <span>{new Date(record.startDateTime).toLocaleString("vi-VN")}</span>
                )
            }
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDateTime',
            render: (_, record) => {
                return (
                    <span>{new Date(record.endDateTime).toLocaleString("vi-VN")}</span>
                )
            }
        },
        {
            title: 'Tình trạng',
            dataIndex: 'bookingStatus',
            width: '150px',
            filters: [
                {
                    text: 'Đã thanh toán',
                    value: "Đã thanh toán",
                },
                {
                    text: 'Đang xử lí',
                    value: "Đang xử lí",
                },
                {
                    text: 'Đã hủy',
                    value: "Đã huỷ",
                },
            ],
            onFilter: (value: any, record) => {
                return record.bookingStatus.includes(value)
            }

        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            align: 'right',
            render: (_, record) => {
                return (
                    <span>{record.totalPrice.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    })}</span>
                )
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '112px',
            render: (_, record) => {
                return (
                    <>
                        {record.bookingStatus === "Đang xử lí" ?
                            <Space size="small">
                                {editPermission && <Link to={"updatebooking"} state={record}>
                                    <Button size={"middle"}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                </Link>}
                                <Popconfirm
                                    title="Xoá dịch vụ"
                                    description="Bạn có chắc chắn xoá không ?"
                                    onConfirm={() => handleDelete(record.id)}
                                >
                                    {deletePermission && <Button size={"middle"}><FontAwesomeIcon icon={faTrashCan} /></Button>}
                                </Popconfirm>
                            </Space>
                            :
                            <></>}
                    </>
                )
            },
        },
    ];

    /*useEffect(() => {
        //setLoading(true);
        fetch_Api({
            url: api_links.user.saleAdmin.getUserBooking,
            method: 'GET',
        }).then(data => {
            setAllData(data.data);
            setData(data.data);
        })

    }, [data]);*/

    data?.map((dataTemp) => {
        const date = new Date(dataTemp.bookingDate);
        dataListShow.push({
            key: dataTemp.id,//index
            id: dataTemp.id,
            vouchers: [],
            servicePackage: null,
            bookingTitle: dataTemp.bookingTitle,
            bookingDate: String(new Date(dataTemp.bookingDate)),
            bookingStatus: dataTemp.bookingStatus === "Confirmed" ? "Đã thanh toán" : dataTemp.bookingStatus === "Cancelled" ? "Đã huỷ" : "Đang xử lí",
            totalPrice: dataTemp.totalPrice,
            priceDetails: dataTemp.priceDetails,
            note: dataTemp.note,
            descriptions: dataTemp.descriptions,
            startDateTime: new Date(dataTemp.startDateTime).toLocaleString("en-EN"),
            endDateTime: String(new Date(dataTemp.endDateTime).toLocaleString("en-EN")),
            customer: dataTemp.customer?.name,
            salesEmployee: dataTemp.salesEmployee?.name
        });
    });

    const __handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        console.log(value);

        if (value !== "") {
            let search_results = all_data.filter((item) => {
                return item.bookingTitle.toLowerCase().includes(value.toLowerCase())
            });
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
                case "price":
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
                case "price":
                    data?.sort((a, b) => (a.totalPrice < b.totalPrice) ? 1 : -1);
                    break;
                default:
                    break;
            }
        }
    }

    const handleDelete = (id: number) => {
        deleteBooking(id)
            .then((res) => {
                if (res.status === 200) {
                    message.success(res.data.message)
                    getAllBooking()
                        .then(res => {
                            setAllData(res.data);
                            setData(res.data);
                        })
                        .catch((error) => {
                            console.log(error);

                        })
                }
            })
            .catch((error) => {
                message.error(error.message)
            })
    }


    const hasSelected = selectedRowKeys.length > 0;
    const selectedRowData = all_data.filter((row, index) => selectedRowKeys.includes(index))

    ////////////////////// GET API ///////////////////////////////
    const getAllCustomer = () => {
        const api_link = {
            url: api_links.user.superAdmin.getAllCustomer,
            method: "GET"
        }
        return fetch_Api(api_link)
    }

    const getAllBooking = () => {
        const api_link = {
            url: api_links.user.superAdmin.getAllBooking,
            method: "GET"
        }
        return fetch_Api(api_link)
    }

    const deleteBooking = (id: number) => {
        const api_link = {
            url: `${api_links.user.superAdmin.deleteBooking.url}${id}`,
            method: "DELETE"
        }
        return fetch_Api(api_link)
    }

    return (
        <>
            <Modal
                open={addForm}
                footer={[]}
                onCancel={() => setAddForm(false)}
                style={{ top: "25vh", width: " 500px" }}
            >
                <Row>
                    <Col span={24}>
                        <Link to={"createbooking"}>
                            <Button style={{ width: "100%" }} type='default' size='large'>
                                Thêm dịch vụ
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Modal>
            <div className='user-bookinglist'>
                <div className='dashboard-content-header1'>
                    <div className='dashboard-content-header2'>
                        <h2>Danh sách giao dịch</h2>
                        <Button type="primary" className="btnAdd" onClick={() => navigate("/dashboard/giao-dich")}>
                        Trở về
                        </Button>
                    </div>
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
                        {/*<Notification
                        isDisable={!hasSelected}
                        type='booking'
                        buttonContent={`Xoá ${hasSelected ? selectedRowKeys.length : ''} dịch vụ`}
                        placement='top'
                        selectedRowData={selectedRowData}
                        setData={setData}
                        description={`Bạn có chắc chắn muốn xoá ${hasSelected ? selectedRowKeys.length : ''} dịch vụ này không `}
                        setDataRecover={setDataRecover}
                        setSelectedRowKeys={setSelectedRowKeys}
                    /> */}
                        {/*restorePermission && <Button type='primary' onClick={() => setAddFormRecover(true)} style={{ background: "#465d65" }}>Khôi phục</Button> */}
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
                        defaultValue="price"
                        onChange={(e) => {
                            sortList(ascending, e);
                            setSortType(e)
                        }}
                        options={[
                            { value: 'price', label: 'Giá trị' },
                            { value: 'name', label: 'Tên' },
                            { value: 'dateCreate', label: 'Ngày' },
                        ]}
                    />
                </div>

                <Table columns={columns} dataSource={dataListShow} />
            </div>
        </>
    );
};

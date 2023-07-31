import React, { useState, useEffect, ReactNode } from 'react';
import './stylesServices.scss';
//import Add from './addNew';D
import { ServicePackageListState, ServicePackageState } from '../../../app/type.d';
import { calculateRange, sliceData } from '../../table-pagination';
import { LikeOutlined, MessageOutlined, StarOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Form, Input, List, Modal, Popconfirm, Select, Space, message } from 'antd';
import { Button, Table, Divider, Card, Col, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import type { ModalProps } from "antd";
import Cookies from 'universal-cookie';
import api_links from '../../../utils/api_links';
import fetch_Api from '../../../utils/api_function';
import Notification from '../../../component/notification/Notification';
import NewService from './NewService';
import { Link } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';


interface DataType {
    key?: React.Key;
    id: number;
    service: string;
    image: string;
    href: string;
    description: string
}




export default function Services() {
    const [all_data, setAllData] = useState<ServicePackageListState>([]);
    const [data, setData] = useState<ServicePackageListState>(all_data);
    const [sortType, setSortType] = useState('name');
    const [ascending, setAscending] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [addForm, setAddForm] = useState(false);
    const [popUpUpdateForm, setPopUpUpdateForm] = useState(false);
    const [record, setRecord] = useState<DataType>()

    //get data from cookie
    var cookies = new Cookies()
    var token = cookies.get("token")?.token;

    // call api to get data
    useEffect(() => {
        getAllServicePackages()
            .then((res) => {
                if (res.status === 200) {
                    setAllData(res.data);
                    setData(res.data);
                }
            })
            .catch((reason) => {
                console.log(reason);
            })
    }, []);

    const { Meta } = Card; // TESTING

    // ======================================= use to render the format of the table ===============================================
    // quantity of column, title of column...

    const handleDelete = (e: number) => {
        deleteServicePackages(e)
            .then((res) => {
                if (res.status === 200) {
                    message.success("Xoá thành công")
                    getAllServicePackages()
                        .then((res) => {
                            setAllData(res.data);
                            setData(res.data);
                        })
                        .catch((reason) => {
                            console.log(reason);
                        })
                }
            })
            .catch((reason) => {
                message.error("Xoá thất bại")
            })
    }


    const updatePopup = (record: DataType) => {

    }


    const columns: ColumnsType<DataType> = [
        {
            title: 'Lựa chọn',
            dataIndex: 'image',
            width: '300px',
            render: (img) =>
                <a>
                    <img
                        width={300}
                        alt="logo"
                        src={img}
                    />
                </a>,
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'service',
            render: (text, record, index) => <>
                <div className="item-content">
                    <a style={{ fontWeight: "bold" }}>{record.service}</a>
                    <span>Nội dung: {record.description}</span>
                </div>
                <div className="bonus-content">
                    <div>Đã bán: </div>
                </div></>,
        },
        {
            title: 'Thao tác',
            key: 'id',
            width: '112px',
            render: (text, record, index) => (
                <Space size="small">
                    <Button
                        onClick={() => {
                            setPopUpUpdateForm(!popUpUpdateForm)
                            setRecord(record)
                        }}
                        size={"large"} >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>

                    <Popconfirm
                        className="ant-popconfirm"
                        title="Xoá dịch vụ"
                        description="Bạn có chắc chắn xoá không ?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xoá"
                        cancelText="Huỷ"
                    >
                        <Button size={"large"} ><FontAwesomeIcon icon={faTrashCan} /></Button>
                    </Popconfirm>
                </Space>

            )
        },
    ];


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;
    //===================================================================================================================================



    // put data into table to display
    const dataListShow: DataType[] = [];
    data?.map((dataTemp, index) => dataListShow.push({
        key: index,
        id: dataTemp.id,
        service: dataTemp.servicePackageName,
        href: 'https://ant.design',
        image: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        description: dataTemp.description
    }));


    // search data
    const __handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== '') {
            let search_results = all_data?.filter((item) => {
                return String(item.id).toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.servicePackageName.toLowerCase().includes(event.target.value.toLowerCase())
            }
            );
            setData(search_results);
        }
        else {
            setData(all_data);
        }
    };

    // sort data by descending or increment
    function sortList(tang_dan: boolean, sorttype: string) {
        if (tang_dan) {
            switch (sorttype) {
                case "name":
                    data?.sort((a, b) => (a.servicePackageName > b.servicePackageName) ? 1 : -1);
                    break;
                default:
                    break;
            }
        }
        else {
            switch (sorttype) {
                case "name":
                    data?.sort((a, b) => (a.servicePackageName < b.servicePackageName) ? 1 : -1);
                    break;
                default:
                    break;
            }
        }
    }

    //=========================== GET API ====================================
    const getAllServicePackages = () => {
        const api_link = api_links.user.superAdmin.getAllServicePackages
        api_link.token = token
        return fetch_Api(api_link)

    }
    const deleteServicePackages = (e: number) => {
        const api_link = api_links.user.superAdmin.deleteServicePackage
        api_link.url = api_link.url + e
        api_link.token = token
        return fetch_Api(api_link)
    }

    // ====================================================================

    // not yet
    const handleTableRowClick = (record?: DataType) => {
    }
    return (
        <React.Fragment>
            <Modal
                open={addForm}
                footer={[]}
                onCancel={() => setAddForm(false)}
                style={{ top: "25vh", width: " 500px" }}
            >
                <Row>
                    <Col span={12}>
                        <Link to={"createservice"}>
                            <Button type='default' size='large'>
                                Thêm dịch vụ
                            </Button>
                        </Link>
                    </Col>
                    <Col span={12}>
                        <Link to={"createvoucerservice"}>
                            <Button type='default' size='large'>
                                Thêm voucher cho dịch vụ
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Modal>

            <div className="user-services">
                <div className="dashboard-content-header1">
                    <h2>Danh sách dịch vụ</h2>

                    <hr
                        style={{
                            borderTop: '1px solid black',
                            width: '100%',
                            opacity: '.25',
                        }}
                    />
                </div>
                <div className="dashboard-content-header2">
                    <div className="dashboard-content-header2-left">
                        <Button type="primary" onClick={() => setAddForm(true)}>
                            Thêm
                        </Button>
                        <Notification
                            isDisable={!hasSelected}
                            description={`Bạn có chắc chắn muốn xoá ${hasSelected ? selectedRowKeys.length : ''} dịch vụ này không `}
                            placement='top'
                            buttonContent={`Xoá ${hasSelected ? selectedRowKeys.length : ''} dịch vụ`}
                        >
                        </Notification>
                    </div>

                    <div className="dashboard-content-header2-right">
                        <div className="dashboard-content-search">
                            <input
                                type='text'
                                onChange={e => __handleSearch(e)}
                                placeholder='Search..'
                                className="dashboard-content-input"
                            />
                        </div>

                    </div>

                </div>
                <div className="dashboard-content-header3">
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
                        onChange={(e) => {
                            sortList(ascending, e);
                            setSortType(e)
                        }}
                        options={[
                            { value: 'name', label: 'Tên' },
                        ]}
                    />
                </div>

                <Table rowSelection={rowSelection} columns={columns} dataSource={dataListShow} onRow={(record) => ({
                    onClick: () => handleTableRowClick(record),
                })} />


                {/* =================================================== TESTING ================================================================= */}
                {/* {false &&
                <Row gutter={16}>

                    {dataListShow.map((d) => {
                        return (
                            <Col span={8}>
                                <Card
                                    style={{ width: 300 }}
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                        />
                                    }
                                    actions={[
                                        <SettingOutlined key="setting" />,
                                        <EditOutlined key="edit" />,
                                        <EllipsisOutlined key="ellipsis" />,
                                    ]}
                                >
                                    <Meta
                                        title={d.service}
                                        description="This is the description"
                                    />
                                </Card>
                            </Col>
                        )
                    })}
                </Row>} */}
                {/* ////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                {/*<table>
                <thead>
                    <th>ID</th>
                    <th>TÊN</th>
                    <th>MÔ TẢ</th>
                    <th>GÓI DỊCH VỤ</th>
                </thead>


                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={dataListShow}
                    header={
                        <div>
                            <b>ant design</b> footer part
                        </div>
                    }
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src={item.image}
                                />
                            }
                        >
                            <List.Item.Meta
                                //avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.name}</a>}
                            />
                            Miêu tả tóm tắt
                        </List.Item>
                    )}
                />

                {/*orders.map((order, index) => (
                            <tr key={index}>
                                <td><span>{order.id}</span></td>
                                <td><span>{order.serviceName}</span></td>
                                {/*<td>
                                    <div>
                                        {order.status === 'Paid' ?
                                            <img
                                                src={DoneIcon}
                                                alt='paid-icon'
                                                className='dashboard-content-icon' />
                                            : order.status === 'Canceled' ?
                                                <img
                                                    src={CancelIcon}
                                                    alt='canceled-icon'
                                                    className='dashboard-content-icon' />
                                                : order.status === 'Refunded' ?
                                                    <img
                                                        src={RefundedIcon}
                                                        alt='refunded-icon'
                                                        className='dashboard-content-icon' />
                                                    : null}
                                        <span>{order.status}</span>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <img
                                            src={order.avatar}
                                            className='dashboard-content-avatar'
                                            alt={order.first_name + ' ' + order.last_name} />
                                        <span>{order.first_name} {order.last_name}</span>
                                    </div>
                                </td>*}
                                <td><span>{order.description}</span></td>
                                <td><span>{order.servicePackages}</span></td>
                            </tr>
                        ))}
                  </table>*/}




                {/*addForm && <><Add />        
            <button type="submit" className="btn btn-primary"
                    onClick={() => setAddForm(!addForm)}>Cancel</button>
                            </>*/}

            </div>
        </React.Fragment>

    )

};

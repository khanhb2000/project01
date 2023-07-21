import React, { useState, useEffect } from 'react';
import './stylesVouchers.css';
//import Add from './addNew';
import { VoucherTypeListState } from '../../../app/type.d';
import { LikeOutlined, MessageOutlined, StarOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Table, Space, Select, Tag, Card, Col, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';


import Cookies from 'universal-cookie';

interface DataType {
    key: React.Key;
    id: string;

    image: string;
    href: string;
    content: {
        name: string;
        isAvailable: boolean,
        commonPrice: number,
        availableNumberOfVouchers: number,
        percentageDiscount: number,
        maximumValueDiscount: number,
        conditionsAndPolicies: string,
    }
}

const columns: ColumnsType<DataType> = [
    {
        title: '',
        dataIndex: 'image',
        width: '300px',
        render: (text) => <a>
            <img
                width={272}
                alt="logo"
                src={text}
            /></a>,
    },
    {
        title: '',
        dataIndex: 'content',
        render: (item) => <>
            <div className='item-content'>
                <div><a>{item.name} </a>
                    {item.isAvailable ? null : <Tag color="red">Hết hiệu lực</Tag>}</div>
                <span>{/*item.conditionsAndPolicies*/}</span>
                <div>Giá trị: {
                    item.percentageDiscount ?
                        <>{item.percentageDiscount}% {item.maximumValueDiscount ? <> &#40;tối đa: {item.maximumValueDiscount?.toLocaleString('en-US')}&#41; </> : ""}</>
                        : <>{item.maximumValueDiscount?.toLocaleString('en-US')}</>
                }</div></div>
            <div className='bonus-content'>
                <div>Giá bán: {item.commonPrice?.toLocaleString('en-US')} </div>
                <div>Còn: {item.availableNumberOfVouchers}</div>
            </div></>,
    },
    {
        title: 'Action',
        key: 'action',
        width: '112px',
        render: (_, record) => (
            <Space size="small">
                <Button size={"large"} ><FontAwesomeIcon icon={faPenToSquare} /></Button>
                <Button size={"large"} ><FontAwesomeIcon icon={faTrashCan} /></Button>
            </Space>
        ),
    },
];

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const { Meta } = Card;


export default function Vouchers() {
    const [addForm, setAddForm] = useState(false);
    const [all_data, setAllData] = useState<VoucherTypeListState>();
    const [search, setSearch] = useState('');
    const [data, setData] = useState(all_data);

    const [sortType, setSortType] = useState('name');
    const [ascending, setAscending] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState(0);

    var cookies = new Cookies()
    var token = cookies.get("token")?.token;

    useEffect(() => {
        cookies = new Cookies()
        token = cookies.get("token")?.token;
        setLoading(true);
        const response = fetch(
            'http://bevm.e-biz.com.vn/api/VoucherTypes',
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
        id: String(dataTemp.id),
        href: 'https://ant.design',
        image: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        content: {
            name: dataTemp.typeName,
            isAvailable: dataTemp.isAvailable,
            commonPrice: dataTemp.commonPrice,
            availableNumberOfVouchers: dataTemp.availableNumberOfVouchers,
            percentageDiscount: dataTemp.percentageDiscount,
            maximumValueDiscount: dataTemp.maximumValueDiscount,
            conditionsAndPolicies: dataTemp.conditionsAndPolicies,
        }
    }));

    const __handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = all_data?.filter((item) =>
                String(item.id).toLowerCase().includes(search.toLowerCase()) ||
                item.typeName.toLowerCase().includes(search.toLowerCase())
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
                    data?.sort((a, b) => (a.typeName > b.typeName) ? 1 : -1);
                    break;
                case "cost":
                    data?.sort((a, b) => (a.commonPrice > b.commonPrice) ? 1 : -1);
                    break;
                case "maxvalue":
                    data?.sort((a, b) => (a.maximumValueDiscount > b.maximumValueDiscount) ? 1 : -1);
                    break;
                case "remain":
                    data?.sort((a, b) => (a.availableNumberOfVouchers > b.availableNumberOfVouchers) ? 1 : -1);
                    break;
                default:
                    break;
            }
        }
        else {
            switch (sorttype) {
                case "name":
                    data?.sort((a, b) => (a.typeName < b.typeName) ? 1 : -1);
                    break;
                case "cost":
                    data?.sort((a, b) => (a.commonPrice < b.commonPrice) ? 1 : -1);
                    break;
                case "maxvalue":
                    data?.sort((a, b) => (a.maximumValueDiscount < b.maximumValueDiscount) ? 1 : -1);
                    break;
                case "remain":
                    data?.sort((a, b) => (a.availableNumberOfVouchers < b.availableNumberOfVouchers) ? 1 : -1);
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
        <div className='user-vouchers'>
            {!addForm && <>
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
                            { value: 'cost', label: 'Giá bán' },
                            { value: 'maxValue', label: 'Giá trị tối đa' },
                            { value: 'remain', label: 'Số lượng tồn' },

                        ]}
                    />
                </div>

                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                {0 &&
                    <Table rowSelection={rowSelection} columns={columns} dataSource={dataListShow} />
                }               <Row gutter={16}>

                    {dataListShow.map((d) => {
                        return (
                            <Col span={8}> <Card
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
                                    title={d.content.name}
                                    description="This is the description"
                                />
                            </Card></Col>)
                    })}
                </Row>

            </>}
        </div>
    )
};

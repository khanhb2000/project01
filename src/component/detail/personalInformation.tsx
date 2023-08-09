import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button, Descriptions, Divider, List, Space, Tag } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import { CustomerState } from '../../app/type.d';
import Cookies from 'universal-cookie';
import fetch_Api from '../../utils/api_function';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css'

interface DataType {
    id: string,
    name: string,
    email: string | null,
    phoneNumber: string | null,
    citizenId: string | null,
    isBlocked: boolean,
    bookings?: [],
    vouchers?: [],
    filePath: string,

    //only Customer
    users: {
        id: string,
        name: string,
        phoneNumber: string,
    }[],

    //only User
    userName: string,
    salesManager: {
        id: string,
        name: string,
        phoneNumber: string,
    },
    roles: {
        id: string,
        normalizedName: string,
    }[],
};

export default function PersonalInformation({ api_link }: { api_link: string }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<DataType>();
    var cookies = new Cookies()

    useEffect(() => {
        fetch_Api({
            url: api_link + '/' + id,
            method: 'GET',
        }).then(data => {
            setData(data.data);
        })
    }, [id]);

    return (
        <div className="detail-left">
            <div className="personal-information">
                {data?.isBlocked && <Tag color="orange" style={{ width: "fit-content" }}>Tài khoản đã bị khóa</Tag>}
                <Descriptions title={<Space>{data?.name}<FontAwesomeIcon size='xs' icon={faPenToSquare} onClick={() => console.log("checked")} style={{ cursor: "pointer" }} /></Space>}
                    column={1}>
                    <Descriptions.Item label="ID">{data?.id}</Descriptions.Item>
                    <Descriptions.Item label="CitizenId">{data?.citizenId}</Descriptions.Item>
                    <Descriptions.Item label="Telephone">{data?.phoneNumber}</Descriptions.Item>
                    <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
                </Descriptions>
                <img src={data?.filePath} />
            </div>

            {data?.userName ?

                <div className="more-information">
                    <Divider orientation="left">Chức vụ <FontAwesomeIcon size='xs' icon={faPenToSquare} onClick={() => console.log("checked")} style={{ cursor: "pointer" }} /></Divider>
                    <List size="small" bordered>
                        {data?.roles.length!=0 ?
                            data.roles.map((d) =>{
                                console.log(data.roles);
                                return  <List.Item style={{ textAlign: "left" }}>{d.normalizedName}</List.Item>
})
                            : <List.Item style={{ textAlign: "left" }}>Không có</List.Item>}
                    </List>
                    <Divider orientation="left">Quản lý <FontAwesomeIcon size='xs' icon={faPenToSquare} onClick={() => console.log("checked")} style={{ cursor: "pointer" }} /></Divider>
                    <List size="small" bordered>
                        {data?.salesManager ?
                            <List.Item style={{ textAlign: "left" }}>{data.salesManager.id} <br /> {data.salesManager.name}{data.salesManager.phoneNumber ? " - " + data.salesManager.phoneNumber : ""}</List.Item>
                            : <List.Item style={{ textAlign: "left" }}>Không có</List.Item>}
                    </List>
                </div>
                :
                <div className="more-information">
                    <Divider orientation="left">Nhân viên tư vấn <FontAwesomeIcon size='xs' icon={faPenToSquare} onClick={() => console.log("checked")} style={{ cursor: "pointer" }} /></Divider>
                    <List size="small" bordered>
                        {data?.users.length!=0 ?
                            data?.users.map((d) =>
                                <List.Item style={{ textAlign: "left" }}>{d.id} <br /> {d.name}{d.phoneNumber ? " - " + d.phoneNumber : ""}</List.Item>
                            ) : <List.Item style={{ textAlign: "left" }}>Không có</List.Item>}
                    </List>
                </div>}
        </div>
    );
};



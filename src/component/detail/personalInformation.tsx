import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button, Descriptions, Divider, List, Select, Space, Tag, message } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import { CustomerState, RoleListState } from '../../app/type.d';
import Cookies from 'universal-cookie';
import api_links from '../../utils/api_links';
import fetch_Api from '../../utils/api_function';
import { faPenToSquare, faSquareMinus, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
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
    const [chuc_vu, setCV] = useState<RoleListState>();
    var cookies = new Cookies()

    const [isChangeRoles, setIsChangeRoles] = useState(false);
    const [isChangeManager, setIsChangeManager] = useState(false);
    const [isChangeEmployees, setIsChangeEmployees] = useState(false);

    useEffect(() => {
        fetch_Api({
            url: api_link + '/' + id,
            method: 'GET',
        }).then(data => {
            setData(data.data);
        })

        fetch_Api({
            url: api_links.user.superAdmin.getAllRole,
            method: 'GET',
            data: undefined
        }).then(data => {
            setCV(data.data);
        });

    }, [id,data,chuc_vu]);

    const changeRoles = () => {
        const addRole=(value: string)=>{
            console.log(value,"22");
            console.log(api_link + '/Roles');
            fetch_Api({
                url: api_link + '/Roles',
                method: 'PATCH',
                data:{
                    roleId: value,
                    isDelete:false,
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        message.success(res.data.message)
                    }
                })
                .catch((reason) => {
                    message.error("Dữ liệu không đổi")

                })
        }
        return (
            <List size="small" bordered>
                {data?.roles.map((d) => {
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <List.Item style={{ textAlign: "left", width: "100%" }}>{d.normalizedName}</List.Item>
                                <FontAwesomeIcon size='xl' icon={faSquareMinus} onClick={() => console.log("checked1")} style={{ cursor: "pointer", margin: "10px 15px" }} />
                            </div>
                        )
                    })}
                    <List.Item style={{ textAlign: "left" }}>
                    <Select suffixIcon={<FontAwesomeIcon size='2xl' icon={faSquarePlus} />} style={{ width: "100%" }} >
                        {chuc_vu?.map((d) => 
                                <Select value={d.id} onChange={(value)=>console.log(value.length,"11")}>{d.normalizedName}</Select>
                        )}
                    </Select>
                </List.Item>
            </List>
        )
    }

    const changeManager = () => {

        return (
            <List size="small" bordered>
                
            </List>)
    }

    const changeEmployees = () => {

        return (
            <List size="small" bordered>
                {data?.users.length != 0 ?
                    data?.users.map((d) =>
                        <List.Item style={{ textAlign: "left" }}> {d.name}{d.phoneNumber ? " - " + d.phoneNumber : ""}</List.Item>
                    ) : <List.Item style={{ textAlign: "left" }}>Không có</List.Item>}
            </List>)
    }

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
                    <Divider orientation="left">Chức vụ <FontAwesomeIcon size='xs' icon={faPenToSquare} onClick={() => setIsChangeRoles(!isChangeRoles)} style={{ cursor: "pointer" }} /></Divider>
                    {isChangeRoles ? changeRoles() :
                        <List size="small" bordered>
                            {data?.roles.length != 0 ?
                                data.roles.map((d) => {
                                    return <List.Item style={{ textAlign: "left", width: "100%" }}>{d.normalizedName}</List.Item>
                                })
                                : <List.Item style={{ textAlign: "left" }}>Không có</List.Item>}
                        </List>
                    }
                    <Divider orientation="left">Quản lý <FontAwesomeIcon size='xs' icon={faPenToSquare} onClick={() => console.log("checked")} style={{ cursor: "pointer" }} /></Divider>
                    <List size="small" bordered>
                        {data?.salesManager ?
                            <List.Item style={{ textAlign: "left" }}> {data.salesManager.name}{data.salesManager.phoneNumber ? " - " + data.salesManager.phoneNumber : ""}</List.Item>
                            : <List.Item style={{ textAlign: "left" }}>Không có</List.Item>}
                    </List>
                </div>
                :
                <div className="more-information">
                    <Divider orientation="left">Nhân viên tư vấn <FontAwesomeIcon size='xs' icon={faPenToSquare} onClick={() => console.log("checked")} style={{ cursor: "pointer" }} /></Divider>
                    <List size="small" bordered>
                        {data?.users.length != 0 ?
                            data?.users.map((d) =>
                                <List.Item style={{ textAlign: "left" }}> {d.name}{d.phoneNumber ? " - " + d.phoneNumber : ""}</List.Item>
                            ) : <List.Item style={{ textAlign: "left" }}>Không có</List.Item>}
                    </List>
                </div>}
        </div>
    );
};



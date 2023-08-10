import { useDispatch, useSelector } from "react-redux";
import { selectInformation } from "../../pages/login/loginSlice";
import './popupscreen.css'
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import Cookies from "universal-cookie";
import React, { FormEvent, useEffect, useState } from "react";
import api_links from "../../utils/api_links";
import fetch_Api from "../../utils/api_function";
import { Rule } from 'antd/lib/form';

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

export default function PersonalInformationPopupScreen({ isPopup, setPopup, data }: { isPopup?: boolean, setPopup?: any,data: DataType}) {

    // watch value in form
    const [form] = Form.useForm()

    //get data
    const cookies = new Cookies()
    //const data = cookies.get("token")?.information
    const role = cookies.get("token")?.role

    const handleCancel = () => {
        setPopup(false);
    }

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                const api_link = role.normalizedName == "Customer" ? api_links.user.customer.updateInformation : api_links.user.superAdmin.updateInformationForUser
                api_link.data = values
                api_link.token = cookies.get("token").token

                fetch_Api({
                    url: api_link + '/',
                    method: 'GET',

                })
                    .then((res) => {
                        if (res.status == 200) {
                            message.success(res.data.message)
                            setPopup(false);
                        }
                    })
                    .catch((reason) => {
                        message.error("Dữ liệu không đổi")

                    })
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            })
    }


    return (
        <Modal
            title="Thông tin"
            open={isPopup}
            onCancel={handleCancel}
            footer={[
                <Button onClick={handleCancel} type="default" key="back">
                    Huỷ
                </Button>,
                <Button onClick={handleOk} type="primary" htmlType="submit" key="submit">
                    Sửa đổi
                </Button>
            ]}
        >
            <Form
                form={form}
            >
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Tên"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                            initialValue={data?.name}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="CMND"
                            name="citizenId"
                            rules={[{ required: true, message: 'Please input your citizen id!' }]}
                            initialValue={data?.citizenId}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                            initialValue={data?.email}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Số Điện thoại"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                            initialValue={data?.phoneNumber}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal >
    )
}
import { useDispatch, useSelector } from "react-redux";
import { selectInformation } from "../../pages/login/loginSlice";
import './popupscreen.css'
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import Cookies from "universal-cookie";
import React, { FormEvent, useEffect, useState } from "react";
import api_links from "../../utils/api_links";
import fetch_Api from "../../utils/api_function";
import { Rule } from 'antd/lib/form';


export default function PopupScreen({ isPopup, setPopup }: { isPopup?: boolean, setPopup?: any }) {

    //useState, useDispatch, useEffect
    const [form] = Form.useForm()

    //get data
    const cookies = new Cookies()
    const data = cookies.get("token")?.information
    const role = cookies.get("token")?.role

    const handleCancel = () => {
        setPopup(false);
    }

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                const updateInformationUser = role.normalizedName == "Customer" ? api_links.user.customer.updateInformation : api_links.user.superAdmin.updateInformationForUser
                updateInformationUser.data = values
                updateInformationUser.token = cookies.get("token").token

                fetch_Api(updateInformationUser)
                    .then((res) => {
                        if (res.status == 200) {
                            cookies.set("token", { ...cookies.get("token"), information: updateInformationUser.data }, { path: "/", maxAge: 3600 })
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
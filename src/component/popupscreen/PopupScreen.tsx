import { useSelector } from "react-redux";
import { selectInformation } from "../../pages/login/loginSlice";
import './popupscreen.css'
import { Button, Col, Form, Input, Modal, Row } from "antd";
import Cookies from "universal-cookie";
import { CommonInformationLoginState } from "../../app/type.d";
import React, { FormEvent, useEffect, useState } from "react";



export default function PopupScreen({ isPopup, setPopup }: { isPopup?: boolean, setPopup?: any }) {

    //useState
    const [loading, setLoading] = useState(false)

    //get data
    const cookies = new Cookies()
    const data = cookies.get("token")?.information
    const [information, setInformation] = useState(
        {
            name: data?.name,
            citizenId: data?.citizenId,
            email: data?.email,
            phoneNumber: data?.phoneNumber,
            twoFactorEnabled: data?.twoFactorEnabled
        }
    )

    const handleOk = () => {
        setLoading(true)
        setTimeout(() => {
            setPopup(false);
            setLoading(false)
        }, 1000)
    }

    const handleCancel = () => {
        console.log('cancel');
        setPopup(false);
    }

    console.log(isPopup);


    return (
        <Modal
            title="Information"
            open={isPopup}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" type="primary" onClick={handleCancel}>
                    Quay lại
                </Button>,
                <Button onClick={handleOk} loading={loading}
                    key="submit"
                    type="primary"
                // loading={loading}
                // onClick={handleOk}
                >
                    Sửa đổi
                </Button>,
            ]}
        >
            <Form>

                <Row>
                    <Col span={12}>
                        <Form.Item>

                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item>

                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </Modal>

    )
}
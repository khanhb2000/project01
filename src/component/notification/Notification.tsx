import { Button, Space, notification } from "antd"
import { NotificationPlacement } from "antd/es/notification/interface"
import React from "react"


interface NotificationProps {
    description: string,
    placement: NotificationPlacement,
    buttonContent: string,
    children: React.ReactNode;
    isDisable?: boolean
}

const Notification: React.FC<NotificationProps> = ({ description, placement, buttonContent, isDisable }) => {
    const key = `open${Date.now()}`;
    const [api, contextHolder] = notification.useNotification()
    const btn = (
        <Space>
            <Button type="default" size="middle" onClick={() => api.destroy()}>
                Huỷ bỏ
            </Button>
            <Button type="primary" size="middle" onClick={() => api.destroy(key)}>
                Đồng ý
            </Button>
        </Space>
    );
    const openNotification = (placement: NotificationPlacement) => {
        api.warning({
            message: `Lưu ý`,
            description: `${description}`,
            placement: `${placement}`,
            btn,
            key,
        })
    }

    return (
        <React.Fragment>
            {contextHolder}
            <Button disabled={isDisable} type="primary" style={isDisable ? { backgroundColor: "rgba(0,0,0,0.45)" } : { backgroundColor: "red" }} onClick={() => openNotification(placement)}>
                {buttonContent}
            </Button>
        </React.Fragment >
    )
}

export default Notification
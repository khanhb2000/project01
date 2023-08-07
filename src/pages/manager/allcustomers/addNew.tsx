import React, { useEffect, useState } from 'react';
import { selectToken } from '../../login/loginSlice';
import { useSelector } from 'react-redux';
import { LoginState, RoleListState } from '../../../app/type.d';
import { UserListState } from '../../../app/type.d';
import api_links from '../../../utils/api_links';
import fetch_Api from '../../../utils/api_function';

import type { CascaderProps } from 'antd';
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    message,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface DataNodeType {
    "Name": string,
    "CitizenId": string,
    "Email": string,
    "PhoneNumber": string,
    "EmailConfirmed": boolean | null,
    "PhoneNumberConfirmed": boolean | null,
    "TwoFactorEnabled": boolean | null,
    "IsBlocked": boolean | null,
    "Password": string,
    "ConfirmPassword": string,
    "SalesEmployeeIds": string[],
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


function Add() {
    /*
        const [fullName, setUserName] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [email, setEmail] = useState("");
        const [phone, setPhone] = useState("");
        const [citizenID, setcitizenID] = useState("");
    */
    const [form] = Form.useForm();
    const [nhan_vien, setNV] = useState<UserListState>();
    const [filter_nhan_vien, setFilterNV] = useState<UserListState>();
    const [chuc_vu, setCV] = useState<RoleListState>();

    const [jsonData, setjsonData] = useState<LoginState>();

    var register: DataNodeType = {
        Name: '',
        CitizenId: '',
        Email: '',
        PhoneNumber: '',
        EmailConfirmed: null,
        PhoneNumberConfirmed: null,
        TwoFactorEnabled: null,
        IsBlocked: null,
        Password: '',
        ConfirmPassword: '',
        SalesEmployeeIds: []
    }

    useEffect(() => {
        fetch_Api({
            url: api_links.user.superAdmin.getAllRole,
            method: 'GET',
            data: undefined
        }).then(data => {
            setCV(data.data);
        });

        fetch_Api({
            url: api_links.user.superAdmin.getAllUser,
            method: 'GET',
            data: undefined
        }).then(data => {
            setNV(data.data);
            setFilterNV(data.data);
        });
    }, []);

    const errorMessage = () => {
        if (jsonData?.errors != null) {
            if (typeof Object.values(jsonData?.errors)[0] == "string") {
                return Object.values(jsonData?.errors)[0];
            }
            else return Object.values(jsonData?.errors)[0][0];
        }
        if (jsonData?.message)
            return jsonData?.message;
        return "";
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        register.CitizenId = values.citizenId;
        register.ConfirmPassword = values.confirm;
        register.Email = values.email;
        register.Name = values.username;
        register.Password = values.password;
        register.PhoneNumber = values.phone;
        register.PhoneNumberConfirmed = null;
        register.EmailConfirmed = null;
        register.TwoFactorEnabled = null;
        register.IsBlocked = null;
        values.employeeList?.map((d: { employeename: string; }) => register.SalesEmployeeIds.push(d.employeename));
        console.log('Received register: ', register);
        fetch_Api({
            url: api_links.user.superAdmin.createNewCustomer,
            method: 'POST',
            data: undefined
        }).then(response => {
            if (response.status == 200) {
                form.resetFields();
                message.success("Đã thêm khách hàng " + register.Name + ". Tiếp tục thêm khách hàng hoặc nhấn Cancel để trở về.");
            }
            setjsonData(response.data);
        })

    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 150 }} defaultValue={"all"}>
                <Option value="all">Tất cả</Option>
                <Option value="SALES">Sales</Option>
                <Option value="SALES ADMIN">Sales Admin</Option>
                <Option value="SUPER ADMIN">Super Admin</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div>

            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                //initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: 'Tất ' }}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >

                <Form.Item
                    name="username"
                    label="Tên khách hàng"
                    rules={[{ required: true, message: 'Please input name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                /*rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                        whitespace: false,
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}*/
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                /*rules={[
                    {
                        pattern: /^((\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4}))||)$/,
                        message: 'The input is not valid phone number!'
                    }
                ]}*/
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="citizenId"
                    label="CCCD/CMND"
                //rules={[{ whitespace: false }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    //name="employee"
                    label="Nhân viên phụ trách"
                >
                    <Form.List name="employeeList">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <Space key={field.key} align="baseline">
                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, curValues) =>
                                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                            }
                                        >
                                            {() => (
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'employeefilter']}
                                                >
                                                    <Select style={{ width: 150 }}
                                                        defaultValue=""
                                                        onChange={(e) => {
                                                            setFilterNV(nhan_vien?.filter((d) => d.roles.findIndex((r) => r.normalizedName == e) > -1))
                                                        }}
                                                    > {chuc_vu?.map((d) =>
                                                        <Option value={d.normalizedName}>{d.normalizedName}</Option>
                                                    )} </Select>
                                                </Form.Item>
                                            )}
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'employeename']}
                                            rules={[{ required: true, message: 'Missing value' }]}
                                        >
                                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                //placeholder=""
                                                //onChange={handleChange}
                                                optionFilterProp="children"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }

                                                options={
                                                    filter_nhan_vien?.map((d) => {
                                                        return ({
                                                            label: d.name + " - " + (d.citizenId ? d.citizenId?.slice(-4) : ""),
                                                            value: d.id,
                                                        })
                                                    })
                                                }
                                            />
                                        </Form.Item>

                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Thêm nhân viên
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form.Item>
                {(errorMessage()) &&
                    <span style={{
                        color: "red",
                        textAlign: "center",
                        fontSize: "13px"
                    }}> {errorMessage()}<br /></span>}
                <Form.Item {...tailFormItemLayout}>
                    <Space size={'large'}>
                        <Button type="primary" htmlType="submit">
                            Tạo mới
                        </Button>
                        <Button type="default" htmlType="reset"
                            onClick={() => setjsonData({
                                "message": null,
                                "isSuccess": false,
                                "errors": null,
                                "token": undefined,
                                "userInformation": null,
                                "customerInformation": null,
                                "role": null,
                            })}>
                            Làm mới
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}
export default Add;
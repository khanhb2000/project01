import React, { useEffect, useState } from 'react';
import { selectToken } from '../../login/loginSlice';
import { useSelector } from 'react-redux';
import { LoginState, UserListState } from '../../../app/type.d';
import { RoleListState } from '../../../app/type.d';
import Cookies from 'universal-cookie';

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
    "UserName": string,
    "CitizenId": string,
    "Email": string,
    "PhoneNumber": string,
    "EmailConfirmed": boolean | null,
    "PhoneNumberConfirmed": boolean | null,
    "TwoFactorEnabled": boolean | null,
    "IsBlocked": boolean | null,
    "Password": string,
    "ConfirmPassword": string,
    "ManagerId": string | null,
    "RoleIds": string[],
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
    const [chuc_vu, setCV] = useState<RoleListState>();
    const [nhan_vien, setNV] = useState<UserListState | null>();
    const [filter_nhan_vien, setFilterNV] = useState<UserListState>();

    const [jsonData, setjsonData] = useState<LoginState>();

    var register: DataNodeType = {
        Name: '',
        UserName: '',
        CitizenId: '',
        Email: '',
        PhoneNumber: '',
        EmailConfirmed: null,
        PhoneNumberConfirmed: null,
        TwoFactorEnabled: null,
        IsBlocked: null,
        Password: '',
        ConfirmPassword: '',
        ManagerId: '',
        RoleIds: []
    }

    var cookies = new Cookies()
    var token = cookies.get("token")?.token;

    useEffect(() => {
        cookies = new Cookies()
        token = cookies.get("token")?.token;
        const responseCV = fetch(
            'http://bevm.e-biz.com.vn/api/Roles',
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
                setCV(data);
                setFilterNV(data);
            });

        const responseNV = fetch(
            'http://bevm.e-biz.com.vn/api/Users/All-Users',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            }
        ).then(response => {
            return response.json();
        })
            .then(data => {
                setNV(data);

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
        register.Name = values.name;
        register.UserName = values.username;
        register.Password = values.password;
        register.PhoneNumber = values.phone;
        register.ManagerId = values.managername;
        if (values.managerfilter == null) register.ManagerId = null;
        register.PhoneNumberConfirmed = null;
        register.EmailConfirmed = null;
        register.TwoFactorEnabled = null;
        register.IsBlocked = null;
        values.roleList?.map((d: { roleid: string; }) => register.RoleIds.push(d.roleid));
        console.log('Received register: ', register);
        const response = fetch(
            'http://bevm.e-biz.com.vn/api/Register/User',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(
                    register

                ),
            }
        ).then(response => {
            if (response.ok) {
                form.resetFields();
                message.success("Đã thêm khách hàng " + register.Name + ". Tiếp tục thêm khách hàng hoặc nhấn Cancel để trở về.");
            } return response.json()
        })
            .then(data => {
                setjsonData(data);
            })

    };

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
                    name="name"
                    label="Tên nhân viên"
                    rules={[{ required: true, message: 'Please input username!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="username"
                    label="Tên đăng nhập"
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
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                        {
                            pattern: /^[0-9A-z]*[0-9]{4}$/,
                            message: 'The input is not valid!'
                        }
                    ]}
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
                    label="Chức vụ"
                    rules={[{ required: true, message: 'Please input role!', }]}
                >
                    <Form.List name="roleList"
                        rules={[
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 1) {
                                        return Promise.reject(new Error('At least 1 role'));
                                    }
                                },
                            },
                        ]}
                    >

                        {(fields, { add, remove }, { errors }) => (
                            <>
                                                
                                {fields.map((field) => (
                                    <Space key={field.key} align="start">
                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, curValues) =>
                                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                            }
                                        >
                                            {() => (
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'roleid']}
                                                    rules={[{ required: true, message: 'Please input role!', whitespace: true }]}
                                                >
                                                    <Select style={{ width: 150 }} >
                                                        {chuc_vu?.map((d) => {
                                                            return (
                                                                <Option value={d.id}>{d.normalizedName}</Option>
                                                            )
                                                        })}
                                                    </Select>
                                                </Form.Item>
                                            )}
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Thêm
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            
                            </>
                        )}
                    </Form.List>
                </Form.Item>

                <Form.Item
                    //name="employee"
                    label="Nhân viên quản lý"
                >

                    <Space align="baseline">
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, curValues) =>
                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                            }
                        >
                            <Form.Item
                                name='managerfilter'
                            >
                                <Select style={{ width: 150 }}
                                    defaultValue=""
                                    onChange={(e) => {
                                        if (e != "")
                                            setFilterNV(nhan_vien?.filter((d) => d.roles.findIndex((r) => r.normalizedName == e) > -1))
                                    }}
                                >
                                    <Option>Không có</Option>
                                    {chuc_vu?.map((d) => {
                                        if (d.isManager)
                                            return (
                                                <Option value={d.normalizedName}>{d.normalizedName}</Option>
                                            )
                                    })} </Select>
                            </Form.Item>

                        </Form.Item>
                        <Form.Item
                            name='managername'
                            rules={[{ 
                                required: form.getFieldValue('managerfilter'), 
                                message: 'Please input manager or choose "Không có"!', 
                            }]}
                        >
                            <Select
                                showSearch
                                disabled={!form.getFieldValue('managerfilter')}
                                style={{ width: 200 }}
                                placeholder=""
                                //onChange={handleChange}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }

                                options={
                                    filter_nhan_vien?.map((d) => {
                                        /* if (d.name == undefined)
                                         return ({
                                             label: "",
                                             //value: ,
                                         })
                                         else*/
                                        return ({
                                            label: d.name + " - " + (d.citizenId ? d.citizenId?.slice(-4) : ""),
                                            value: d.id,
                                        })
                                    })
                                }
                            />
                        </Form.Item>
                    </Space>
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
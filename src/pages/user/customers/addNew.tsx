import React, { useEffect, useState } from 'react';
import { selectToken } from '../../login/loginSlice';
import { useSelector } from 'react-redux';
import { LoginState } from '../../../app/type.d';
import { UserListState } from '../../../app/type.d';

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
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

//Importing Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const { Option } = Select;

interface DataNodeType {
    value: string;
    label: string;
    children?: DataNodeType[];
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
    const [form] = Form.useForm();
    const [nhan_vien, setNV] = useState<UserListState>();
    const [filter_nhan_vien, setFilterNV] = useState<UserListState>();

    const [fullName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [citizenID, setcitizenID] = useState("");

    const [jsonData, setjsonData] = useState<LoginState>();
    const token = useSelector(selectToken);

    useEffect(() => {
        const response = fetch(
            'http://bevm.e-biz.com.vn/api/Users/All-Users',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer ' + token,
                },
            }
        ).then(response => {
            return response.json()
        })
            .then(data => {
                setNV(data);
            });
    }, []);

    const dataListShow = (f: string) => setFilterNV(nhan_vien?.filter((d) => d.roles.filter((r) => r.normalizedName == f)));

    const newCustomer = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const response = fetch(
            'http://bevm.e-biz.com.vn/api/Register/Customer',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(
                    {
                        "Name": fullName,
                        "CitizenId": citizenID,
                        "Email": email,
                        "PhoneNumber": phone,
                        "EmailConfirmed": true,
                        "PhoneNumberConfirmed": true,
                        "TwoFactorEnabled": true,
                        "LockoutEnabled": true,
                        "LockoutEnd": "2023-07-07T01:59:03.598Z",
                        "Password": password,
                        "ConfirmPassword": confirmPassword,
                        "SalesEmployeeIds": [
                            "5ca87050-7758-49cd-7932-08db791a0b05"
                        ]
                    }

                ),
            }
        ).then(response => {
            return response.json()
        })
            .then(data => {
                setjsonData(data);
                console.log(data);
            }).catch(error => {
                setjsonData({
                    "message": `Unknown server error occured: ${error.status}`,
                    "isSuccess": false,
                    "errors": [],
                    "token": "",
                    "customerInformation": null,
                    "userInformation": null,
                    "role": {
                        "id": "0",
                        "normalizedName": "Customer",
                        "isManager": false,
                        "users": [],
                    },
                });
                console.log(jsonData);
                //throw new Error(`Something went wrong: ${error.message || error}`);
            })


        /*
            if (response.status < 200 || response.status >= 300) {
              return rejectWithValue(jsonData);
            }*/

        return jsonData;

    };
    const errorMessage = () => {
        if (jsonData?.errors != null) {
            if (typeof Object.values(jsonData?.errors)[0] == "string") {
                return Object.values(jsonData?.errors)[0];
            }
            else return Object.values(jsonData?.errors)[0][0];
        }
        if (jsonData?.message)
            return jsonData?.message;
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
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
            <div className='dashboard-content-header'>
                <h2>Khách hàng mới</h2></div>

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
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                            whitespace: false,
                        },
                        /*{
                            required: true,
                            message: 'Please input your E-mail!',
                        },*/
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                        {
                            pattern: /^((\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4}))||)$/,
                            message: 'The input is not valid phone number!'
                        }
                    ]}
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
                    name="employee"
                    label="Nhân viên phụ trách"
                    rules={[{ required: true, message: 'Thêm nhân viên!' }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    <Select style={{ width: 150 }} defaultValue={"all"}
                        onChange={(e) => {
                            if (e=="all") setFilterNV(nhan_vien);
                            else
                            setFilterNV(nhan_vien?.filter((d) => d.roles.findIndex((r) => r.normalizedName == e)>-1))
                        console.log(filter_nhan_vien);
                        console.log(e);

                    }}
                    >
                        <Option value="all">Tất cả</Option>
                        <Option value="SALES">Sales</Option>
                        <Option value="SALES ADMIN">Sales Admin</Option>
                        <Option value="SUPER ADMIN">Super Admin</Option>
                    </Select>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={/*[
                            {
                                value: '1',
                                label: 'Not Identified',
                            },
                            {
                                value: '2',
                                label: 'Closed',
                            },
                            {
                                value: '3',
                                label: 'Communicated',
                            },
                            {
                                value: '4',
                                label: 'Identified',
                            },
                            {
                                value: '5',
                                label: 'Resolved',
                            },
                            {
                                value: '6',
                                label: 'Cancelled',
                            },
                        ]*/
                            filter_nhan_vien?.map((d) => {
                                return ({
                                    label: d.name + " - " + (d.citizenId? d.citizenId?.slice(-4):""),
                                })
                            })
                        }
                    />
                </Form.Item>

                <Form.List name="sights">
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
                                                label="Sight"
                                                name={[field.name, 'sight']}
                                                rules={[{ required: true, message: 'Missing sight' }]}
                                            >
                                                <Select style={{ width: 150 }}>
                                                    <Option value="sale">Sales</Option>
                                                    <Option value="admin">Sales Admin</Option>
                                                    <Option value="sup">Super Admin</Option>
                                                </Select>
                                                {/*<Select disabled={!form.getFieldValue('area')} style={{ width: 130 }}>
                        {(sights[form.getFieldValue('area') as SightsKeys] || []).map((item) => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        ))}
                        </Select>*/}
                                            </Form.Item>
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        label="Price"
                                        name={[field.name, 'price']}
                                        rules={[{ required: true, message: 'Missing price' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </Space>
                            ))}

                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add sights
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Tạo mới
                    </Button>
                </Form.Item>

                {(errorMessage()) &&
                    <span style={{
                        color: "red",
                        textAlign: "center",
                        fontSize: "13px"
                    }}><br /> {errorMessage()}</span>
                }
            </Form>
        </div>
    );
}
export default Add;
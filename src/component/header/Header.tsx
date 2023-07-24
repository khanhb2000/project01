import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import "./header.css"
import { logout, selectInformation, selectRole, selectSuccess } from '../../pages/login/loginSlice';
import { setOpenMenu, setMenuRole } from './headerSlice';
import Cookies from 'universal-cookie';
import { MenuProps, Menu } from 'antd';
import { Dropdown } from 'antd'
import { UserOutlined, LogoutOutlined, SettingTwoTone, SettingOutlined, SettingFilled } from '@ant-design/icons'
import PopupScreenInformation from '../popupscreeninformation/PopupScreen';

export default function Header() {
    // Select data from store
    const loginInfo = useSelector(selectInformation);
    const userRole = useSelector(selectRole);
    const cookies = new Cookies()

    //useState, useDispatch, useNavigate
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const [popup, setPopup] = useState(false)

    // use to display userRole
    dispatch(setMenuRole(userRole));

    //log out
    const handleLogout = () => {
        dispatch(logout())
        cookies.remove("token");
        navigate("/login")
    };



    // show up the information of user on the screen
    const handlePopUpInformation = () => {
        setPopup(true);
        // setAnchorEl(null);
    }

    // show settings
    const handleClickAccount = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    // use to display and disable sidebar
    const handleClose = () => {
        setAnchorEl(null);
    };

    // use to display and disable sidebar
    const handleClickMenubtn = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        dispatch(setOpenMenu());

    };

    // Display Menu Component on the screen
    type MenuItem = Required<MenuProps>['items'][number];
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }
    const items: MenuProps['items'] = [
        getItem("Cài đặt", 'menu', <SettingFilled />, [
            getItem(<span>{cookies.get("token").role?.normalizedName}</span>, '1', <UserOutlined />),
            getItem(<span>Thay đổi mật khẩu</span>, '2', <SettingOutlined />),
            getItem(<span onClick={handleLogout}>Đăng xuất</span>, '3', <LogoutOutlined />),
        ]),
    ]

    const onClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case "1":
                handlePopUpInformation()
                break;
            case "2":
                console.log('hahaha');

                break;

            case "3":
                handleLogout();
                break;
        }
    };


    return (
        <React.Fragment>
            <PopupScreenInformation isPopup={popup} setPopup={setPopup} />
            <div className='dashbord-header-container'>
                <div className='dashbord-header-right'>
                    <button className='dashbord-header-btn' onClick={handleClickMenubtn}>|||</button>
                    <h4>
                        Welcome {cookies.get("token").information?.name}
                    </h4>
                </div>

                <div className='dashboard-header-setting'>
                    .
                    <Menu
                        onClick={onClick}
                        className='dashboard-header-setting--menu'
                        style={{ width: 256}}
                        mode="inline"
                        items={items}

                    />

                    {/*<img 
                src={NotificationIcon}
                alt='notification-icon'
                className='dashbord-header-icon' />
                <img
                className='dashbord-header-avatar'
src='https://reqres.in/img/faces/9-image.jpg' />*/}

                    {/* <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        // onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handlePopUpInformation}>
                            <ListItemIcon>
                                <PersonIcon fontSize='medium' />
                            </ListItemIcon>
                            <ListItemText style={{ textAlign: "center" }}>
                                {cookies.get("token")?.role.normalizedName}
                            </ListItemText>

                        </MenuItem>
                        <Divider style={{ margin: "13px 0px" }} />
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon fontSize='medium' />
                            </ListItemIcon>
                            <ListItemText style={{ textAlign: "center" }}>
                                Đăng xuất
                            </ListItemText>
                        </MenuItem>
                    </Menu> */}

                </div>
            </div>
        </React.Fragment>
    )
}

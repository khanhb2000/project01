import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import "./header.css"
import { logout, selectInformation, selectRole } from '../../pages/login/loginSlice';
import { setOpenMenu, setMenuRole } from './headerSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import NotificationIcon from '../../app/assets/icons/notification.svg';
import SettingsIcon from '../../app/assets/icons/settings.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from 'antd'
import { ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'universal-cookie';

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

    // use to display userRole
    dispatch(setMenuRole(userRole));

    //log out
    const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        dispatch(logout())
        cookies.remove("token");
        navigate("/login")
        console.log(cookies.get("token")?.token);
        
    };



    // show up the information of user on the screen
    const handlePopUpInformation = () => {

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
    
    return (
        <div className='dashbord-header-container'>
            <button className='dashbord-header-btn' onClick={handleClickMenubtn}>|||</button>

            <div className='dashbord-header-right'>
                <h4>
                    Welcome {cookies.get("token")?.information.name}
                </h4>
                <img
                    src={SettingsIcon}
                    alt='settings-icon'
                    className='dashbord-header-icon'
                    onClick={handleClickAccount}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                />
                {/*<img 
                src={NotificationIcon}
                alt='notification-icon'
                className='dashbord-header-icon' />
                <img
                className='dashbord-header-avatar'
src='https://reqres.in/img/faces/9-image.jpg' />*/}

                <Menu
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
                            Log Out
                        </ListItemText>
                    </MenuItem>
                </Menu>

            </div>
        </div>
    )
}

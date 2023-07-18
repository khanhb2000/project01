import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
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

export default function Header() {
    // Select data from store
    const loginInfo = useSelector(selectInformation);
    const userRole = useSelector(selectRole);
    const dispatch = useDispatch();


    dispatch(setMenuRole(userRole));

    const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        dispatch(logout());
        return (
            <Navigate to='/login' />
        )
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    console.log(open);
    console.log(anchorEl);

    const handleClickAccount = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickMenubtn = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        dispatch(setOpenMenu());
    };
    return (
        <div className='dashbord-header-container'>
            <button className='dashbord-header-btn' onClick={handleClickMenubtn}>|||</button>

            <div className='dashbord-header-right'>
                <h4>
                    Welcome {loginInfo?.name}
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
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <PersonIcon fontSize='medium'/>
                        </ListItemIcon>
                        <ListItemText style={{textAlign:"center"}}>
                            {userRole.normalizedName}
                        </ListItemText>

                    </MenuItem>
                    <Divider style={{margin:"13px 0px"}}/>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize='medium'/>
                        </ListItemIcon>
                        <ListItemText style={{textAlign:"center"}}>
                            Log Out
                        </ListItemText>
                    </MenuItem>
                </Menu>

            </div>
        </div>
    )
}

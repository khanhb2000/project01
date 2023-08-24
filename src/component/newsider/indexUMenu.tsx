import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu, SubMenuProps } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMoneyBills, faIdCard, faTags, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

import { useSubMenu } from "./useSubMenu";
import { LogoutOutlined } from '@ant-design/icons/lib/icons';
import { havePermission } from '../../utils/permission_proccess';
const { SubMenu } = Menu;

function UMenuNew() {
  const navigate = useNavigate();
  const location = useLocation();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate("/dashboard/" + e.key);
  };
  const handleTitleClick: Pick<SubMenuProps, "onTitleClick">["onTitleClick"] = (
    e
  ) => {
    //console.log("titleclick, key", e.key);
  };

  const subMenuProps = useSubMenu();

  return (
    <div className="sidebar-container">
      <Menu
        expandIcon={" "}
        onClick={onClick}
        defaultSelectedKeys={[location.pathname.split('/')[2]]}
        mode="inline"
        openKeys={['service']}
        style={{
          width: '250px',
          minWidth: '215px',
          height: '100vh',
          position: 'sticky',
          background: 'linear-gradient(#b0bdc3, #487f9e, #91d5ff)',
          borderBottomRightRadius: '50px',
          color: '#FFFFFF',
          fontSize: 'medium',
          fontWeight: '600',
        }}

      >
        {havePermission("Customer", "read") &&
          <Menu.Item
            key="khach-hang"
            icon={<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faUser} />}
            style={{
              padding: '2em',
              textAlign: 'left',
            }}
          >Khách hàng
          </Menu.Item>}
        {havePermission("Service", "read") && 
          <SubMenu
          style={{
            textAlign: 'left',
            paddingLeft: '10px'
          }}
          icon={<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faTags} />}
          {...subMenuProps("service", "Dịch vụ", handleTitleClick)}
        >
          {havePermission("ServicePackage", "read") && 
          <Menu.Item
            key="goi-dich-vu"
            style={{
              padding: '2em',
            }}
          >
            Các gói dịch vụ
          </Menu.Item> }
          {havePermission("Service", "read") && 
          <Menu.Item
            key="loai-dich-vu"
            style={{
              padding: '2em',
            }}
          >
            Các loại dịch vụ
          </Menu.Item> }
        </SubMenu> }
        {havePermission("VoucherType", "read") && 
          <Menu.Item
          key="vouchers"
          icon={<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faMoneyBills} />}
          style={{
            padding: '2em',
            textAlign: 'left',
          }}
        >
          Vouchers
        </Menu.Item> }
        {havePermission("User", "read") && 
        <Menu.Item
          key="nhan-vien"
          icon={<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faIdCard} />}
          style={{
            padding: '2em',
            textAlign: 'left',
          }}>Nhân viên</Menu.Item> }
        {havePermission("Booking", "read") && 
          <Menu.Item
          key="giao-dich"
          icon={<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCalendarCheck} />}
          style={{
            padding: '2em',
            textAlign: 'left',
          }}>Giao dịch
        </Menu.Item> }
      </Menu>
    </div>
  );
};

export default UMenuNew;
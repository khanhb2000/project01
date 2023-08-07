import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu, SubMenuProps } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMoneyBills, faIdCard, faTags, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

import { useSubMenu } from "./useSubMenu";
const { SubMenu } = Menu;

function UMenuNew() {
  const navigate = useNavigate();
  const location = useLocation();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
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
        <Menu.Item
          key="customers"
          icon={<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faUser} />}
          style={{
            padding: '2em',
            textAlign: 'left',
          }}
        >Khách hàng
        </Menu.Item>
        <SubMenu
          style={{
            textAlign: 'left',
            paddingLeft: '10px'
          }}
          icon={<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faTags} />}
          {...subMenuProps("service", "Dịch vụ", handleTitleClick)}
        >
          <Menu.Item
            key="services"
            style={{
              padding: '2em',
            }}
          >
            Các gói dịch vụ
          </Menu.Item>
          <Menu.Item
            key="kindservices"
            style={{
              padding: '2em',
            }}
          >
            Các loại dịch vụ
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="vouchers"
          icon={<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faMoneyBills} />}
          style={{
            padding: '2em',
            textAlign: 'left',
          }}
        >
          Vouchers
        </Menu.Item>
        <Menu.Item
          key="employee"
          icon={<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faIdCard} />}
          style={{
            padding: '2em',
            textAlign: 'left',
          }}>Nhân viên</Menu.Item>
        <Menu.Item
          key="booking"
          icon={<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCalendarCheck} />}
          style={{
            padding: '2em',
            textAlign: 'left',
          }}>Giao dịch
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default UMenuNew;
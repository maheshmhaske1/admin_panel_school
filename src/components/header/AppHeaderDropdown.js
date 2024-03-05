import React, { useEffect } from 'react';
import { CAvatar, CDropdown, CDropdownHeader, CDropdownItem, CDropdownMenu, CDropdownToggle, CDropdownDivider } from '@coreui/react';
import { cilUser, cilSettings, cilLockLocked } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppHeaderDropdown = () => {
  const logOut = () => {
    Cookies.remove('accessToken');
    Cookies.remove('name');
    Cookies.remove('adminId');
    toast.error('Logged Out Successfully...!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    setTimeout(() => {
      window.location.href = '/admin-login';
    }, 2000);
  };

 
  const getInitials = (name) => {
    return name.split(' ').map((part) => part[0]).join('').toUpperCase();
  };

  const name = Cookies.get('name');
  const initials = name ? getInitials(name) : '';

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <div className="avatar-container">
          <CAvatar size="md"><b>{initials}</b></CAvatar>
          <div className="avatar-overlay"></div>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={logOut} className="hover_css">
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;

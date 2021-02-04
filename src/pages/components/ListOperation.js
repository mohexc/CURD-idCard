import React from 'react';
import { Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

const ListOperation = ({ record, openModal }) => {
  const handleMenuClick = (values) => {
    openModal(values.key, record)
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit" style={{ minWidth: "80px" }}> <span >Edit</span></Menu.Item>
      <Menu.Item key="delete" style={{ minWidth: "80px" }} > <span style={{ width: "150px" }}>Delete</span></Menu.Item>
    </Menu>
  );
  return (
    <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<CaretDownOutlined />}>
      <span onClick={() => openModal('show', record)} style={{ minWidth: "80px" }}>View</span>
    </Dropdown.Button>
  );
}

export default ListOperation;
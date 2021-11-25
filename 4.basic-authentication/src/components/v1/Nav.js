import React from 'react';
import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import {HomeOutlined, ProfileOutlined, FileProtectOutlined} from '@ant-design/icons';
 
//네비게이션 만들것임 
const Nav = (props) => {

    const {current} = props;

    return (
        <div>
            <Menu selectedKey={[current]} mode="horizontal">
                <Menu.Item key="home">
                    <Link to="/">
                        <HomeOutlined />HOME
                    </Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link to="/profile">
                        <HomeOutlined />PROFILE
                    </Link>
                </Menu.Item>
                <Menu.Item key="protected">
                    <Link to="/">
                        <HomeOutlined />PROTECTED
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default Nav;
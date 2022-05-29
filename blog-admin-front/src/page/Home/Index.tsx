
import React, { FC, useState } from 'react';
import {useNavigate, Outlet, unstable_HistoryRouter} from "react-router-dom";
import {Layout, Menu, Row, Col, Avatar, Space} from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { routes} from "../../router";
import  '../../assets/css/Home.less';
import '../../assets/img/p1.jpg'
import ArticleForm from "../../components/article/ArticleForm";

//类型定义
interface userInfo  {
    name: string;
    role: string;
    avater: string;
    intro: string;
    webSite: string;
};

const { Header, Content, Footer } = Layout;

const Index: FC = () => {

    const [current, setCurrent] = useState('mail');
    const  [ userInfo, setUserInfo ] = useState({
        name: 'ghost',
        role: '超级管理员',
        avater: '暂时没有头像哦',
        intro: '这是标语',
        webSite: '这个是什么呀'
    });
    const navigate = useNavigate();
    const items: MenuProps['items'] = [
        {
            label: (
                <div onClick={()=>navigate('/')}>首页</div>
            ),
            key: 'mail',
        },
        {
            label: '文章管理',
            key: 'SubMenu',
            children: [
                {
                    type: 'group',
                    children: [
                        {
                            label: (
                                <div onClick={()=>navigate('/articleMgr')}>文章管理</div>
                            ),
                            key: 'setting:1',
                        },
                        {
                            label: (
                                <div onClick={()=>navigate('/articleForm')}>新增文章</div>
                            ),
                            key: 'setting:2',
                        },
                    ],
                },
            ],
        },
    ];

    const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    let styleLayout = {
      background: `url(${require('../../assets/img/login.jpg')})`,
      backgroundSize: '100%',
      //   backgroundRepeat: 'no-repeat'
    };
    const Foo=()=> {
        const navigate = useNavigate();
        return (
            <div onClick={()=> navigate('/article')}>跳转</div>
        )
    };
    //导航栏
    const Navigate = ()=>{
        const navigate = useNavigate();
        routes.map((index,key)=> {
            return (
                <div onClick={()=> navigate(index.path)}>{index.name}</div>
            )
        });
    };

    return (
        <div >
            <Layout className="layout"
                    style={styleLayout}
            >
                <Header className='layout-header'
                        style={{background:'rgba(255,255,255,0.8)'}}
                >
                    <div className="logo" />
                    <Row>
                        <Col span={10} offset={6}>
                            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}
                            style={{background:'rgba(255,255,255,0)'}}/>
                        </Col>
                        <Col span={2} offset={6}>
                            <Space>
                                <Avatar size={54} icon={<UserOutlined />} src={userInfo.avater}/>
                                <span>{userInfo.name}</span>
                            </Space>

                        </Col>

                    </Row>
            
                </Header>
            
                <Content style={{ padding: '0' }}>
                    <div className="site-layout-content" >
                        <Outlet />
                    </div>
                </Content>
            
                <Footer style={{ textAlign: 'center', background:'rgba(255,255,255,0)' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </div>

    )
}
export default Index
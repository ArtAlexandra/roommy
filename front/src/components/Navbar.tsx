import React from "react";
import { Layout, Menu, Button } from 'antd';
import { useNavigate } from "react-router-dom";
//import {come} from "../../public/come.svg"
const { Header } = Layout;

const Navbar = ()=>{
  const navigate = useNavigate()
    return(
<Layout className="layout">
    <Header style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white' }}>
      <Menu  mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" >Каталог</Menu.Item>
        <Menu.Item key="2" >Магазины</Menu.Item>
        <Menu.Item key="3">Контакты</Menu.Item>
        <p>Таганрог</p>
      </Menu>
      <div>
        <Button type="primary" style={{ marginRight: '10px' }}>Sign in</Button>
        <Button onClick={()=>navigate('/login')}>Sign up</Button>
        
       <img src='come.svg' alt="come"/>

      </div>
    </Header>
  </Layout>
    )
}
export default Navbar;
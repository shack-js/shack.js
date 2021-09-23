import { Layout, Menu, } from 'antd'

import { NavLink } from 'react-router-dom'
import { user } from '../store'
const AntHeader = Layout.Header
const { Item } = Menu

export const Header = () => {
  const [curentUser] = user.use()
  return <AntHeader>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" >
      <Item key="/" > <NavLink to="/">首页</NavLink> </Item>
      {curentUser
        ? <>
          {!!curentUser.isadmin && <Item key="/admin" > <NavLink to="/admin">管理后台</NavLink> </Item>}
          <Item key="/logout"> <NavLink to="/logout">登出</NavLink> </Item>
        </>
        : <>
          <Item key="/login"> <NavLink to="/login">登录</NavLink> </Item>
          <Item key="/register"> <NavLink to="/register">注册</NavLink> </Item>
        </>}
    </Menu>
  </AntHeader>
}
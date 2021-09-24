import { Layout, Menu, } from 'antd'
import { NavLink, useHistory } from 'react-router-dom'
import { logout, user } from '../store'
const AntHeader = Layout.Header
const { Item } = Menu

export const Header = () => {
  const [curentUser] = user.use()
  const history = useHistory()
  return <AntHeader>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" >
      <Item key="/" > <NavLink to="/">首页</NavLink> </Item>
      {curentUser
        ? <>
          {!!curentUser.isAdmin && <Item key="/admin/home" > <NavLink to="/admin/home">管理后台</NavLink> </Item>}
          <Item key="/logout" onClick={() => {
            logout()
            history.push('/')
          }}> 登出 </Item>
        </>
        : <>
          <Item key="/login"> <NavLink to="/login">登录</NavLink> </Item>
          <Item key="/register"> <NavLink to="/register">注册</NavLink> </Item>
        </>}
    </Menu>
  </AntHeader>
}
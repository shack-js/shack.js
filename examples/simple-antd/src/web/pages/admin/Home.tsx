import { Card, PageHeader } from "antd"
import { NavLink } from "react-router-dom"

const Adminhome = () => {
  return <div>
    <PageHeader>首页</PageHeader>
    <div>
      <Card>
        <h3> <NavLink to="/admin/users">用户管理</NavLink></h3>
      </Card>
    </div>
  </div>
}

export default Adminhome
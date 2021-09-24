import { Button, PageHeader, Space, Table } from "antd"
import { Link } from "react-router-dom"

const UserList = () => {


  return <div>
    <PageHeader>用户管理</PageHeader>
    <Space style={{ marginBottom: 16 }}>
      <Link to="/admin/users/create">
        <Button type="link">创建新用户</Button>
      </Link>
    </Space>
    <Table />
  </div>
}

export default UserList
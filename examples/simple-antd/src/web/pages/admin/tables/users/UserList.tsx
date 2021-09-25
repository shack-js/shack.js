import { Button, notification, PageHeader, Pagination, Space, Table } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { delUser, listUser, ListUserResult, updateUser } from "../../../../../apis/admin/user"
import { CellUpdateCheckbox } from '../../../../utils/CellUpdateCheckbox'
import { AsyncConfirmButton } from '../../../../utils/AsyncConfirmButton'

const UserList = () => {
  let [options, setOptions] = useState({} as any)
  let [loading, setLoading] = useState(0)
  let [data, setData] = useState({} as ListUserResult)

  useEffect(() => {
    if (!options) return
    setLoading(x => x + 1)
    listUser(options).then(d => {
      setData(d)
      setLoading(x => x - 1)
    }).catch(e => {
      notification.error({
        message: e.toString()
      })
      setLoading(x => x - 1)
    })
  }, [options])

  const { page = 1, pageSize = 10, total = 0, list = [] } = data

  return <div>
    <PageHeader>用户管理</PageHeader>
    <Space style={{ marginBottom: 16 }}>
      <Link to="/admin/users/create">
        <Button type="link">创建新用户</Button>
      </Link>
    </Space>
    <Table dataSource={list} loading={!!loading} rowKey={'id'} columns={[
      {
        title: '账号',
        dataIndex: 'account',
        key: 'account'
      }, {
        title: '管理员',
        dataIndex: 'isAdmin',
        key: 'isAdmin',
        render: (x, u) => <CellUpdateCheckbox val={x} updateFn={async y => await updateUser({
          id: u.id,
          isAdmin: y
        })} />
      }, {
        title: '禁用',
        dataIndex: 'disabled',
        key: 'disabled',
        render: (x, u) => <CellUpdateCheckbox val={x} updateFn={async y => await updateUser({
          id: u.id,
          disabled: y
        })} />
      }, {
        title: '操作',
        key: 'operations',
        render: (x, u) => <>
          <Link to={`/admin/users/edit/${u.id}`}><Button type="link">修改</Button></Link>
          <AsyncConfirmButton
            buttonText="删除"
            asyncFn={async () => {
              await delUser(u.id)
              setOptions({ ...options })
            }}
            confirmContent={`确认要删除用户 ${u.account} 吗？`}
          />
        </>
      },
    ]}
      pagination={{
        pageSize,
        current: page,
        total,
        showQuickJumper: true,
        onChange: (page, pageSize) => setOptions({ ...options, page, pageSize })
      }} />
  </div>
}

export default UserList
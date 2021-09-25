import { Button, notification, PageHeader, Space, Table } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fieldContains, delUser, listUser, ListUserResult, updateUser } from "../../../../../apis/admin/user"
import { CellUpdateCheckbox } from '../../../../utils/CellUpdateCheckbox'
import confirm from "antd/lib/modal/confirm"
import { getSearchFilterProps } from '../../../../utils/filter'
import { SorterResult } from "antd/lib/table/interface"
import { IUser } from "../../../../../common/user"

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
  const { filters = {} } = options

  const { page = 1, pageSize = 10, total = 0, list = [] } = data

  return <div>
    <PageHeader>用户管理</PageHeader>
    <Space style={{ marginBottom: 16 }}>
      <Link to="/admin/users/create">
        <Button type="link">创建新用户</Button>
      </Link>
    </Space>
    <Table
      dataSource={list}
      loading={!!loading}
      rowKey={'id'}
      columns={[
        {
          title: '账号',
          dataIndex: 'account',
          key: 'account',
          ...getSearchFilterProps(
            async val => await fieldContains('account',val),
            val => setOptions({
              ...options,
              filters: {
                account: val
              }
            })
          ),
          filteredValue: [filters.account || '']
        }, {
          title: '管理员',
          dataIndex: 'isAdmin',
          sorter: true,
          key: 'isAdmin',
          render: (x, u) => <CellUpdateCheckbox val={x} updateFn={async y => await updateUser({
            id: u.id,
            isAdmin: y
          })} />
        }, {
          title: '禁用',
          dataIndex: 'disabled',
          sorter: true,
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
            <Button onClick={() => confirm({
              title: '删除确认',
              content: `确认要删除用户 ${u.account} 吗？`,
              onOk: async () => {
                try {
                  await delUser(u.id)
                  notification.success({
                    placement: 'bottomRight',
                    message: '删除成功'
                  })
                  setOptions({ ...options })
                } catch (e) {
                  notification.error({
                    placement: 'bottomRight',
                    message: '删除失败',
                    description: e.toString()
                  })
                }
              },
              onCancel: () => { }
            })}>删除</Button>
          </>
        },
      ]}
      onChange={({ pageSize, current }, filters, sorter: SorterResult<IUser>) => {
        let { find = {} } = options
        console.log(`onChange!`)
        setOptions({
          find: {
            ...find,
            order: sorter.order
              ? {
                [sorter.field as string]: sorter.order === 'ascend' ? 1 : -1
              }
              : undefined
          }, page: current, pageSize
        })
      }}
      pagination={{
        pageSize,
        current: page,
        total,
        showQuickJumper: true,
      }}

    />
  </div>
}

export default UserList
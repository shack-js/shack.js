import { Alert, Button, PageHeader, Space, Spin, Form, Input, notification, Checkbox } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { add, findById, update } from "../../../../../apis/admin/user"
import { accountExists } from "../../../../../apis/user"
import { swr } from '../../../../utils/swr'
import { accountValidator, passwordValidator } from "../../../../utils/validators"

const UserEdit = () => {
  let { id } = useParams() as { id?: string }
  let [loading, value, error] = swr(async () => id ? await findById(id) : {})
  let [form] = useForm()
  let [operating, setOperating] = useState(false)
  return <div>
    <PageHeader>{id ? `编辑用户#${id}` : `创建用户`}</PageHeader>
    <Space style={{ marginBottom: 16 }}>
      <Link to="/admin/users/list">
        <Button type="link">用户列表</Button>
      </Link>
    </Space>
    {(() => {
      if (loading) return <Spin size="large" />
      if (error) return <Alert type="error" message={error.toString()} />
      return <Form
        initialValues={value}
        form={form}
      >
        <Form.Item
          label="账号"
          name="account"
          rules={id ? [] : [{
            validator: async (_, val) => {
              accountValidator(val)
              if (await accountExists(val)) throw `账号已存在`
            }
          }]}
        >
          <Input disabled={!!id} />
        </Form.Item>

        <Form.Item
          label="密码"
          name="pass"
          rules={[{
            validator: async (_, val) => passwordValidator(val)
          }]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item name="isAdmin" valuePropName="checked">
          <Checkbox>管理员</Checkbox>
        </Form.Item>


        <Form.Item name="disabled" valuePropName="checked">
          <Checkbox>禁用</Checkbox>
        </Form.Item>

        <Form.Item shouldUpdate >
          {() => <Button type="primary" disabled={
            form.getFieldsError()
              .filter(({ errors }) => errors.length)
              .length > 0
          }
            onClick={async () => {
              setOperating(true)
              try {
                if (id) {
                  //更新
                  await update({
                    ...form.getFieldsValue(),
                    id: parseInt(id),
                  })
                } else {
                  //创建
                  await add(form.getFieldsValue())
                }
                notification.open({
                  message: id ? '更新成功' : '创建成功',
                  type: 'success',
                  placement: 'bottomRight'
                })
                if (!id) {
                  form.resetFields()
                }
              } catch (e) {
                notification.open({
                  message: id ? '更新失败' : '创建失败',
                  type: 'error',
                  description: e.toString(),
                  placement: 'bottomRight'
                })
              } finally {
                setOperating(false)
              }
            }}
            loading={operating}
          >{id ? '更新' : '创建'}</Button>}
        </Form.Item>
      </Form>
    })()}
  </div>
}

export default UserEdit
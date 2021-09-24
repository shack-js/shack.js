import { Form, Input, Button, Modal, PageHeader } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { accountExists, register } from '../../../apis/user';
import { accountValidator, getRangeValidator, passwordValidator } from '../../utils/validators'

const Register = () => {
  const [form] = useForm()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState(true)
  return (<>
    <PageHeader>注册</PageHeader>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      form={form}
    >
      <Form.Item        
        label="账号"
        name="account"
        rules={[{
          validator: async (_, val: string) => {
            accountValidator(val)
            if (await accountExists(val)) throw '账号已存在'
          },
        }]}
      >
        <Input />
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

      <Form.Item
        shouldUpdate={true}
        wrapperCol={{ offset: 8, span: 16 }}>
        {() => <Button type="primary" disabled={
          // form.isFieldsTouched(true) ||
          loading || form.getFieldsError()
            .filter(({ errors }) => errors.length)
            .length > 0
        }
          onClick={async () => {
            setLoading(true)
            try {
              await register(form.getFieldsValue())
              setSuccess(true)
            } catch (e) {
              form.validateFields()
            } finally {
              setLoading(false)
            }
          }}
        >注册</Button>}

      </Form.Item>
    </Form>
    <Modal title="恭喜!" visible={success} footer={[
      <Link to='/login'>
        <Button>
          去登录
        </Button>
      </Link>
    ]}>
      <p>注册成功！</p>
    </Modal>
  </>);
}

export default Register
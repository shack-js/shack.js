import { Form, Input, Button, Checkbox, PageHeader } from 'antd';
import { useForm } from 'antd/lib/form/Form';

const Register = () => {
  const [form] = useForm()
  console.log(form.getFieldsError()
    .filter(({ errors }) => errors.length)
    .length)
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
            if (val.length < 6) throw '长度至少6位'
            if (val.length > 32) throw '长度最大32位'
            if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(val)) throw '仅支持字母和数字且首字符不能为数字'
          }
        }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="pass"
        rules={[{
          validator: async (_, val: string) => {
            if (val.length < 6) throw '长度至少6位'
            if (val.length > 32) throw '长度最大32位'
            if (!/^[a-zA-Z0-9_]*$/.test(val)) throw '仅支持字母和数字'
          }
        }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        shouldUpdate
        wrapperCol={{ offset: 8, span: 16 }}>
        {() => <Button type="primary" disabled={
          form.getFieldsError()
            .filter(({ errors }) => errors.length)
            .length > 0
        } >
          注册
        </Button>}
      </Form.Item>
    </Form>
  </>);
}

export default Register
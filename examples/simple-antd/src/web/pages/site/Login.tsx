import { Form, Input, Button, Checkbox, PageHeader } from 'antd';

const Login = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (<>
    <PageHeader>注册</PageHeader>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="账号"
        name="account"
        rules={[{
          validator: async (_, val:string) => {
            if(val.length<6) throw '长度至少6位'
            if(val.length>32) throw '长度最大32位'
            if(!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(val)) throw '仅支持字母和数字且首字符不能为数字'
          }, message: '请输入账号'
        }]}
      >
        <Input  />
      </Form.Item>

      <Form.Item
        label="密码"
        name="pass"
        rules={[{
          validator: async (_, val:string) => {
            if(val.length<6) throw '长度至少6位'
            if(val.length>32) throw '长度最大32位'
            if(!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(val)) throw '仅支持字母和数字且首字符不能为数字'
          }, message: '请输入密码'
        }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </>);
}

export default Login
import { Form, Input, Button, Checkbox, PageHeader, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { accountValidator, passwordValidator } from '../../utils/validators';
import { user, login } from '../../store'
import { useHistory } from 'react-router-dom';

const Login = () => {
  let [form] = useForm()
  let [, loading] = user.use()
  let history = useHistory()
  return (<>
    <PageHeader>登录</PageHeader>
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        label="账号"
        name="account"
        rules={[{
          validator: async (_, val) => accountValidator(val)
        }]}
      >
        <Input autoFocus />
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

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      <Form.Item
        shouldUpdate={true}
        wrapperCol={{ offset: 8, span: 16 }}>
        {() => <Button type="primary" disabled={
          form.getFieldsError()
            .filter(({ errors }) => errors.length)
            .length > 0
        }
          onClick={() => {
            let { remember, account, pass } = form.getFieldsValue()
            login(account, pass, {
              remember,
              onSuccess: () => history.push('/'),
              onFail: e => notification.open({
                message: e.toString(),
                placement: 'bottomRight',
                type: 'error'
              })
            })
          }}
          loading={loading}
        >登录</Button>}
      </Form.Item>
    </Form>
  </>);
}

export default Login
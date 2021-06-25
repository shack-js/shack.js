import { FC, useState } from "react"
import { login, register } from "../apis/user"
import { Loader, Form, Button } from "semantic-ui-react"
import { token, user } from './stores'
import { Redirect, Link } from 'react-router-dom'

interface LoginProps {
  isRegister?: boolean
}

let Login: FC<LoginProps> = ({ isRegister = false }) => {
  let [account, setAccount] = useState('')
  let [pass, setPass] = useState('')
  let [, , setToken] = token.use()
  let [userObj, loading] = user.use()
  if (loading) return <Loader>loading...</Loader>
  if (userObj) {
    // return <>token:{JSON.stringify(userObj)}</>
    return <Redirect to="/" />
  }
  return (<Form>
    <Form.Field>
      <label>account</label>
      <input
        placeholder="account"
        onChange={e => setAccount(e.target.value)}
        value={account}
      />
    </Form.Field>
    <Form.Field>
      <label>password</label>
      <input
        placeholder="password"
        onChange={e => setPass(e.target.value)}
        value={pass}
      />
    </Form.Field>

    <Button onClick={async () => {
      if (!account || !pass) return alert('fill account and pass first!')
      try {
        setToken(await (isRegister ? register : login)(account, pass))
      } catch (e) {
        alert(`${isRegister ? 'register' : 'login'} fail!${e}`)
      }
    }}>{isRegister ? 'register' : 'login'}</Button>
    <Link to={isRegister ? '/login' : '/register'} >{isRegister ? 'login' : 'register'}</Link>
  </Form>)
}

export default Login
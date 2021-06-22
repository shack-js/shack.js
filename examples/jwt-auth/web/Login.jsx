import { useState } from "react"
import { setHeaders } from '@shack-js/loader-fetch/src/fetch.js'
import { login } from "../apis/user.mjs"
import { HEADER_KEY } from "../common/consts.mjs"

const Login = () => {
  let [user, setUser] = useState('')
  let [pass, setPass] = useState('')
  let [token, setToken] = useState('')
  let [loading, setLoading] = useState(false)
  if (loading) return 'loading...'
  if (token) {
    return <span>{user}<a
      onClick={e => {
        setToken('')
        setHeaders({})
      }}
      style={{ textDecoration: 'underline', color: 'blue' }}
    >logout</a></span>
  }
  return (<div>
    <p>user:123456 | admin:123456</p>
    <input
      placeholder="user"
      onChange={e => setUser(e.target.value)}
      value={user}
    />
    <input
      placeholder="pass"
      onChange={e => setPass(e.target.value)}
      value={pass}
    />
    <button onClick={async () => {
      if (!user || !pass) return alert('fill user and pass first!')
      setLoading(true)
      try {
        let token = await login(user, pass)
        setToken(token)
        setHeaders({ [HEADER_KEY]: await login(user, pass) })
      } catch (e) {
        alert(`login fail!${e}`)
      }
      setLoading(false)
    }}>login</button>
  </div>)
}

export default Login
import { useState } from "react"
import { render } from "react-dom"
import { hello, authInMethodToken } from "../apis/hello.mjs"
import { authInFileToken } from "../apis/hello1.mjs"
import { authInFolderUser } from "../apis/user/hello.mjs"
import { chainAuthInFileAdmin } from "../apis/user/hello1.mjs"
import { chainAuthInFolderAdmin } from "../apis/user/admin/hello.mjs"

const reqs = {
  hello, authInMethodToken, authInFileToken, authInFolderUser
  , chainAuthInFileAdmin, chainAuthInFolderAdmin
},
  reqKeys = Object.keys(reqs),
  roles = {
    anybody: {},
    token: { token: '123' },
    user: { user: { name: 'user' } },
    admin: { user: { name: 'admin' } }
  },
  roleKeys = Object.keys(roles)

const Index = () => {
  let [selected, setSelected] = useState(0)
  let [results, setResults] = useState(reqKeys.map(x => 'not set'))
  return <div>
    <select value={selected} onChange={e => setSelected(parseInt(e.target.value))} >{
      roleKeys.map((x, i) => <option key={i} value={i}>{x}</option>)
    }</select>
    <button onClick={async () => {
      setResults(reqKeys.map(x => '...pending'))
      let promises = reqKeys.map(k => wrap(
        () => reqs[k](roles[roleKeys[selected]]))
      )
      setResults(await Promise.all(promises))

    }}>send requests</button>

    <table><tbody>{reqKeys.map((x, i) => <tr key={i}>
      <td>{x}</td><td>{results[i]}</td>
    </tr>)}</tbody></table>
  </div>
}

render(<Index />, document.getElementById('react-root'))


async function wrap(fn) {
  try {
    return `success!${await fn()}`
  } catch (e) {
    return `fail!${e}`
  }
}
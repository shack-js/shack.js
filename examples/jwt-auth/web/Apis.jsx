import { useState } from "react"
import { render } from "react-dom"
import { info } from "../apis/user.mjs"
import { hello } from "../apis/hello.mjs"
import { userHello } from "../apis/user/hello.mjs"
import { adminHello } from "../apis/user/admin/hello.mjs"

const reqs = {
  info, hello, userHello, adminHello
},
  reqKeys = Object.keys(reqs)

const Apis = () => {
  let [results, setResults] = useState(reqKeys.map(x => 'not set'))
  return <div>

    <button onClick={async () => {
      setResults(reqKeys.map(x => '...pending'))
      let promises = reqKeys.map(k => wrap(
        () => reqs[k]())
      )
      setResults(await Promise.all(promises))

    }}>send requests</button>

    <table><tbody>{reqKeys.map((x, i) => <tr key={i}>
      <td>{x}</td><td>{results[i]}</td>
    </tr>)}</tbody></table>
  </div>
}

export default Apis


async function wrap(fn) {
  try {
    return `success!${JSON.stringify(await fn())}`
  } catch (e) {
    return `fail!${e}`
  }
}
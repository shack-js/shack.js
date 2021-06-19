import { useEffect, useState } from "react"
import { render } from "react-dom"
import { hello } from "../apis/hello.mjs"

const Index = () => {
  let [msg, setMsg] = useState('...loading')
  useEffect(() => {
    (async () => setMsg(await hello('world')))()
  })
  return <div>{msg}</div>
}

render(<Index />, document.getElementById('react-root'))



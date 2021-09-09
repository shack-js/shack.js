import { useState } from "react"
import { render } from "react-dom"
import { Frame } from "./components/Frame"
import { selectUserIndex, userArr } from "./store"

const Index = () => {
  let [i, , setI] = selectUserIndex.use()
  let [users] = userArr.use()
  return <div>
    <select value={i} onChange={e => setI(parseInt(e.target.value))}
    >{users.map((x, i) => <option key={i} value={i}>{x.name}</option>)}</select>

    <Frame />
  </div>
}

render(<Index />, document.getElementById('react-root'))


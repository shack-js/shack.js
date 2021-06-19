import { useState } from "react"
import { render } from "react-dom"
import { list } from "../apis/todo.mjs"
import { add, remove, toggle } from "../apis/todo.mjs"
import { todos, loadingIndex } from './todo.mjs'

const Index = () => {
  let [items, pending, setItems] = todos.use()
  let [index, indexPending, setIndex] = loadingIndex.use()
  let [toAdd, setToAdd] = useState('')
  if (pending) return 'loading...'
  const operate = async (i, op) => {
    setIndex(i)
    setIndex(async () => {
      await op()
      let t = await list()
      setItems(t)
      return -2
    })
  }
  return <ul>
    {items.map(({ id, checked, text }, i) => <li
      key={i}
      style={{ clear: 'both' }}
    >{
        (!!(indexPending && index == i))
          ? 'operating...'
          : <>
            <input type="checkbox"
              checked={checked}
              onChange={() => operate(i, () => toggle(id, !checked))} />
            {text}
            <button
              style={{ float: 'right' }}
              onClick={() => operate(i, () => remove(id))}
            >del</button>
          </>
      }</li>)}
    <li key={'-1'}>{
      (!!(indexPending && index == -1))
        ? 'operating...'
        : <>
          <input value={toAdd} onChange={e => setToAdd(e.target.value)} />
          <button onClick={async () => {
            if (!toAdd) {
              alert(`can not add empty todo!`)
              return
            }
            await operate(-1, () => add(toAdd))
            setToAdd('')
          }} >add</button>
        </>
    }
    </li>
  </ul>
}

render(<Index />, document.getElementById('react-root'))



import { FC, useState } from "react"
import { render } from "react-dom"
import { update, del, list, add } from "../apis/todo"
import { todos, loadingIndex } from './store'

const Index = () => {
  let [items, pending, setItems] = todos.use()
  let [index, indexPending, setIndex] = loadingIndex.use()
  let [toAdd, setToAdd] = useState('')
  if (pending) return <div>loading...</div>
  const operate = async (i: number, op: () => {}) => {
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
              onChange={() => operate(i, () => update({ id, checked: !checked }))} />
            {text}
            <button
              style={{ float: 'right' }}
              onClick={() => operate(i, () => del(id))}
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


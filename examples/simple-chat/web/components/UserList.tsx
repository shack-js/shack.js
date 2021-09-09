import { users } from "../../common/consts"
import { leftUsers, selectedLeftUser } from "../store"

export const UserList = () => {
  let [list, pending, setList] = leftUsers.use()
  let [, , setLeftSelect] = selectedLeftUser.use()
  return <div style={{
    height: 300,
  }}>{pending
    ? <p>loading...</p>
    : list.length == 0
      ? <p>暂无用户咨询</p>
      : <ul>{list.map(({ fromid, msgcnt }, i) => <li key={i} onClick={() => {
        setLeftSelect(users[fromid])
        let l1 = list.concat()
        l1[i].msgcnt = 0
        setList(l1)
      }}>{users[fromid].name}({msgcnt})</li>)}</ul>}
  </div>
}
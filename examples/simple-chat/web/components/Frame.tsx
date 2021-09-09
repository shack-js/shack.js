import { connected, selectedLeftUser } from "../store"
import { History } from "./History"
import { Input } from "./Input"
import { UserList } from "./UserList"

export const Frame = () => {
  let [user] = selectedLeftUser.use()
  let [ioReady] = connected.use()
  if (!ioReady) return <div>connecting...</div>
  return <div style={{ width: '80%', margin: '0 auto' }}>
    <div style={{ width: '30%', float: 'left', background: 'gray' }}>
      <UserList />
    </div>

    <div style={{ width: '70%', float: 'right' }}>
      <h4>{user ? user.name : ''}</h4>
      <History />
      <Input />
    </div>
  </div>
}
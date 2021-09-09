import Store from 'react-tiny-states'
import { getLeftUserAndMsgCounts, getUnreadMsgs } from '../apis/message'
import { IMessage, User, users } from '../common/consts'
import { socket } from '../common/socket/io'
const admin = users['1']

export const userArr = new Store(Object.values(users) as User[])
export const selectUserIndex = new Store(0)
export const selectedUser = new Store(userArr[0] as User, [userArr, selectUserIndex], (arr, i) => arr[i])
export const leftUsers = new Store([] as { fromid: number, msgcnt: number }[], [selectedUser], async user => {
  let { id } = user
  let usermsgcnts = await getLeftUserAndMsgCounts(id)
  return (id != admin.id && !usermsgcnts.some(({ fromid }) => fromid == 1)) // 1 = admin
    ? [{ fromid: 1, msgcnt: 0 }, ...usermsgcnts]
    : usermsgcnts
})
export const selectedLeftUser = new Store(undefined as User)
export const historyMessages = new Store({} as { [key: number]: IMessage[] | undefined },
  [selectedLeftUser, selectedUser], async (fromUser, toUser) => {
    if (!fromUser) return old => old
    let msgs = await getUnreadMsgs(fromUser.id, toUser.id)
    return old => ({
      ...old,
      [fromUser.id]: old[fromUser.id] ? old[fromUser.id].concat(msgs) : msgs
    })
  })
export const currentHistory = new Store([] as IMessage[], [historyMessages, selectedLeftUser],
  (hm, su) => {
    console.log(su, hm)
    return su ? hm[su.id] || [] : []
  })

export const connected = new Store(false)
socket.on('connect', () => {
  connected.setState(true)
  console.log(`connect!`, socket.connected)
})

export function addMsgs(leftUserId: number, msgs: IMessage[]) {
  historyMessages.setState(oldObj => {
    let old = oldObj[leftUserId]
    return {
      ...oldObj,
      [leftUserId]: [...old, ...msgs]
    }
  })
}

export function setUnreadCount(leftUserid, fn: (n: number) => number) {
  leftUsers.setState(arr => {
    if (arr.some(({ fromid }) => fromid == leftUserid)) {
      return arr.map(x => x.fromid == leftUserid ? {
        ...x,
        msgcnt: fn(x.msgcnt)
      } : x)
    }
    return [{ fromid: leftUserid, msgcnt: fn(0) }, ...arr]
  })
}
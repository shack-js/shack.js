import { MessageTypes, users } from "../../common/consts"
import { currentHistory, historyMessages, leftUsers, selectedLeftUser, selectedUser, setUnreadCount } from "../store"

import { useEffect, useRef } from "react"
import { getUnreadMsgs } from "../../apis/message"
import { socket } from "../../common/socket/io"

const limitWidth = { maxWidth: '100%' }

export const History = () => {
  let [msgs, pending] = currentHistory.use()
  let [, , setMsgs] = historyMessages.use()
  let [user] = selectedUser.use()
  let ref = useRef(null), root = useRef(null)
  useEffect(() => {
    if (!user) return
    // console.log(`effect ${user.id}`)
    let handler = async msgfromid => {
      // console.log({ msgfromid, leftUser,lu:selectedLeftUser.getValue() })
      let leftUser = selectedLeftUser.getValue()
      if (leftUser && msgfromid === leftUser.id) {
        //直接加载
        // console.log(`直接加载`)
        let unreads = await getUnreadMsgs(msgfromid, user.id)
        setMsgs(oldObj => {
          let old = oldObj[msgfromid]
          return {
            ...oldObj,
            [msgfromid]: [...old, ...unreads]
          }
        })
        setUnreadCount(msgfromid, x => 0)
      } else {
        setUnreadCount(msgfromid, x => x + 1)
      }
    }
    socket.on('msg', handler)
    socket.emit('join', `to_${user.id}`)
    console.log(`emit join ${user.id}`)
    return () => {
      console.log(`emit leave ${user.id}`)
      socket.emit('leave', `to_${user.id}`)
      socket.off('msg', handler)
    }
  }, [user])

  useEffect(() => {
    let ob = new ResizeObserver(() => {
      root.current.scrollTop = root.current.scrollHeight
    })
    ob.observe(ref.current)
    return () => ob.disconnect()
  }, [])

  return <div style={{ height: 240, borderBottom: '1px solid black', overflowY: 'scroll', position: 'relative' }}
    ref={root}>
    <div ref={ref}>
      {pending
        ? <p>loading...</p>
        : msgs.map(({ id, type, content, fromid }) => {
          switch (type) {
            case MessageTypes.text: return <p key={id}>{users[fromid].name}:{content}</p>
            case MessageTypes.image: return <p key={id}>{users[fromid].name}:<img style={limitWidth} src={content} /></p>
            case MessageTypes.video: return <p key={id}>{users[fromid].name}:<video style={limitWidth} src={content} /></p>
            case MessageTypes.file: {
              let { filename, url } = JSON.parse(content)
              return <p key={id}>{users[fromid].name}:<a href={url} target="_blank">{filename}</a></p>
            }
          }
        })}
    </div>
  </div>
}
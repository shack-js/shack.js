import { useState } from "react"
import { getFileType, IMessage, MessageTypes } from "../../common/consts"
import { historyMessages, selectedLeftUser, selectedUser } from "../store"
// import Publisher from 'sse-notify-suite/dist/Publisher'
import Uploader from 'express-chunk-upload/Uploader'
import { sendMsg } from "../../apis/message"
import Store from "react-tiny-states"
import { socket } from "../../common/socket/io"

let uploadingState = new Store(undefined)
let sendingState = new Store(undefined)
// let publisher = new Publisher('http://localhost:3001')
let uploader = new Uploader({ url: '/upload' })

export const Input = () => {
  let [inputVal, setInputVal] = useState('')
  let [, , setMsgs] = historyMessages.use()
  let [user] = selectedUser.use()
  let [toUser] = selectedLeftUser.use()
  let [, uploading, setUploading] = uploadingState.use()
  let [, sending, setSending] = sendingState.use()
  return <div>
    <input type="file" onChange={e => {
      e.target.files.length && setUploading(upload(e.target.files[0]))
    }} multiple={false} />
    {uploading && <span>uploading...</span>}
    <br />
    <textarea value={inputVal} onChange={e => setInputVal(e.target.value)} />
    <button onClick={e => setSending(sendMsgWrap(MessageTypes.text, inputVal.trim())
      .then(() => setInputVal('')))} >发送</button>
    {sending && <span>sending...</span>}
  </div>

  async function upload(file: File) {
    let uploadItem = uploader.upload(file)
    let uploadedName = await (uploadItem.start() as Promise<string>)
    let url = '/uploads/' + uploadedName
    let type = getFileType(file.name)
    await sendMsgWrap(type, type == MessageTypes.file
      ? JSON.stringify({ filename: file.name, url })
      : url)
  }

  async function sendMsgWrap(type: number, content: string) {
    if (!toUser) return alert('选一个人再聊天！')
    if (!content) return alert('输入内容再发送！')
    let msg: IMessage = {
      type,
      fromid: user.id,
      toid: toUser.id,
      created: new Date().getTime(),
      content,
      read: 0
    }
    let rtn: any = await sendMsg(msg)
    setMsgs(oldObj => {
      let old = oldObj[toUser.id] || []
      return {
        ...oldObj,
        [toUser.id]: [...old, { ...msg, ...rtn.identifiers[0] }]
      }
    })
    socket.emit('msg', { fromid: user.id, toid: toUser.id })
  }
}